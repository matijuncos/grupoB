import React from 'react'
import { Link } from 'react-router-dom'
import {BsTools} from 'react-icons/bs'

const Rubro = ({ rubro }) => {
  return (

    <Link className="rubro" to='/profesional'>
      < BsTools className="toolIcon" />
      <small>{rubro.rubro}</small>
    </Link>
  )
}

export default Rubro
