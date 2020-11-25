import React from 'react';
import { Button, Point } from '@kimfrost/shared';
import logo from './logo.svg';
import './App.css';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Button>Findme</Button>
                <Point id="test" left={0} top={0}>findme popint</Point>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
