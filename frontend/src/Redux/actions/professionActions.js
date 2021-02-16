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
  getOneProfession: (id) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.get('http://localhost:4000/api/user/professionals/'+ id)
        console.log(response)
        dispatch({
          type: "GET_THIS_PROFESSION",
          payload: response.data
        })
      }catch(error){
        console.log(error)
      }
    }
  }
}

export default professionActions