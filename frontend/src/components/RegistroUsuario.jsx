import React from 'react'
import { useState } from 'react'
import GoogleLogin from 'react-google-login'
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions'


function RegistroUsuario({ signUp }) {
    const [nuevoUsuario, setNuevoUsuario] = useState({})
    // Funcion para ler input
    const leerInput = e => {
        const campo = e.target.name
        const valor = e.target.value
        setNuevoUsuario({
            ...nuevoUsuario,
            [campo]: valor
        })
    }
    //Funcion para enviar formulario 
    const validarUsuario = async () => {
        const res = await signUp(nuevoUsuario)
        console.log(res)
    }
    //Respuesta de Google
    const responseGoogle = async (response) => {
        console.log(response)

    }
    return (
        <div className="registro">
            <div className="formulario">
                <h2>¡Ingresá tus datos!</h2>
                <div className="inputDiv"><input name='firstName' type='text' placeholder='Nombre' onChange={leerInput} />
                </div>
                <div className="inputDiv"><input name='lastName' type='' placeholder='Apellido' onChange={leerInput} />
                </div>
                <div className="inputDiv"><input name='email' type='text' placeholder='Email' onChange={leerInput} />
                </div>
                <div className="inputDiv"><input name='phone' type='text' placeholder='Telefono' onChange={leerInput} />
                </div>
                <div className="inputDiv"><input name='password' type='password' placeholder='Contraseña' onChange={leerInput} />
                </div>
                <div className=""><button className="enviar" onClick={validarUsuario}>Enviar Registro</button>
                </div>
<<<<<<< HEAD
                <div className="">
                    <GoogleLogin className="google"
                        clientId="56670268622-ujtfv11jtt2esb9qe4cgo4drut70tgu4.apps.googleusercontent.com"
=======
                <div>
                <GoogleLogin className="google"
                        clientId="84161810761-i373rjs0mohqvvd6etl56hr39pdtbbms.apps.googleusercontent.com"
>>>>>>> 1439189c65607831df2db6bb61a98fefa80f4857
                        buttonText="Crear cuenta con Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
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
    signUp: userActions.signUp

}
export default connect(mapStateToProps, mapDispatchToProps)(RegistroUsuario)
