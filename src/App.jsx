
// import './App.css'

import Navbar from './components/Navbar'

import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import AddBook from "./Pages/Addbook";
import DisplayPage from './Pages/DisplayPage';
import BookDetail from './Pages/BookDetail';


function App() {

  return (

    <BrowserRouter>
      <Navbar title={'Book Management'} />
      <Routes>
        <Route path='/' element={localStorage.getItem('token') !== null ? <Home /> : <DisplayPage />} />
        <Route path='/books/:bookId' element={<BookDetail />} />
        <Route path='/addbook' element={<AddBook />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <footer className="mastfoot mt-auto text-center">
        <div className=" inner">
          <p >Cover template of <a href="https://Subham.com/">Book Management</a>, by <a href="https://twitter.com/mdo">@Subham </a> - 2022. &copy; All right reserved</p>
        </div>
      </footer>
    </BrowserRouter>
  )
}

export default App
