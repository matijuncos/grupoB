import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/logo.png'
import userPic from '../assets/user.svg'

const Navbar = () => {
  return (
    <nav>
      <div className="navBar">
        <div className="logoDiv">
          <img src={Logo} alt="" />
        </div>
        <div className="links">
          <NavLink to="/registerService" className="navBarLinks">
            <button className="registerBtn">Registrate como Prestador</button>
          </NavLink>
          <NavLink exact to="/" className="navBarLinks">
            Inicio
        </NavLink>
          <NavLink to="/registerUSer" className="navBarLinks">
            Registrate
        </NavLink>
          <NavLink to="/signIn" className="navBarLinks">
            Iniciar sesión
        </NavLink>
          <div className="userPic" style={{ backgroundImage: `url(${userPic})` }}>

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
