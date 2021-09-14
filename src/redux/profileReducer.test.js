import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer";

let state = {
    posts: [
        {id: 1, message: 'Yo, how are you?', likesCount: 10},
        {id: 2, message: 'Second post', likesCount: 12},
        {id: 3, message: 'First post', likesCount: 14}
    ]
};

it('length of posts should be incremented', () => {
    // 1. test data
    let action = addPostActionCreator('bhfbn');
    
    // 2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts.length).toBe(4);  
});

it('message of new post should be correct', () => {
    // 1. test data
    let action = addPostActionCreator('bhfbn');

    // 2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts[3].message).toBe('bhfbn');  
});

it('length of posts should be decremented after deleting', () => {
    // 1. test data
    let action = deletePost(1);

    // 2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts.length).toBe(2);  
});
