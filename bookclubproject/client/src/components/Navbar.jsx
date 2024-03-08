import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar({currentUser, setCurrentUser}) {
    const navigate=useNavigate()
    const handleLogout = () => {
        localStorage.clear();
        setCurrentUser('')
        navigate('/');
      };

  return (
    <>
    <h1>Welcome : {currentUser?.firstName}</h1>
      <div>
         {currentUser&& <button onClick={handleLogout}>log out</button>}
      </div>
    </>
  )
}

export default Navbar