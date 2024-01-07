import './App.css';
import { Button } from 'react-bootstrap';
import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import LogTable from './components/Logger/LogTable';
import { listApps } from './actions/appsAction';


function App() {
  const dispatch = useDispatch();
  //const apps = useSelector(state => state.apps.data);

  useEffect(() => {
    dispatch(listApps());
  }, [dispatch]);


  return (
    <div className="App m-5">
        <h3>DashLog</h3>
        <hr></hr>
        <LogTable />
    </div>
  );
}

export default App;
