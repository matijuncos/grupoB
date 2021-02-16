import React, { useState } from 'react'
import GoogleLogin from 'react-google-login'

const SignIn = (props) => {
    const [loguear, setLoguear] = useState({})
    const leerInput = e => {
        const valor = e.target.value
        const campo = e.target.name
        setLoguear({
            ...loguear,
            [campo]: valor
        })
    }
    console.log(loguear)
    const validar = async e => {
        e.preventDefault()
        if (loguear.Email === '' || loguear.Password === '') {
            alert('todos los campos son requeridos')
        } else {
            alert('Bienvenido')
            setTimeout(() => {
                props.history.push('/')
            }, 2000)
        }
    }
    const responseGoogle = async (response) => {

    }
    return (
        <div className="registro">
            <div className="formulario">
                <h2>Iniciar Sesión</h2>
                <div className="inputDiv">
                    <input type="text" autoComplete="nope" name="Email" placeholder="Email" onChange={leerInput} />
                </div>
                <div className="inputDiv">
                    <input type="password" name="Password" placeholder="Contraseña" onChange={leerInput} />
                </div>
                <button className="enviar" onClick={validar}>Ingresar</button>
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
export default SignIn