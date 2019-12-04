import React from 'react';
import './App.css';
import Header from './Container/Header/Header';
import Container from '@material-ui/core/Container';
import Main from './Container/Main/Main';
import Advanced from './Container/Advanced/Advanced';
import Boost from './Container/Boost/Boost';
import Footer from './Container/Footer/Footer';
function App() {
  return (
    <div className="App">
      <Container fixed>
        <Header />
        <Main />
      </Container>
      <Advanced />
      <Boost />
      <Footer />
    </div>
  );
}

export default App;
