
const setToken = (token) => ({
    type: "LOGIN",
    token,
})
const setDevices = (device) => ({
    type: "DEVICE",
    device,
})

const setFreq = (freq) => ({
    type: "FREQ",
    freq,
})

const setMyDuration = (duration) => ({
    type: "DURATION",
    duration
})

const logoutAction = () => ({
    type: 'LOGOUT'
})

export {setToken, setFreq, setMyDuration, logoutAction, setDevices};