import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import userActions from '../Redux/actions/userActions'

const SignIn = (props) => {

    const { history, signIn, loggedUser } = props
    const [user, setUser] = useState({})
    useEffect(() => {
        if (loggedUser !== null)
            setTimeout(() => {
                history.push('/')
            }, 3000)
    }, [loggedUser])

    const readInput = e => {
        const value = e.target.value
        const property = e.target.name
        setUser({
            ...user,
            [property]: value
        })
    }
    const enterKeyboard = e => {
        //El numero 13 seria la tecla enter, si fue presionada envio la validacion
        //como si fuera el boton sign in
        if (e.charCode === 13) {
            Validate(e)
        }
    }
    const Validate = async e => {
        e.preventDefault()
        if (!user.email || !user.password) {
            alert('todos los campos son requeridos')
        } else {
            const response = await signIn(user)
            if (loggedUser !== null)
                setTimeout(() => {
                    props.history.push('/')
                }, 3000)
        }
    }
    const responseGoogle = async (response) => {

    }
    return (
        <div className="registro">
            <div className="formulario">
                <h2>Iniciar Sesión</h2>
                <div className="inputDiv">
                    <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="email" placeholder="Email" onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <input onKeyPress={enterKeyboard} type="password" name="password" placeholder="Contraseña" onChange={readInput} />
                </div>
                <button className="enviar" onClick={Validate}>Ingresar</button>
                <GoogleLogin
                    clientId="1033031988698-pivaiq2e71rsq2njp75tfdd952jgl950.apps.googleusercontent.com"
                    buttonText="Iniciar con Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        loggedUser: state.userR.loggedUser
    }
}
const mapDispatchToProps = {
    signIn: userActions.signIn
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
