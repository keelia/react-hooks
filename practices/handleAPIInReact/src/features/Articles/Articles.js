import React, { useState } from "react";
import ArticleView from "./ArticleView";
import { useArticles } from "./useArticles";

/**
 * 1. let parent component to pass value, instead of creating an internal state in PriceInput
 * 2. onChange event change the value from parent directly, let parent passing new value back to PriceInput
 */
export default function Articles() {
    const {data,error,loading} = useArticles();
    const [selectedArticle,setSelectedArticle] = useState();
    if(error){
      return 'Failed'
    }else if(!data || loading){
      return 'Loading Articles...'
    }
    return (
      <div className="articles">
        <ul className="sidenav">
          {data?.map(article=><li key={article.id} className={selectedArticle?.id ===article.id ? 'selected':"" } onClick={_=>(setSelectedArticle(article))}>{article.name}</li>)}
        </ul>
        <div className="main">
          {selectedArticle ? <ArticleView id={selectedArticle?.id}/> : 'Please select an article.'}
        </div>
      </div>
    );
  }