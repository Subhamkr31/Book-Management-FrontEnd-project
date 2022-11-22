

import axios from 'axios'
import React, { useRef } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function About() {

  const fileInput = useRef()
  const [files, setFile] = useState('');
  const [data, setData] = useState({ title: '', excerpt: '', ISBN: '', category: '', subcategory: '', releasedAt: '' })

  const changeHandler = (e) => {
    // console.log(e)
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const fileHandler = _ => {
    console.log(fileInput.current.files[0].name)
    setFile(fileInput.current.files[0].name);
  }

  /// Create Book Api
  const SubmitButton = (e) => {
    fileHandler();
    data.userId = JSON.parse(localStorage.getItem('userId'))._id
    data.bookCover = files;

    // console.log(data)
    axios.post('http://localhost:3000/books', data, { headers: { 'x-api-key': localStorage.getItem('token') } }).then(res => {
      // console.log(res.data)
      setData({ title: '', excerpt: '', ISBN: '', category: '', subcategory: '', releasedAt: '' })
      toast.success('Book added successfully')

    }).catch(err => {
      console.log(err)
      toast.error(err.response.data.message)
    })
  }



  return (
    <div className='container' >
      <ToastContainer />
      <form className='shadow p-3 mb-5 bg-body rounded' style={{ 'margin': '10rem ' }}>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">Default file input example</label>
          <input className="form-control" name='file' ref={fileInput} type="file" id="formFile" />
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
