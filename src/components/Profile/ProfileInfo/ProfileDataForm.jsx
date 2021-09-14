import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../../utils/validators/validators';
import { Input, Textarea } from '../../Common/FormsControls/FormsControls';
import s from './ProfileInfo.module.css';
import style from '../../Common/FormsControls/FormsControls.module.css';
//import { Contact } from './ProfileInfo';


const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><button>save</button></div>
            {error && <div className={style.formError}>
                {error}
            </div>}
            <div>
                <b>Full name:</b> {<Field type="text" 
                                          placeholder={'Full Name'} 
                                          component={Input} 
                                          name={'fullName'}
                                          validate={[required]} />}
            </div>            
            <div>
                <b>Looking for a job: </b>{<Field type="checkbox" 
                                          placeholder={''} 
                                          component={Input} 
                                          name={'lookingForAJob'}
                                          validate={[]} />}
            </div>            
            <div>
                <b>My professional skills: </b>{<Field name={'lookingForAJobDescription'} 
                                                        component={Textarea} 
                                                        placeholder={'My professional skills'} 
                                                        validate={[]} />}
            </div>       
            <div>
                <b>About me:</b>{<Field name={'aboutMe'} 
                                                    component={Textarea} 
                                                    placeholder={'About me'} 
                                                    validate={[]} />}
            </div>        
            <div>
                <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
                    return <div className={s.contact} key={key}>
                        {key}: {<Field type="text" 
                                          placeholder={key} 
                                          component={Input} 
                                          name={'contacts.' + key}
                                          validate={[]} />}
                    </div>
                })}
            </div>
        </form>
    )
};

const ProfileDataFormReduxForm = reduxForm({form: 'editProfile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;