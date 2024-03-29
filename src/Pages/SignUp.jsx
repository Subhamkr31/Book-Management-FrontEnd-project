
import React, { useState } from 'react'
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {
    const [data, setData] = useState({email:'' , password:'',name:'',phone:'',street:'',city:'',pincode:'',title:''});
    const navigate = useNavigate()

    const changeHandler = (e) =>{
        setData({...data, [e.target.name] : e.target.value});
    }

    let host = 'http://localhost:3000'
    // https://bookmanagement-project-3-production-d358.up.railway.app/register
    // Create User Post Api call ///
    const submit = () =>{
        data.address = {
            street : data.street,
            city : data.city,
            pincode : data.pincode
        }
        delete data.city;
        delete data.street;
        delete data.pincode;
        axios.post(`${host}/register`,data).then(res => {
            navigate('/login');
            toast.success(res.data.message);
            // console.log(res.data.message)
            
            setData({email:'' , password:'',name:'',phone:'',street:'',city:'',pincode:'', title:'Mr'})
        }).catch(err =>{ 
            console.log(err);
            toast.error(err.response.data.msg)
        });
           
    }
  return (
    <>
     <div className="signup" style={{ 'margin': '6rem 5rem'}}>
     <ToastContainer/>
        <form className='shadow p-3 mb-5 bg-body rounded'>
            <select className="form-select mb-3" value={data.title} name='title' onChange={changeHandler} >
            <option selected value="choose">Choose one </option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
            </select>
            <div className="mb-3">
                <input type="text" onChange={changeHandler} name='name' value={data.name} placeholder='Name'  className="form-control" />
            </div>
            <div className="mb-3">
                <input type="email" onChange={changeHandler} name='email' value={data.email}  placeholder='Email' className="form-control" />
            </div>
            <div className="mb-3">
                <input type="password" onChange={changeHandler} name='password' value={data.password} placeholder='Password'  className="form-control" />
            </div>
            <div className="mb-3">
                <input type="number" onChange={changeHandler} name='phone' value={data.phone} placeholder='Phone'  className="form-control" />
            </div>
            <div className="mb-3">
                <input type="text" onChange={changeHandler} name='street' value={data.street} placeholder='Street'  className="form-control" />
            </div>
            <div className="mb-3">
                <input type="text" onChange={changeHandler} name='city' value={data.city} placeholder='City'  className="form-control" />
            </div>
            <div className="mb-3">
                <input type="number" onChange={changeHandler} name='pincode' value={data.pincode} placeholder='Pincode'  className="form-control" />
            </div>
           <button type="submit" onClick={(e)=> { e.preventDefault(); submit() }} className="btn btn-primary">Submit</button>
        </form>
     </div>   
    </>
  )
}

export default SignUp
