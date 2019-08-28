import {createStore, applyMiddleware} from 'redux';
import reduxMiddleWare from 'redux-promise-middleware';
import reducer from './reducer';

export default createStore(reducer, applyMiddleware(reduxMiddleWare));