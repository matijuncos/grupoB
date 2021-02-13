import React from 'react'
import { BsTools } from "react-icons/bs";
import { Link } from 'react-router-dom'

const Rubro = ({ rubro }) => {
  return (

    <Link className="rubro" to='/'>
      < BsTools className="toolIcon" />
      <small>{rubro.rubro}</small>
    </Link>
  )
}

export default Rubro
