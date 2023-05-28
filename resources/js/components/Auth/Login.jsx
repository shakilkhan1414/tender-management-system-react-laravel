import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useRef,useState, useEffect } from 'react'

export const Login = () => {
    const email=useRef('')
    const password=useRef('')

    const [emailError,setEmailError]=useState('')
    const [passwordError,setPasswordError]=useState('')

    const navigate=useNavigate()

    useEffect(()=>{
        if(User.loggedIn()){
            navigate('/dashboard')
        }
    },[])

    const loginHandler=(e)=>{
        e.preventDefault()
        const formData={
            email: email.current.value,
            password:password.current.value
        }

        axios.post('/api/auth/login',formData)
        .then(res => {
            User.responseAfterLogin(res)
            Toast.fire({
            icon: 'success',
            title: 'Logged in successfully!'
            })
            navigate('/dashboard')
        })
        .catch(error=> {
                if(error.response.status === 401){
                    Toast.fire({
                    icon: 'warning',
                    title: 'Invalid Email or Password!'
                    })
                    setEmailError('')
                    setPasswordError('')
                }
                else if(error.response.status === 422){
                    setEmailError(()=>{
                        return error.response.data.errors.email ? error.response.data.errors.email[0] : ''
                    })
                    setPasswordError(()=>{
                        return error.response.data.errors.password ? error.response.data.errors.password[0] : ''
                    })

                }
            }
        )
    }

  return (
        <div className='col-md-6 mt-5'>
            <h2 className='text-center mb-4'>Login</h2>
            <form onSubmit={loginHandler}>
                <div className="form-outline mb-4">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" ref={email}/>
                    {emailError && <small className='text-danger'>{emailError}</small>}
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" ref={password}/>
                    {passwordError && <small className='text-danger'>{passwordError}</small>}
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4">Log in</button>

                <div className="text-center">
                    <p>Not a member? <Link to="/signup">Register</Link></p>
                    <button type="button" className="btn btn-link btn-floating mx-1"/>
                    <i className="fab fa-facebook-f"></i>
                </div>
            </form>
        </div>
  )
}
