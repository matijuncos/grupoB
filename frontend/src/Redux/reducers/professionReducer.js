const initState = {
  professions: []
}

const professionReducer = (state = initState, action) =>{
    switch(action.type){
      case "GET_PROFESSIONS":
        console.log(action.payload)
        return{
          ...state,
          professions: action.payload
        }
      default :
          return state
      }
}
export default professionReducer