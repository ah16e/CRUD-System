import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { data, Form, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import {FormGroup, Label ,Input, Button} from 'reactstrap'
import { registerUser } from '../../Store/RegisterSlice';

export const Register = () => {

  const [username , setUserName] = useState('');
  const [email  , setEmail] = useState('');
  const [password  , setPassword] = useState('');

  const {isLoading , error} = useSelector((state)=> state.register);

  const dispathch = useDispatch();
  const navigate = useNavigate();


  const handleRegisterEvent = (e)=>{
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("Register Failed")
      return;
    }

    let registerCredential ={
      username , email , password
    }

    dispathch(registerUser(registerCredential)).then((result) =>{
      if (result.payload) {
        toast.success("Register Success");
        setUserName('');
        setEmail('');
        setPassword('');
        setTimeout(() =>{
          navigate('/')
          window.location.reload();
        } , 2000);
      }
    })

  }

  
return (
    <>
    <Form onSubmit={handleRegisterEvent} className='form-container'>
    <FormGroup floating>
      <Input
        id="username"
        name="name"
        placeholder="Name"
        type="text"
        value={username} 
        onChange={(e)=> setUserName(e.target.value)}
      />
      <Label for="username">
        Username
      </Label>
    </FormGroup>
    {' '}

    <FormGroup floating>
      <Input
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        value={email} 
        onChange={(e)=> setEmail(e.target.value)}
      />
      <Label for="email">
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
      {isLoading ? 'Loading...' :'Register'}
    </Button>
    {error&&(
      <div className='alret alert-danger'>{error}</div>
    )}
  </Form>
  <ToastContainer/>
    </>
  )
}
