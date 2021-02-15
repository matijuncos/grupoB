import React, { useState } from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions'

const data = {
    rubros: ["Albañil", "Pintor", "Electricista", "Tecnico de Aire Acondicionado", "Plomero", "Gasista", "Herrero", "Techista", "Mudanzas", "Fumigador", "Tapicero", "Cerrajero"]
}

function RegistroProvedor(props) {
    const [nuevoProvedor, setNuevoProvedor] = useState({})
    // Funcion para ler input
    const leerInput = e => {
        const campo = e.target.name
        const valor = e.target.value

        setNuevoProvedor({
            ...nuevoProvedor,
            [campo]: valor
        })



    }
    //Funcion para enviar formulario 
    const validarUsuario = async () => {
        const res = await props.signProviderUp(nuevoProvedor)
    }
    //Respuesta de Google
    const responseGoogle = async (response) => {
        console.log(response)
    }
    return (
        <div className="registro">
            <div className="formulario">
                <h2>Registro Proveedor</h2>
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
                    <input name='urlPic' type='text' placeholder='Url de foto de perfil' onChange={leerInput} />
                </div>
                <div className="inputDiv">
                    <select name='rubro' onChange={leerInput}>
                        <option disabled>Seleccione su Rubro</option>

                        {data.rubros.map((profesion, index) => {
                            return (
                                <>
                                    <option key={index}>{profesion}</option>
                                </>
                            )
                        })}
                    </select>

                </div>
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
                </div >
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    signProviderUp: userActions.signProviderUp

}

export default connect(null, mapDispatchToProps)(RegistroProvedor)

