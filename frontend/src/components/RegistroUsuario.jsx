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
            <h2>Registro Usuario</h2>
            <div className="formulario">
                <div><input name='firstName' type='text' placeholder='Nombre' onChange={leerInput} />
                </div>
                <div><input name='lastName' type='' placeholder='Apellido' onChange={leerInput} />
                </div>
                <div><input name='email' type='text' placeholder='Email' onChange={leerInput} />
                </div>
                <div><input name='phone' type='text' placeholder='Telefono' onChange={leerInput} />
                </div>
                <div><input name='password' type='password' placeholder='Contraseña' onChange={leerInput} />
                </div>
                <div ><button className="enviar" onClick={validarUsuario}>Enviar Registro</button>
                </div>
                <div>
                    <GoogleLogin className="google"
                        clientId="56670268622-ujtfv11jtt2esb9qe4cgo4drut70tgu4.apps.googleusercontent.com"
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
