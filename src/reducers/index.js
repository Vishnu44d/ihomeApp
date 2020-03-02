//IMPORT ALL REDUCERS
import {combineReducers} from 'redux';


const loggedinReducer = (state=false, action) => {
    switch(action.type){
        case "LOGIN":
            return true;  
        case "LOGOUT":
            return false;
        default:
            return state;
    }
}

const loginReducer = (state=null, action) => {
    //console.log("USER REDUCER CALL ", action.type, " ", USER.LOAD_SUCCESS);
    if (action.type === 'LOGIN'){
        return action.token;
    }
    else if (action.type === 'LOGOUT'){
        return null
    }
    return state;
}

const deviceReducer = (state=[], action) => {
    if (action.type === 'DEVICE')
    {
        return action.device
    }
    return state
}

const freqReducer = (state="5 s", action) => {
    switch(action.type){
        case "FREQ":
            return action.freq;
        default:
            return state;
    }
}

const durationReducer = (state="24h", action) => {
    switch(action.type){
        case "DURATION":
            return action.duration;
        default:
            return state;
    }
}



const allReducers = combineReducers({
    //list of all reducers here
    isLoggedIn: loggedinReducer,
    freq: freqReducer,
    duration: durationReducer,
    token: loginReducer,
    devices: deviceReducer
})

export default allReducers;