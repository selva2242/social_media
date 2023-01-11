import {  
  BrowserRouter as Router,  
  Route,
  Routes,  
}   
from 'react-router-dom';  
import Home from './pages/home';
import Post from './pages/post'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path="/post" element={<Post/>}></Route>
        </Routes>

      </Router>
    
    </div>
  );
}

export default App;
