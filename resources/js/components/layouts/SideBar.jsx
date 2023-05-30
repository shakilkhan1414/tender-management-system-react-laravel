import React from 'react'
import { Link } from 'react-router-dom'

export const SideBar = () => {
  return (
        <aside id="sidebar" className="sidebar">

        <ul className="sidebar-nav" id="sidebar-nav">

        <li className="nav-item">
            <Link to="/dashboard" className="nav-link ">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
            </Link>
        </li>

        <li className="nav-item">
            <a className="nav-link collapsed" data-bs-target="#users-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-person"></i><span>Users</span><i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="users-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">

            <li>
                <Link to="/users/create">
                    <i className="bi bi-circle"></i><span>Add User</span>
                </Link>
            </li>
            <li>
                <Link to="/users">
                    <i className="bi bi-circle"></i><span>All Users</span>
                </Link>
            </li>
            </ul>
        </li>

        <li className="nav-item">
            <a className="nav-link collapsed" data-bs-target="#tenders-nav" data-bs-toggle="collapse" href="#">
            <i className="bi bi-menu-button-wide"></i><span>Tenders</span><i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="tenders-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li>
                <Link to="/tenders/create">
                <i className="bi bi-circle"></i><span>Add Tender</span>
                </Link>
            </li>
            <li>
                <Link to="/tenders">
                <i className="bi bi-circle"></i><span>All Tenders</span>
                </Link>
            </li>
            </ul>
        </li>

        <li className="nav-item">
            <Link className="nav-link collapsed" to="/user/profile">
                <i className="bi bi-person"></i>
                <span>Profile</span>
            </Link>
        </li>

        <li className="nav-item">
            <Link className="nav-link collapsed" to="/logout">
                <i className="bi bi-box-arrow-in-right"></i>
                <span>Logout</span>
            </Link>
        </li>

        </ul>

        </aside>
  )
}
