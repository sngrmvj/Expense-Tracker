import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCAL_URL } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './SignUp.css';
import 'react-toastify/dist/ReactToastify.css';


const RegisterScreen = () =>{

    const navigate = useNavigate();
    var data = {};

    useEffect(() => {
        if(localStorage.getItem('isLoggedIn') === false){
            navigate("/viewExpenses")
        }
    }, []);

    const navigateToLogin = () => {
        navigate("/");
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        data = {
            emailId: event.target.useremail.value,
            password: event.target.password.value,
            firstName: event.target.firstname.value,
            lastName: event.target.lastname.value,
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
        
        axios.post(`${LOCAL_URL}/register`, options)
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
                        <li> <span style={{fontSize:"25px",color:"#046FAA", marginRight:"20px"}}><b>Expense Tracker</b></span></li>
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
                                <label htmlFor='password'>Password</label>
                                <input type="password" name="password" minLength={9} required/>
                            </div>
                        </div><br/> <br/>

                        <div style={{display:"flex",flexDirection:"row"}}>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <label htmlFor='firstname'>Firstname</label>
                                <input type="text" name="firstname" required/>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",marginLeft:"20px"}}>
                                <label htmlFor='lastname'>Lastname</label>
                                <input type="text" name='lastname' required/>
                            </div>
                        </div><br/><br/>

                        {/* <div style={{display:"flex",flexDirection:"row"}}>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <label htmlFor='lastname'>Initial Salary</label>
                                <input type="number" name="salary" />
                            </div>
                        </div> <br/> */}
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

            <ToastContainer />
        </div>
    );
}


export default RegisterScreen;