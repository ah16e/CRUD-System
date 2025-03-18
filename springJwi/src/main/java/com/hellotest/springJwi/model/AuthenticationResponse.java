package com.hellotest.springJwi.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class AuthenticationResponse {

    @JsonProperty("access_token")
    private String token;

    public String getToken() {
       return token;
    }

    public AuthenticationResponse(String token) {
        this.token = token;
    }
}
