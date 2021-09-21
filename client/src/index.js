import React from 'react';
import ReactDOM from 'react-dom';
import 'dragula/dist/dragula.css'
import './index.css'

import Header from './components/header.jsx';
import Content from './components/content.jsx';
import Footer from './components/footer.jsx';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import store from './reducers';

ReactDOM.render(
    <React.StrictMode>
	<Provider store={store}>
	    <Header />
	    <Content />
	    <Footer />
	</Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
