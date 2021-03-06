import React, { useRef, useState } from 'react';
import { Form,  Button} from 'react-bootstrap';
import {  useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import SocialLogin from '../SharedPage/SocialLogin/SocialLogin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../SharedPage/Loading/Loading';
import './Login.css'


const Login = () => {
  const [Error ,setError]=useState('')
  const emailRef = useRef('');
  const navigate=useNavigate()
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
 
  //  ========================logIn with Email and password start====================
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(
    auth
  );
  

  const handleSubmitSignIn=(event)=>{
    event.preventDefault();
   
    const email=event.target.email.value;
    const password=event.target.password.value;
    signInWithEmailAndPassword(email,password)
    
    console.log(email , password);
    if(loading){
      return <Loading></Loading>
    }
     if(user){
      navigate(from, { replace: true });

     
        }
       
   if (error ) {
    setError(error?.message)
       console.log(Error);
   }
 }
 const resetPassword=async (event)=>{
  const email=emailRef.current.value;
  if(email){
    sendPasswordResetEmail(email)
    toast('Email sent')
  }
  else{
    toast('wirte your email first')
  }
  
 }


//  ========================logIn with Email and password end====================


    return (
        <div className='container'>
           <Form  onSubmit={handleSubmitSignIn} className=' w-50 mx-auto text-start  '>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label className='fs-2'>Email address</Form.Label>
    <Form.Control name='email' ref={emailRef} type="email" placeholder="Enter email" required />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
 
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label className='fs-2'>Password</Form.Label>
    <Form.Control name='password' type="password" placeholder="Password" required />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button style={{margin:"0"}} className='w-50 mx-auto d-block' variant="primary" type="submit">
    Submit
  </Button> <br />
  
<p style={{color:"red"}}> { Error }</p>
   

  <Form.Text className="text-dark w-50 mx-auto d-block" style={{margin:"0"}}>
      Didn't Have an Account? <Link className='text-decoration-none' to={"/Register"}>Register</Link>
    </Form.Text>
  <Form.Text className="text-dark w-50 mx-auto d-block" style={{margin:"0"}}>
      Forgot Password? <Button className=' resetButton  text-primary text-decoration-none' onClick={resetPassword}>resetPassword</Button>
    </Form.Text>
  
</Form>

    <SocialLogin></SocialLogin>
    <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;