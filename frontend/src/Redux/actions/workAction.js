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
  },
  addWork : (idConsumer,idProvider) =>{
    console.log()
    return async (dispatch,getState) =>{
      const response = await axios.post('http://localhost:4000/api/work/',{idConsumer,idProvider})
      dispatch({
        type:"ADD_WORK", payload: response.data
      })
      console.log(response.data)
    }
  }
}

export default professionActions