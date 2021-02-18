const initState = {
  loggedUser: null
}

const userReducer = (state = initState, action) =>{
    switch(action.type){
      case "USER_LOG":
        localStorage.setItem('token', action.payload.response.token)
        localStorage.setItem('firstName', action.payload.response.firstName)
        localStorage.setItem('urlPic', action.payload.response.urlPic)
        localStorage.setItem('_id', action.payload.response._id)
        return{
          ...state,
          loggedUser: action.payload.response
        }
      case "SIGN_OUT":
        return{
          ...state,
          loggedUser: null
        }
      default :
          return state
      }
}
export default userReducer