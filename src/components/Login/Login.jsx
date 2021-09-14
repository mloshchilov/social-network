import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { Input } from '../Common/FormsControls/FormsControls';
import { login } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import style from '../Common/FormsControls/FormsControls.module.css';

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={style.loginForm}>
            <div>
                <Field type="text" placeholder={'Email'} component={Input} name={'email'}
                       validate={[required]} />
            </div>
            <div>
                <Field type="password" placeholder={'Password'} component={Input} name={'password'}
                       validate={[required]}/>
            </div>
            <div>
                <Field type="checkbox" component={Input} name={'rememberMe'} 
                       validate={[required]}/> remember me
            </div>
            {props.error && <div className={style.formError}>
                {props.error}
            </div>}
            {props.captcha && <img src={props.captcha} alt='captcha'/>}
            {props.captcha && <Field type="text" 
                                     placeholder={'Symbols from image'} 
                                     component={Input} 
                                     name={'captcha'}
                                     validate={[required]} />}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);


const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    };

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return <div>
        <h2 className={style.title}>Login</h2>
        <LoginReduxForm onSubmit={onSubmit} captcha={props.captchaUrl}/>
    </div>
}; 

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, {login})(Login);