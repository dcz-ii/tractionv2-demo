import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './redux/reducer'
import rootSaga from './redux/saga/rootSaga'

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: []
  }
  
const persistedRecuder = persistReducer(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedRecuder, applyMiddleware(sagaMiddleware));

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI
  });

ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Provider>,
document.getElementById('root'));

sagaMiddleware.run(rootSaga);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
