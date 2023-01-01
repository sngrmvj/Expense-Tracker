

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './ViewExpenses.css';
import { LOCAL_URL } from '../../constants';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';




// toast.configure()
const ViewExpensesComponent = () => {

    const navigate = useNavigate();
    const [currentSalary, setCurrentSalary] = useState(0);
    const [currentSalaryValue, setCurrentSalaryValue] = useState(0);
    const [todayDate, setTodayDate] = useState("01");
    const monthlyCount = {"01": "Jan","1":"Jan" ,"02":"Feb","2":"Feb", "03":"Mar","3":"Mar", "04":"Apr","4":"Apr", "05":"May","5":"May", "06":"Jun","6":"Jun", "07":"Sep","7":"Sep", "08":"Aug","8":"Aug", "09":"Sept","9":"Sept", "10":"Oct", "11":"Nov", "12":"Dec"}
    const niceToHaveExpenseBody = <div>
        <label style={{marginLeft:"10px"}}><b>Nice to have</b></label><br/>
        <label style={{marginLeft:"10px",fontSize:"15px"}}>1. Charitable works</label><br/>
        <label style={{marginLeft:"10px",fontSize:"15px"}}>2. Watching movies</label><br/>
        <label style={{marginLeft:"10px",fontSize:"15px"}}>3. Travelling</label><br/>
        <label style={{marginLeft:"10px",fontSize:"15px"}}>4. Participate in events</label><br/>
        <label style={{marginLeft:"10px",fontSize:"15px"}}>5. Create new hobies</label><br/>
        <label style={{marginLeft:"10px",fontSize:"15px"}}>6. Sports</label><br/>
        <label style={{marginLeft:"10px",fontSize:"15px"}}>7. Partying</label><br/>
    </div>

    const logout = () =>{
        localStorage.setItem('isLoggedIn',false);
        localStorage.removeItem('email');
        navigate("/")
    }

    const navigateToAddExpense = () =>{
        navigate("/addExpenses");
    }

    const navigateToAnalytics = () =>{
        navigate("/analytics");
    }


    const ExpenseHeaders = [
        {headerName: 'Date',field:'createdDate',sortable: true, filter: true,wrapText:true, autoHeight:true},
        {headerName: 'Description',field:'category',wrapText:true, autoHeight:true},
        {headerName: 'Expense Type',field:'type',wrapText:true, autoHeight:true },
        {headerName: 'Price',field:'priceOfExpense',wrapText:true, autoHeight:true, width:"150px" },
        // {headerName: 'Amount before purchase',field:'initialAmount',sortable: true, filter: true, wrapText:true, autoHeight:true  ,wrapHeaderText:true},
        // {headerName: 'Current amount',field:'leftOverAmount',sortable: true, filter: true, wrapText:true, autoHeight:true , wrapHeaderText:true},
        {
            headerName: 'Operations',field:'total',
            cellRenderer: (params) =>{
                return <label onClick={() => deleteExpense(params.data.id)} style={{color:"red",cursor:"pointer"}}>Delete</label>
            }
        },
    ]; 
    const [allExpenseDetails,setAllExpenseDetails] = useState(ExpenseHeaders);
    const [allExpenseDetailsForDownload, setExpenseDetailsForDownload] = useState();

    const downloadTxtFile = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const ws = XLSX.utils.json_to_sheet(allExpenseDetailsForDownload);
        const wb = { Sheets: { 'Expenses': ws }, SheetNames: ['Expenses'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, "Expenses_of_current_month.xlsx");
    }
    

    const deleteExpense = (identifier) => {
        let personEmailId = localStorage.getItem("email");
        const options = {
            headers: {
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            },
        };

        axios.delete(`${LOCAL_URL}/deleteExpense?id=${identifier}&emailId=${personEmailId}`, options)
        .then(result => {
            if (result.data === true){
                getAllExpenses();
                getLeftOverExpense();
                toast.success("Your expense is successfully deleted");
            } else {
                toast.error("Your expense not deleted.");
                toast.warn("Please contact the administrator");
            }
        }).catch(error => {
            console.log(error)
        })
    }


    const getLeftOverExpense = () => {
        let personEmailId = localStorage.getItem("email");
        const options = {
            headers: {
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            },
        };

        axios.get(`${LOCAL_URL}/leftOver?emailId=${personEmailId}`, options)
        .then(result => {
            if (result.data === null){
                result.data = 0.0;
            }
            if (result.data === 0.0 || result.data === 0){
                setCurrentSalary(
                    <label style={{fontWeight:"bold", color:"blue"}}>{result.data}</label>
                );
                toast("Please add an expense for this month");
            } else if(result.data < 5000){
                setCurrentSalary(
                    <label style={{fontWeight:"bold", color:"red"}}>{result.data}</label>
                );
            } else {
                setCurrentSalary(
                    <label style={{fontWeight:"bold", color:"green"}}>{result.data}</label>
                );
            }
            setCurrentSalaryValue(result.data);
        }).catch(error => {
            console.log(error)
        })
    }


    const getAllExpenses = () =>{
        let personEmailId = localStorage.getItem("email");
        const d = new Date();
        let month = d.getMonth() + 1;
        
        const options = {
            headers: {
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            },
        };

        axios.get(`${LOCAL_URL}/getExpenses?emailId=${personEmailId}&monthNumber=${month}`, options)
        .then(result => {
            if(result){
                setAllExpenseDetails(result.data);
                let excelResult = []
                result.data.forEach(element => {
                    let tempData = {}
                    tempData["Category"] = element['category']
                    tempData["Price of Expense"] = element['priceOfExpense']
                    tempData["Before Amount"] = element['initialAmount']
                    tempData["After Amount"] = element['leftOverAmount']
                    tempData["Type"] = element['type']
                    tempData["Created Date"] = element['createdDate']

                    excelResult.push(tempData);
                });
                setExpenseDetailsForDownload(excelResult);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        let today = new Date();
        let todayDate = String(today.getDate()).padStart(2, '0');
        setTodayDate(todayDate);
        if (todayDate === '01' || todayDate === '1'){
            setCurrentSalary(
                <label style={{fontWeight:"bold"}}>0</label>
            );
        } 
        
        getAllExpenses();
        getLeftOverExpense();
        getUser();
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



    return(
        <div>
            <div className="App">
                <div className='navigation_bar'>
                    <ul>
                        <li> <span style={{fontSize:"20px",color:"#046FAA", marginRight:"18px"}}><b>Expense Tracker</b> <br/> <span style={{fontSize:"12px",padding:"0px",color:"#046FAA"}}>({userFirstName} {userLastName})</span></span></li>
                        <li style={{color:"#046FAA",cursor:"auto"}} ><label>View Expense</label></li>
                        <li style={{color:"#046FAA"}} onClick={navigateToAddExpense}><label>Add Expense</label></li>
                        <li style={{color:"#046FAA",cursor:"pointer"}} onClick={navigateToAnalytics}><label>Analytics</label></li>
                        
                        <li style={{float:"right", color:"#046FAA"}} onClick={logout}><label>Logout</label></li>
                        <li style={{float:"right", cursor:"auto"}}><label></label></li>
                    </ul>
                </div>
            </div>


            <div className='expenses_div'>
                <div style={{display:"flex",flexDirection:"column", padding:"20px"}}>

                    <div style={{display:"flex",flexDirection:"row" }}>
                        <label className='left_over_expense'>Left Over Expense</label>
                        <label className='display_Left_over_expense'>{currentSalary}</label>
                    </div> <br/>

                    <div>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header><b style={{color:"#046FAA"}}>Expense Recommendation</b></Accordion.Header>
                                <Accordion.Body>
                                    <p>It is a good idea to consult with a financial planner or advisor to help you make a plan that's tailored to your specific situation. They can help you prioritize your financial goals and make the most of your money.</p>
                                    <label>But, It is ideal to provide priorities to these - </label><br/>
                                    <label style={{fontSize:"15px"}}><b>Must have</b></label><br/>
                                    <label style={{marginLeft:"10px",fontSize:"15px"}}>1. Emergency fund</label><br/>
                                    <label style={{marginLeft:"10px",fontSize:"15px"}}>2. Debt repayment</label><br/>
                                    <label style={{marginLeft:"10px",fontSize:"15px"}}>3. Savings, Investments and Insurances</label><br/>
                                    <label style={{marginLeft:"10px",fontSize:"15px"}}>4. House hold works</label><br/>
                                    <label style={{marginLeft:"10px",fontSize:"15px"}}>5. Education or training</label><br/>
                                    <label style={{marginLeft:"10px",fontSize:"15px"}}>6. Exercises</label><br/>
                                    <label style={{marginLeft:"10px",fontSize:"15px"}}>7. Build a legacy</label><br/><br/>
                                    {
                                        currentSalaryValue >= 5000 ? <span>{niceToHaveExpenseBody}</span> : <span><label style={{color:"salmon"}}><b>Your monthly allowance of nice-to-have items has been used up.</b></label></span>
                                    }

                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div><br/>

                    <div>
                        <div style={{padding:"10px", borderBottom:"2px solid #046FAA"}}>
                            <header style={{fontWeight:"bold"}}>View Expenses</header>
                        </div> 
                        <div style={{padding:"10px", alignItems:"center", display:"flex", flexDirection:"column"}}>
                            <div style={{display:"flex", flexDirection:"row", alignItems:"center", marginLeft:"-187px"}}>
                                <button onClick={downloadTxtFile} className="printBtn">Print Expenses</button>
                                <label style={{marginLeft:"20px", fontWeight:"bold", fontSize:"12px"}}>For further information on how much we spent on each type, please visit our analytics page.</label>
                            </div>

                            <div className="ag-theme-alpine" style={{height: "400px", width:"903px"}}>
                                <AgGridReact
                                    style={{borderRadius:"5px"}}
                                    rowData={allExpenseDetails}
                                    columnDefs={ExpenseHeaders}
                                    animateRows={true}
                                    suppressHorizontalScroll= {true}>
                                </AgGridReact>
                            </div>
                        </div> 
                    </div> <br/> <br/>
                </div>
            </div>

            <ToastContainer />
        </div>
    );

}

export default ViewExpensesComponent;