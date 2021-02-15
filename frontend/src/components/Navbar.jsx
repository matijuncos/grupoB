import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import Logo from '../assets/logo.png'
import userPic from '../assets/user.svg'
import userActions from '../Redux/actions/userActions'

const Navbar = ({ loggedUser, signOut }) => {

  const logOut = () => {
    signOut()
    localStorage.clear()
  }
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
          {!loggedUser ? (
            <>
              <NavLink to="/registerUSer" className="navBarLinks">
                Registrate
            </NavLink>
              <NavLink to="/signIn" className="navBarLinks">
                Iniciar sesión
            </NavLink>
            <div className="userPic" style={{ backgroundImage: `url(${userPic})` }}></div>
            </>
          ) : (
            <>
              <Link to='/' className="navBarLinks" onClick={logOut} >Sign Out</Link>
              <div className="userPic" style={{ backgroundImage: `url(${loggedUser.urlPic})` }}></div>
            </>
            )}
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = state => {
  return {
    loggedUser: state.userR.loggedUser
  }
}

const mapDispatchToProps = {
  signOut: userActions.signOut
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
