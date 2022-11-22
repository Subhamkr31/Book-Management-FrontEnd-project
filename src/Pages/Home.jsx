

import React ,{ useState , useEffect } from 'react'
import Cart from './Cart';


function Home() {

  const [bookdata, setBookdata] = useState([])

  // Get Book Api call //
  const getBook = () => {
    fetch('https://bookmanagement-project-3-production-f5d6.up.railway.app/books', {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': localStorage.getItem('token')
      }
    }).then(res => res.json()).then((data) => {
      setBookdata(data.data)
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    getBook()
  }, [])
  
// console.log(bookdata)

  return (
    <>
      <div style={{'display':'flex',"flexWrap":'wrap',"justifyContent":'space-around'}}>
        { bookdata && bookdata.map((ele,index) => (
           <div  key = {index} ><Cart bookCover={ele.bookCover} category ={ele.category} review= {ele.reviews} title ={ele.title} excerpt ={ele.excerpt} name = {ele.userId.name} userid = {ele.userId._id} bookId ={ele._id} getBook= {getBook}/></div> 
        ))}
      </div>
    </>
  )
}

export default Home
