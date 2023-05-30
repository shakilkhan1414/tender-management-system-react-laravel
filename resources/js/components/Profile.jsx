import React from 'react'
import { Link } from 'react-router-dom'
import AppStorage from '../helpers/AppStorage'
import { useState,useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

export const Profile = () => {
    const token= AppStorage.getToken()
    const [user,setUser]=useState([])
    const [location,setLocation]=useState('')

    useEffect(()=>{
        if(!User.loggedIn()){
            navigate('/')
        }
        axios.post('/api/auth/me',{},{
            headers: {
                Authorization: `Bearer ${token}`
              }
        })
        .then((res)=>{
            setUser(res.data)
        })
        .catch(error=>{
            console.log(error)
        })

        axios.get('http://ip-api.com/json')
        .then(res => {
            let locationData=res.data.city +', '+ res.data.country
            setLocation(locationData)
        })
        .catch((error) => {
            console.log(error);
        })

    },[])


  return (
    <>
        <div className="pagetitle">
            <h1>Profile</h1>
            <nav>
                <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                <li className="breadcrumb-item">User</li>
                <li className="breadcrumb-item active">Profile</li>
                </ol>
            </nav>
            </div>
            {user.length==0 && <div className='text-center'> <ClipLoader color="#4154f1" /></div>}

            {user.length!=0 &&
                <section className="section profile">
            <div className="row">
                <div className="col-xl-4">

                <div className="card">
                    <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

                    <img src="/assets/img/user.png" alt="Profile" className="rounded-circle" />
                    <h2>{user.name}</h2>
                    {user.user_type && <h3 className='user_type'>{user.user_type.user_type.replace('_', ' ')}</h3>}

                    </div>
                </div>

                </div>

                <div className="col-xl-8">

                <div className="card">
                    <div className="card-body pt-3">
                    <div className="tab-pane fade show active profile-overview" id="profile-overview">
                        <h5 className="card-title">Profile Details</h5>

                        <div className="row">
                            <div className="col-lg-3 col-md-4 label ">Name</div>
                            <div className="col-lg-9 col-md-8">{user.name}</div>
                        </div>

                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">Email</div>
                            <div className="col-lg-9 col-md-8">{user.email}</div>
                        </div>

                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">User Type</div>
                            <div className="col-lg-9 col-md-8 user_type">{user.user_type.user_type.replace('_', ' ')}</div>

                        </div>

                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">Location</div>
                            <div className="col-lg-9 col-md-8">{location} <i className="bi bi-circle-fill online"></i></div>
                        </div>

                        <Link to='/user/profile/edit' className='btn btn-primary mt-2'>Edit</Link>
                    </div>
                </div>
                </div>

                </div>
            </div>
            </section>

            }


    </>
  )
}
