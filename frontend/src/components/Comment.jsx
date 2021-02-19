import React from 'react'

const Comment = ({ comment }) => {
  console.log(comment)
  return (
    <div className="comment">
      <h4>{comment.comment}</h4>
    </div>
  )
}

export default Comment
