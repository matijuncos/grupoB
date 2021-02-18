import { connect } from 'react-redux'
import workActions from '../Redux/actions/workActions'
import {Timeline, Icon} from 'rsuite'
 
const Work = ({ work,changeState,reload,setReload}) => {
   async function acceptProposal(){
   await changeState(work._id)
   setReload(!reload)
}
   const { comment, idUserConsumer, idUserProvider, state, _id } = work
   return (
      <div className="workContainer">
         <div className="workDetails">
            <div style={{ width: '50px', height: '50px', backgroundImage: `url('${idUserConsumer.idUserBase.urlPic}')`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
            <h3>{idUserConsumer.idUserBase.firstName} {idUserConsumer.idUserBase.lastName}</h3>
            <h4>{idUserConsumer.idUserBase.email}</h4>
            <h4>{state}</h4>
            <button onClick={acceptProposal}>Aceptar</button>
         </div>
         <div className="workTimeline">
            <Timeline className="custom-timeline">
               <Timeline.Item className="stateTimeLine" dot={<Icon icon="plane" size="2x" />}>
                  <p>Terminado</p>
               </Timeline.Item>
               <Timeline.Item className="stateTimeLine" dot={<Icon icon="user" size="2x" />}>
                  <p>Aceptado</p>
               </Timeline.Item>
               <Timeline.Item
                  className="stateTimeLine"
                  dot={
                  <Icon
                     icon="check"
                     size="2x"
                     style={{ background: '#15b215', color: '#fff' }}
                  />
                  }
               >
                  <p>Pendiente</p>
               </Timeline.Item>
            </Timeline>
         </div>
        <hr/>
      </div>
   )
}
const mapDispatchToProps={
   changeState:workActions.changeState
}

export default connect(null,mapDispatchToProps)(Work)