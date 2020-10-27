import './App.css';
import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import ShowAll from './pages/ShowAll.js';
import New from './pages/New.js';
import Index from './pages/Index.js';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import ShowStudent from './pages/student/showStudent.js';
import Edit from './pages/EditPerson.js';
import Error from './pages/Error.js';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/show" component={ShowAll} />

            <Route path="/index" component={Index} />
            <Route path="/new" component={New} />
            <Route path="/id:id" component={ShowStudent} />
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
