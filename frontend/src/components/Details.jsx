
import React, { useEffect, useState } from 'react'
import workActions from "../Redux/actions/workActions"
import { BsFillStarFill } from 'react-icons/bs'
import { connect } from 'react-redux'
import Comment from './Comment'
import userActions from '../Redux/actions/userActions'
const Details = (props) => {
    const id = props.match.params.id
    const [providers, setProviders] = useState({})
    const [errores, setErrores] = useState("")
    const [visible, setVisible] = useState(true)
    const [state, setState] = useState(0)
    const [rating, setRating] = useState(0)
    const [workArray, setWorkArray] = useState([])
    const [comment, setComment] = useState({})


    useEffect(() => {
        if (props.loggedUser) {
            getWorks()
            const contractedId = props.works && props.works.filter(work => id === work.idUserProvider._id)
            setWorkArray(contractedId)
        }
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
            if (props.state && props.works.state === 3) {
                setState(3)
            }
        }
        if (props.works && props.works.length !== 0) {
            const workId = props.works.filter(work => {
                return (
                    work.idUserConsumer._id === props.loggedUser.idUser
                )
            })
        }

    }, [providers])

    const getWorks = async () => {
        const res = await props.getWorks()
    }

    const btnContract = async () => {
        if (props.loggedUser) {
            alert('entre')
            props.addWork({ "idUserConsumer": props.loggedUser.idUser, "idUserProvider": providers._id })
            await props.getConsumerWorks(id)
            setVisible(!visible)
        }
        else {
            setErrores("No puede contratar a un profesional sin iniciar sesion.")
        }
    }

    if (!providers._id) {
        return <h1>Cargando</h1>
    }

    const readInput = (e) => {
        setComment({ comment: e.target.value, idUser: props.loggedUser.idUser, idProvider: id })
    }
    const sendComment = async () => {
        await props.sendComment(comment)
    }

    return (
        <>
            <div className="professionalInfo">
                <div className="bgPorfessional"></div>
                <div className="containerProffesional">
                    <div className="proffesionalImg">
                        <div className="fotoUser" style={{ backgroundImage: `url(.${providers.idUserBase.urlPic})` }}></div>
                        <div>{[...Array(5)].map((m, i) => {
                            const ratingValue = i + 1
                            return (
                                <label key={i}>
                                    <input
                                        className="starInput"
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => { props.consumer !== null ? setRating(ratingValue) : setErrores("No puedes valorar sin iniciar sesion.") }}
                                    />
                                    <BsFillStarFill className="star" color={(ratingValue <= rating) ? '#ffc107' : '#8C8C8C'} />
                                </label>
                            )
                        })}</div>
                    </div>

                    <div>
                        <h2>Sellos del Profesional</h2>
                        <div className="containerSeals">
                            <div className="seals sealsGarantia"></div>
                            <div className="seals sealsNoVerif"></div>
                        </div>
                    </div>
                    <div className="nameProffesional">
                        <h2>{providers.idUserBase.firstName} {providers.idUserBase.lastName}</h2>
                        <h3>{providers.idProfession.type}</h3>
                        {providers.idProfession.descriptions.map(description => {
                            return (
                                <p key={description._id}>{description}</p>

                            )
                        })}
                    </div>
                    {/* ESTO TIENE QUE SER CONDICIONAL */}
                    {(props.loggedUser && props.loggedUser.rol === 'consumer') && (workArray.length < 1) &&
                        <div className="containerContract">
                            <button className="contract" onClick={btnContract}>Contratar</button>
                        </div>
                    }
                </div>
                <div className="commentProffesional"><p>ACA IRÄ LA PRESENTACIÖN DEL TIPO</p></div>
            </div>
            <div className="areaWork">
                <div className="comments">
                    <h4>Comentarios de clientes previos: </h4>
                    {workArray.map(work => {
                        if (work.idUserProvider._id === id) {
                            return (
                                work.idUserProvider.review.map(comment => {
                                    return (
                                        <Comment comment={comment} />
                                    )
                                })
                            )

                        }
                    })}
                </div>
                {(props.loggedUser && props.loggedUser.rol === 'consumer') && (workArray.length > 0) &&
                    <div>
                        <input type="text" name="commentConsumer" placeholder="Deje su comentario" onChange={readInput} />
                        <button onClick={sendComment}>Enviar</button>
                    </div>
                }
            </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
        providers: state.professionR.providers,
        loggedUser: state.userR.loggedUser,
        works: state.workR.works,
        workId: state.workR.workId,

    }
}
const mapDispatchToProps = {
    addWork: workActions.addWork,
    getConsumerWorks: workActions.getConsumerWorks,
    sendMail: workActions.sendMail,
    getWorks: workActions.getWorks,
    sendComment: userActions.sendComment
}
export default connect(mapStateToProps, mapDispatchToProps)(Details)