import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const Header = (props) => {
    const [searchBar,setSearchBar]=useState(false)
    const navigate=useNavigate()

    const handleSearchBar=()=>{
        setSearchBar(!searchBar)
    }

    const handleSearch=(event)=>{
        event.preventDefault()
        navigate('/tenders')
    }

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">

    <div className="d-flex align-items-center justify-content-between">
      <Link to="/dashboard" className="logo d-flex align-items-center">
        <img src="/assets/img/logo.png" alt="" />
        <span className="d-none d-lg-block">TenderPro</span>
      </Link>
      <i className="bi bi-list toggle-sidebar-btn" onClick={props.toggleSidebar}></i>
    </div>

    <div className={`search-bar ${searchBar ? 'search-bar-show' : ''}`}>
      <form className="search-form d-flex align-items-center" onSubmit={handleSearch}>
        <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
        <button type="submit" title="Search"><i className="bi bi-search"></i></button>
      </form>
    </div>

    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">

        <li className="nav-item d-block d-lg-none">
          <a onClick={handleSearchBar} className="nav-link nav-icon">
            <i className="bi bi-search"></i>
          </a>
        </li>

        <li className="nav-item dropdown pe-3">

          <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
            <img src="/assets/img/user.png" alt="Profile" className="rounded-circle" />
            <span className="d-none d-md-block dropdown-toggle ps-2">{localStorage.getItem('user')}</span>
          </a>

          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
            <li className="dropdown-header">
              <h6>{localStorage.getItem('user')}</h6>
              <span className='user_type'>{localStorage.getItem('userType') && localStorage.getItem('userType').replace('_', ' ')}</span>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <Link className="dropdown-item d-flex align-items-center" to="/user/profile">
                <i className="bi bi-person"></i>
                <span>My Profile</span>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <Link className="dropdown-item d-flex align-items-center" to="/user/profile/edit">
                <i className="bi bi-gear"></i>
                <span>Account Settings</span>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link to="/logout" className="dropdown-item d-flex align-items-center">
                <i className="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </Link>
            </li>

          </ul>
        </li>

      </ul>
    </nav>

  </header>
  )
}


