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
        dispatch({
          type: "GET_PROVIDERS",
          payload: response.data
        })
      }catch(error){
        console.log(error)
      }
    }
  },
  addWork : (idProvider,idConsumer) =>{
    return async (dispatch,getState) =>{
      const response = await axios.post('http://localhost:4000/api/work/',{idProvider,idConsumer})
      dispatch({
        type:"ADD_WORK", payload: response
      })
      console.log(response)
    }
  }
}

export default professionActions