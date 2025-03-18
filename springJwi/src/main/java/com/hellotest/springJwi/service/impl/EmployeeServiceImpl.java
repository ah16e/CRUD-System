package com.hellotest.springJwi.service.impl;
import com.hellotest.springJwi.details.EmployeeDetails;
import com.hellotest.springJwi.entity.Employee;
import com.hellotest.springJwi.exception.ResourceNotFound;
import com.hellotest.springJwi.mapper.EmployeeMapper;
import com.hellotest.springJwi.repository.EmployeeRepository;
import com.hellotest.springJwi.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDetails createEmployee(EmployeeDetails employeeDetails) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDetails);
        Employee savedEmployee =  employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDetails(savedEmployee);
    }

    @Override
    public EmployeeDetails getEmployeeById(Long employeeId) {
        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(()-> new RuntimeException("Employee not found" + employeeId));
        return EmployeeMapper.mapToEmployeeDetails(employee);
    }

    @Override
    public List<EmployeeDetails> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee -> EmployeeMapper.mapToEmployeeDetails(employee))).collect(Collectors.toList());
    }

    @Override
    public EmployeeDetails updateEmployee(Long employeeId, EmployeeDetails updateEmployee) {

       Employee employee = employeeRepository.findById(employeeId).orElseThrow(()-> new ResourceNotFound("Employee not found" + employeeId));

       employee.setFirstName(updateEmployee.getFirstName());
       employee.setLastName(updateEmployee.getLastName());
       employee.setEmail(updateEmployee.getEmail());

       Employee updateEmployeeObj = employeeRepository.save(employee);
       return EmployeeMapper.mapToEmployeeDetails(updateEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(()-> new ResourceNotFound("Employee not found" + employeeId));
        employeeRepository.deleteById(employeeId);
    }
}
