import React from 'react'
import { useState } from 'react'
import GoogleLogin from 'react-google-login'
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions'
import { Alert } from 'rsuite';

function RegistroUsuario({ signUp, googleSignUp }) {
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        country: '',
    })
    const [errores, setErrores] = useState([])
    const [errorObj, setErrorObj] = useState({})

    const failedInputs = {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        urlPic: null,
        country: null,
        phone: null
    }

    const countries = require('../data/dataContryNames.json')
    // Funcion para ler input
    const leerInput = e => {
        console.log(newUser)
        const property = e.target.name
        var value = e.target.value
        if (property === 'fileUrlPic') value = e.target.files[0]
        setNewUser({
            ...newUser,
            [property]: value
        })

    }
    //Funcion para enviar formulario 
    const validarUsuario = async () => {
        if (newUser.firstName === '' || newUser.lastName === '' || newUser.email === '' || newUser.phone === '' || newUser.password === '' || newUser.country === '') {
            Alert.error('Todos los campos deben estar completos', 4000)
            return false
        }
        //llenando el formData con la informacion de los input
        const fdNewUser = new FormData()
        fdNewUser.append('firstName', newUser.firstName)
        fdNewUser.append('lastName', newUser.lastName)
        fdNewUser.append('fileUrlPic', newUser.fileUrlPic)
        fdNewUser.append('email', newUser.email)
        fdNewUser.append('phone', newUser.phone)
        fdNewUser.append('password', newUser.password)
        fdNewUser.append('country', newUser.country)
        fdNewUser.append('rol', 'consumer')

        const res = await signUp(fdNewUser)
        if (res && !res.success) {
            setErrores(res.response)
        }
        //mostrar al usuario sí el objeto con la propiedad success es true o false
        //el objeto respuesta va a llegar como un array de strings
        if (res && !res.success) {
            console.log(res.response)
            res.response.map(error => {
                console.log(error)
                failedInputs[error.label] = error.message
                return false

            })
            setErrorObj(failedInputs)
        }

        console.log(errorObj)
    }
    //Respuesta de Google
    const responseGoogle = async (response) => {
        console.log(response)

        if (response.error) {
            alert("Algo pasó...")
        } else {
            const respuesta = await googleSignUp({
                firstName: response.profileObj.givenName,
                lastName: response.profileObj.familyName,
                email: response.profileObj.email,
                phone: "3513963871",
                googlePic: response.profileObj.imageUrl,
                password: `Aa${response.profileObj.googleId}`,
                country: 'Argentina',
                rol: 'consumer',
                google: 'true'

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
        <>
            <div>

            </div>
            <div className="registro">
                <div className="formulario">
                    <h2>¡Ingresá tus datos!</h2>
                    <div className="inputDiv">
                        <input name='firstName' type='text' placeholder='Nombre' onChange={leerInput} />
                        <small>{errorObj.firstName}</small>
                    </div>
                    <div className="inputDiv">
                        <input name='lastName' type='' placeholder='Apellido' onChange={leerInput} />
                        <small>{errorObj.lastName}</small>
                    </div>
                    <div className="inputDiv">
                        <small>{errorObj.email}</small>
                        <input name='email' type='text' placeholder='Email' onChange={leerInput} />
                    </div>
                    <div className="inputDiv">
                        <small>{errorObj.phone}</small>
                        <input name='phone' type='text' placeholder='Telefono' onChange={leerInput} />
                    </div>
                    <div className="inputDiv">
                        <small>{errorObj.country}</small>
                        <select name="country" type='text' placeholder='País' onChange={leerInput} >
                            <option value=''>Selecciona un país</option>
                            {countries.map((country, i) => {
                                return <option key={"selectCountry" + i} value={country.value}>{country.label}</option>
                            })}
                        </select>
                    </div>
                    <div className="inputDiv">
                        <label>Subi tu foto de perfil
                        <small>{errorObj.userPicture}</small>
                            <input name='fileUrlPic' type='file' placeholder='Url de foto de perfil' onChange={leerInput} />
                        </label>
                    </div>
                    <div className="inputDiv">
                        <small>{errorObj.password}</small>
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
        </>
    )
}
const mapStateToProps = state => {
    return {
        loggedUser: state.userR.loggedUser
    }
}
const mapDispatchToProps = {
    signUp: userActions.signUp,
    googleSignUp: userActions.googleSignUp
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistroUsuario)
