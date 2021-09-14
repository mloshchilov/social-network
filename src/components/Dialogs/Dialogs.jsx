import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../Common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';


const maxLength20 = maxLengthCreator(20);

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map( d => <DialogItem name={d.name} id={d.id}/> );

    let messagesElements = state.messages.map( m => <Message message={m.message}/> );

    const onSubmit = (formData) => {
        props.sendMessage(formData.newMessageBody);
    }

    return (
        <div className={s.dialogs}>
            <div className='dialogs-items'>
                {dialogsElements}
            </div>
            <div className='messages'>
                {messagesElements}
            </div>
            <DialogsReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newMessageBody'} component={Textarea} placeholder={'New message'} 
                       validate={[required, maxLength20]} />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
}

const DialogsReduxForm = reduxForm({form: 'dialogs'})(DialogsForm);

export default Dialogs;