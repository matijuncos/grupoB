import React, { useState } from 'react'
import { connect } from 'react-redux'
import workActions from '../Redux/actions/workActions'

const Comment = (props) => {

  const { comment, reload, setReload } = props
  const [visible, setVisible] = useState(false)
  const [input, setInput] = useState(comment.comment)
  console.log(comment)



  const delComment = async () => {
    await props.deleteComment(props.id, comment._id)
    setReload(!reload)
  }
  const editComment = async () => {
    await props.updateComment(props.id, comment._id, input)
    setVisible(!visible)
    console.log(comment)
    setReload(!reload)
  }

  const displayInput = () => {
    setVisible(!visible)
  }

  const readInput = (e) => {
    setInput(e.target.value)
  }

  return (
    <div className="comment">
      <h5>{comment.idUser.idUserBase.firstName} {comment.idUser.idUserBase.lastName}</h5>
      {visible ? (
        <>
          <div className="divInput">
            <input type="text" value={input} onChange={readInput} /> <button onClick={editComment}>Enviar</button>
            <button onClick={displayInput}>Cancelar</button>
          </div>
        </>
      ) : (
          <>
            <h6>{comment.comment}</h6>
            <p onClick={delComment}>Borrar</p>
            <p onClick={displayInput}>Editar</p>
          </>
        )}
    </div>
  )
}



const mapStateToProps = state => {
  return {

    loggedUser: state.userR.loggedUser
  }
}
const mapDispatchToProps = {
  deleteComment: workActions.deleteComment,
  updateComment: workActions.updateComment
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment)
