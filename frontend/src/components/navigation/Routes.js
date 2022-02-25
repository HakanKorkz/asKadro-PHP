import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apilink } from '../../utils/connectApi';
import LoginPage from '../LoginScreens/loginPage';
import CompanyScreen from './CompanyScreen';
import EmployeeScreen from './EmployeeScreen';
import Main from './Main';
import { useCookies } from 'react-cookie';


const Routes = () => {
    const [cookies] = useCookies(['user']);
    const { Employee, Company, Manager } = cookies
    return (
        <div>
            {Manager === "true" ? <Main /> : null}
            {Employee != "true" && Company != "true" && Manager != "true" ? <LoginPage /> : null}
            {Employee === "true" ? <EmployeeScreen /> : null}
            {Company === "true" ? <CompanyScreen /> : null}
        </div>
    )

}

export default Routes
