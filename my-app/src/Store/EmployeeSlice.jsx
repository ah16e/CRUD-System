import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8080/api/employees";

//Get All Employee
export const getEmployees = createAsyncThunk("employee/getEmployees", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Invalid request");
    return rejectWithValue(error.response?.data || "Error fetching employees");
  }
});

//Find  EmployeeId
export const getEmployee = createAsyncThunk("employee/getEmployee", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Employee not found");
    return rejectWithValue(error.response?.data || "Error fetching employee");
  }
});

// Update Employee
export const updateEmployee = createAsyncThunk("employee/updateEmployee", async ({ id, employeeData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, employeeData);
    toast.success("Employee updated successfully!");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update employee");
    return rejectWithValue(error.response?.data || "Error updating employee");
  }
});

// Create Employeee
export const createEmployee = createAsyncThunk("employee/createEmployee", async (employeeData, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, employeeData);
    toast.success("Employee created successfully!");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create employee");
    return rejectWithValue(error.response?.data || "Error creating employee");
  }
});

// delete Employee
export const deleteEmployee = createAsyncThunk("employee/deleteEmployee", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    toast.success("Employee deleted successfully!", { position: "top-center" });
    return id;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete employee", { position: "top-center" });
    return rejectWithValue(error.response?.data || "Error deleting employee");
  }
});

const EmployeeSlice = createSlice({
  name: "employee",
  initialState: { employees: [], employee: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     
      .addCase(getEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter((emp) => emp.id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default EmployeeSlice.reducer;
