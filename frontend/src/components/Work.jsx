import { connect } from 'react-redux'
import { useEffect, useState } from 'react'

const Work = ({ work }) => {
   console.log(work)
   const { comment, idUserConsumer, idUserProvider, state, _id } = work



   return (
      <>
         <div style={{ width: '50px', height: '50px', backgroundImage: `url('${idUserConsumer.idUserBase.urlPic}')`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
         <h3>{idUserConsumer.idUserBase.firstName} {idUserConsumer.idUserBase.lastName}</h3>
         <h4>{idUserConsumer.idUserBase.email}</h4>
         <h4>{state}</h4>
         <button>Aceptar</button>
         <hr />
      </>
   )
}

// const mapStateToProps = state =>{
//    return {
//       works: state.workR.works
//    }
// }

export default Work