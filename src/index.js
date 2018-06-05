import React from 'react';
import ReactDOM from 'react-dom';
import Home from './component/Home';
import {Provider} from 'react-redux';
import Login from './component/Login';
import registerServiceWorker from './registerServiceWorker';
import Cart from './component/Cart';
import Product from './component/Product';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Checkout from './component/Checkout';


var username = (state = null, action) => {
    switch (action.type){
        case 'LOG_IN':
            return action.username;
        case 'LOG_OUT':
            return null;
        default:
            return state;
    }
}

var token = (state = null, action) => {
    switch (action.type){
        case 'TOKEN':
            return action.token;
        case 'TOKEN_OUT':
            return null;
        default:
            return state;
    }
}

var urlProduct = (state = null, action) => {
    switch (action.type){
        case 'URL':
            return action.url;
        case 'URL_OUT':
            return null;
        default:
            return state;
    }
}

var redux = require('redux');
var reducer = redux.combineReducers ({username, token, urlProduct});
var store = redux.createStore(reducer);

// console.log(store.getState());
//store.dispatch({type: 'LOG_IN',username: 'sang'});
//console.log(store.getState());
// store.dispatch({type: 'LOG_OUT'});
// console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/cart' component={Cart} />
                        <Route exact path='/checkout' component={Checkout} />
                        <Route exact path='/product' component={Product} />
                    </Switch>
            </div>
        </Router>
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
