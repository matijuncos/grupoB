import React from 'react'
import {useState} from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

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
    console.log(nuevoProvedor)
    const validarUsuario  = async e =>{
        alert ('Me hiciste Click')
        e.preventDefault() 
        //Conexion a redux para enviar el objeto a endpoint y guardarlo con el {completo}
        const respuesta = await axios.post('http://localhost:4000/api/user/provider', nuevoProvedor)
        console.log(respuesta.data)
    }
//Respuesta de Google
    const responseGoogle = async (response) => {
        console.log(response)
    }
    return (
       <div className="registro">
           <h2>Registro Proveedor</h2>
            <div className="formulario">
                <div ><input name = 'firstName' type='text' placeholder= 'Nombre' onChange ={leerInput}/></div>
                <div><input  name = 'lastName' type='' placeholder= 'Apellido' onChange ={leerInput}/></div>
                <div><input name = 'email' type='text' placeholder= 'Email' onChange ={leerInput}/></div>
                <div><input name = 'phone' type='text' placeholder= 'Telefono' onChange ={leerInput}/></div>
                <div>
                    {/* idProfession TEMPORAL */}
                    <select name = 'idProfession'  onChange = {leerInput}>
                        <option disabled>Seleccione su Rubro</option>
                        <option >ALBAÑIL</option>
                        <option >PINTOR</option>
                        <option >CARPINTERO</option>
                    </select>
                </div>
                <div>
                    <input name = 'password' type='password' placeholder= 'Contraseña' onChange ={leerInput}/>
                </div>
                <div>
                    <button className="enviar" onClick = {validarUsuario}>Enviar Registro</button>
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
export default RegistroProvedor

