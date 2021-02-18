const initState = {
   works:[ ]
 }
 
 const workReducer = (state = initState, action) =>{
     switch(action.type){
       case 'GET_WORKS':
         
         return{
           ...state,
           works: action.payload
         }
       
       default :
           return state
       }
 }
 export default workReducer