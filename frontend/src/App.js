import './App.css';
import React from 'react'
import Navbar from './components/Navbar';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/registerService'/>
        <Route path='/registerUSer'/>
        <Route path='/signIn'/>
      </Switch>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

export default App


