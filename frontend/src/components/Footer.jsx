import React from 'react'
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footerCol">
        <p>Servicios</p>
        <p>Servicios</p>
        <p>Servicios</p>
        <p>Servicios</p>
      </div>
      <div className="footerCol">
        <p>Servicios</p>
        <p>Servicios</p>
        <p>Servicios</p>
        <p>Servicios</p>      </div>
      <div className="footerCol">
        <p>Servicios</p>
        <p>Servicios</p>
        <p>Servicios</p>
        <p>Servicios</p>
      </div>
      <div className="footerCol footerIcons">
        <FaInstagram className="footerIcon" />
        <FaFacebook className="footerIcon" />
        <FaTwitter className="footerIcon" />
      </div>
    </div>
  )
}

export default Footer
