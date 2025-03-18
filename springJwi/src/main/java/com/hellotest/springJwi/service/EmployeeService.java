package com.hellotest.springJwi.service;

import com.hellotest.springJwi.details.EmployeeDetails;

import java.util.List;

public interface EmployeeService {

    EmployeeDetails createEmployee(EmployeeDetails employeeDetails);

    EmployeeDetails getEmployeeById(Long employeeId);

    List<EmployeeDetails> getAllEmployees();

    EmployeeDetails updateEmployee(Long employeeId , EmployeeDetails updateEmployee);

    void deleteEmployee(Long employeeId);

}
