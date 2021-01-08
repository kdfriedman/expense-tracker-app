import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes/AppRoute';
import Modal from 'react-modal';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
// dependency to make Formik package work
import 'regenerator-runtime/runtime.js';
import wireUpAnalytics from './analytics/analytics-bootstrap';


Modal.setAppElement('#root');
ReactDOM.render(<AppRouter />, document.getElementById('root'));

// wire up analytics 
wireUpAnalytics();

