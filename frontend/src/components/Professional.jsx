import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {BsFillStarFill} from 'react-icons/bs'
import {GiCheckMark} from 'react-icons/gi'
const Professional = ({ professionals }) => {
  const { idUserBase, idProfession } = professionals
  const stars = Math.round(professionals.arrayValoration.reduce((a, b) => (a + b)) / professionals.arrayValoration.length)
  console.log(professionals)
  console.log(professionals.idProfession.descriptions)
  return (
    <div>
      <Link to={'/details/' + professionals._id} className="profesional">
        <div className="user">
          <div className="fotoUser" style={{ backgroundImage: `url(.${idUserBase.urlPic})` }}></div>
          <div><h2>{idUserBase.firstName} {idUserBase.lastName}</h2></div>
          <div className="starIcons">{[...Array(stars)].map((m, i) => {
                  return (
                    <div key={i}>
                      <BsFillStarFill className="star"/>
                    </div>                      
              )
          })}</div>
        </div>
        <div>
        <div className="detailsProf">
          <div className="info">
            <h3>{idProfession.type}</h3>
            <div>
            {professionals.idProfession.descriptions.map(description =>{
              return <p><GiCheckMark className="icono"/>{description}</p>
            })}
          </div>
          </div>
        </div>
        <div>
          <button className="contract">Ver perfil</button>
        </div>
        </div>
      </Link>
    </div>
  )
}

export default Professional
