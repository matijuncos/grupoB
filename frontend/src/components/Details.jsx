
import React, { useEffect, useState } from 'react'
import workActions from "../Redux/actions/workActions"
import { BsFillStarFill } from 'react-icons/bs'
import { connect } from 'react-redux'
const Details = (props) => {
    console.log(props)
    const id = props.match.params.id
    console.log(props.consumer)
    const [providers, setProviders] = useState({})
    const [errores, setErrores] = useState("")
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
                setRating(stars)
            }
        }
        //setRating(Math.round(providers.arrayValoration.reduce((a, b) => (a + b)) / providers.arrayValoration.length))
    }, [providers])
    const btnContract = () => {
        props.consumer && console.log(props.consumer)
        if(props.consumer!==null){ 
        props.addWork({"idUserConsumer":props.consumer.idUser, "idUserProvider":providers._id})
        props.getWorks()
    }
        else{
        setErrores("No puede contratar a un profesional sin iniciar sesion.")}
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
                                        onClick={() => {props.consumer!==null ? setRating(ratingValue) :setErrores("No puedes valorar sin iniciar sesion.")}}
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
                    {/* ESTO TIENE QUE SER CONDICIONAL */}
                    <div className="containerContract"><button className="contract" onClick={btnContract}>Contratar</button></div>
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
                <div><input type="text" name="commentConsumer" placeholder="Deje su comentario" /></div>
            </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
        providers: state.professionR.providers,
        consumer: state.userR.loggedUser
    }
}
const mapDispatchToProps = {
    addWork: workActions.addWork,
    getWorks: workActions.getWorks
}
export default connect(mapStateToProps, mapDispatchToProps)(Details)