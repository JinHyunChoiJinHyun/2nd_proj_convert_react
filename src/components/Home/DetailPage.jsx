import React from 'react'
import NewsList from './NewsList'

const DetailPage = ({coin}) => {
  return (
    <div className='container'>
      <h2>{coin}디테일 페이지입니다.</h2>
      <NewsList coin={coin}/>
    </div>
  )
}

export default DetailPage
