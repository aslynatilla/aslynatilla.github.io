import React from 'react';
import logo from './Antonio_trim_transparent.png';
import './App.css';
import { Card, CardMedia } from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Card classes="App-rework-portrait">
          <CardMedia component="img" image={logo} alt="Author's pixel-art portrait" />
        </Card>
        <p>
          Website is being reworked.
        </p>
        <p>
          Please be patient and <code>await</code> its return!
        </p>
      </header>
    </div >
  );
}

export default App;
