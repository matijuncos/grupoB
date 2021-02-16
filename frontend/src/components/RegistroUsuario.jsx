import React from 'react'
import { useState } from 'react'
import GoogleLogin from 'react-google-login'
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions'


function RegistroUsuario({ signUp, loggedUser }) {
    const [newUser, setNewUser] = useState({})
    const [errores, setErrores] = useState([])
    // Funcion para ler input
    const leerInput = e => {
        const property = e.target.name
        const value = e.target.value
        setNewUser({
            ...newUser,
            [property]: value
        })
    }
    //Funcion para enviar formulario 
    const validarUsuario = async () => {
        const res = await signUp(newUser)
        //mostrar al usuario sí el objeto con la propiedad success es true o false
        //el objeto respuesta va a llegar como un array de strings
        console.log(res)
    }
    //Respuesta de Google
    const responseGoogle = async (response) => {
        console.log(response)

        if (response.error) {
            alert("Algo pasó...")
        } else {
            const respuesta = await signUp({
                firstName: response.profileObj.familyName,
                lastName: response.profileObj.familyName,
                email: response.profileObj.email,
                phone: "3513963871",
                urlPic: response.profileObj.imageUrl,
                password: `Aa${response.profileObj.googleId}`,

            })
            if (respuesta && !respuesta.success) {
                setErrores(respuesta.errores)
                console.log(errores)
            } else {
                alert("Usuario nuevo grabado")
            }
        }
    }
    return (
        <div className="registro">
            <div className="formulario">
                <h2>¡Ingresá tus datos!</h2>
                <div className="inputDiv">
                    <input name='firstName' type='text' placeholder='Nombre' onChange={leerInput} />
                </div>
                <div className="inputDiv">
                    <input name='lastName' type='' placeholder='Apellido' onChange={leerInput} />
                </div>
                <div className="inputDiv">
                    <input name='email' type='text' placeholder='Email' onChange={leerInput} />
                </div>
                <div className="inputDiv">
                    <input name='phone' type='text' placeholder='Telefono' onChange={leerInput} />
                </div>
                <div className="inputDiv">
                    <input name='urlPic' type='text' placeholder='Url de foto de perfil' onChange={leerInput} /></div>
                <div className="inputDiv">
                    <input name='password' type='password' placeholder='Contraseña' onChange={leerInput} />
                </div>
                <div className="">
                    <button className="enviar" onClick={validarUsuario}>Enviar Registro</button>
                </div>
                <div>
                    <GoogleLogin className="google"
                        clientId="84161810761-i373rjs0mohqvvd6etl56hr39pdtbbms.apps.googleusercontent.com"
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
