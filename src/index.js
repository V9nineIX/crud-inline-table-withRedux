import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers/formReducer'



const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : [];
let store = createStore(rootReducer , persistedState);

store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
 })

ReactDOM.render( <Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
