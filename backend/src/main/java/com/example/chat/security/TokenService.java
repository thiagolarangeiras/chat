package com.example.chat.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTDecodeException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class TokenService {
    @Value("${jwt.token.secret}")
    private String secret;
    @Value("${jwt.token.issuer}")
    private String issuer;
    @Value("${jwt.token.expiration-minutes}")
    private long expirationMinutes;

    public String generateToken(String username) {
        System.out.println(secret);
        System.out.println(issuer);
        System.out.println(expirationMinutes);
        Algorithm algorithm = Algorithm.HMAC512(this.secret);
        Instant issuedAt = Instant.now().truncatedTo(ChronoUnit.SECONDS);
        Instant expiration = issuedAt.plus(expirationMinutes, ChronoUnit.MINUTES);
        try {
            return JWT.create()
                    .withIssuer(this.issuer)
                    .withSubject(username)
                    .withIssuedAt(issuedAt)
                    .withExpiresAt(expiration)
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error while generating the JWT token");
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC512(this.secret);
            return JWT
                    .require(algorithm)
                    .withIssuer(this.issuer)
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTDecodeException exception) {
            throw new RuntimeException("Error while decoding the JWT token");
        }
    }
}