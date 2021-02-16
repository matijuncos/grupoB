import React from 'react'
import { Link } from 'react-router-dom'
import { BsTools } from 'react-icons/bs'

const Rubro = ({ profession }) => {
  const id = profession._id
  return (

    <Link className="profession" to={'/profesionales/' + id}  >
      <div className="professionLink" style={{ backgroundImage: `url(${profession.urlPic})` }}>
      </div>
      <small>{profession.type}</small>
    </Link>
  )
}

export default Rubro
