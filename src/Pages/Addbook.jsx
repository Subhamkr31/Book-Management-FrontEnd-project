

import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function About() {


  const [bookCover1, setBookCover] = useState('');
  const [data, setData] = useState({ title: '', excerpt: '', ISBN: '', category: '', subcategory: '', releasedAt: '' })

  const changeHandler = (e) => {
    // console.log(e)
    setData({ ...data, [e.target.name]: e.target.value })
  }

  /// Create Book Api
  const SubmitButton = async (e) => {

    data.userId = JSON.parse(localStorage.getItem('userId'))._id

    let formdata = new FormData()
    
    // console.log('myfile', bookCover[0])
    formdata.append('myfile', bookCover1[0])
    formdata.append('title', data.title)
    formdata.append('excerpt', data.excerpt)
    formdata.append('ISBN', data.ISBN)
    formdata.append('category', data.category)
    formdata.append('subcategory', data.subcategory)
    formdata.append('releasedAt', data.releasedAt)
    formdata.append('userId', data.userId)

    let host = 'http://localhost:3000'
    // let host = 'https://bookmanagement-project-3-production-d358.up.railway.app'

    await axios.post(`${host}/books`, formdata, { headers: { 'x-api-key': localStorage.getItem('token') } }).then((res) => {
      // console.log(res.data)
      setData({ title: '', excerpt: '', ISBN: '', category: '', subcategory: '', releasedAt: '' })
      setBookCover({ bookCover: '' })
      toast.success('Book added successfully')

    }).catch(err => {
      console.log(err)
      toast.error(err.response.data.message)
    })
  }


  // console.log(myfiles)

  return (
    <div className='container' >
      <ToastContainer />
      <form className='shadow p-3 mb-5 bg-body rounded' style={{ 'margin': '10rem ' }}>

        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">Insert Image here</label>
          <input className="form-control" name='myfile' onChange={(e) => setBookCover(e.target.files)} type="file" id="formFile" />
        </div>

        <div className="mb-3">
          <input type="text" name='title' placeholder='title' className="form-control" value={data.title} onChange={changeHandler} />
        </div>
        <div className="mb-3">
          <input type="text" name='excerpt' placeholder='excerpt' className="form-control" value={data.excerpt} onChange={changeHandler} />
        </div>
        <div className="mb-3">
          <input type="text" name='ISBN' placeholder='ISBN Ex: 978-1-4098-8462-6' className="form-control" value={data.ISBN} onChange={changeHandler} />
        </div>
        <div className="mb-3">
          <input type="text" name='category' placeholder='category' className="form-control" value={data.category} onChange={changeHandler} />
        </div>
        <div className="mb-3">
          <input type="text" name='subcategory' placeholder='subcategory' className="form-control" value={data.subcategory} onChange={changeHandler} />
        </div>
        <div className="mb-3">
          <input type="date" name='releasedAt' placeholder='releasedAt' className="form-control" value={data.releasedAt} onChange={changeHandler} />
        </div>

        <button className='btn btn-primary' type='Submit' onClick={(e) => { e.preventDefault(); SubmitButton() }}>Submit</button>
      </form>
    </div>
  )
}

export default About
