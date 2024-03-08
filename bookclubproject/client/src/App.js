
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Registration from './components/Registration';
import Books from './components/Books';
import UpdateBook from './components/Edit';
import Navbar from './components/Navbar';
import { useState } from 'react';


function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
    <Routes>
    <Route path='/' element={<Registration/>} />
    <Route path='/books' element={<Books currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
    <Route path='/books/:id' element={<UpdateBook/>} />
  </Routes>
  </div>
  );
}

export default App;
