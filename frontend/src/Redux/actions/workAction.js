import axios from 'axios'


const professionActions = {
  getWorks: () =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.get('http://localhost:4000/api/work')
        console.log(response.data)
        dispatch({type:'GET_WORKS', payload:response.data.response})
      }
      catch(error){
        console.log(error)
      }
    }
  }
}

export default professionActions