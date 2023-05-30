import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useRef,useState,useEffect } from 'react'

export const create = () => {
    const name=useRef('')
    const email=useRef('')
    const password=useRef('')
    const password_confirmation=useRef('')
    const user_type=useRef('')

    const [nameError,setNameError]=useState('')
    const [emailError,setEmailError]=useState('')
    const [passwordError,setPasswordError]=useState('')
    const [user_typeError,setUser_typeError]=useState('')

    const navigate=useNavigate()

    useEffect(()=>{
        if(!User.loggedIn()){
            navigate('/')
        }
    },[])

    const createUserHandler=(e)=>{
        e.preventDefault()
        const formData={
            name: name.current.value,
            email: email.current.value,
            password:password.current.value,
            password_confirmation:password_confirmation.current.value,
            user_type:user_type.current.value
        }

        axios.post('/api/user',formData)
        .then(() => {
            Notification.success()
            navigate('/users')
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
                    setUser_typeError(()=>{
                        return error.response.data.errors.user_type ? error.response.data.errors.user_type[0] : ''
                    })

                }
            }
        )
    }

  return (
    <>
    <div className="pagetitle">
        <h1>Create User</h1>
        <nav>
            <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to='/dashboard'>Home</Link></li>
            <li className="breadcrumb-item active">Create User</li>
            </ol>
        </nav>
    </div>
        <div className='col-md-12'>
            <form onSubmit={createUserHandler}>
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

                <div className="form-outline mb-3">
                    <label className="form-label">User Type</label>
                    <select className="form-select" ref={user_type}>
                        <option value="">Select User Type</option>
                        <option value="1">Member</option>
                        <option value="2">Tender Reviewer</option>
                        <option value="3">Operating Officer</option>
                    </select>
                    {user_typeError && <small className='text-danger'>{user_typeError}</small>}
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4">Create User</button>

            </form>
        </div>
    </>
  )
}
