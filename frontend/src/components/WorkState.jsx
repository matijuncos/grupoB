import Work from './Work'
import { connect } from 'react-redux'

const WorkState = (props) => {
   // Array estático de estados de trabajo
   return (
      <>{props.works.map(work => {
         return <Work work={work} />
      })}

      </>
   )

}

const mapStateToProps = state => {
   return {
      works: state.workR.works
   }
}

export default connect(mapStateToProps)(WorkState)