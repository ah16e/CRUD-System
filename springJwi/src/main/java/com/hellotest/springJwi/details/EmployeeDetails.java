package com.hellotest.springJwi.details;

import com.hellotest.springJwi.service.EmployeeService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDetails {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;

}
