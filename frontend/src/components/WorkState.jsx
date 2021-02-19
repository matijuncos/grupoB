import Work from './Work'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import workActions from '../Redux/actions/workActions'

const WorkState = ({ works, loggedUser, getConsumerWorks }) => {
   const [reload, setReload] = useState(false)
   useEffect(() => {
      getConsumerWorks(loggedUser.idUser)
   }, [reload])
   // Array estático de estados de trabajo

   return (
      <>
         {works && works.map(work => {
            return <Work reload={reload} setReload={setReload} work={work} key={work._id} />
         })}
      </>
   )

}
const mapStateToProps = state => {
   return {
      works: state.workR.works,
      loggedUser: state.userR.loggedUser
   }
}
const mapDispatchToProps = {
   getConsumerWorks: workActions.getConsumerWorks
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkState)