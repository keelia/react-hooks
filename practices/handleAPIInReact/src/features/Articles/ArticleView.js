import React from "react";
import CommentList from "./CommentList";
import useArticle from "./useArticle";
import useAuthor from "./useAuthor";
import useComments from "./useComments";

const ArticleView = ({id,auto_load=true}) =>{
  const {data:article,error,loading,execute} = useArticle(id,auto_load)
  const {data:comments} = useComments(id)
  const {data:author} = useAuthor(article?.authorId)
  if(error){
    return 'Failed'
  }else if(auto_load && (!article || loading)){
    return 'Loading...'
  }
    return (
      <div>
          {!auto_load && <button onClick={execute}>Click to load</button>}
          <h1>{article?.name}</h1>
          <h2>Author:{author?.name}</h2>
          <p>{article?.content}</p>
          <CommentList data={comments || []}/>
      </div>
    );
}
export default ArticleView