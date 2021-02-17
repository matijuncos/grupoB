import React from 'react'
import { Link } from 'react-router-dom'
const Professional = ({ professionals }) => {
  const { idUserBase, idProfession } = professionals

  return (
    <div>
      <Link to={'/details/' + professionals._id} className="profesional">
        <div className="user">
          <div className="fotoUser" style={{ backgroundImage: `url(${idUserBase.urlPic})` }}></div>
          <h2>{idUserBase.firstName} {idUserBase.lastName}</h2>
        </div>
        <div>
          <h2>Datos:</h2>
          <div className="info">
            <h3>{idUserBase.email}</h3>
            <h3>{idUserBase.phone}</h3>
            <h3>{idProfession.type}</h3>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Professional
