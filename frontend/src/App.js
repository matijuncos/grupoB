import './App.css';
import React from 'react'
import Navbar from './components/Navbar';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import RegistroUsuario from './components/RegistroUsuario'
import RegistroProvedor from './components/RegistroProvedor'
import { connect } from 'react-redux';
import userActions from './Redux/actions/userActions';

const App = (props) => {
if(props.loggedUser){
  var links =
  <>
    <Switch>
      <Route exact path='/' component={LandingPage}/>
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
        <Route path='/registerUSer' component={RegistroUsuario}/>
        <Route path='/signIn'/>
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

