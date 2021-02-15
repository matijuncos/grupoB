import axios from 'axios'

const userActions = {

   signUp: (newUser) =>{
    return async (dispatch, getState) =>{
      console.log('llegue a la action')
      try{
        const response = await axios.post('http://localhost:4000/api/user/customer', newUser)
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
            Authorization: 'Bearer ' + token
          }
        })
        console.log(response)
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
  
  }

}

export default userActions