// src/App.js
import React from 'react';
import './App.css';
import Header from './components/Header/Header';
// Example page import
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      {/* Header Section */}
      <Header />
      
      {/* Main Content Section */}
      <main>
        <Home />
      </main>

      {/* Footer Section */}
      <footer>
        <p>© 2024 Garcia Family Medicine. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
