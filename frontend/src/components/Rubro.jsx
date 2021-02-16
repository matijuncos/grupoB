import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import professionActions from '../Redux/actions/professionActions'

const Rubro = ({ profession }) => {
  return (
    <Link className="profession" to={'/profesionales/' + profession._id}  >
      <div className="professionLink" style={{ backgroundImage: `url(${profession.urlPic})` }}>
      </div>
      <small>{profession.type}</small>
    </Link>
  )
}



export default Rubro
