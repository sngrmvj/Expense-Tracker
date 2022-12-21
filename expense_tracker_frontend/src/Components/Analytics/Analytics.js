

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';


const AnalyticsComponent  = () => {

    const navigate = useNavigate();

    const logout = () =>{
        localStorage.setItem('isLoggedIn',false);
        localStorage.removeItem('email');
        navigate("/")
    }

}


export default AnalyticsComponent;