import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import SamuraiJSApp from './App';



ReactDom.render(
  <React.StrictMode>
    <SamuraiJSApp/>     
  </React.StrictMode>,
  document.getElementById('root')
);
