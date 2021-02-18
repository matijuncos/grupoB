import axios from 'axios'
import {Alert} from 'rsuite'

const workActions = {
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
  addWork : (workData) =>{
    return async (dispatch,getState) =>{
      const response = await axios.post('http://localhost:4000/api/work',workData)
      dispatch({
        type:"ADD_WORK", payload: response.data
      })
    }
  },
  changeState:(idWork)=>{
    console.log(idWork)
    return async (dispatch,getState) =>{
      const response = await axios.put('http://localhost:4000/api/work',{idWork})
      if(response.data.success){
        Alert.success("La propuesta fue aceptada",3500)
      }else{
        Alert.error("Error",3500)
      }
      dispatch({
        type:"CHANGE_STATE"
      })
    }
  }
}

export default workActions