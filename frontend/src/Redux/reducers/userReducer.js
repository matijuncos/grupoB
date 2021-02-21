const initState = {
  loggedUser: null,
  comments: []

}

const userReducer = (state = initState, action) =>{
    switch(action.type){
      case "USER_LOG":
        console.log("reducer")
        console.log(action.payload)
        localStorage.setItem('token', action.payload.response.token)
        localStorage.setItem('firstName', action.payload.response.firstName)
        localStorage.setItem('urlPic', action.payload.response.urlPic)
        localStorage.setItem('idUser', action.payload.response.idUser)
        localStorage.setItem('_id', action.payload.response._id)
        localStorage.setItem('rol', action.payload.response.rol)
        return{
          ...state,
          loggedUser: action.payload
        }
      case "SIGN_OUT":
        return{
          ...state,
          loggedUser: null
        }
      case 'SEND_COMMENT':
        return{
          ...state,
          comments: action.payload.respuesta.review
        }
      case 'DEL_COMMENT':
      return{
        ...state
      }
      case 'RANK':
      return{
        ...state
      }
      case 'UPDATE_COMMENT':
        return{
          ...state
        }
      default :
          return state
      }
}
export default userReducer