import { connect } from 'react-redux'
import { useEffect, useState } from 'react'

const Work = (props) =>{

   console.log(props)
   const [workDetails, setWorkDetails] = useState([])
   
   useEffect(() =>{
      const workDetail = props.works.filter(work => work._idWork === props._idWork)
      console.log(workDetail)
      setWorkDetails(workDetail)
   }, [])

   const hola = () =>{
      alert('Apretaste: ' + workDetails[0].nameWork)
   }

   if(workDetails.length === 0){
      return <></>
   }

   return (
   <>
      <h3>{workDetails[0].nameWork}</h3>
      <h3>{workDetails[0].estado}</h3>
      <button onClick={hola}>Boton</button>
      <hr/>
   </>
   )
}

const mapStateToProps = state =>{
   return {
      works: state.workR.works
   }
}

export default connect(mapStateToProps)(Work)