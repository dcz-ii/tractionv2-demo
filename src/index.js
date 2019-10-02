import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache, split } from "apollo-boost";
import { getMainDefinition } from "apollo-utilities";
import { createHttpLink } from "apollo-link-http";

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

const httpLink = createHttpLink({
	uri: 'http://localhost:4000/graphql',
	credentials: "include"
  });

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
	reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({ link, cache: new InMemoryCache() });

ReactDOM.render(
	<Provider store={store}>
		<ApolloProvider client={client}>
			<ApolloHooksProvider client={client}>
				<App />
			</ApolloHooksProvider>
		</ApolloProvider>
	</Provider>,
document.getElementById('root'));

sagaMiddleware.run(rootSaga);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
