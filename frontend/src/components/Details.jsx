
import React, { useEffect, useState } from 'react'
import { Alert } from 'rsuite'
import workActions from "../Redux/actions/workActions"
import { BsFillStarFill } from 'react-icons/bs'
import { connect } from 'react-redux'
import Comment from './Comment'
import professionActions from '../Redux/actions/professionActions'
import { Icon } from 'rsuite';
import { GiCheckMark } from 'react-icons/gi'
import { Link } from 'react-router-dom'

const Details = (props) => {

    const id = props.match.params.id
    const [providers, setProviders] = useState({})
    const [errores, setErrores] = useState("")
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState({})
    const [reload, setReload] = useState(false)
    var workExists = false

    useEffect(() => {
        if (props.loggedUser) {
            props.getProviders()
            props.getConsumerWorks(props.loggedUser.idUser)
        }
    }, [reload])

    useEffect(() => {
        if (props.providers.length === 0) {
            props.history.push('/')
            return false
        } else {
            const professionals = props.providers.respuesta.filter(provider => {
                return id === provider._id
            })
            setProviders(professionals[0])
            console.log(professionals[0])
            console.log(providers)
            if (providers._id) {
                const stars = Math.round(providers.arrayValoration.reduce((a, b) => (a + b)) / providers.arrayValoration.length)
                setRating(stars)
            }
        }
    }, [reload, providers])

    const btnContract = async () => {
        if (props.loggedUser) {
            alert(providers._id)
            alert(props.loggedUser.idUser)
            props.addWork({ "idUserConsumer": props.loggedUser.idUser, "idUserProvider": providers._id })
            await props.getConsumerWorks(props.loggedUser.idUser)
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
        Alert.success('Gracias por tu comentario!', 3500)
        setReload(!reload)
    }

    const rankProvider = (e) => {
        console.log(props.userWork[0])
        if (props.userWork[0].state === 3) {
            setRating(e.target.value)
            props.rate(e.target.value, id)
            props.getProviders()
            Alert.success('Calificaste a tu proveedor con ' + e.target.value + ' estrellas!', 4000)
            props.changeState(props.userWork[0]._id)
            props.deleteWorkbyId(props.userWork[0]._id)

        } else if (props.userWork && props.userWork[0].state !== 3) {
            Alert.error('No podés calificar a un profesional hasta que finalice su trabajo :)')
        } else if (!props.userWork[0]._id) {
            Alert.error('No podés calificar a un profesional que no has contratado!')
        } else {
            setErrores("No puedes valorar sin iniciar sesion.")
        }
    }

    const pressEnter = (e) => {
        if (e.key === 'Enter')
            sendComment()
    }
    console.log(props.providers.respuesta)

    return (
        <>
            <div className="container">
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
                                            onClick={rankProvider}
                                        />
                                        <BsFillStarFill className="star" color={(ratingValue <= rating) ? '#ffc107' : '#8C8C8C'} />
                                    </label>
                                )
                            })}</div>
                        </div>

                        <div>
                            <h5>Sellos del Profesional</h5>
                            <div className="containerSeals">
                                <div className="seals sealsGarantia"></div>
                                <div className="seals sealsNoVerif"></div>
                            </div>
                        </div>
                        <div className="nameProffesional">
                            <h2>{providers && providers.idUserBase.firstName} {providers && providers.idUserBase.lastName}</h2>
                            <h4>{providers && providers.idProfession.type}</h4>
                            {providers && providers.idProfession.descriptions.map(description => {
                                return (
                                    <p key={description._id}><GiCheckMark className="icono" />{description}</p>

                                )
                            })}
                        </div>
                        {/* ESTO TIENE QUE SER CONDICIONAL */}
                        {(props.loggedUser && (props.loggedUser.rol === 'consumer')) && props.userWork.lenght !== 0 && props.userWork.map(work => {
                            if (work.idUserConsumer._id === props.loggedUser.idUser) {
                                console.log('lo que quieras')
                                workExists = true
                            }
                        })

                            && (!workExists && (
                                <div className="containerContract">
                                    <button className="contract" onClick={btnContract}>Contratar</button>
                                </div>
                            ))
                        }

                    </div>
                </div>
                <div className="areaWork">
                    <div className="comments">
                        <h4>Lee que opinan otros clientes</h4>
                        {
                            props.providers.respuesta && props.providers.respuesta.filter(Ourworks => id === Ourworks._id).map(work => {
                                return (
                                    work.review.map(comment => {
                                        return (
                                            <Comment comment={comment} id={id} reload={reload} setReload={setReload} />
                                        )
                                    })
                                )
                            })
                        }
                        {(props.loggedUser && props.loggedUser.rol === 'consumer') && props.userWork.length !== 0 && props.userWork.map(work => {
                            if (work.idUserConsumer._id === props.loggedUser.idUser && work.state === 3) {
                                return (
                                    <div className="commentDiv">
                                        <input onKeyDown={pressEnter} type="text" name="commentConsumer" placeholder="Deje su comentario" onChange={readInput} />
                                        <Icon icon='send-o' className="sendCommentBtn" onClick={sendComment} />
                                    </div>

                                )
                            }
                        })
                        }
                    </div>
                </div>
            </div>
            <div className="back">
                <Link to="/"><button className="contract">Volver</button></Link>
            </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
        providers: state.professionR.providers,
        loggedUser: state.userR.loggedUser,
        userWork: state.workR.userWork,

    }
}
const mapDispatchToProps = {
    addWork: workActions.addWork,
    sendMail: workActions.sendMail,
    sendComment: workActions.sendComment,
    rate: workActions.rankProvider,
    getProviders: professionActions.getProviders,
    changeState: workActions.changeState,
    deleteWorkbyId: workActions.deleteWorkbyId,
    getConsumerWorks: workActions.getConsumerWorks
}
export default connect(mapStateToProps, mapDispatchToProps)(Details)