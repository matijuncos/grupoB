const initState = {
   works:[
      {
         nameWork:'Arreglo de techo',
         _idWork:'214qwdq1',
         idUserConsumer:'602bf172a3977619f0f00000',
         idUserProvider:'602bf1a1a3977619f0e07429',
         estado:'1'
         // ,comment:'',
         // provider:''
      },
      {
         nameWork:'Cambio de loza',
         _idWork:'1gsgwdq1',
         idUserConsumer:'602bf172a3977619f0e01111',
         idUserProvider:'602bf1a1a3977619f0e07429',
         estado:'1'
         // ,comment:'',
         // provider:''
      },
      {
         nameWork:'Colocacion de membrana',
         _idWork:'412sdg1',
         idUserConsumer:'602bf172a3977619f0e04027',
         idUserProvider:'602bf1a1a3977619f0e07429',
         estado:'2'
         // ,comment:'',
         // provider:''
      },
      {
         nameWork:'Otro trabajo',
         _idWork:'515g1',
         idUserConsumer:'602bf100a3977619f0e07427',
         idUserProvider:'602bf1a1a3977619f0e07429',
         estado:'3'
         // ,comment:'',
         // provider:''
      }
   ]
 }
 
 const workReducer = (state = initState, action) =>{
     switch(action.type){
       case "GET_WORKS":
         
         return{
           ...state,
           works: action.payload
         }
       
       default :
           return state
       }
 }
 export default workReducer