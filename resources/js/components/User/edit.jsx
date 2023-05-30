import React from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

export const edit = () => {

    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [user_type, setUser_type]=useState('')

    const [nameError,setNameError]=useState('')
    const [emailError,setEmailError]=useState('')
    const [user_typeError,setUser_typeError]=useState('')

    const {id}=useParams()

    const navigate=useNavigate()

    useEffect(()=>{
        if(!User.loggedIn()){
            navigate('/')
        }
        userData()
    },[])

    const userData=()=>{
        axios.get('/api/user/'+id)
        .then(res=>{
            setName(()=>{
                return res.data.name
            })

            setEmail(()=>{
                return res.data.email
            })
            setUser_type(()=>{
                return res.data.user_type
            })

        })
        .catch(error=>{
            console.log(error)
        })
    }

    const updateUserHandler=(e)=>{
        e.preventDefault()
        const formData={
            name: name,
            email: email,
            user_type:user_type
        }

        axios.patch('/api/user/'+id,formData)
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
        <h1>Edit User</h1>
        <nav>
            <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to='/dashboard'>Home</Link></li>
            <li className="breadcrumb-item active">Edit User</li>
            </ol>
        </nav>
    </div>
    {!name && <div className='text-center'> <ClipLoader color="#4154f1" /></div>}
    {name &&
        <div className='col-md-12'>
        <form onSubmit={updateUserHandler}>
            <div className="form-outline mb-2">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                {nameError && <small className='text-danger'>{nameError}</small>}
            </div>

            <div className="form-outline mb-2">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                {emailError && <small className='text-danger'>{emailError}</small>}
            </div>

            <div className="form-outline mb-3">
                <label className="form-label">User Type</label>
                <select className="form-select" value={user_type} onChange={(e) => setUser_type(e.target.value)} >
                    <option value="">Select User_type</option>
                    <option value="1">Member</option>
                    <option value="2">Tender Reviewer</option>
                    <option value="3">Operating Officer</option>
                </select>
                {user_typeError && <small className='text-danger'>{user_typeError}</small>}
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">Update User</button>

        </form>
    </div>

    }

    </>
  )
}
