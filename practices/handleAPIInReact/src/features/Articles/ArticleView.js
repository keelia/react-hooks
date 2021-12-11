import React from "react";
import CommentList from "./CommentList";
import useArticle from "./useArticle";
import useAuthor from "./useAuthor";
import useComments from "./useComments";

const ArticleView = ({id}) =>{
  const {data:article,error,loading} = useArticle(id)
  const {data:comments} = useComments(id)
  const {data:author} = useAuthor(article?.authorId)
  if(error){
    return 'Failed'
  }else if(!article || loading){
    return 'Loading...'
  }
    return (
      <div>
          <h1>{article?.name}</h1>
          <h2>Author:{author?.name}</h2>
          <p>{article?.content}</p>
          <CommentList data={comments || []}/>
      </div>
    );
}
export default ArticleView