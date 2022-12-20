

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import axios from 'axios';
import {toast} from 'react-toastify';

toast.configure()
const RegisterScreen = () =>{

    const navigate = useNavigate();
    var data = {};
    const [phonetype,setPhoneType] = useState('');
    const [share_flag,setShareFlag] = useState(false);

    const navigateToLogin = () => {
        navigate("/");
    }

    const phoneTypeSelection = (event) =>{
        setPhoneType(event.target.value);
    }

    const isPhoneShareable = (event) =>{
        setShareFlag(event.target.checked);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();


        if(event.target.phone.value){

            data = {
                useremail: event.target.useremail.value,
                nick_name: event.target.nickname.value,
                password: event.target.password.value,
                city: event.target.city.value,
                first_name: event.target.firstname.value,
                state: event.target.state.value,
                last_name: event.target.lastname.value,
                postalcode: event.target.postalcode.value,
                password: event.target.password.value,
                phonenumber: event.target.phone.value,
                phone_type: phonetype,
                share_flag: share_flag,
            }
        } else{
            data = {
                useremail: event.target.useremail.value,
                nick_name: event.target.nickname.value,
                password: event.target.password.value,
                city: event.target.city.value,
                first_name: event.target.firstname.value,
                state: event.target.state.value,
                last_name: event.target.lastname.value,
                postalcode: event.target.postalcode.value,
                password: event.target.password.value,
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

        axios.post("http://127.0.0.1:5000/gameswap/register/", options)
        .then(result=>{

            if (result.data['flag'] === 409){
                toast.error(result.data['error'])
            }
            else if (result.data['flag'] === 404){
                toast.error(result.data['error'])
            }
            else if (result.data['flag'] === 500){
                toast.error(result.data['error'])
            }
            else{
                toast.success("Registration Successful",{onClose: ()=>{navigate('/')}})
            }
        }).catch(error => {
            toast.error(error.error)
        })

    }

    return(
        <div>

            <div className="App">
                <div className='navigation_bar'>
                    <ul>
                        <li> <span style={{fontSize:"25px",color:"#046FAA", marginRight:"20px"}}><b>GameSwap</b></span></li>
                    </ul>
                </div>
            </div>

            <div className='register_div'>
                <div className='register_under_div'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <header className='register_header'>Registration</header>
                        </div><br/><br/><br/>

                        <div style={{display:"flex",flexDirection:"row"}}>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <label htmlFor='email'>Email</label>
                                <input type="email" name="useremail" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",marginLeft:"20px"}}>
                                <label htmlFor='nick'>Nickname</label>
                                <input type="text" name="nickname" required/>
                            </div>
                        </div><br/> <br/>

                        <div style={{display:"flex",flexDirection:"row"}}>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <label htmlFor='password'>Password</label>
                                <input type="password" name="password" required/>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",marginLeft:"20px"}}>
                                <label htmlFor='city'>City</label>
                                <input type="text" name="city" required/>
                            </div>
                        </div><br/><br/>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <label htmlFor='firstname'>Firstname</label>
                                <input type="text" name="firstname" required/>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",marginLeft:"20px"}}>
                                <label htmlFor='state'>State</label>
                                <input type="text" name="state" required/>
                            </div>
                        </div><br/><br/>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <label htmlFor='lastname'>Lastname</label>
                                <input type="text" name='lastname' required/>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",marginLeft:"20px"}}>
                                <label htmlFor='postalcode'>Postalcode</label>
                                <input type="text" name="postalcode" required />
                            </div>
                        </div><br/><br/><br/>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <label htmlFor='lastname'>Phone number (optional)</label>
                                <input type="text" name="phone" pattern="([0-9]{10})|([0-9]{3}-[0-9]{3}-[0-9]{4})" />
                            </div>
                            <div style={{display:"flex",flexDirection:"row",width:"300px",marginLeft:"20px"}}>
                                <select style={{width:"300px",cursor:"pointer"}} onChange={phoneTypeSelection}>
                                    <option value="null">Select phone type</option>
                                    <option value="Home">Home</option>
                                    <option value="Work">Work</option>
                                    <option value="Mobile">Mobile</option>
                                </select>
                            </div>
                        </div> <br/>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <input type="checkbox" id="topping" name="topping" checked={share_flag} onChange={isPhoneShareable} style={{cursor:"pointer"}} />
                            <span>Show phone number is swaps</span>
                        </div><br/>
                        <div>
                            <button type="submit" className="btn" >Register</button>
                            <button type="reset" className="btn" style={{marginLeft:"20px"}}>Reset</button> <br/><br/><br/>
                        </div><br/>
                        <div style={{display:"flex",flexDirection:"column"}}>
                            <label style={{color:"black"}}>Have an account?</label>
                            <button className="another_button" onClick={navigateToLogin} >Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default RegisterScreen;