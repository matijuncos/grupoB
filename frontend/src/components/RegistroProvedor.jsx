import React, { useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions'


function RegistroProvedor(props) {
    const [newProfessional, setNewProfessional] = useState({})
    const [professions, setProfessions] = useState([])
    const countries = require('../data/dataContryNames.json')
    // Funcion para ler input
    useEffect(() => {
        fetch('http://localhost:4000/api/professions/')
            .then(response => response.json())
            .then(data => setProfessions(data.response))
    }, [])

    const readInput = e => {
        const property = e.target.name
        var value = e.target.value
        if (property === 'fileUrlPic') value = e.target.files[0]
        if (property === 'fileWorkPic') value = e.target.files[0]
        if (property === 'fileWorkPic2') value = e.target.files[0]

        setNewProfessional({
            ...newProfessional,
            [property]: value
        })
    }
    //Funcion para enviar formulario 
    const validarUsuario = async () => {
        const fdNewUser = new FormData()
        fdNewUser.append('firstName', newProfessional.firstName)
        fdNewUser.append('lastName', newProfessional.lastName)
        fdNewUser.append('fileUrlPic', newProfessional.fileUrlPic)
        fdNewUser.append('fileWorkPic', newProfessional.fileWorkPic)
        fdNewUser.append('fileWorkPic2', newProfessional.fileWorkPic2)
        fdNewUser.append('email', newProfessional.email)
        fdNewUser.append('phone', newProfessional.phone)
        fdNewUser.append('password', newProfessional.password)
        fdNewUser.append('country', newProfessional.country)
        fdNewUser.append('idProfession', newProfessional.idProfession)
        const res = await props.signProviderUp(fdNewUser)
    }
    //Respuesta de Google
    // const responseGoogle = async (response) => {
    //     console.log(response)
    // }
    return (
        <div className="registro">
            <div className="formulario">
                <h2>Registro Proveedor</h2>
                <div className="inputDiv">
                    <input name='firstName' type='text' placeholder='Nombre' onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <input name='lastName' type='' placeholder='Apellido' onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <input name='email' type='text' placeholder='Email' onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <input name='phone' type='text' placeholder='Telefono' onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <select name="country" type='text' placeholder='País' onChange={readInput} >
                        <option value=''>Selecciona un país</option>
                        {countries.map((country, i) => {
                            return <option key={"selectCountry" + i} value={country.value}>{country.label}</option>
                        })}
                    </select>
                </div>
                <div className="inputDiv">
                    <input name='fileUrlPic' type='file' placeholder='Url de foto de perfil' onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <input name='fileWorkPic' type='file' placeholder='Foto de trabajo realizado' onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <input name='fileWorkPic2' type='file' placeholder='Segunda foto de un trabajo realizado' onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <select name='idProfession' onChange={readInput}>
                        <option value=''>Seleccione su Rubro</option>
                        {professions.map(profession => {
                            return (
                                <>
                                    <option key={profession._id} value={profession._id}>{profession.type}</option>
                                </>
                            )
                        })}
                    </select>
                </div>
                <div className="inputDiv">
                    <input name='password' type='password' placeholder='Contraseña' onChange={readInput} />
                </div>
                <div className="">
                    <button className="enviar" onClick={validarUsuario}>Enviar Registro</button>
                </div>
                <div>
                    {/* <GoogleLogin className="google"
                        clientId="84161810761-i373rjs0mohqvvd6etl56hr39pdtbbms.apps.googleusercontent.com"
                        buttonText="Crear cuenta con Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    /> */}
                </div >
            </div>
        </div>
    )
}
const mapDispatchToProps = {
    signProviderUp: userActions.signProviderUp
}
export default connect(null, mapDispatchToProps)(RegistroProvedor)
