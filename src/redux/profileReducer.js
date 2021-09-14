import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";

const ADD_POST = 'PROFILE/ADD-POST';
const SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE';
const SET_STATUS = 'PROFILE/SET_STATUS';
const DELETE_POST = 'PROFILE/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'PROFILE/SAVE_PHOTO_SUCCESS';


let initialState = {
    posts: [
        {id: 1, message: 'Yo, how are you?', likesCount: 10},
        {id: 2, message: 'Second post', likesCount: 12},
        {id: 3, message: 'First post', likesCount: 14}
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }

        case SET_USER_PROFILE: {
            return {...state, profile: action.profile};
        }

        case SET_STATUS: {
            return {...state, status: action.status};
        }

        case DELETE_POST: {
            return {...state, posts: state.posts.filter( p => p.id !== action.userId)};
        }

        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
            
        default: {
            return state;
        }
    }
};

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (userId) => ({type: DELETE_POST, userId});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});


export const getUserData = (userId) => async (dispatch) => {
    let data = await profileAPI.getUserData(userId);
    dispatch(setUserProfile(data));
};


export const getStatus = (userId) => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));    
};


export const updateStatus = (status) => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};

export const savePhoto = (file) => async (dispatch) => {
    let data = await profileAPI.updatePhoto(file);
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.id;
    const data = await profileAPI.updateProfile(profile);
    if (data.data.resultCode === 0) {
        dispatch(getUserData(userId));
    } else {
        dispatch(stopSubmit('editProfile', {_error: data.data.messages[0]}));
        return Promise.reject(data.data.messages[0]);
    }
}


export default profileReducer;