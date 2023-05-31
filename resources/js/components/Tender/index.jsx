import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import AppStorage from '../../helpers/AppStorage';

export const index = () => {

    const[tenders,setTenders]=useState([]);
    const[searchTerm,setSearchTerm]=useState('');
    const [filteredTender,setFilteredTender]=useState([])

    const navigate=useNavigate()

    useEffect(()=>{

        if(!User.loggedIn()){
            navigate('/')
        }

        axios.get('/api/tender')
        .then((res)=>{
            if(AppStorage.getUserType()=='member'){
                setTenders(()=>{
                    return res.data.filter((tender)=>{
                        return tender.submitted_by.id == User.id()
                    })
                })
            }
            else if(AppStorage.getUserType()=='tender_reviewer'){
                setTenders(()=>{
                    return res.data.filter((tender)=>{
                        if(tender.reffered_to){
                            return tender.reffered_to.id == User.id()
                        }
                    })
                })
            }
            else{
                setTenders((res.data))
            }

        })
        .catch(error=>{
            console.log(error)
        })
    },[])

    useEffect(()=>{
        setFilteredTender(()=>{
            return tenders.filter(tender=>{
                return tender.tender_name.toLowerCase().match(searchTerm.toLowerCase()) || tender.tender_location.toLowerCase().match(searchTerm.toLowerCase())
            })
        })

    },[searchTerm])

    useEffect(()=>{
        setFilteredTender(tenders)

    },[tenders])

    const deleteTender=(id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('/api/tender/'+id)
                .then(()=>{
                    setTenders(()=>{
                        return tenders.filter(tender=>{
                            return tender.id != id
                        })
                    })

                })
                .catch(()=>{
                    navigate('/tenders')
                })

                Swal.fire(
                'Deleted!',
                'Tender has been deleted.',
                'success'
                )
            }
        })
    }


  return (
    <>
        <div className="pagetitle">
            <h1>Tenders</h1>
            <nav>
                <ol className="breadcrumb mb-2">
                <li className="breadcrumb-item"><Link to='/dashboard'>Home</Link></li>
                <li className="breadcrumb-item active">Tenders</li>
                </ol>
            </nav>
        </div>
        <div className="row mb-2">
            <div className="col-md-5 mb-1">
                <input type="text" className='form-control' placeholder='Search' onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <div className="col-md-7 d-flex justify-content-end mb-1">
                <Link to='/tenders/create' className='btn btn-primary text-center'>Add Tender</Link>
            </div>
        </div>

        <div className="table-responsive">
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tender Name</th>
                    <th scope="col">Tender Type</th>
                    <th scope="col">Tender Price</th>
                    <th scope="col">Tender Location</th>
                    <th scope="col">Submission Date</th>
                    <th scope="col">Reffered To</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>

            <tbody>
                {filteredTender.map((tender,index)=>(
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{tender.tender_name}</td>
                        <td>{tender.tender_type}</td>
                        <td>{tender.tender_price}</td>
                        <td>{tender.tender_location}</td>
                        <td>{tender.submission_date}</td>
                        <td>{tender.reffered_to ? tender.reffered_to.name : 'Pending'}</td>
                        <td>
                            <Link to={`/tenders/${tender.id}`} className='btn btn-success btn-sm mx-1 mb-1'>View</Link>
                            <button onClick={deleteTender.bind(null,tender.id)} className="btn btn-danger btn-sm mb-1">Delete</button>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
        {tenders.length==0 && <div className='text-center'> <ClipLoader color="#4154f1" /></div>}
    </div>

    </>
  )
}

