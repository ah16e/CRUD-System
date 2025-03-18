package com.hellotest.springJwi.mapper;

import com.hellotest.springJwi.details.EmployeeDetails;
import com.hellotest.springJwi.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDetails mapToEmployeeDetails(Employee employee) {
        return new EmployeeDetails(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail()
        );
    }

    public static Employee mapToEmployee(EmployeeDetails employeeDetails) {
        return new Employee(
                employeeDetails.getId(),
                employeeDetails.getFirstName(),
                employeeDetails.getLastName(),
                employeeDetails.getEmail()
        );
    }
}
