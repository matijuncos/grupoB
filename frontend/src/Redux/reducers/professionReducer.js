const initState = {
  professions: [],
  providers: []
}

const professionReducer = (state = initState, action) =>{
    switch(action.type){
      case "GET_PROFESSIONS":
        console.log(action.payload)
        return{
          ...state,
          professions: action.payload
        }
      case "GET_PROVIDERS":
        return{
          ...state,
          providers: action.payload
        }
      default :
          return state
      }
}
export default professionReducer