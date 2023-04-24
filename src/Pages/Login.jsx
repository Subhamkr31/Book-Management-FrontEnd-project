import React ,{ useState } from 'react'
import axios from 'axios'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const [data, setData] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const Handler = (e) => {
    console.log(e)
    setData({ ...data, [e.target.name]: e.target.value }) // e.target.name
  }

  let host = 'http://localhost:3000'
  // https://bookmanagement-project-3-production-d358.up.railway.app/login
  // Login Api call ///
  const Submit = () => {
    axios.post(`${host}/login`, data).then(res => {
      navigate('/')

      localStorage.setItem('token', res.data.data.token)
      localStorage.setItem('userId', JSON.stringify(res.data.isUser))
      setData({ email: '', password: '' })
      window.location.reload()
    }).catch(err => {
      console.log(err)
      toast.error(err.response.data.message);
    });
  }


  return (
    <>
      <ToastContainer />
      <div className="formman">
        <form className='from'>
          <div className="mb-3 shadow-lg p-3 mb-5 bg-white rounded">
            <input type="email" className="form-control" name='email' value={data.email}
              onChange={Handler} placeholder='Email' />
          </div>
          <div className="mb-3 shadow-lg p-3 mb-5 bg-white rounded">
            <input type="password" className="form-control" name='password' value={data.password}
              onChange={Handler} placeholder='Password' />

          </div>

          <button className="btn btn-primary" onClick={(e) => {
            e.preventDefault();
            Submit();
          }}>Submit</button>
        </form>
        <div>
          <button style={{ 'marginLeft': '18rem' }} className="btn btn-outline-primary" type="submit"> <Link to='/signup'>Sign Up</Link></button>
        </div>
      </div>
    </>
  )
}

export default Login

