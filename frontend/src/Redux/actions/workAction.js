import axios from 'axios'


const professionActions = {
  getWorks: () =>{
    return async (dispatch, getState) =>{
      
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