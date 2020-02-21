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

const freqReducer = (state="5 s", action) => {
    switch(action.type){
        case "FREQ":
            return action.freq;
        default:
            return state;
    }
}

const durationReducer = (state="15 m", action) => {
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
    duration: durationReducer
})

export default allReducers;