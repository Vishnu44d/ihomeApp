export default function getMyDevices(){
    let r = []
    for(let i=0;i<10;i++)
    {
        let g = {
            name: `name${i}`,
            location: `loaction-${i}`,
            status: Math.round(Math.random())===0?false:true
        }
        r.push(g);
    }
    return r;
}