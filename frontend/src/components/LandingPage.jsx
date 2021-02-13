import React from 'react'
import plumber from '../assets/tools.png'
import Articles from './Articles'
import Rubro from './Rubro'

const rubros = [{ rubro: 'carpinteria' }, { rubro: 'carpinteria' }, { rubro: 'carpinteria' }, { rubro: 'carpinteria' }, { rubro: 'carpinteria' }, { rubro: 'carpinteria' }, { rubro: 'carpinteria' }, { rubro: 'carpinteria' }, { rubro: 'carpinteria' }, { rubro: 'carpinteria' }, { rubro: 'carpinteria' }, { rubro: 'carpinteria' }, { rubro: 'carpinteria' }, { rubro: 'carpinteria' }, { rubro: 'carpinteria' }]
const LandingPage = () => {
  return (
    <div className="landingPage">
      <h2>¿Cómo funciona "Te cambio el foco"?</h2>
      <h3>Sólo sigue estos pasos:</h3>
      <div className="container">
        <div></div>
        <div className="text">
          <div className="stepContainer">
            <div className="step stepOne"></div>
            <p className="stepContent"><strong>Paso 1: </strong>Descubrí tu problema y entrá en pánico</p>
          </div>
          <div className="stepContainer">
            <div className="step stepTwo"></div>
            <p className="stepContent"><strong>Paso 2: </strong>Reaccioná, pensá que prestador necesitas y contratalo por nuestro sitio</p>
          </div>
          <div className="stepContainer">
            <div className="step stepThree"></div>
            <p className="stepContent"><strong>Paso 3: </strong>Hacé de cuenta que no pasó nada</p>
          </div>
        </div>
        <div className="img">
          <img src={plumber} alt="" />
        </div>
      </div>
      <div className="howItWorks">
        <h2>Tenemos muchos prestadores de diversos rubros registrados</h2>
        <h3>Lo podés contratar al alcance de un click!</h3>
        <div className="rubros container">
          {rubros.map(rubro => <Rubro rubro={rubro} />)}
        </div>
      </div>
      <Articles />
    </div>
  )
}

export default LandingPage
