import React, { Component } from 'react';
import './App.css';
import './styles/bootstrap.min.css';
import './styles/style.css';
import './App.css';
import Router  from  './components/common/Router';

import Header from './components/common/header';
import Footer from './components/common/footer';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <div className="container-fluid">
        <Header />
          <Router />
        <Footer />
        </div>
      </div>
    );
  }
}

export default App;