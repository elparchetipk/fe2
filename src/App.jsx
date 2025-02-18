// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LibraryProvider } from './context/LibraryContext';
import { UIProvider } from './context/UIContext';
import Layout from './components/Layout';
import Routes from './Routes';
import NotificationSystem from './components/Notifications/NotificationSystem';

const App = () => {
  return (
    <Router>
      <UIProvider>
        <LibraryProvider>
          <Layout>
            <Routes />
            <NotificationSystem />
          </Layout>
        </LibraryProvider>
      </UIProvider>
    </Router>
  );
};

export default App;