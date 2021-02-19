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
      try {
        const response = await axios.post('http://localhost:4000/api/work',workData)
        if(response){
          
          const resp = await axios.post('http://localhost:4000/api/mail/sendMail', {idWork: response.data.response.work._id})
          console.log(resp)
        }
        dispatch({
          type:"ADD_WORK", payload: response.data.response
        })
      } catch (error) {
        console.log(error)
      }
            console.log('response')
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
      console.log(response)
    }
  },
  deleteWorkbyId: (id) =>{
    console.log(id)
    alert('entrea la action delete')
    return async (dispatch, getState) =>{
      try{
        const res = await axios.post('http://localhost:4000/api/mail/sendMail', {action: 'Delete', idWork: id})
        const response = await axios.delete('http://localhost:4000/api/work/'+id)
        console.log(response)
        dispatch({type:'DEL_WORK', payload:response.data})
      }
      catch(error){
        console.log(error)
      }
    }
  },

  getConsumerWorks: (id) =>{
    return async (dispatch, getState) =>{
      try{
        
        const response = await axios.get('http://localhost:4000/api/userWorks/'+ id)
        dispatch({type:'GET_WORK', payload:response.data.response})
      }
      catch(error){
        console.log(error)
      }
    }
  },
  sendMail: (idWork) =>{
    alert('action de mail')
    return async (dispatch, getState) =>{
      try {
        const response = await axios.post('http://localhost:4000/api/mail/sendMail', {idWork})
        dispatch({
          type: 'SEND_MAIL',
          
        })
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export default workActions