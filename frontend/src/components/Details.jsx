import React, { useEffect, useState } from 'react'

import { BsFillStarFill } from 'react-icons/bs'
import { connect } from 'react-redux'

const Details = (props) => {
    const id = props.match.params.id
    const [providers, setProviders] = useState({})
    const [rating, setRating] = useState(0)

    useEffect(() => {
        if (props.providers.length === 0) {
            props.history.push('/')
            return false
        } else {
            const professionals = props.providers.respuesta.filter(provider => {
                return id === provider._id
            })
            setProviders(professionals[0])
            if (providers._id) {
                const stars = Math.round(providers.arrayValoration.reduce((a, b) => (a + b)) / providers.arrayValoration.length)
                console.log(stars)
                setRating(stars)
                console.log(providers)
            }
        }
        //setRating(Math.round(providers.arrayValoration.reduce((a, b) => (a + b)) / providers.arrayValoration.length))
    }, [providers])






    if (!providers._id) {
        return <h1>Cargando</h1>
    }

    return (
        <>
            <div className="professionalInfo">
                <div className="bgPorfessional"></div>
                <div className="containerProffesional">
                    <div className="proffesionalImg">
                        <div className="fotoUser" style={{ backgroundImage: `url(${providers.idUserBase.urlPic})` }}></div>
                        <div>{[...Array(5)].map((m, i) => {
                            const ratingValue = i + 1
                            console.log(rating)
                            return (
                                <label>
                                    <input
                                        className="starInput"
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue)}
                                    />
                                    <BsFillStarFill className="star" color={(ratingValue <= rating) ? '#ffc107' : '#8C8C8C'} />
                                </label>
                            )
                        })}</div>
                    </div>
                    <div className="nameProffesional">
                        <h2>{providers.idUserBase.firstName} {providers.idUserBase.lastName}</h2>
                        <h3>{providers.idProfession.type}</h3>
                        {providers.idProfession.descriptions.map(description => {
                            return (
                                <p>{description}</p>

                            )
                        })}
                    </div>
                </div>
                <div className="commentProffesional"><p>ACA IRÄ LA PRESENTACIÖN DEL TIPO</p></div>
            </div>
            <div className="areaWork">

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
const mapStateToProps = state => {
    return {
        providers: state.professionR.providers
    }
}



export default connect(mapStateToProps)(Details)
