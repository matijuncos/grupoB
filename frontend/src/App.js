import './App.css';
import { connect } from 'react-redux';
import React from 'react'
import Navbar from './components/Navbar';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import RegistroUsuario from './components/RegistroUsuario'
import RegistroProvedor from './components/RegistroProvedor'
import Profesional from './components/Profesional'
import signIn from './components/SignIn'
import userActions from './Redux/actions/userActions';

const App = (props) => {
if(props.loggedUser){
  var links =
  <>
    <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route patch='/profesional' component = {Profesional}/>
      <Redirect to ="/"/>
    </Switch>
  </>
}else if(localStorage.getItem('token')){
props.preserveLog(localStorage.getItem('token'))
}else{
  var links =
  <>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/registerService' component={RegistroProvedor}/>
        <Route path='/registerUSer' component={RegistroUsuario}/>
        <Route path='/signIn'component={signIn}/>
        <Route patch='/profesional' component = {Profesional}/>
        <Redirect to ="/"/>
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

