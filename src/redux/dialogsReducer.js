const ADD_MESSAGE = 'DIALOGS/ADD-MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Misha'},
        {id: 2, name: 'Ivan'},
        {id: 3, name: 'Petya'}
    ],
    messages: [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'Yo'},
        {id: 3, message: 'Whats up'}
    ]
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = {
                id: 4,
                message: action.newMessageBody
            }

            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        }
            
        default: {
            return state;
        }
    }
};

export const addMessageActionCreator = (newMessageBody) => ({type: ADD_MESSAGE, newMessageBody});

export default dialogsReducer;