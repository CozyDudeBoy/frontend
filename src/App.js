
import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Users from './component/Users';
import Main from './component/Main';
import UsersCreate from './component/UsersCreate';
import UsersUpdate from './component/UsersUpdate';
import Fruits from './component/Fruits';
import Fruitscreate from './component/Fruitscreate';
import FruitsUpdate from './component/FruitsUpdate';
import BookStore from './component/BookStore';
import BookStoreCreate from './component/BookStoreCreate';
import BookStoreUpdate from './component/BookStoreUpdate';
import Noodle from './component/Noodle';
import NoodleCreate from './component/NoodleCreate';
import NoodleUpdate from './component/NoodleUpdate';
import Question from './component/Question';
import Login from './component/Login';
import Join from './component/Join';
import {AlertContext, AlertProvider} from './component/AlertContext';
import React from 'react';


function Appcontent() {
  const {fruitsCount} = React.useContext(AlertContext);
  const {bookCount} = React.useContext(AlertContext);
  const {noodleCount} = React.useContext(AlertContext);
  const badgeStyle = {
    display: 'inline-block',
    marginLeft:6,
    background:'red',
    color:'white',
    borderRadius:'50%',
    width:22,
    height:22,
    fontSize:14,
    textAlign:'center',
    lineHeight:'22px',
    fontWeight:'bold'
  }
  return (
    <>
      <BrowserRouter>
        <header>
          <h1>Frontend-메인</h1>
          <nav>
          <Link to='/'>HOME</Link>
          <Link to='users'>USERS</Link>
          <Link to='fruits'  >FRUITS { fruitsCount > 0 &&(
            <span style={badgeStyle}>
              {fruitsCount}
            </span>
          )
          }</Link>
          <Link to='bookstore'>BOOKS{bookCount > 0&&(
            <span style={badgeStyle}>{bookCount}</span>
          )}</Link>
          <Link to='noodle'>NOODLE{noodleCount>0&&(
            <span style={badgeStyle}>{noodleCount}</span>
          )}
          
          </Link>
          <Link to='question'>Contect Us</Link>
          <Link to='login'>Login</Link>
          <Link to='join'>Join</Link>
          </nav>
        </header>

        <Routes>
          <Route path='/'element={<Main/>}/>
          <Route path='/users'element={<Users/>}/>
          <Route path='/users/userscreate'element={<UsersCreate/>}/>
          <Route path='/users/usersupdate/:user_no'element={<UsersUpdate/>}/>
          <Route path='/fruits'element={<Fruits/>}/>
          <Route path='/fruits/fruitscreate'element={<Fruitscreate/>}/>
          <Route path='/fruits/fruitsUpdate/:num'element={<FruitsUpdate/>}/>
          <Route path='/bookstore'element={<BookStore/>}/>
          <Route path='/bookstore/bookstorecreate' element={<BookStoreCreate/>} />
          <Route path='/bookstore/bookstoreupdate/:num'element={<BookStoreUpdate/>}/>
          <Route path='/noodle'element={<Noodle/>}/>
          <Route path='/noodle/noodlecreate'element={<NoodleCreate/>}/>
          <Route path='/noodle/noodleupdate/:num'element={<NoodleUpdate/>}/>
          <Route path='/question'element={<Question/>}/>
          <Route path='/login'element={<Login/>}/>
          <Route path='/join'element={<Join/>}/>



        </Routes>

      </BrowserRouter>
    </>
  );
}
function App() {
  return(
    <AlertProvider>
      <Appcontent/>
    </AlertProvider>
  )
}

export default App;
