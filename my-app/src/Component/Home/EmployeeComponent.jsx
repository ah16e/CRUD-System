import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FormGroup, Label, Input, Button, Form } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee, updateEmployee, createEmployee } from "../../Store/EmployeeSlice";
import { toast } from "react-toastify";

const EmployeeComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { employee, loading, error } = useSelector((state) => state.employee);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      dispatch(getEmployee(id)).catch((err) => toast.error("Error fetching employee data"));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (id) {
        const confirmUpdate = window.confirm("Are you sure you want to edit this employee?");
        if (confirmUpdate) {
          navigate('/')
        }
        await dispatch(updateEmployee({ id, employeeData: formData })).unwrap();

      } else {
        await dispatch(createEmployee(formData)).unwrap();
      }
      navigate("/employees");
    } catch (error) {
      toast.error(error?.message || "Failed to save employee");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    const confirmCancel = window.confirm("Are you sure you want to cancel the edit? Your changes will not be saved.");
    if (confirmCancel) {
      navigate("/");
    }
  };

  return (
    <Form className="form-container" onSubmit={handleSubmit}>
      <FormGroup floating>
        <Input
          id="firstName"
          name="firstName"
          placeholder="First Name"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
        />
        <Label for="firstName">First Name</Label>
        {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
      </FormGroup>

      <FormGroup floating>
        <Input
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
        />
        <Label for="lastName">Last Name</Label>
        {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
      </FormGroup>

      <FormGroup floating>
        <Input
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Label for="email">Email</Label>
        {errors.email && <div className="text-danger">{errors.email}</div>}
      </FormGroup>
      <div className="d-flex justify-content-between">
        
      <Button type="submit" color="primary" disabled={loading}>
        {loading ? "Processing..." : id ? "Update" : "Create"} Employee
      </Button>
      
      <Button color="primary"><Link className="text-white gap-8 underline" to={'/'} onClick={handleCancel} disabled={loading}>Cancel</Link></Button>
      </div>
      {error && <div className="text-danger mt-2">{error}</div>}
    </Form>
  );
};

export default EmployeeComponent;
