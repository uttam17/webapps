import React, { Component } from 'react';
import Header from './header.js';
import CourseAPI from './CourseAPI.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
        <Header />
        <CourseAPI />
     </div>
        );
    }
}

export default App;