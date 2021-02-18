import React, { useEffect, useState } from 'react'
import plumber from '../assets/tools.png'
import Articles from './Articles'
import Rubro from './Rubro'
import { Link } from 'react-router-dom'
import Slider from './Slider'
import { connect } from 'react-redux'
import professionActions from '../Redux/actions/professionActions'

const LandingPage = (props) => {

  useEffect(() => {
    props.getProfessions()
    props.getProviders()
  }, [])

  return (
    <div className="landingPage">
      <Slider />
      <h2>¿Cómo funciona Instant Solution?</h2>
      <h3>Sólo sigue estos pasos:</h3>
      <div className="container">
        <div></div>
        <div className="text">
          <div className="stepContainer">
            <Link className="step stepOne" to='registerUSer'></Link>
            <p className="stepContent"><strong>Paso 1: </strong>Descubrí tu problema y entrá en pánico</p>
          </div>
          <div className="stepContainer">
            <Link className="step stepTwo" to='registerUSer'></Link>
            <p className="stepContent"><strong>Paso 2: </strong>Reaccioná, pensá que prestador necesitas y contratalo por nuestro sitio</p>
          </div>
          <div className="stepContainer">
            <Link className="step stepThree" to='registerUSer'></Link>
            <p className="stepContent"><strong>Paso 3: </strong>Hacé de cuenta que no pasó nada</p>
          </div>
        </div>
        <Link className="img" to='registerUSer'>
          <div style={{ backgroundImage: `url(${plumber})` }} className="callToAction">
            <button>Empieza aquí!</button>
          </div>
        </Link>
      </div>
      <div className="howItWorks">
        <h2>Tenemos muchos prestadores de diversos rubros registrados</h2>
        <h3>Lo podés contratar al alcance de un click!</h3>
        <div className="rubros">
          {props.professions.response && props.professions.response.map(profession => <Rubro profession={profession} key={profession._id} />)}
        </div>
      </div>
      <Articles />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    professions: state.professionR.professions,
    providers: state.professionR.providers
  }
}
const mapDispatchToProps = {
  getProfessions: professionActions.getProfessions,
  getProviders: professionActions.getProviders

}
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
