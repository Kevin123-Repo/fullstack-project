import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Homepage/home";
// import ECommerce from "./Pages/Ecommerce/Ecommerce";
// import HeaderBar from "./Pages/Homepage/HeaderBar";
// import FooterBar from "./Pages/Homepage/FooterBar";
import Login from "./Pages/Login/login";
import "./App.css"
// import Dashboard from "./Pages/Dashboard/dashboard";
// import RegisterForm from "./Pages/Login/registerForm"

function App() {
  return (
    <Router>
      {/* <HeaderBar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/ecommerce" element={<ECommerce />} /> */}
        <Route path="/Login" element={<Login />} />
        {/* <Route path="/Dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/Register" element={<RegisterForm/>}/> */}
      </Routes>
      {/* <FooterBar color="light" light expand="md" className="fixed-bottom" /> */}
    </Router>
  );
}

export default App;
