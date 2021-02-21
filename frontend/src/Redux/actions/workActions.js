import axios from 'axios'
import {Alert} from 'rsuite'

const workActions = {
  getWorks: () =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.get('http://localhost:4000/api/work')
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
        }
        // dispatch({
        //   type:"ADD_WORK"
        // })
      } catch (error) {
        console.log(error)
      }
    }
  },
  changeState:(idWork)=>{
    return async (dispatch,getState) =>{
      const response = await axios.put('http://localhost:4000/api/work',{idWork})
      if(response.data.success){
      //  Alert.success("La propuesta fue aceptada",3500)
      }else{
        Alert.error("Error",3500)
      }
      console.log(response)
      dispatch({
        type:"CHANGE_STATE"
      })
      console.log(response)
    }
  },
  deleteWorkbyId: (id) =>{
    console.log(id)
    
    return async (dispatch, getState) =>{
      try{
        const res = await axios.post('http://localhost:4000/api/mail/sendMail', {action: 'Delete', idWork: id})
        const response = await axios.delete('http://localhost:4000/api/work/'+id)
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
        
        const response = await axios.get('http://localhost:4000/api/userWork/'+ id)
        dispatch({type:'GET_WORK', payload:response.data.response})
        console.log(response)
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
  },
  sendComment: (comment) =>{
    return async (dispatch, getState) =>{
      const respuesta = await axios.post('http://localhost:4000/api/comment', comment)
      dispatch({
        type: 'COMMENT',
        payload: respuesta.data
      })
    }
  },
  deleteComment: (idUser, commentId) =>{
    return async (dispatch, getState) =>{
      const respuesta = await axios.put('http://localhost:4000/api/delcomment', {idUser, commentId})
      dispatch({
        type: 'COMMENT',
        payload: respuesta.data
      })
    }
  },
  updateComment: (idUser, commentId, comment) =>{
   return async (dispatch, getState) =>{
      const respuesta = await axios.post('http://localhost:4000/api/updatecomment', {idUser, commentId, comment})
      dispatch({
        type: 'COMMENT',
        payload: respuesta.data
      })
    }
  },
  rankProvider : (value, id) =>{
    return async (dispatch, getState) =>{
      const respuesta = await axios.post('http://localhost:4000/api/rank', {value, id})
     //console.log(getState().professionR.providers.respuesta)
     // getState().professionR.providers.respuesta=getState().professionR.providers.respuesta.filter(provider => provider._id === respuesta.data._id ? respuesta.data : provider)
      dispatch({
        type: "RANK",
        payload: respuesta.data
      })
    }
  },
}

export default workActions