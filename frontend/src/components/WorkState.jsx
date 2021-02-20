import Work from './Work'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import workActions from '../Redux/actions/workActions'

const WorkState = ({ works, userWork, loggedUser, getConsumerWorks }) => {
   const [reload, setReload] = useState(false)
   useEffect(() => {
      getConsumerWorks(loggedUser.idUser)
   }, [reload])
   // Array estático de estados de trabajo

   return (
      <>

         {works.length === 0 ? (
            <p>Aun no tienes trabajos!</p>
         ) : works.map(work => {
            return <Work reload={reload} setReload={setReload} work={work} key={work._id} />
         })}
      </>
   )

}
const mapStateToProps = state => {
   return {
      userWork: state.workR.userWork,
      works: state.workR.works,
      loggedUser: state.userR.loggedUser
   }
}
const mapDispatchToProps = {
   getConsumerWorks: workActions.getConsumerWorks
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkState)