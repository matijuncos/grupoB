import './App.css';
import React from 'react'
import Navbar from './components/Navbar';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import RegistroUsuario from './components/RegistroUsuario'
import RegistroProvedor from './components/RegistroProvedor'



const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/registerService' component={RegistroProvedor}/>
        <Route path='/registerUSer' component={RegistroUsuario}/>
        <Route path='/signIn'/>
      </Switch>
      </BrowserRouter>
      <Footer/>
    </>

 
  )
}

export default App


