package org.example.playhubbackend.modules.auth.service;

import lombok.RequiredArgsConstructor;
import org.example.playhubbackend.common.exception.AppException;
import org.example.playhubbackend.common.exception.ErrorCode;
import org.example.playhubbackend.modules.auth.dto.AuthFlowSession;
import org.example.playhubbackend.modules.auth.enums.AuthFlowState;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class AuthFlowService {

    private final RedisTemplate<String, Object> redisTemplate;

    private static final String REDIS_KEY_PREFIX = "auth:flow:";
    private static final String HASH_KEY_EMAIL = "email";
    private static final String HASH_KEY_STATE = "state";
    private static final int SESSION_TTL_SECONDS = 300; // 5 minutes

    public String createSession(String email, AuthFlowState state) {
        String flowId = UUID.randomUUID().toString();
        String redisKey = REDIS_KEY_PREFIX + flowId;

        redisTemplate.opsForHash().put(redisKey, HASH_KEY_EMAIL, email);
        redisTemplate.opsForHash().put(redisKey, HASH_KEY_STATE, state.name());
        redisTemplate.expire(redisKey, SESSION_TTL_SECONDS, TimeUnit.SECONDS);

        return flowId;
    }

    public AuthFlowSession getSession(String flowId) {
        String redisKey = REDIS_KEY_PREFIX + flowId;
        Map<Object, Object> entries = redisTemplate.opsForHash().entries(redisKey);

        if (entries.isEmpty()) {
            throw new AppException(ErrorCode.AUTH_FLOW_EXPIRED);
        }

        String email = (String) entries.get(HASH_KEY_EMAIL);
        AuthFlowState state = AuthFlowState.valueOf((String) entries.get(HASH_KEY_STATE));

        return new AuthFlowSession(email, state);
    }

    public void deleteSession(String flowId) {
        redisTemplate.delete(REDIS_KEY_PREFIX + flowId);
    }

    public void renewTtl(String flowId) {
        String redisKey = REDIS_KEY_PREFIX + flowId;

        if (Boolean.FALSE.equals(redisTemplate.hasKey(redisKey))) {
            throw new AppException(ErrorCode.AUTH_FLOW_EXPIRED);
        }

        redisTemplate.expire(redisKey, SESSION_TTL_SECONDS, TimeUnit.SECONDS);
    }

}
