import './header.css';
import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <div class="container">
	      <div class="row justify-content-start">
		      <div class="col">
		        <img src="BULogo_Blue.png"/>
		      </div>
		      <div class="col">
		        <h1>Uttam Kumaran</h1>
		      </div>
		      <div class="col">
		        <h1>Bucknell Web Apps</h1>
		      </div>
	      </div>
    </div>
        );
    }
}