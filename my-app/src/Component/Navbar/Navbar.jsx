import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


function getUser() {
  let user = localStorage.getItem("access_token");
  if (user) {
    user = JSON.parse(user);
    
  }else{
    user = null
  }
  return user;
}

export const Navbar = () => {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();



  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-secondary">
      <div className="container">
      <Link className='underline text-black fs-5 fw-bold' to={'/'}>Employee</Link>
        <Link className="navbar-toggler"type="button"><span className="navbar-toggler-icon"></span></Link>
      <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
      {user ? (
        <div className="d-flex align-items-center gap-3">
          <span className="fw-bold">Welcome, {user.username}</span>
          <Link className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      ):(
        <div className="d-flex gap-2">
        <Link to="/register" className="btn btn-primary">Register</Link>
        <Link to="/login" className="btn btn-success">Login</Link>
      </div>

      )}
    </div>
     </div>
    </nav>

  );
};
