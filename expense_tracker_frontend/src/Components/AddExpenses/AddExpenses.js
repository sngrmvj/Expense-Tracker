


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { LOCAL_URL } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddExpenses.css';



const AddExpensesComponent = () => {

    const navigate = useNavigate();

    const logout = () =>{
        localStorage.setItem('isLoggedIn',false);
        localStorage.removeItem('email');
        navigate("/")
    }
    const navigateToviewExpense = () =>{
        navigate("/viewExpenses");
    }

    const navigateToAnalytics = () =>{
        navigate("/analytics");
    }

    const [descriptionDetails, setDescriptionDetails] = useState("");
    const handleDescriptionChange = event => {
        setDescriptionDetails(event.target.value);
    }

    const [enteredMonthlyExpense, setMonthlyExpense] = useState(0);
    const handleEnteredMonthlyExpense = event => {
        setMonthlyExpense(event.target.value);
    }

    const [enteredAmount, setEnteredAmount] = useState("");
    const handleAmountChange = event => {
        setEnteredAmount(event.target.value);
    }

    // Expense Type
    const [expenseTypeDropdown, setExpenseTypeDropdown] = useState('');
    const [expenseType, setExpenseType] = useState('');
    const selectExpenseType = (event) =>{
        setExpenseType(event.target.value);
    }

    const [currentSalary, setCurrentSalary] = useState(0);
    const [currentSalaryHTML, setCurrentSalaryHTML] = useState("");
    const [todayDate, setTodayDate] = useState("01");
    useEffect(() => {
        let today = new Date();
        let todayDate = String(today.getDate()).padStart(2, '0');
        setTodayDate(todayDate);
        if (todayDate === '01' || todayDate === '1'){
            setCurrentSalaryHTML(
                <label style={{fontWeight:"bold"}}>0</label>
            );
        } 

        const options = {
            headers: {
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            },
        };

        axios.get(`${LOCAL_URL}/leftOver/`, options)
        .then(result => {
            if (result.data < 5000 && result.data > 0){
                const expenseTypeItems = [
                    "Select Expense Type",
                    "Must have",
                ]
                setCurrentSalaryHTML(
                    <label style={{fontWeight:"bold", color:"red"}}>{result.data}</label>
                );
                let tempExpenseDropDown = expenseTypeItems.map((typeItems) => <option key={typeItems}>{typeItems}</option>)
                setExpenseTypeDropdown(tempExpenseDropDown);
            } else {
                const expenseTypeItems = [
                    "Select Expense Type",
                    "Must have",
                    "Nice to have"
                ]
                if (result.data === 0){
                    setCurrentSalaryHTML(
                        <label style={{fontWeight:"bold", color:"blue"}}>{result.data}</label>
                    );
                } else {
                    setCurrentSalaryHTML(
                        <label style={{fontWeight:"bold", color:"green"}}>{result.data}</label>
                    );
                }
                let tempExpenseDropDown = expenseTypeItems.map((typeItems) => <option key={typeItems}>{typeItems}</option>)
                setExpenseTypeDropdown(tempExpenseDropDown);
                
            }
            setCurrentSalary(result.data); // Update the currentSalry value
        }).catch(error => {
            console.log(error)
        })
    }, [todayDate]);


    const handleExpenseSubmit = (event) => {
        event.preventDefault();
        console.log(event.target);

        let personEmailId = localStorage.getItem("email");
        let data = "";
        if(event.target.monthly_expense){
            data = {
                emailId: personEmailId,
                priceOfProduct: parseFloat(event.target.priceOfProduct.value),
                description: event.target.description.value,
                type: expenseType,
                initialAmount: parseFloat(event.target.monthly_expense.value),
                leftOverAmount: parseFloat(event.target.monthly_expense.value - event.target.priceOfProduct.value)
            }
        } else {
            data = {
                emailId: personEmailId,
                priceOfProduct: parseFloat(event.target.priceOfProduct.value),
                description: event.target.description.value,
                type: expenseType,
                initialAmount: parseFloat(currentSalary),
                leftOverAmount: parseFloat(currentSalary - event.target.priceOfProduct.value)
            }
        }

        const options = {
            withCredentials: true,
            credentials: 'same-origin', 
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Content-Type': 'application/json',
            },
            data : data
        };

        axios.post(`${LOCAL_URL}/addExpense/`, options)
        .then(result=>{
            if (result.status === 409){
                toast.error(result.data['error'])
            }
            else if (result.status === 404){
                toast.error(result.data['error'])
            }
            else if (result.status === 500){
                toast.error(result.data['error'])
            }
            else{
                toast.success("Expense successfully added!!")
            }
        }).catch(error => {
            toast.error(error.error)
        })
    }


    return (
        
        <div>

            <div className="App">
                <div className='navigation_bar'>
                    <ul>
                        <li> <span style={{fontSize:"20px",color:"#046FAA", marginRight:"18px"}}><b>Expense Tracker</b></span></li>
                        <li style={{color:"#046FAA",cursor:"pointer"}} onClick={navigateToviewExpense}><label>View Expense</label></li>
                        <li style={{color:"#046FAA"}} ><label>Add Expense</label></li>
                        <li style={{color:"#046FAA",cursor:"pointer"}} onClick={navigateToAnalytics}><label>Analytics</label></li>
                        <li style={{float:"right", color:"#046FAA"}} onClick={logout}><label>Logout</label></li>
                    </ul>
                </div>
            </div>

            <div className="addExpense_div">
                <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap", justifyContent:"center",alignItems:"center"}}>
                    <div style={{padding:"20px", borderRadius:"5px",border:"1.5px solid whitesmoke"}}>
                        <header className='header'>Add Expense</header><br/><br/>
                        <form onSubmit={handleExpenseSubmit}>

                            <div style={{display:"flex",flexDirection:"column"}}>
                                <label>Left Over Expense</label>
                                <label>{currentSalaryHTML}</label>
                            </div> <br/>

                            {
                                // If the start of the month or the current amount is less than 0 
                                todayDate === '01' || todayDate === '1' || currentSalary === 0 ? 
                                <div style={{display:"flex",flexDirection:"column"}}>
                                    <label htmlFor="monthly_expense">Enter Monthly Expense (first expense)</label>
                                    <input type="number" id="monthly_expense" name="monthly_expense" autoComplete="off" required autoFocus /><br/><br/>
                                </div>  : <span></span>
                            }

                            <div style={{display:"flex",flexDirection:"column"}}>
                                <label htmlFor="description">Description</label>
                                <input type="text" id="description" name="description" autoComplete="off" required autoFocus /><br/>
                            </div><br/>

                            <div style={{display: "flex",flexDirection: "column",flexWrap: "wrap"}}>
                                <label htmlFor="amount" >Enter Amount</label>
                                <input name="priceOfProduct" type="number" minLength="6" required style={{width: "300px !important"}}/>
                            </div><br/><br/>
                            
                            <div style={{display: "flex",flexDirection: "column",flexWrap: "wrap"}}>
                                <label htmlFor="amount" >Select Expense Type</label>
                                <select style={{width:"300px",cursor:"pointer", paddingTop:"10px", paddingBottom:"10px", borderRadius:"5px"}} onChange={selectExpenseType}>
                                    {expenseTypeDropdown}
                                </select>
                            </div><br/><br/>
                            <button type="submit" className="btn" >Add Expense</button> <br/><br/><br/>
                        </form>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>

    );

}

export default AddExpensesComponent;