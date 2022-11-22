

import React, { useState, useEffect } from 'react'
import Cart from './Cart';


function Home() {

  const [bookdata, setBookdata] = useState([])
  const [loading, setLoading] = useState(false)

  // Get Book Api call //
  const getBook = () => {
    setLoading(true)
    fetch('https://bookmanagement-project-3-production-f5d6.up.railway.app/books', {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': localStorage.getItem('token')
      }
    }).then(res => res.json()).then((data) => {
      setBookdata(data.data)
      setLoading(false)
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    getBook()
  }, [])

  // console.log(bookdata)

  return (
    <>
      {
        loading == true ? <div style={{'display': 'flex','justifyContent': 'center', 'alignItems': 'center', 'height': '90vh'
          }}><div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div></div> : <div style={{ 'display': 'flex', "flexWrap": 'wrap', "justifyContent": 'space-around' }}>
          {bookdata && bookdata.map((ele, index) => (
            <div key={index} ><Cart bookCover={ele.bookCover} category={ele.category} review={ele.reviews} title={ele.title} excerpt={ele.excerpt} name={ele.userId.name} userid={ele.userId._id} bookId={ele._id} getBook={getBook} /></div>
          ))}
        </div>

      }
    </>
  )
}

export default Home
