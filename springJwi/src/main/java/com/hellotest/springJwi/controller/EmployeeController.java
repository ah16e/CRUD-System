package com.hellotest.springJwi.controller;


import com.hellotest.springJwi.details.EmployeeDetails;
import com.hellotest.springJwi.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private EmployeeService employeeService;
    //Build Add Employee API
    @PostMapping
    public ResponseEntity<EmployeeDetails> createEmployee(@RequestBody EmployeeDetails employeeDetails) {
      EmployeeDetails  savedEmployee =   employeeService.createEmployee(employeeDetails);
      return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    //Build Get Employee
    @GetMapping("{id}")
    public ResponseEntity<EmployeeDetails> getEmployeeById(@PathVariable("id") Long employeeId) {
    EmployeeDetails employeeDetails = employeeService.getEmployeeById(employeeId);
    return ResponseEntity.ok(employeeDetails);
    }

    //Build Get All API
    @GetMapping
    public ResponseEntity<List<EmployeeDetails>> getAllEmployees() {
        List<EmployeeDetails> employees =  employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }


    //Build Update API
    @PutMapping("{id}")
   public ResponseEntity<EmployeeDetails> updateEmployee(@PathVariable("id") Long employeeId ,@RequestBody EmployeeDetails updateEmployee) {
        EmployeeDetails employeeDetails = employeeService.updateEmployee(employeeId  , updateEmployee);
        return ResponseEntity.ok(employeeDetails);
   }

   //Build Delete API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId) {
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok("Employee deleted successfully");
    }
}


