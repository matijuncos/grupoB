import React from 'react'
import Article from './Article'
const articles = [{
  title: 'Diferencia entre cerámica y porcelanato',
  pic: 'https://homesolution.net/blog/wp-content/uploads/2019/09/Porcelanato.jpg',
  url: 'https://www.todointeriores.com/diferencias-entre-ceramica-y-porcelanato/',
  description: 'Si estas pensando cambiar los pisos de tu casa...'
}, {
  title: 'Diferencia entre cerámica y porcelanato',
  pic: 'https://homesolution.net/blog/wp-content/uploads/2019/09/Porcelanato.jpg',
  url: 'https://www.todointeriores.com/diferencias-entre-ceramica-y-porcelanato/',
  description: 'Si estas pensando cambiar los pisos de tu casa...'
}, {
  title: 'Diferencia entre cerámica y porcelanato',
  pic: 'https://homesolution.net/blog/wp-content/uploads/2019/09/Porcelanato.jpg',
  url: 'https://www.todointeriores.com/diferencias-entre-ceramica-y-porcelanato/',
  description: 'Si estas pensando cambiar los pisos de tu casa...'
}, {
  title: 'Diferencia entre cerámica y porcelanato',
  pic: 'https://homesolution.net/blog/wp-content/uploads/2019/09/Porcelanato.jpg',
  url: 'https://www.todointeriores.com/diferencias-entre-ceramica-y-porcelanato/',
  description: 'Si estas pensando cambiar los pisos de tu casa...'
}, {
  title: 'Diferencia entre cerámica y porcelanato',
  pic: 'https://homesolution.net/blog/wp-content/uploads/2019/09/Porcelanato.jpg',
  url: 'https://www.todointeriores.com/diferencias-entre-ceramica-y-porcelanato/',
  description: 'Si estas pensando cambiar los pisos de tu casa...'
}, {
  title: 'Diferencia entre cerámica y porcelanato',
  pic: 'https://homesolution.net/blog/wp-content/uploads/2019/09/Porcelanato.jpg',
  url: 'https://www.todointeriores.com/diferencias-entre-ceramica-y-porcelanato/',
  description: 'Si estas pensando cambiar los pisos de tu casa...'
}]

const Articles = () => {
  return (
    <>
      <h3>Aprendamos juntos!</h3>
      <div className="cardContainer">
        {articles.map(article => <Article article={article} />)}
      </div>
    </>
  )
}

export default Articles
