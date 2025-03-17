import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteEmployee, getEmployees } from '../../Store/EmployeeSlice';
import { Button, NavLink, Table } from 'reactstrap'
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';


export const ListComponent = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employee);
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      dispatch(deleteEmployee(id))
        .then(() => {
        dispatch(getEmployees());
        })
        .catch((error) => toast.error(error?.message || "Failed to delete employee"));
    }
  };

  return (
    <div className="table-container">
      <Link className='btn btn-primary' to={'/add-employee'}>Add Employee</Link>
      <Table className="responsive-table">
      <thead>
        <tr>
          <th className="py-3 px-6">Employee Id</th>
          <th className="py-3 px-6">First Name</th>
          <th className="py-3 px-6">Last Name</th>
          <th className="py-3 px-6">Email</th>
          <th className="py-3 px-6">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.email}</td>
            <td>
            <Button onClick={() => navigate(`/edit-employee/${employee.id}`)} color="primary">Edit</Button>
            <Button  onClick={() => handleDelete(employee.id)} color="danger">Delete</Button>
              </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <ToastContainer/>
    </div>
  );
};
