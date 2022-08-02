import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import mealsReducer from './reducers/mealsReducer';
import usersReducer from './reducers/usersReducer';
import orderReducer from './reducers/orderReducer';

const store = configureStore({
    reducer:{
        auth: authReducer,
        users: usersReducer,
        meals :mealsReducer,
        orders : orderReducer,
    }
});

export default store;