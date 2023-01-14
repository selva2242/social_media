import {  
  BrowserRouter as Router,  
  Route,
  Routes,  
}   
from 'react-router-dom';  
import Home from './pages/home';
import Post from './pages/post'
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import MenuBar from './pages/menuBar';
import Login from './pages/login';
import Register from './pages/register';
import './App.css'

function App() {
  return (
    <div className='App'>
      <Container>
        <Router>
        <MenuBar/>
          <Routes>
            <Route exact path='/' element={<Home/>}></Route>
            <Route exact path='/home' element={<Home/>}></Route>
            <Route path='/post' element={<Post/>}></Route>
            <Route exact path='/login' element={<Login/>}></Route>
            <Route exact path='/register' element={<Register/>}></Route>
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
