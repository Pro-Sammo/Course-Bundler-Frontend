import {configureStore} from '@reduxjs/toolkit'
import { profileReducer, userReducer } from './reducers/userReducer';
import { courseReducer } from './reducers/courseReducer';
import { adminReducer } from './reducers/adminReducer';


export const server = 'http://localhost:4000/api/v1';

const store = configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        courses:courseReducer,
        admin:adminReducer,
    }
})

export default store;