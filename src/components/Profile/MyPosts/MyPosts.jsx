import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../Common/FormsControls/FormsControls';


const maxLength10 = maxLengthCreator(10);


const MyPosts = (props) => {
    let postsElements = props.posts.map( p => <Post message={p.message} likesCount={p.likesCount}/> ).reverse();

    const onSubmit = (formData) => {
        props.addPost(formData.newPostText);
    }

    return <div className={s.descr}>
        {console.log('render')}
        <h3>My posts</h3> 
        <PostReduxForm onSubmit={onSubmit}/>
        <div>
            {postsElements}
        </div>
    </div>
}

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} component={Textarea} placeholder={'New Post'}
                       validate={[required, maxLength10]} />
            </div>
            <div>
                <button>Add new post</button>
            </div>
        </form>
    );
}

const PostReduxForm = reduxForm({form: 'post'})(PostForm);

export default MyPosts;