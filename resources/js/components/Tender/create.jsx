import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useRef,useState,useEffect } from 'react'

export const create = () => {
    const tenderName=useRef('')
    const tenderType=useRef('')
    const tenderPrice=useRef('')
    const tenderLocation=useRef('')
    const tenderDescription=useRef('')
    const [tenderFile,setTenderFile]=useState()

    const [tenderNameError,setTenderNameError]=useState('')
    const [tenderTypeError,setTenderType]=useState('')
    const [tenderPriceError,setTenderPrice]=useState('')
    const [tenderLocationError,setTenderLocation]=useState('')
    const [tenderDescriptionError,setTenderDescription]=useState('')
    const [tenderFileError,setTenderFileError]=useState('')

    const navigate=useNavigate()
    let id=User.id()

    useEffect(()=>{
        if(!User.loggedIn()){
            navigate('/')
        }
    },[])

    const fileChangeHandler=(event)=>{
        setTenderFile(event.target.files[0]);

    }
    useEffect(()=>{
        console.log(tenderFile)
    },[tenderFile])

    const createTenderHandler=(e)=>{
        e.preventDefault()

        const formData = new FormData();
        formData.append('submitted_by',id)
        formData.append('tender_name',tenderName.current.value)
        formData.append('tender_type',tenderType.current.value)
        formData.append('tender_price',tenderPrice.current.value)
        formData.append('tender_location',tenderLocation.current.value)
        formData.append('tender_description',tenderDescription.current.value)
        if(tenderFile){
            formData.append('tender_document',tenderFile)
        }



        axios.post('/api/tender',formData)
        .then(() => {
            Notification.success()
            navigate('/tenders')
        })
        .catch(error=> {
                if(error.response.status === 422){
                    setTenderNameError(()=>{
                        return error.response.data.errors.tender_name ? error.response.data.errors.tender_name[0] : ''
                    })
                    setTenderType(()=>{
                        return error.response.data.errors.tender_type ? error.response.data.errors.tender_type[0] : ''
                    })
                    setTenderPrice(()=>{
                        return error.response.data.errors.tender_price ? error.response.data.errors.tender_price[0] : ''
                    })
                    setTenderLocation(()=>{
                        return error.response.data.errors.tender_location ? error.response.data.errors.tender_location[0] : ''
                    })
                    setTenderDescription(()=>{
                        return error.response.data.errors.tender_description ? error.response.data.errors.tender_description[0] : ''
                    })
                    setTenderFileError(()=>{
                        return error.response.data.errors.tender_document ? error.response.data.errors.tender_document[0] : ''
                    })

                }
            }
        )
    }

  return (
    <>
    <div className="pagetitle">
        <h1>Add Tender</h1>
        <nav>
            <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to='/dashboard'>Home</Link></li>
            <li className="breadcrumb-item active">Add Tender</li>
            </ol>
        </nav>
    </div>
        <div className='col-md-12'>
            <form onSubmit={createTenderHandler} encType='multipart/form-data'>
                <div className="row mb-2">
                    <div className="col-md-6">
                        <label className="form-label">Tender Name</label>
                        <input type="text" className="form-control" ref={tenderName}/>
                        {tenderNameError && <small className='text-danger'>{tenderNameError}</small>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Tender Type</label>
                        <input type="text" className="form-control" ref={tenderType}/>
                        {tenderTypeError && <small className='text-danger'>{tenderTypeError}</small>}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-6">
                        <label className="form-label">Tender Price</label>
                        <input type="text" className="form-control" ref={tenderPrice}/>
                        {tenderPriceError && <small className='text-danger'>{tenderPriceError}</small>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Tender Location</label>
                        <input type="text" className="form-control" ref={tenderLocation}/>
                        {tenderLocationError && <small className='text-danger'>{tenderLocationError}</small>}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-12">
                        <label className="form-label">Tender Description</label>
                        <textarea rows="4" className="form-control" ref={tenderDescription}/>
                        {tenderDescriptionError && <small className='text-danger'>{tenderDescriptionError}</small>}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-12">
                        <label className="form-label">Tender Document</label>
                        <input type='file' rows="4" onChange={fileChangeHandler} className="form-control" id='formFile'/>
                        {tenderFileError && <small className='text-danger'>{tenderFileError}</small>}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4 mt-3">Add Tender</button>

            </form>
        </div>
    </>
  )
}
