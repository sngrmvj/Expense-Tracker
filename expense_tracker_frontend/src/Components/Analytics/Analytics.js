

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import React from 'react';
import axios from 'axios';


const AnalyticsComponent  = () => {

    const navigate = useNavigate();
    const [mustHaveDetails,setMustHaveDetails] = useState([]);
    const [niceToHaveDetails,setNiceToHaveDetails] = useState([]);
    const [expenseDetails,setExpenseDetails] = useState([]);

    const logout = () =>{
        localStorage.setItem('isLoggedIn',false);
        localStorage.removeItem('email');
        navigate("/")
    }
    const navigateToviewExpense = () =>{
        navigate("/viewExpenses");
    }


    const navigateToAddExpense = () =>{
        navigate("/addExpenses");
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [
            {
                ticks: {
                // The y-axis value will start from zero
                beginAtZero: true,
                },
            },
            ],
        },
        legend: {
            labels: {
            fontSize: 15,
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };
    
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    
    const data = {
        labels,
        datasets: [
            {
                label: '3 months expense graph',
                data: expenseDetails,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 0.5,
            },
            {
                label: '3 months nice to have graph',
                data: niceToHaveDetails,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderWidth: 0.5,
            },
            {
                label: '3 months must have graph',
                data: mustHaveDetails,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderWidth: 0.5,
            }
        ],
    };

    return (
        <div>
            <div className="App">
                <div className='navigation_bar'>
                    <ul>
                        <li> <span style={{fontSize:"20px",color:"#046FAA", marginRight:"18px"}}><b>Expense Tracker</b></span></li>
                        <li style={{color:"#046FAA",cursor:"pointer"}} onClick={navigateToviewExpense}><label>View Expense</label></li>
                        <li style={{color:"#046FAA",cursor:"pointer"}} onClick={navigateToAddExpense}><label>Add Expense</label></li>
                        <li style={{color:"#046FAA"}} ><label>Analytics</label></li>
                        <li style={{float:"right", color:"#046FAA"}} onClick={logout}><label>Logout</label></li>
                    </ul>
                </div>
            </div>

            <div style={{height:"600px", width:"600px"}}>
                <Bar data={data} options={options} />
            </div>
            
        </div>
    );

}


export default AnalyticsComponent;