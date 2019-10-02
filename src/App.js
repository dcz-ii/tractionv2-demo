import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useSubscription } from "react-apollo-hooks";
import gql from "graphql-tag";

import './App.css';
import Home from './pages/Home';
import { getData } from './redux/action'

function App(props) {
  useEffect(() => {
    props.getData();
  }, [])

  const NEW_USER_SUB = gql`subscription {
    newUser {
      id
      username
      firstLetterOfUsername
      todo {
        task
        completed
      }
    }
  }`

  const { data, loading } = useSubscription(
    NEW_USER_SUB
  );

  console.log(loading)

  return (
    <div className="App">
     <Home />
      {loading ? '...' :  data}
    </div>
  );
}

const mapStateToProps = store => {
	return {
		globalReducer: store.globalReducer,
	};
};

const mapActionToProps = {
  getData,
};

export default connect(mapStateToProps,mapActionToProps)(App);
