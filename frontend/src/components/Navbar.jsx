import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import Logo from '../assets/logo3.png'
import userPic from '../assets/user.svg'
import userActions from '../Redux/actions/userActions'
import workActions from '../Redux/actions/workActions'
import MenuUser from './MenuUser'

const Navbar = ({ loggedUser, signOut, getWorks }) => {
  loggedUser && console.log(loggedUser)
  const logOut = () => {
    signOut()
    localStorage.clear()
  }

  return (
    <nav>
      <div className="navBar">
        <div className="logoName">
          <div className="logoDiv" >
            <img src={Logo} alt="" />
          </div>
          {loggedUser && (
            <h3 className="navUserName">Hola, {loggedUser.firstName}!</h3>
          )}

        </div>
        <div className="links">
          {!loggedUser && (
            <NavLink to="/registerService" className="navBarLinks">
              <button className="registerBtn">Registrate como Prestador</button>
            </NavLink>
          )}
          <NavLink exact to="/" className="navBarLinks">
            Inicio
        </NavLink>
          {!loggedUser ? (
            <>
              <NavLink to="/registerUser" className="navBarLinks">
                Registrate
            </NavLink>
              <NavLink to="/signIn" className="navBarLinks">
                Iniciar sesión
            </NavLink>
              <div className="userPic" style={{ backgroundImage: `url(${loggedUser ? loggedUser.urlPic : userPic})` }}></div>

            </>
          ) : (
              <>
                <Link to='/' className="navBarLinks" onClick={logOut} >Sign Out</Link>
                <div className="userPic" style={{ backgroundImage: `url(${loggedUser ? loggedUser.urlPic : userPic})` }}></div>
                {/* TESTEANDO CESAR */}
                <MenuUser />
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
  signOut: userActions.signOut,
  // getWorks: workActions.getWorks
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)


























































