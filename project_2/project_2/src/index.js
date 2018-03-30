import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './header.css'
import './CourseAPI.css';

import App from './App';
import Header from './header';
import CourseAPI from './CourseAPI';


import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
/*ReactDOM.render(<Header />, document.getElementById('root'));
 */
registerServiceWorker();