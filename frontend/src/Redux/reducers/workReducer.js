const initState = {
   works:[ ],
   addWorks: [],
   currentWorks:0,
   oneWork: {}   
   }
 
 const workReducer = (state = initState, action) =>{
     switch(action.type){
       case 'GET_WORKS':
         return{
           ...state,
           works: action.payload
         }
       case "ADD_WORK":
         return {
           ...state.works,
           addWorks: action.payload,
           workId: action.payload.workId
          }
          case 'CHANGE_STATE':
            return {
              ...state,
              currentWorks:state.currentWorks+1
            }
            case 'GET_WORK':
          return{
            ...state,
            works: action.payload
          }
          case 'DEL_WORK':
            alert('borro laburo')
            console.log(action.payload)
            return{
              ...state
            }
          case 'SEND_MAIL':
            return{
              ...state
            }
       default :
           return state
       }
 }
 export default workReducer