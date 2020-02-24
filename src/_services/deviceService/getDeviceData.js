
export default function getDataOf(name){
    let res = {
        name: name,
        graphName: "Temperature v/s time",
        min: 0,
        max: Math.floor(Math.random() * 100),
        curr_value: Math.floor(Math.random() * 10),
        Graphlabel: "temp in degree c",
        about: [
            'Thid device is connected in room 1 and perform the operation',
            'It helps in monitoring and controlling the device'
        ],
        location: "abcd"
    }
    return res;
}