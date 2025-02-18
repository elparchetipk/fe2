// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LibraryProvider } from './context/LibraryContext';
import Layout from './components/Layout';
import Routes from './Routes';

const App = () => {
  return (
    <Router>
      <LibraryProvider>
        <Layout>
          <Routes />
        </Layout>
      </LibraryProvider>
    </Router>
  );
};

export default App;