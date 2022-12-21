
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginScreen from './Components/Login/LoginComponent';
import RegisterScreen from './Components/Signup/SignUp';
import AddExpensesComponent from './Components/AddExpenses/AddExpenses';
import ViewExpensesComponent from './Components/ViewExpenses/ViewExpenses';
import AnalyticsComponent from './Components/Analytics/Analytics';
import MainComponent from './Components/MainPage/MainComponent';

function App() {

  return (
    <Router>
      <Routes>
        {/* <Route exact path='/' element={<MainComponent/>}></Route> */}
        <Route exact path='/' element={<LoginScreen/>}></Route>
        <Route exact path='/register' element={<RegisterScreen/>}></Route>
        <Route exact path='/viewExpenses' element={<ViewExpensesComponent/>}></Route>
        <Route exact path='/addExpenses' element={<AddExpensesComponent/>}></Route>
        <Route exact path='/analytics' element={<AnalyticsComponent/>}></Route>
      </Routes>
    </Router>

  );
}

export default App;