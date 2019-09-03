import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TractionContent } from 'tt-frontend-components';

import './App.css';
import Home from './pages/Home';
import { getData } from './redux/action'

function App(props) {
  useEffect(() => {
    props.getData();
  }, [])
  return (
    <div className="App">
     <TractionContent ttContent='asdfadfa' />                
     <Home />
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
