function getMedata(){
    //console.log("Function geteData() is called");
    return Math.floor(Math.random() * 10);
}



function DateOffset( offset ) {
    return new Date( +new Date + offset );
}

function getRangeData(freq, duration){
    let l = []
    let d = []
    //console.log("DURATION:: ", duration)
    //console.log("FREQ--:: ", freq)
    let j;
    let dd = Date.now();
    console.log(new Date(dd));
    dd = dd-duration*60*1000;
    console.log("-date Dte ", dd, " ", new Date(dd));
    for(let i=0; i<=duration*10; i+=freq)
    {
        dd = dd + i*1000;
        //console.log("+new date , i", dd, " ",i)
        l.push(dd);
        d.push(getMedata());
    }
    console.log(l)
    return {
        label: l,
        data: d,
    }

}

export {getMedata, getRangeData, DateOffset}