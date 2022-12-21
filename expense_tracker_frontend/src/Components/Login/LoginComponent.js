



import './LoginComponent.css';
import { useState, useEffect } from 'react';
import login from '../../assets/login.png';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LOCAL_URL } from '../../constants';



const LoginScreen = (props) => {

    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('isLoggedIn')){
            navigate("/viewExpenses")
        }
    }, []);


    const navigateToRegister = () => {
        navigate("/register");
    }

    const [stateEmail, setEmail] = useState("");
    const handleEmailChange = event => {
        setEmail(event.target.value);
    
    }
    
    // repeat for password
    const [statePassword, setPassword] = useState("");
    const handlePasswordChange = event => {
        setPassword(event.target.value);
    
    }

    const handleSubmit = event => {
        event.preventDefault();
    
        const options = {
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                "Access-Control-Allow-Credentials":"*",
            },
    
            data : {
                emailId: stateEmail,
                password: statePassword
            },
        };
        
        axios.put(`${LOCAL_URL}/login`, options) // if promise get you success, control enters .then
        .then(res => {
            // cookies.set('GAMESWAP_ACCESS_TOKEN', res.data['access_token'], { path: '/', expires: new Date(Date.now()+ (3600 * 1000 * 24))});
            
            if (res.status === 200) {
                // localStorage.setItem('GAMESWAP_ACCESS_TOKEN', res.data.access_token);
                localStorage.setItem('isLoggedIn',true);
                localStorage.setItem('email',stateEmail);
                navigate("/viewExpenses");
            }
        })
        .catch(error => {
            toast.error("Check credentials")
        })
    }



    return (

        <div>


            <div className="App">
                <div className='navigation_bar'>
                    <ul>
                        <li> <span style={{fontSize:"25px",color:"#046FAA", marginRight:"20px"}}><b>Expense Tracker</b></span></li>
                    </ul>
                </div>
            </div>



            <div className="login_div">
                <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap", justifyContent:"center",alignItems:"center"}}>
                    <div >
                        <img src={login} style={{width:"600px",height:"600px"}} alt="login"/>
                    </div>
                    <div style={{padding:"80px"}}>
                        <header className='header'>Login</header><br/><br/><br/>
                        <form onSubmit={handleSubmit}>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <label htmlFor="signin-email">Email/Phone</label>
                                <input type="text" id="signin-email" name="email" autoComplete="off" onChange={handleEmailChange} required autoFocus pattern="([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4})|([0-9]{10})|([0-9]{3}-[0-9]{3}-[0-9]{4})" /><br/>
                            </div><br/>
                            <label htmlFor="signin-password" >Password</label><br/>
                            <div style={{display: "flex",flexDirection: "row",flexWrap: "wrap"}}>
                                <input name="password" type="password" minLength="6" onChange={handlePasswordChange} required style={{width: "300px !important"}}/>
                            </div><br/><br/>
                            <button type="submit" className="btn" >Login</button> <br/><br/><br/>
                        </form>

                        <div style={{display:"flex",flexDirection:"column"}}>
                            <label style={{color:"black"}}>Don't have an account?</label>
                            <button className="another_button" onClick={navigateToRegister} >Register</button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>

    );
}

export default LoginScreen;
