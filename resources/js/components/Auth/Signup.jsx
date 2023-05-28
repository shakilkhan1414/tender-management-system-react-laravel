import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useRef,useState,useEffect } from 'react'

export const Signup = () => {
    const name=useRef('')
    const email=useRef('')
    const password=useRef('')
    const password_confirmation=useRef('')

    const [nameError,setNameError]=useState('')
    const [emailError,setEmailError]=useState('')
    const [passwordError,setPasswordError]=useState('')

    const navigate=useNavigate()

    useEffect(()=>{
        if(User.loggedIn()){
            navigate('/dashboard')
        }
    },[])

    const signupHandler=(e)=>{
        e.preventDefault()
        const formData={
            name: name.current.value,
            email: email.current.value,
            password:password.current.value,
            password_confirmation:password_confirmation.current.value
        }

        axios.post('/api/auth/signup',formData)
        .then(res => {
            User.responseAfterLogin(res)
            Toast.fire({
            icon: 'success',
            title: 'Signed in successfully!'
            })
            navigate('/dashboard')
        })
        .catch(error=> {
                if(error.response.status === 422){
                    setNameError(()=>{
                        return error.response.data.errors.name ? error.response.data.errors.name[0] : ''
                    })
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
        <div className='col-md-6 mt-2'>
            <h2 className='text-center mb-4'>Register</h2>
            <form onSubmit={signupHandler}>
                <div className="form-outline mb-2">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" ref={name}/>
                    {nameError && <small className='text-danger'>{nameError}</small>}
                </div>

                <div className="form-outline mb-2">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" ref={email}/>
                    {emailError && <small className='text-danger'>{emailError}</small>}
                </div>

                <div className="form-outline mb-2">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" ref={password}/>
                    {passwordError && <small className='text-danger'>{passwordError}</small>}
                </div>

                <div className="form-outline mb-2">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" ref={password_confirmation}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4">Sign up</button>

                <div className="text-center">
                    <p>Already a member? <Link to="/">Login</Link></p>
                    <button type="button" className="btn btn-link btn-floating mx-1"/>
                    <i className="fab fa-facebook-f"></i>
                </div>
            </form>
        </div>
  )
}
