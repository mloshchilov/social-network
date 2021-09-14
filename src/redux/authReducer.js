import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'AUTH/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'AUTH/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {  
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }  

        default: {
            return state;
        }
    }
};

export const setAuthUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, payload: {id, email, login, isAuth}});
export const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});


export const getAuthData = () => async (dispatch) => {
    let data = await authAPI.getAuthData();
        
    if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }        
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
        
    if (data.resultCode === 0) {
        dispatch(getAuthData());
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = data.messages.length > 0 ? data.messages : 'Some error';
        dispatch(stopSubmit('login', {_error: message}));
    }        
};

export const getCaptchaUrl = () => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl();
        
    dispatch(getCaptchaUrlSuccess(data.url))
};

export const logout = () => async (dispatch) => {
    let data = await authAPI.logout();
        
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }        
};



export default authReducer;