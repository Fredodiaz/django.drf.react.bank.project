import axios from 'axios';
import { GET_CUSTOMERS, DELETE_CUSTOMER, ADD_CUSTOMER } from './types';
import {tokenConfig} from './auth';

// GET CUSTOMERS
export const getCustomers = () => (dispatch, getState) => {
    axios.get('https://g-f-django-bank-app.herokuapp.com/customers/', tokenConfig(getState))
    .then(res => {
        dispatch({
        type: GET_CUSTOMERS,
        payload: res.data,
    })}).catch(err => console.log(err));
}

// DELETE CUSTOMER
export const deleteCustomer = (customerId) => (dispatch, getState) => {
    axios.delete(`https://g-f-django-bank-app.herokuapp.com/customers/${customerId}/`, tokenConfig(getState))
    .then(res => {
        dispatch({
        type: DELETE_CUSTOMER,
        payload: customerId,
    })}).catch(err => console.log(err));
}

// ADD CUSTOMER
export const addCustomer = (customerName) => (dispatch, getState) => {
    axios.post(`https://g-f-django-bank-app.herokuapp.com/customers/`, {
        name: customerName,
    }, tokenConfig(getState))
    .then(res => {
        getCustomers()
        dispatch({
        type: ADD_CUSTOMER,
        payload: res.data,
    })}).catch(err => console.log(err));
}