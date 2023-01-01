

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCAL_URL } from '../../constants';
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
    const monthlyCount = {"01": "Jan","1":"Jan" ,"02":"Feb","2":"Feb", "03":"Mar","3":"Mar", "04":"Apr","4":"Apr", "05":"May","5":"May", "06":"Jun","6":"Jun", "07":"Sep","7":"Sep", "08":"Aug","8":"Aug", "09":"Sept","9":"Sept", "10":"Oct", "11":"Nov", "12":"Dec"}

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
                text: 'Last 3 months expense graph',
            },
        },
    };

    const [labels, setLabels] = useState("");
    const data = {
        labels,
        datasets: [
            {
                label: 'Total Expense graph',
                data: expenseDetails,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 0.5,
            },
            {
                label: 'Nice to have graph',
                data: niceToHaveDetails,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderWidth: 0.5,
            },
            {
                label: 'Must have graph',
                data: mustHaveDetails,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderWidth: 0.5,
            }
        ],
    };

    useEffect(() => {
        getUser(); // To get the user firstname and lastname
        let personEmailId = localStorage.getItem("email");
        const options = {
            headers: {
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            },
        };
        axios.get(`${LOCAL_URL}/3monthsAnalytics?emailId=${personEmailId}`, options)
        .then(result => {
            console.log(result);
            let tempLabels = []
            for(let key in result.data["Total Expense"]){
                let temp = result.data["Total Expense"][key];
                tempLabels.push(monthlyCount[temp[0]])
            }
            setLabels(tempLabels);

            let totalExpense = {}
            for(let key in result.data["Total Expense"]){
                let temp = result.data["Total Expense"][key];
                totalExpense[monthlyCount[temp[0]]] = temp[1]
            }
            setExpenseDetails(totalExpense);

            let must_have_expense = {}
            for(let key in result.data["Must Have"]){
                let temp = result.data["Must Have"][key];
                must_have_expense[monthlyCount[temp[0]]] = temp[1]
            }
            setMustHaveDetails(must_have_expense);

            let nice_to_have_expense = {}
            for(let key in result.data["Nice to have"]){
                let temp = result.data["Nice to have"][key];
                nice_to_have_expense[monthlyCount[temp[0]]] = temp[1]
            }
            setNiceToHaveDetails(nice_to_have_expense);
        }).catch(error => {
            console.log(error)
        })
    }, []);

    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const getUser = () =>{
        const options = {
            headers: {
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            },
        };

        let personEmailId = localStorage.getItem("email");
        axios.get(`${LOCAL_URL}/getUserName?emailId=${personEmailId}`, options)
        .then(result => {
            setUserFirstName(result.data.firstname);
            setUserLastName(result.data.lastname);
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <div className="App">
                <div className='navigation_bar'>
                <ul>
                        <li> <span style={{fontSize:"20px",color:"#046FAA", marginRight:"18px"}}><b>Expense Tracker</b> <br/> <span style={{fontSize:"12px",padding:"0px",color:"#046FAA"}}>({userFirstName} {userLastName})</span></span></li>
                        <li style={{color:"#046FAA",cursor:"pointer"}}  onClick={navigateToviewExpense} ><label>View Expense</label></li>
                        <li style={{color:"#046FAA",cursor:"pointer"}} onClick={navigateToAddExpense}><label>Add Expense</label></li>
                        <li style={{color:"#046FAA"}}><label>Analytics</label></li>
                        
                        <li style={{float:"right", color:"#046FAA"}} onClick={logout}><label>Logout</label></li>
                        <li style={{float:"right", cursor:"auto"}}><label></label></li>
                    </ul>
                </div>
            </div>

            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <div style={{height:"600px", width:"600px"}}>
                    <Bar data={data} options={options} />
                </div>
            </div>
            
        </div>
    );

}


export default AnalyticsComponent;