import React, { useEffect, useState } from 'react'
import Article from './Article'


const Articles = () => {
  const [articles, setArticles] = useState([])
  useEffect(() => {
    fetch('http://localhost:4000/api/article/')
      .then(response => response.json())
      .then(data => setArticles(data.response))
  }, [])
  return (
    <>
      <h3 className="titleArticle">Aprendamos juntos!</h3>
      <div className="cardContainer">
        {articles.map(article => <Article article={article} key={article._id} />)}
      </div>
    </>
  )
}

export default Articles
