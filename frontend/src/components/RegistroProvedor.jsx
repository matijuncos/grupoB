import React from 'react'
import {useState} from 'react'
import GoogleLogin from 'react-google-login'

const data = {
    rubros:[ "Albañil","Pintor","Electricista","Tecnico de Aire Acondicionado","Plomero","Gasista","Herrero","Techista","Mudanzas","Fumigador","Tapicero","Cerrajero"]
}

function RegistroProvedor() {
    const [nuevoProvedor , setNuevoProvedor]  = useState({})
// Funcion para ler input
    const leerInput = e => {
        const campo = e.target.name
        const valor = e.target.value
        
        setNuevoProvedor({
            ...nuevoProvedor ,
            [campo] : valor
        })
    }
//Funcion para enviar formulario 
      const validarUsuario  = async e =>{
        alert ('Me hiciste Click')
        e.preventDefault() 
        //Conexion a redux para enviar el objeto a endpoint y guardarlo con el {completo}
    }
//Respuesta de Google
    const responseGoogle = async (response) => {
        console.log(response)
    }
    return (
       <div className="registro">
            <h2>Registro Proveedor</h2>
            <div className="formulario">
                <div>
                    <input name = 'Nombre' type='text' placeholder = 'Nombre' onChange ={leerInput}/>
                </div>
                <div>
                    <input  name = 'Apellido' type='' placeholder = 'Apellido' onChange ={leerInput}/>
                </div>
                <div>
                    <input name = 'Email' type='text' placeholder = 'Email' onChange ={leerInput}/>
                </div>
                <div>
                    <input name = 'Telefono' type='text' placeholder = 'Telefono' onChange ={leerInput}/>
                </div>
                <div>
                <select name = 'Rubro'  onChange = {leerInput}>
                <option disabled>Seleccione su Rubro</option>

                    {data.rubros.map( (profesion , index) =>{
                        return(
                            <>
                            <option key={index}>{profesion}</option>
                            </>
                        )
                    })}
                </select>

                </div>               
                 <div>
                    <input name = 'Password' type='password' placeholder= 'Contraseña' onChange ={leerInput}/>
                </div>
                <div>
                    <button className="enviar" onClick = {validarUsuario}>Enviar Registro</button>
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
export default RegistroProvedor

