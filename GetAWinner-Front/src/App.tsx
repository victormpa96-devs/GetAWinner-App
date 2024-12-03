import React from 'react';
import Main from './components/main';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/users/login';
import Signup from './components/users/signup';
import Winner from './components/competitors/winner';


function App() {

  return (
    <Router>
      <div id='content'>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/competitors" element={<CompetitorsPage />} />
          <Route path="/winner" element={<WinnerPage />} />
        </Routes>
      </div>
    </Router>
  )
  
}

function LoginPage(){
  return (
    <React.Fragment>
      <Login />
    </React.Fragment>
  )  
}

function RegisterPage(){
  return (
    <React.Fragment>
       <Signup />
    </React.Fragment>
  )
}

function CompetitorsPage(){
  return (
    <React.Fragment>
       <Main />
    </React.Fragment>
  )
}

function WinnerPage(){
  return (
    <React.Fragment>
       <Winner />
    </React.Fragment>
  )
}




export default App;
