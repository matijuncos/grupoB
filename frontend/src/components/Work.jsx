import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import workActions from '../Redux/actions/workActions'
import { Timeline, Icon } from 'rsuite'

const Work = (props) => {
   const { work, changeState, reload, setReload, providers } = props

   const [visible, setVisible] = useState(true)
   const [myProviders, setMyProviders] = useState([])

   async function acceptProposal() {
      await changeState(work._id)
      setReload(!reload)
      setVisible(!visible)
   }



   const { comment, idUserConsumer, idUserProvider, state, _id } = work


   return (
      <div className="workContainer">
         <div className="workDetails">
            <div style={{ width: '50px', height: '50px', backgroundImage: `url('${idUserConsumer && idUserConsumer.idUserBase.urlPic}')`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
            <h3>{idUserConsumer && idUserConsumer.idUserBase.firstName} {idUserConsumer && idUserConsumer.idUserBase.lastName}</h3>
            <h4>{idUserConsumer && idUserConsumer.idUserBase.email}</h4>
            <h4>{state}</h4>
            {visible &&
               <button onClick={acceptProposal}>Aceptar</button>
            }
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
         <hr />
      </div>
   )
}
const mapDispatchToProps = {
   changeState: workActions.changeState
}
const mapStateToProps = state => {
   return {
      providers: state.professionR.providers,

   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Work)