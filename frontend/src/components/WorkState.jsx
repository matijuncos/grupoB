import Work from './Work'
import { connect } from 'react-redux'
import {useEffect,useState} from 'react'
import workActions from '../Redux/actions/workActions'

const WorkState = ({getWorks,works}) => {
   const [reload,setReload]=useState(false)
   useEffect(() => {
      getWorks()
   }, [reload])
   // Array estático de estados de trabajo
   return (
      <>
         {works.map(work => {
            return <Work reload={reload} setReload={setReload} work={work} />
         })}
      </>
   )

}
const mapStateToProps = state => {
   return {
      works: state.workR.works
   }
}
const mapDispatchToProps={
   getWorks:workActions.getWorks
}
export default connect(mapStateToProps,mapDispatchToProps)(WorkState)