import axios from 'axios'

const userActions = {
   signUp: (fdNewUser) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.post('http://localhost:4000/api/user/customer', fdNewUser,{
          headers:{
            'Content-Type':'multipart/form-data'
          }
        })
        console.log(response)
        if(response.data.success===false){
          var errors=[]
          response.data.errores && response.data.errores.details.map(error=>{
            switch (error.path[0]) {
              case 'firtsName':
                errors.push({label:error.context.label,message:"El nombre debe tener minimo 2 caracteres."})
                break;
              case 'lastName':
                errors.push({label:error.context.label,message:"El apellido debe tener minimo 2 caracteres."})
                break;
              case 'urlPic':
                errors.push({label:error.context.label,message:"Debe contener formato de url real."})
                break;
              case 'email':
                errors.push({label:error.context.label,message:"El correo tiene que contener un arroba y un dominio como minimo."})
                break;
              case 'phone':
                errors.push({label:error.context.label,message:"El telefono debe tener al menos 10 caracteres, sin 0 al principio y ningún caracter especial."})
                break;
              case 'password':
                errors.push({label:error.context.label,message:"La contraseña debe tener al menos 6 a 8 caracteres y una mayuscula y una minuscula."})
                break;
              case 'country':
                errors.push({label:error.context.label,message:"Debes seleccionar algun país."})
                break;
            }
          })
        }
        dispatch({
          type: "USER_LOG",
          payload: response.data
        })
        return ({success:true,response:["Tu cuenta fue creada con éxito!"]})
      }catch(err){
        alert('Uy! Algo salió mal!')
      }
    }
  },   
  signProviderUp: (newUser) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.post('http://localhost:4000/api/user/provider', newUser)
        if(!response.data.success){
          return response.data
        }
        dispatch({
          type: "USER_LOG",
          payload: response.data
        })
        alert("Tu cuenta fue creada con éxito!")
      }catch(err){
        console.log(err)
        alert('Uy! Algo salió mal!')
      }
    }
  },
  signOut: () =>{
    return async (dispatch, getState) =>{
      dispatch({
        type: "SIGN_OUT",
      })
      alert('cerraste sesión')
    }
  },
  preserveLog: (token) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.post('http://localhost:4000/api/user/storage', {token}, {
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
         dispatch({
           type: "USER_LOG",
           payload: {response: {...response.data.response}}
         })
        
      }
      catch(error){
        console.log(error)
    //     if(error.response.status === 401){
    //       localStorage.clear()
    //   return false
    // }
      }
    }
  },
  signIn: (user) => {
      return async (dispatch, getState) => {
          const respuesta = await axios.post('http://localhost:4000/api/user/signIn', user)
          console.log(respuesta.data)
          if (!respuesta.data.success) {
              return respuesta.data
          }
          dispatch({type:'USER_LOG', payload: respuesta.data})
      }
  }
}

export default userActions