import React, { useState } from 'react'
import { data, Form, useNavigate } from 'react-router-dom'
import {FormGroup, Label ,Input, Button} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Store/LoginSlice';
import { ToastContainer, toast } from "react-toastify";

const Login = () => {


  const [email  , setEmail] = useState('');
  const [password  , setPassword] = useState('');
  
  const {isLoading , error} = useSelector((state)=> state.user)

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLoginEvent = (e)=>{
    e.preventDefault();
  
    if (!email || !password) {
      toast.error("login failed")
      return;
    }
    let userCredential={
      email , password
    }
    dispatch(login(userCredential)).then((result)=>{
      if (result.payload) {
        toast.success("login success")
        setEmail('');
        setPassword('');
        setTimeout(() => {
          navigate('/');
          window.location.reload(); 
        }, 2000);
      }
    })

  }

  return (
    <div>
    <Form onSubmit={handleLoginEvent} className='form-container'>
    <FormGroup floating>
      <Input
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        value={email} 
        onChange={(e)=> setEmail(e.target.value)}

      />
      <Label for="exampleEmail">
        Email
      </Label>
    </FormGroup>
    {' '}
    <FormGroup floating>
      <Input
        id="password"
        name="password"
        placeholder="Password"
        type="password"
        value={password} 
        onChange={(e)=> setPassword(e.target.value)}
      />
      <Label for="password">
        Password
      </Label>
    </FormGroup>
    {' '}
    <Button>
      {isLoading ? 'Loading...' : 'Login'}
    </Button>
    {error&& (
      <div className='alert alert-danger'>{error}</div>
    )}
  </Form>
  <ToastContainer/>
    </div>
  )
}

export default Login
