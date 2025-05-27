import React, {useEffect, useState} from 'react'

const NewsList = () => {
    const [titles, setTitles] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/api/news")
        .then(res => res.json())
        .then(data => {
            const onlyTitles = data.map(item => item.title);
            setTitles(onlyTitles)
        })
        .catch(err => console.error("뉴스 로딩 오류", err));
    }, [])
  return (
    <div>
        <h2>news</h2>          
        <ul>
            {titles.map((title, index) => (
                <li key={index}>{title}</li>
            ))}
        </ul>
    </div>
  )
}

export default NewsList
