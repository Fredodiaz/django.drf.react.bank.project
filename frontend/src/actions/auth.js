import axios from 'axios';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_FAIL,
    LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from './types'

export const loadUser = dispatch => {
    dispatch({type: USER_LOADING});
    axios.get('https://g-f-django-bank-app.herokuapp.com/auth/user', tokenConfig())
    .then(res => {
        console.log('Loading user group: ' + res.data.groups[0].name)
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        })
    })
    .catch(err => {
        dispatch({type: AUTH_ERROR});
    })
}

export const login = (username, password, dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({username, password});
    axios.post('https://g-f-django-bank-app.herokuapp.com/auth/login', body, config)
    .then(res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        })})
    .catch(err => {
        dispatch({type: LOGIN_FAIL});
    })
}

export const register = ({username, email, password, group}, dispatch) => {
    console.log('Group: ' + group)
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({username, email, password, groups: [parseFloat(group)]});
    // const body = {username, email, password, group};
    console.log('Body: ' + body)
    axios.post('https://g-f-django-bank-app.herokuapp.com/auth/register', body, config)
    .then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        })})
    .catch(err => {
        dispatch({type: REGISTER_FAIL});
    })
}

export const logout = dispatch => {
    axios.post('https://g-f-django-bank-app.herokuapp.com/auth/logout', null, tokenConfig())
    .then(res => {
        dispatch({
            type: LOGOUT_SUCCESS,
        })
    })   
    .catch(err => console.log(err));
}

export const tokenConfig = () => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    if(token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    return config;
}

export const createUser = ({username, email, password, group}) => {
    console.log('Group: ' + group)
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({username, email, password, groups: [parseFloat(group)]});
    console.log('Body: ' + body)
    axios.post('https://g-f-django-bank-app.herokuapp.com/auth/register', body, config)
    .then(res => alert('User was created succesfully'))
    .catch(err => {
        alert('An error occured creating a user')
    })
}


export const getAuthLevel = (auth) => {
    switch (auth.group) {
        case 'branch.admin':
            return 5;
        case 'branch.staff':
            return 4;
        case 'bank.admin':
            return 3;
        case 'bank.staff':
            return 2;
        case 'member':
            return 1;
        default:
            return 0;
    }
}