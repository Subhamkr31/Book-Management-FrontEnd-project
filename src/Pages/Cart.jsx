

import React, { useRef } from 'react'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let host = 'https://bookmanagement-project-3-production-f5d6.up.railway.app'

function Cart({ name, review, category, title, userid, excerpt, bookId, getBook, bookCover }) {
    const navigate = useNavigate()
    let ref = useRef('')

    const [update, setUpdate] = useState({ title: '', excerpt: '', ISBN: '', releasedAt: '' })
    const [reviewdata, setReviewdata] = useState({ reviewedBy: '', rating: '', review: '' })


    const UpdateBookData = (e) => {
        setUpdate({ ...update, [e.target.name]: e.target.value })
    }

    // update book Api call ////
    const submitBook = (res) => {
        const response = axios.put(`${host}/books/${localStorage.getItem('id')}`, update, {
            headers: {
                'x-api-key': (localStorage.getItem('token')),
                'Content-Type': 'application/json'
            }
        }).then(res => {
            localStorage.setItem('id', '')
            toast.success('Book Updated successfully')
            getBook()
        }).catch(err => {
            toast.error(err.response.data.message)
        })

    }

    // console.log(bookId)
    const updateBook = () => {
        ref.current.click();
    }

 
    // Delete book Api call ////
    const DeleteBook = () => {
        const res = fetch(`${host}/books/${bookId}`, {
            method: 'DELETE',
            headers: {
                'x-api-key': (localStorage.getItem('token')),
                'Content-Type': 'application/json'
            }
        }).then(res => {
            toast.success('Deleted successfully')
            getBook()
        })
    }


    const getreview = (e) => {
        setReviewdata({...reviewdata , [e.target.name] : e.target.value})
    }

    /// Review Api call //
    const reviewsubmit = () => {

        axios.post(`${host}/books/${localStorage.getItem('bookid')}/review` , reviewdata)
        .then(res => {
            console.log(res)
            setReviewdata({ reviewedBy: '', rating: '', review: '' })
            toast.success('Review added successfully')
            getBook()
        }).catch(err => {
            toast.error(err.response.data.message)
        })

    }

    return (

        <>
        <ToastContainer /> 
            {/* <!-- Modal Update Book --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">Update book</h5>
                            <button type="button" className="btn-outline-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form >
                                <div className="mb-3">
                                    <input type="text" name='title' value={update.title} onChange={UpdateBookData} placeholder='title' className="form-control" />
                                </div>
                            </form>
                            <form >
                                <div className="mb-3">
                                    <input type="text" name='excerpt' value={update.excerpt} onChange={UpdateBookData} placeholder='excerpt' className="form-control" />
                                </div>
                            </form>
                            <form >
                                <div className="mb-3">
                                    <input type="text" name='ISBN' value={update.ISBN} onChange={UpdateBookData} placeholder='ISBN' className="form-control" />
                                </div>
                            </form>
                            <form >
                                <div className="mb-3">
                                    <input type="date" name='releasedAt' value={update.releasedAt} onChange={UpdateBookData} placeholder='releasedAt' className="form-control" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={() => submitBook()} className="btn btn-outline-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- review Modal--> */}   
           { <div className="modal fade" id="funModal" tabIndex="-2" aria-labelledby="funModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="funModalLabel">Give Review</h5>
                            <button type="button" className="btn-outline-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">review</label>
                                <input type="text" name = 'review' value={reviewdata.review} onChange={getreview} className="form-control" id="exampleFormControlInput1" placeholder="" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label" >reviewedBy</label>
                                <input type="text"  name = 'reviewedBy' value={reviewdata.reviewedBy} onChange= {getreview} className="form-control" id="exampleFormControlInput1" placeholder="" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label" >rating</label>
                                <input type="text"  name = 'rating' value={reviewdata.rating} onChange= {getreview} className="form-control" id="exampleFormControlInput1" placeholder="" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={() => {reviewsubmit()}} className="btn btn-outline-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>}


            {/* --------------Book Data frontend----------------- */}
            <div  >
                <div className="card" style={{ 'width': '20rem', 'height': '33rem', 'margin': '20px', }} >
                    <div>
                        <img src={bookCover ? bookCover :`https://source.unsplash.com/300x300/?Book,Reactbook` } className="card-img-top" alt="no imae" style={{ "width": "270px", "height": "275px", 'cursor': 'pointer' }} onClick={() => navigate(`/books/${bookId}`)} />
                    </div>
                    <div className="card-body" >
                        <h5 className="card-text" style={{'fontStyle': 'italic'}}>  written by - {name} </h5>
                       <strong>
                        <p> title  - {title} </p>
                        <p> category  - {category} </p>
                        <p> review  :- {review} </p>
                        </strong>
                        <div className="d-flex ">
                            {JSON.parse(localStorage.getItem('userId'))._id == userid ?
                                <>
                                    {/* {console.log('ddddd', JSON.parse(localStorage.getItem('userId'))._id, userid)} */}
                                    <button type="button"  ref={ref} className="btn btn-info btn-sm " onClick={() => { localStorage.setItem('id', bookId) }}  data-bs-toggle="modal" data-bs-target="#exampleModal" >
                                        Update
                                    </button>
                                    <button type="button" onClick={DeleteBook} className="btn btn-secondary mx-3 " >
                                        Delete
                                    </button>
                                </>
                                : ''
                            }
                            <button type="button" data-bs-toggle="modal" data-bs-target="#funModal" className="btn btn-warning btn-sm" onClick={() => { localStorage.setItem('bookid', bookId) }}   >
                                Review
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Cart
