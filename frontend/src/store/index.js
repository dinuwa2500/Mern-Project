import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';

const loadUserFromLocalStorage = () => localStorage.getItem('account') ? 
    JSON.parse(localStorage.getItem('account')) : null;



const initialState = {
    user: {userInfo: loadUserFromLocalStorage()},
}


const store = configureStore({
    reducer : {
        user: userReducer,
    },
    preloadedState: initialState
})


export { store };