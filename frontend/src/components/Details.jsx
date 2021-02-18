import React, { useEffect, useState } from 'react'
import workAction from "../Redux/actions/workAction"

import { BsFillStarFill } from 'react-icons/bs'
import { connect } from 'react-redux'

const Details = (props) => {
    console.log(props)
    const id = props.match.params.id
    const [providers, setProviders] = useState({})
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState({})

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
                setRating(stars)  
            }
        }
        //setRating(Math.round(providers.arrayValoration.reduce((a, b) => (a + b)) / providers.arrayValoration.length))
    }, [providers])

    const btnContract = () => {
        props.addWork(providers._id, props.consumer._id)
    }
    const readComment = (e) => {
        const property = e.target.name
        const value = e.target.value
        setComment({
            ...comment,
            [property]: value,
        })
        console.log(comment)

    }

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
                        <div>
                            <h2>Sellos del Profesional</h2>
                            <div className="containerSeals">
                                <div className="seals sealsGarantia"></div>
                                <div className="seals sealsNoVerif"></div>
                            </div>
                        </div>
                    </div>
                    <div className="containerContract"><button className="contract" onClick={btnContract}>Contratar</button></div>
                </div>
                <div className="commentProffesional"><p>ACA IRÄ LA PRESENTACIÖN DEL TIPO</p></div>
            </div>
            <div className="areaWork">
            <div><input type="text" name="consumer" placeholder="Deje su comentario" onChange={readComment}/></div>

            </div>
        </>
    )

}
const mapStateToProps = state => {
    return {
        providers: state.professionR.providers,
        consumer: state.userR.loggedUser,
    }
}

const mapDispatchToProps = {
    addWork: workAction.addWork
}



export default connect(mapStateToProps, mapDispatchToProps)(Details)
