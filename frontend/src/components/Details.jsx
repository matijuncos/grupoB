
import React, { useEffect, useState } from 'react'
import workActions from "../Redux/actions/workActions"
import { BsFillStarFill } from 'react-icons/bs'
import { connect } from 'react-redux'
import Comment from './Comment'
const Details = (props) => {
    console.log(props)
    const id = props.match.params.id
    const [providers, setProviders] = useState({})
    const [errores, setErrores] = useState("")
    const [visible, setVisible] = useState(true)
    const [state, setState] = useState(0)

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
            if (props.state && props.works.state === 3) {
                setState(3)
            }
        }
        if (props.works && props.works.length !== 0) {
            const workId = props.works.filter(work => (work.idUserConsumer._id === props.loggedUser.idUser))
            console.log(workId)
        }
        console.log(props.providers.respuesta)
        //setRating(Math.round(providers.arrayValoration.reduce((a, b) => (a + b)) / providers.arrayValoration.length))
    }, [providers, props.works])


    const btnContract = async () => {

        if (props.loggedUser) {
            alert('entre')
            props.addWork({ "idUserConsumer": props.loggedUser.idUser, "idUserProvider": providers._id })
            console.log(props.loggedUser.idUser)
            console.log(providers._id)
            await props.getConsumerWorks(id)
            setVisible(!visible)
            await props.sendMail()
        }
        else {
            setErrores("No puede contratar a un profesional sin iniciar sesion.")
        }
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
                    {visible &&
                        <div className="containerContract">
                            <button className="contract" onClick={btnContract}>Contratar</button>
                        </div>
                    }
                </div>
                <div className="commentProffesional"><p>ACA IRÄ LA PRESENTACIÖN DEL TIPO</p></div>
            </div>
            <div className="areaWork">
                <div className="comments">
                    <h2>Comentarios de clientes previos: </h2>
                    {props.works && props.works.map(work => {
                        return <div className="comment" key={work._id}>
                            {work.idUserProvider.review.map(comment => {
                                return (
                                    <Comment comment={comment} key={comment._id} />
                                )
                            })}
                        </div>
                    })}

                </div>
                {state === 3 &&
                    <div>
                        <input type="text" name="commentConsumer" placeholder="Deje su comentario" />
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
    sendMail: workActions.sendMail

}
export default connect(mapStateToProps, mapDispatchToProps)(Details)