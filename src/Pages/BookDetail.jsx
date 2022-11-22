
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



let host = 'https://bookmanagement-project-3-production-f5d6.up.railway.app'

function BookDetail() {

  const [data, setData] = useState({})
  const [review, setReview] = useState([])
  const [reviewId, setReviewId] = useState('')
  const [updatereview, setUpdatereview] = useState({ rating: '', reviewedBy: '', review: '' })


  let { bookId } = useParams()


  // Get Book Api call /// 
  const getBook = async () => {

    const res = await axios(`${host}/books/${bookId}`, { headers: { 'x-api-key': localStorage.getItem('token') } })
    // console.log(res.data)
    setReview(res.data.reviews)
    setData(res.data.data)
  }

  // render first time
  useEffect(() => {
    getBook()
  }, [])


  const ReviewData = (e) => {
    setUpdatereview({ ...updatereview, [e.target.name]: e.target.value })
  }

  // update review Api call ///
  const updateReview = () => {
    axios.put(`${host}/books/${bookId}/review/${reviewId}`, updatereview, {
      headers: {
        'x-api-key': localStorage.getItem('token')
      }
    }).then(res => {
      toast.success('Review Updated successfully')
      getBook()
      setUpdatereview({ rating: '', reviewedBy: '', review: '' })
    }).catch(err => {
      // console.log(err)
      toast.error(err.response.data.message)
    })
  }

  // Delete Review Api call ///
  const DeleteReview = async (id) => {
    let rem = await axios.delete(`${host}/books/${bookId}/review/${id}`).then(res => {
      toast.success('delete')
      getBook()
    }).catch(err => {
      console.log(err)
    })
  }

  // console.log(review)

  return (
    <>
      <ToastContainer />
      {/* <!------------------------ Modal -----------------> */}
      {<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="exampleModalLabel">Update review</h5>
              <button type="button" className="btn-outline-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form >
                <div className="mb-3">
                  <input type="text" name='rating' value={updatereview.rating} onChange={ReviewData} placeholder='rating' className="form-control" />
                </div>
                <div className="mb-3">
                  <input type="text" name='reviewedBy' value={updatereview.reviewedBy} onChange={ReviewData} placeholder='reviewedBy' className="form-control" />
                </div>
                <div className="mb-3">
                  <input type="text" name='review' value={updatereview.review} onChange={ReviewData} placeholder='review' className="form-control" />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={() => updateReview()} className="btn btn-outline-primary">Update</button>
            </div>
          </div>
        </div>
      </div>}


      {/* <------------------ Book detail ----------------------------->  */}
      <div className='container'>

        <div className="jumbotron">
          <h1 className="display-4" >BookCover Image!</h1>
          <img className="d-block w-100" src="https://source.unsplash.com/1000x200/?Book,novel" alt="First slide" />
          <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr className="my-4" />
          <p>It uses utility class for typography and spacing to space content out within the larger container.</p>
        </div>
        {/* /// Book detail css */}
        <div className="text-center">
          <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <main role="main" className="inner cover">
              <h1 className="cover-heading">  Title :- {data.title} </h1>
              <h3 className=" fw-bold" > Excerpt :- {data.excerpt}</h3>
              <h5 className=" fw-bold" > ISBN :- {data.ISBN}</h5>
              <h5 className=" fw-bold"> Category :- {data.category}</h5>
              <h5 className=" fw-bold"> Released Date :-{moment(data.releasedAt).utc().format('DD/MM/YYYY')} </h5>
              <h5 className=" fw-bold" > No reviews :-  {data.reviews}</h5>
              <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
            </main>

            {/* <------------------ review detail ----------------------------->  */}
            <div>
              {review.length != 0 ? review.map((acc) => (
                <>
                  <div className="bg-dark text-secondary px-4 py-5 text-center shadow-lg p-3 mb-5 rounded " style={{ 'margin': '5rem 5rem' }} key={Date.now()}>
                    <h5 className=" fw-bold text-white">Rating :- {acc.rating}</h5>
                    <div className="col-lg-6 mx-auto">
                      <p className="fs-5 mb-4">Review :- {acc.review} </p>
                      <p className="fs-5 mb-4">Review by user :- {acc.reviewedBy} </p>
                      <p className="fs-5 mb-4">Date :- {moment(acc.reviewedAt).utc().format('DD/MM/YYYY')} </p>
                      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <button className="button btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setReviewId(acc._id) }} >Update review</button>
                        <button className="button btn btn-outline-light btn-lg px-4" onClick={() => DeleteReview(acc._id)} >Delete review</button>
                      </div>
                    </div>
                  </div>
                </>
              ))
                : <div className='shadow-lg p-3 mb-5 bg-white rounded' ><h1 >No Review</h1></div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookDetail
