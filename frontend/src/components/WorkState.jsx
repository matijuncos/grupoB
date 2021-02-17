import Work from './Work'
import { connect } from 'react-redux'

const WorkState = (props) =>{
// Array estático de estados de trabajo

   console.log(props.works)

   return (
      <>{props.works.map(work=>{
         return <Work _idWork={work._idWork}/>
      })}
         
      </>
   )

}

const mapStateToProps = state => {
   return{
      works: state.workR.works
   }
}

export default connect(mapStateToProps)(WorkState)