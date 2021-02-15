import React from 'react'

const Slide = ({ slide }) => {
  console.log(slide)
  return (
    <div style={{ backgroundImage: `url(${slide.src})` }} className="slideImg">
      <h2>¿Qué servicio para tu casa necesitas hoy?</h2>
    </div>
  )
}

export default Slide
