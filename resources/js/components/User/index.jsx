import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

export const index = () => {

    const[users,setUsers]=useState([]);
    const[searchTerm,setSearchTerm]=useState('');
    const [filteredUser,setFilteredUser]=useState([])

    const navigate=useNavigate()

    useEffect(()=>{

        if(!User.loggedIn()){
            navigate('/')
        }

        axios.get('/api/user')
        .then((res)=>{
            setUsers((res.data))
        })
        .catch(error=>{
            console.log(error)
        })
    },[])

    useEffect(()=>{
        setFilteredUser(()=>{
            return users.filter(user=>{
                return user.name.toLowerCase().match(searchTerm.toLowerCase()) || user.email.match(searchTerm)
            })
        })

    },[searchTerm])

    useEffect(()=>{
        setFilteredUser(users)

    },[users])

    const deleteUser=(id)=>{
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
                axios.delete('/api/user/'+id)
                .then(()=>{
                    setUsers(()=>{
                        return users.filter(user=>{
                            return user.id != id
                        })
                    })

                })
                .catch(()=>{
                    navigate('/users')
                })

                Swal.fire(
                'Deleted!',
                'Category has been deleted.',
                'success'
                )
            }
        })
    }


  return (
    <>
        <div className="pagetitle">
            <h1>Users</h1>
            <nav>
                <ol className="breadcrumb mb-2">
                <li className="breadcrumb-item"><Link to='/dashboard'>Home</Link></li>
                <li className="breadcrumb-item active">Users</li>
                </ol>
            </nav>
        </div>
        <div className="row mb-2">
            <div className="col-md-5 mb-1">
                <input type="text" className='form-control' placeholder='Search' onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <div className="col-md-7 d-flex justify-content-end mb-1">
                <Link to='/users/create' className='btn btn-primary text-center'>Add User</Link>
            </div>
        </div>

        <div className="table-responsive">
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">User Type</th>
                    <th scope="col">Created</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>

            <tbody>
                {filteredUser.map((user,index)=>(
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className='user_type'>{user.user_type.user_type.replace('_', ' ')}</td>
                        <td>{new Date(user.created_at).toLocaleDateString()}</td>
                        <td>
                            <Link to={`/users/edit/${user.id}`} className='btn btn-primary btn-sm mx-1 mb-1'>Edit</Link>
                            <button onClick={deleteUser.bind(null,user.id)} className="btn btn-danger btn-sm mb-1">Delete</button>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
        {users.length==0 && <div className='text-center'> <ClipLoader color="#4154f1" /></div>}
    </div>

    </>
  )
}

