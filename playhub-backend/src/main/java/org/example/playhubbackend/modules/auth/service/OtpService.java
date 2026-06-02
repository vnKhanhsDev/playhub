package org.example.playhubbackend.modules.auth.service;

import lombok.RequiredArgsConstructor;
import org.example.playhubbackend.common.exception.AppException;
import org.example.playhubbackend.common.exception.ErrorCode;
import org.example.playhubbackend.modules.auth.enums.OtpType;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final RedisTemplate<String, Object> redisTemplate;

    private static final String HASH_KEY_CODE = "code";
    private static final String HASH_KEY_ATTEMPTS = "attempts";
    private static final int EXPIRATION_TIME_SECONDS = 3 * 60;    // 3 minutes
    private static final int MAX_ATTEMPTS = 5;

    //- 1. Generate a random 6-digit OTP code and store it in Redis
    public String generateAndSaveOtp(String identifier, OtpType type) {
        String redisKey = generateRedisKey(identifier, type);
        String lockKey = "lock:" + redisKey;

        Boolean lockAcquired = redisTemplate.opsForValue()
                .setIfAbsent(lockKey, "locked", 120, TimeUnit.SECONDS);

        if (!Boolean.TRUE.equals(lockAcquired)) {
            throw new AppException(ErrorCode.OTP_RESEND_TOO_FREQUENTLY);
        }

        String otpCode = String.valueOf(100000 + new Random().nextInt(900000));

        redisTemplate.opsForHash().put(redisKey, HASH_KEY_CODE, otpCode);
        redisTemplate.opsForHash().put(redisKey, HASH_KEY_ATTEMPTS, "0");

        redisTemplate.expire(redisKey, EXPIRATION_TIME_SECONDS, TimeUnit.SECONDS);

        return otpCode;
    }

    //- 2. Verify the OTP code against the stored code in Redis
    public boolean verifyOtp(String identifier, String userInputCode, OtpType type) {
        String redisKey = generateRedisKey(identifier, type);

        Map<Object, Object> otpData = redisTemplate.opsForHash().entries(redisKey);

        if (otpData.isEmpty()) {
            throw new AppException(ErrorCode.OTP_NOT_FOUND);
        }

        String storedCode = (String) otpData.get(HASH_KEY_CODE);
        int currentAttempts = Integer.parseInt((String) otpData.get(HASH_KEY_ATTEMPTS));

        if (currentAttempts >= MAX_ATTEMPTS) {
            throw new AppException(ErrorCode.OTP_MAX_ATTEMPTS);
        }

        if (!userInputCode.equals(storedCode)) {
            redisTemplate.opsForHash().increment(redisKey, HASH_KEY_ATTEMPTS, 1);

            Long remainingTimeToLive = redisTemplate.getExpire(redisKey, TimeUnit.SECONDS);
            if (remainingTimeToLive != null && remainingTimeToLive > 0) {
                redisTemplate.expire(redisKey, remainingTimeToLive, TimeUnit.SECONDS);
            }

            throw new AppException(ErrorCode.OTP_INCORRECT);
        }

        redisTemplate.delete(redisKey);
        return true;
    }

    /*
    * @param identifier: email or phone number, ex: abc@gmail.com
    * @param type: OtpType.REGISTER
    * @return: otp:register:abc@gmail.com
    * */
    private String generateRedisKey(String identifier, OtpType type) {
        return "otp:" + type.name().toLowerCase() + ":" + identifier;
    }

}
