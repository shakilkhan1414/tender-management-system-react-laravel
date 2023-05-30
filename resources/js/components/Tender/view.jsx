import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

export const view = () => {
    const[tender,setTender]=useState([])
    const[filteredUsers,setFilteredUsers]=useState([])
    const[refferUser,setRefferUser]=useState('')
    const[refferError,setRefferError]=useState(false)
    const navigate=useNavigate()
    const {id}=useParams()

    useEffect(()=>{
        if(!User.loggedIn()){
            navigate('/')
        }
        tenderData()
        userFilteredData()
    },[])

    const tenderData=()=>{
        axios.get('/api/tender/'+id)
        .then(res=>{
            setTender(res.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const userFilteredData=()=>{
        axios.get('/api/user/')
        .then(res=>{
            setFilteredUsers(()=>{
                return res.data.filter((user)=>{
                    return user.user_type.id == 2
                })
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const refferTender=(e)=>{
        e.preventDefault()
        if(!refferUser){
            setRefferError(true)
            return
        }
        const formData={
            reffered_to: refferUser
        }
        axios.patch('/api/tender/'+id,formData)
        .then(() => {
            Notification.success()
            navigate('/tenders')
        })
        .catch(error=>{
            console.log(error)
        })

    }


  return (
    <>
        <div className="row">
            <div className="col-md-6">
                <div className="pagetitle">
                    <h1>View Tender</h1>
                    <nav>
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to='/dashboard'>Home</Link></li>
                        <li className="breadcrumb-item active">View Tender</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="col-md-6">
            <form onSubmit={refferTender}>
                <div className="row">
                        <div className="col-md-8 mt-2">
                            <select className="form-select" value={refferUser} onChange={(e) => setRefferUser(e.target.value)}>
                                <option value="">Select Tender Reviewer</option>
                                {filteredUsers.map((user)=>(
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                            {refferError && <small className='text-danger'>Select a Reviewer</small>}
                        </div>
                        <div className="col-md-4 mt-2">
                            <button type="submit" className='btn btn-primary'>Reffer</button>
                        </div>
                </div>
                </form>
            </div>
        </div>
        {tender.length==0 && <div className='text-center'> <ClipLoader color="#4154f1" /></div>}
        {tender.length!=0 &&
            <section className="section profile mt-2">
            <div className="row">
                <div className="col-xl-12">

                <div className="card">
                    <div className="card-body pt-3 px-4">
                    <div className="profile-overview" id="profile-overview">
                        <h5 className="card-title">Tender Details</h5>

                        <div className="row">
                            <div className="col-lg-3 col-md-4 label ">Tender Name</div>
                            <div className="col-lg-9 col-md-8">{tender.tender_name}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">Submitted By</div>
                            <div className="col-lg-9 col-md-8">{tender.submitted_by.name}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">Tender Type</div>
                            <div className="col-lg-9 col-md-8">{tender.tender_type}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 label ">Tender Price</div>
                            <div className="col-lg-9 col-md-8">{tender.tender_price}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">Tender Location</div>
                            <div className="col-lg-9 col-md-8">{tender.tender_location}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">Tender Description</div>
                            <div className="col-lg-9 col-md-8">{tender.tender_description}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">Submission Date</div>
                            <div className="col-lg-9 col-md-8">{tender.submission_date}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">Reffered To</div>
                            <div className="col-lg-9 col-md-8">{tender.reffered_to ? tender.reffered_to.name : 'Pending'}</div>
                        </div>
                        <div className="row d-flex align-items-center">
                            <div className="col-lg-3 col-md-4 label">Tender Document</div>
                            <div className="col-lg-9 col-md-8"><a href={`/storage/${tender.tender_document}`} className='btn btn-primary btn-sm'>Download</a></div>
                        </div>

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
