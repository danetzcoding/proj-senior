import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();

  const handleClick = (menuName, path) => {
    setMenu(menuName);
    navigate(path);
  };

  return (
    <div className='navbar'>
      {/* Left Section: Logo */}
      <div className='navbar-left'>
        <img src={assets.logo} alt="Logo" className="logo" />
      </div>

      {/* Center Section: Menu */}
      <ul className="navbar-menu">
        <li
          onClick={() => handleClick("menu", "/")}
          className={menu === "menu" ? "active" : ""}
        >
          TUTORIALS
        </li>
        <li
          onClick={() => handleClick("merch", "/question")}
          className={menu === "merch" ? "active" : ""}
        >
          SUBMIT A QUESTION
        </li>
        <li
          onClick={() => handleClick("contact-us", "/calendar")}
          className={menu === "contact-us" ? "active" : ""}
        >
          VIEW CALENDAR/SCHEDULE
        </li>
      </ul>

      {/* Right Section: Empty, used only to balance grid */}
      <div></div>
    </div>
  );
};

export default Navbar;