export default function getMyDevices(){
    let r = []
    for(let i=0;i<10;i++)
    {
        let g = {
            name: `name${i}`,
            location: `loaction-${i}`,
            port: `port_${i+1}`,
            status: Math.round(Math.random())===0?false:true,
            id: `id-${9-i}`
        }
        r.push(g);
    }
    return r;
}