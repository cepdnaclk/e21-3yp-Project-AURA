package com.aura.system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())        // disable CSRF token requirement
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()         // allow all requests without login
            );
        return http.build();
    }
}
/* 

## Step 3 — Verify your folder structure looks like this
```
com.aura.system
├── AuraApplication.java
├── config/
│   └── SecurityConfig.java        ← new file here
├── controllers/
├── services/
├── repositories/
└── entities/

*/