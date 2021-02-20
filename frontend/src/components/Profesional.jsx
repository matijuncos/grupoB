import {BsFillStarFill} from 'react-icons/bs'
import React, {useState} from 'react'

const Profesional = (props)=>{
    console.log(props)
    const[rating, setRating] = useState(null)

    return(
        <>
        <div className="professionalInfo">
            <div className="bgPorfessional"></div>
            <div className="containerProffesional">
                <div className="proffesionalImg">
                    <div className="fotoUser" style={{backgroundImage:`url('data:image/jpeg;base64,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')`}}></div>
                    <div>{[...Array(5)].map((m,i)=>{
                        const ratingValue = i +1
                        console.log(rating)
                            return (
                                <label>
                                    <input 
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={()=>setRating (ratingValue)}
                                        />  
                                    <BsFillStarFill className="star" color={(ratingValue <= rating) ? '#ffc107' : '#8C8C8C'}/>
                                </label>
                            )
                        })}</div>
                </div>
                <div className="nameProffesional">
                    <h2>Cristhian Osmar Ipince Acosta</h2>
                    <p>Construcción y Arquitectura, Pintor, Otros Oficios, Plomero, Albañil</p>
                </div>
            </div>
            <div className="commentProffesional"><p>Hola mi nombre es cristhian : nuestra mision es hacer de su oficina;su casa;su trabajo un lugar lo mas confortable para su bienestar y su comodidad y su confianza hacia nosotros.*muchas gracias*</p></div>
        </div>
        <div className="areaWork">
            <div>
                <h2>No realiza</h2>
                <ul>
                    <li>Trabaja con Administracion</li>
                    <li>Presupuesto sin cargo</li>
                    <li>Acepta pago con tarjeta</li>
                    <li>Servicio de emergencia</li>
                </ul>
            </div>
            <div>
                <h2>Area de trabajo</h2>
                <ul>
                    <li>Zona Sur Gran Buenos Aires</li>
                    <li>Zona Norte Gran Buenos Aires</li>
                    <li>Ciudad de Buenos Aires</li>
                </ul>
            </div>
            <div>
                <h2>Sellos del Profesional</h2>
                <div className="containerSeals">
                    <div className="seals sealsGarantia"></div>
                    <div className="seals sealsNoVerif"></div>
                </div>
            </div>

        </div>
        </>
    )
    
}
export default Profesional