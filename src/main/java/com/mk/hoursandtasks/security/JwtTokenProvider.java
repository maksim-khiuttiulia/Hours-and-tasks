package com.mk.hoursandtasks.security;

import com.mk.hoursandtasks.utils.DateUtils;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Autowired
    private JwtUserDetailService jwtUserDetailService;

    @Value("${jwt.token.secret}")
    private String secretToken;

    @Value("${jwt.token.expired}")
    private long expiredMillis;

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder;
    }

    @PostConstruct
    public void init(){
        secretToken = Base64.getEncoder().encodeToString(secretToken.getBytes());
    }

    public String createToken(String username){
        Claims claims = Jwts.claims().setSubject(username);
        Date now = DateUtils.getCurrentDate();
        Date validity = new Date(now.getTime() + expiredMillis);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretToken)
                .compact();
    }
    public Authentication getAuthentication(String token){
        UserDetails jwtUserDetails = jwtUserDetailService.loadUserByUsername(getUsername(token));
        return new UsernamePasswordAuthenticationToken(jwtUserDetails, "", null);
    }
    public String getUsername(String token){
        return Jwts.parser().setSigningKey(secretToken).parseClaimsJws(token).getBody().getSubject();
    }

    public String resolveToken(HttpServletRequest request){
        String bearer = request.getHeader("Authorization");
        if (bearer != null && bearer.startsWith("Bearer_")){
            return bearer.substring(7, bearer.length());
        }
        return null;
    }

    public boolean validateToken(String token){
        try {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(secretToken).parseClaimsJws(token);
            if (claimsJws.getBody().getExpiration().before(DateUtils.getCurrentDate())){
                return false;
            }
            return true;
        } catch (JwtException | IllegalArgumentException ex){
            throw new JwtAuthenticationException("JWT Token is expired or invalid");
        }
    }
}
