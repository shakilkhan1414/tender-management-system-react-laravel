import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect,useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import AppStorage from '../helpers/AppStorage';

export const Dashboard = () => {

    const[users,setUsers]=useState('')
    const[tenders,setTenders]=useState('')
    const[totalAmount,setTotalAmount]=useState('')
    const[loading,setLoading]=useState(true)
    const navigate=useNavigate()

    useEffect(()=>{
        if(!User.loggedIn()){
            navigate('/')
        }
        getUsers()
        getTenders()

    },[])

    useEffect(()=>{
        if(!users || !tenders || !totalAmount){
            setLoading(true)
        }
        else{
            setLoading(false)
        }
    },[users,tenders,totalAmount])

    const getUsers=()=>{
        axios.get('/api/user')
        .then((res)=>{
            setUsers(res.data.length)
        })
    }

    const getTenders=()=>{
        axios.get('/api/tender')
        .then((res)=>{
            if(AppStorage.getUserType()=='member'){
                let memberTenders=res.data.filter((tender)=>{
                    return tender.submitted_by.id == User.id()
                })
                if(memberTenders.length == 0){
                    setTenders('0')
                }
                else{
                    setTenders(memberTenders.length)
                }

            }
            else if(AppStorage.getUserType()=='tender_reviewer'){
                let refferedTenders=res.data.filter((tender)=>{
                    if(tender.reffered_to){
                        return tender.reffered_to.id == User.id()
                    }
                })
                if(refferedTenders.length == 0){
                    setTenders('0')
                }
                else{
                    setTenders(refferedTenders.length)
                }
            }
            else{
                setTenders(res.data.length)
            }

            setTotalAmount(()=>{
                if(AppStorage.getUserType()=='member'){
                    let memberTenders=res.data.filter((tender)=>{
                        return tender.submitted_by.id == User.id()
                    })
                    if(memberTenders.length==0){
                        return '0'
                    }
                    else{
                        return memberTenders.reduce((sum, tender) => sum + parseInt(tender.tender_price), 0);
                    }

                }
                else if(AppStorage.getUserType()=='tender_reviewer'){
                    let refferedTenders=res.data.filter((tender)=>{
                        if(tender.reffered_to){
                            return tender.reffered_to.id == User.id()
                        }
                    })
                    if(refferedTenders.length==0){
                        return '0'
                    }
                    else{
                        return refferedTenders.reduce((sum, tender) => sum + parseInt(tender.tender_price), 0);
                    }
                    
                }
                else{
                    return res.data.reduce((sum, tender) => sum + parseInt(tender.tender_price), 0);
                }
            })
        })
    }

  return (
    <>
        <div className="pagetitle">
            <h1>Dashboard</h1>
            <nav>
                <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to='/dashboard'>Home</Link></li>
                <li className="breadcrumb-item active">Dashboard</li>
                </ol>
            </nav>
        </div>
        {loading && <div className='text-center'> <ClipLoader color="#4154f1" /></div>}

        {!loading &&

        <section className="section dashboard">
            <div className="row">

        {AppStorage.getUserType()=='operating_officer' &&
                <div className="col-xxl-4 col-md-4">
                <Link to='/users' className="card info-card sales-card">
                    <div className="card-body">
                    <h5 className="card-title">Total Users</h5>
                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-people"></i>
                        </div>
                        <div className="ps-3">
                        <h6>{users}</h6>
                        </div>
                    </div>
                    </div>
                </Link>
                </div>

            }


                <div className="col-xxl-4 col-md-4">
                <Link to='/tenders' className="card info-card revenue-card">
                    <div className="card-body">
                    <h5 className="card-title">Total Tenders</h5>
                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-menu-button-wide"></i>
                        </div>
                        <div className="ps-3">
                        <h6>{tenders}</h6>
                        </div>
                    </div>
                    </div>

                </Link>
                </div>

                <div className="col-xxl-4 col-md-4">
                <Link to='/tenders' className="card info-card revenue-card">
                    <div className="card-body">
                    <h5 className="card-title">Total Price</h5>
                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-currency-dollar"></i>
                        </div>
                        <div className="ps-3">
                        <h6>${totalAmount}</h6>
                        </div>
                    </div>
                    </div>
                </Link>
                </div>
        </div>
        </section>
        }

    </>
  )
}
