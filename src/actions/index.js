import {USER} from './../CONSTANTS/User';

const setToken = (token) => ({
    type: "LOGIN",
    token,
})

const setFreq = (freq) => ({
    type: "FREQ",
    freq,
})

const setMyDuration = (duration) => ({
    type: "DURATION",
    duration
})

export {setToken, setFreq, setMyDuration};