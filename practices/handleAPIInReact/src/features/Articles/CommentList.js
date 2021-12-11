const CommentList = ({data = []})=>{
    return (
      <div>
          <p>Comments({data.length})</p>
          <ul>
            {data.map(comment=>(<li key={comment.id}><p>{comment.name}</p><p>{comment.comment}</p></li>))}
          </ul>
      </div>
    );
  }

export default CommentList