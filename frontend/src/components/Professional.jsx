import React from 'react'
import { Link } from 'react-router-dom'
<<<<<<< HEAD
import {connect} from 'react-redux'
import {BsFillStarFill} from 'react-icons/bs'
import {GiCheckMark} from 'react-icons/gi'
const Professional = ({ professionals }) => {
  const { idUserBase, idProfession } = professionals
  const stars = Math.round(professionals.arrayValoration.reduce((a, b) => (a + b)) / professionals.arrayValoration.length)
  console.log(professionals)
  console.log(professionals.idProfession.descriptions)
=======
import { BsFillStarFill } from 'react-icons/bs'
import { GiCheckMark } from 'react-icons/gi'
const Professional = ({ professionals }) => {
  const { idUserBase, idProfession } = professionals
  const stars = Math.round(professionals.arrayValoration.reduce((a, b) => (a + b)) / professionals.arrayValoration.length)
>>>>>>> f3eab31cae1edac5d02807cf3bb3eed07c7b725f
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
        <div>{[...Array(5)].map((m, i) => {
          const ratingValue = i + 1
          return (
            <label key={i}>
              <input
                className="starInput"
                type="radio"
                name="rating"
              />
              <BsFillStarFill className="star" color={(ratingValue <= stars) ? '#ffc107' : '#8C8C8C'} />
            </label>
          )
        })}</div>

        <div>
        <div className="detailsProf">
          <div className="info">
            <h3>{idProfession.type}</h3>
            <div>
<<<<<<< HEAD
            {professionals.idProfession.descriptions.map(description =>{
              return <p><GiCheckMark className="icono"/>{description}</p>
            })}
          </div>
=======
              {professionals.idProfession.descriptions.map(description => {
                return <p><GiCheckMark className="icono" />{description}</p>
              })}
            </div>
>>>>>>> f3eab31cae1edac5d02807cf3bb3eed07c7b725f
          </div>
        </div>
        <div>
          <button className="contract">Ver perfil</button>
        </div>
<<<<<<< HEAD
        </div>
=======
>>>>>>> f3eab31cae1edac5d02807cf3bb3eed07c7b725f
      </Link>
    </div>
  )
}

export default Professional
