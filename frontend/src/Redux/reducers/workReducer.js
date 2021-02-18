const initState = {
   works:[],
   addWorks: []
 }
 
 const workReducer = (state = initState, action) =>{
     switch(action.type){
       case 'GET_WORKS':
         
         return{
           ...state,
           works: action.payload
         }
       case "ADD_WORK":
          console.log(action.payload)
          console.log("estoy en ADD_WORK")
          return {
             ...state.works,
             addWorks: action.payload
          }
       default :
           return state
       }
 }
 export default workReducer