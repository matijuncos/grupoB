import './App.css'
import { connect } from 'react-redux'
import React from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Footer from './components/Footer'
import RegistroUsuario from './components/RegistroUsuario'
import RegistroProvedor from './components/RegistroProvedor'
import Profesionales from './components/Profesionales'
import signIn from './components/SignIn'
<<<<<<< HEAD
import userActions from './Redux/actions/userActions';
import Profesional from './components/Profesional';
=======
import userActions from './Redux/actions/userActions'
>>>>>>> c7ae6136281a536d916fa02aa133f1038c86a9b4

const App = (props) => {
if(props.loggedUser){
  var links =
  <>
    <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Redirect to ="/"/>
    </Switch>
  </>
}else if(localStorage.getItem('token')){
props.preserveLog(localStorage.getItem('token'))
}else{
   links =
  <>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/registerService' component={RegistroProvedor}/>
        <Route path='/registerUser' component={RegistroUsuario}/>
        <Route path='/signIn'component={signIn}/>
        <Route path='/profesionales' component = {Profesionales}/>
        <Route path='/profesional' component = {Profesional} />
      </Switch>
  </>
}
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        {links}
      </BrowserRouter>
      <Footer/>
    </>
  )
}
const mapStateToProps = state => {
  return {
    loggedUser: state.userR.loggedUser
  }
}
const mapDispatchToProps = {
  preserveLog: userActions.preserveLog
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

