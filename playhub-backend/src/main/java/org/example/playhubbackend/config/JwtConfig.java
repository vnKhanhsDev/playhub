package org.example.playhubbackend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "app.jwt")
public class JwtConfig {

    private String signerKey;
    private long accessExpiration;   // milliseconds
    private long refreshExpiration;  // milliseconds

}
