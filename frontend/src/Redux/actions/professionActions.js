import axios from 'axios'


const professionActions = {
  getProfessions: () =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.get('http://localhost:4000/api/professions/')
        dispatch({
          type: "GET_PROFESSIONS",
          payload: response.data
        })
      }catch(error){
        console.log(error)
      }
    }
  },
  getProviders: () =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.get('http://localhost:4000/api/user/providers/')
        console.log(response)
        dispatch({
          type: "GET_PROVIDERS",
          payload: response.data
        })
      }catch(error){
      }
    }
  },
  
}

export default professionActions