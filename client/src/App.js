import './App.css';
import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import ShowAll from './pages/GetAllUsers.js';
import NewUser from './pages/NewUser.js';
import Index from './pages/Index.js';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import ShowStudent from './pages/student/showStudent.js';
import Edit from './pages/EditPerson.js';
import Error from './pages/Error.js';
import GetAllUsers from './pages/GetAllUsers.js';
import LogIn from './pages/LogIn.js';
import ShowProfile from './pages/ShowProfile.js';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/users" component={GetAllUsers} />

            <Route path="/index" component={Index} />
            <Route path="/login" component={LogIn} />
            <Route path="/newUser" component={NewUser} />
            <Route path="/id:id" component={ShowStudent} />
            <Route path="/profile:id" component={ShowProfile} />
            <Route path="/edit:id" component={Edit} />
            <Route path="/*" component={Error} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    </>
  );
}

export default App;
