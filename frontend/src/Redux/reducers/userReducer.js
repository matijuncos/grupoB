const initState = {
  loggedUser: null
}

const userReducer = (state = initState, action) =>{
    switch(action.type){
      case "USER_LOG":
        console.log('llegué al reducer')
        console.log(action.payload)
        localStorage.setItem('token', action.payload.response.token)
        localStorage.setItem('firstName', action.payload.response.firstName)
        localStorage.setItem('userPic', action.payload.response.userPic)

        return{
          ...state,
          loggedUser: action.payload
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