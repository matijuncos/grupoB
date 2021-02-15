import axios from 'axios'

const userActions = {
   signUp: (newUser) =>{
    return async (dispatch, getState) =>{
      console.log('llegue a la action')
      try{
        const response = await axios.post('http://localhost:4000/api/user/customer', newUser)
        console.log(response)
        if(!response.data.success){
          return response.data
        }
        console.log(newUser)
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
  signProviderUp: (newUser) =>{
    return async (dispatch, getState) =>{
      console.log('llegue a la action')
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
    console.log('llegue a la action del preserve')
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
        console.log("1")
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
          if (!respuesta.data.success) {
              return respuesta.data
          }
          dispatch({type:'USER_LOG', payload: respuesta.data})
      }
  }
}

export default userActions