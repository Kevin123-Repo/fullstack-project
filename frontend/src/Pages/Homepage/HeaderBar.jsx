import {Link, useNavigate}  from "react-router-dom"
import React, { useEffect, useState } from "react";

function HeaderBar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
        const fetchSession = async () => {
          const response = await fetch('http://localhost:3030/auth/session',{
            method:'GET',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
              }
          })
          const data = await response.json()
          if (!response.ok) {
            console.error("Error fetching session:", data.status);
          } else if (data) {
            console.log('Session: ')
            console.log(data)
            setUser(data);
          }
        };
    
        fetchSession();
      }, []);
    
      const handleLogout = async () => {
        await fetch('http://localhost:3030/auth/logout',{
            method:'POST',
            credentials:'include'
        });
        setUser(null);
        navigate("/login");
      };

    return(
        <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            My Web App
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ecommerce">
                  E-Commerce
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              {user ? (
                //User returns true
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-danger nav-link" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (//User returns false
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )} */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
    )
}

export default HeaderBar