package org.example.playhubbackend.infrastructure.jwt;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.playhubbackend.config.JwtConfig;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final JwtConfig jwtConfig;

    public String generateAccessToken(String email, List<String> roles) {
        return generateToken(email, roles, jwtConfig.getAccessExpiration());
    }

    public String generateRefreshToken(String email, List<String> roles) {
        return generateToken(email, roles, jwtConfig.getRefreshExpiration());
    }

    private String generateToken(String email, List<String> roles, long expirationMs) {
        try {
            Instant now = Instant.now();

            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .subject(email)
                    .issuer("playhub")
                    .jwtID(UUID.randomUUID().toString())
                    .issueTime(Date.from(now))
                    .expirationTime(Date.from(now.plusMillis(expirationMs)))
                    .claim("roles", roles)
                    .build();

            JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);
            SignedJWT signedJWT = new SignedJWT(header, claimsSet);
            signedJWT.sign(new MACSigner(jwtConfig.getSignerKey().getBytes()));

            return signedJWT.serialize();
        } catch (JOSEException e) {
            log.error("Failed to generate JWT token for [{}]: {}", email, e.getMessage(), e);
            throw new RuntimeException("Failed to generate JWT token", e);
        }
    }

}
