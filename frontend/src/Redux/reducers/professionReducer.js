const initState = {
  professions: [],
  profession: []
}

const professionReducer = (state = initState, action) =>{
    switch(action.type){
      case "GET_PROFESSIONS":
        console.log(action.payload)
        return{
          ...state,
          professions: action.payload
        }
      case "GET_THIS_PROFESSION":
        return{
          ...state,
          profession: action.payload
        }
      default :
          return state
      }
}
export default professionReducer