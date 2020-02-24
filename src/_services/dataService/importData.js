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
    console.log("DURATION:: ", duration)
    console.log("FREQ--:: ", freq)
    let j;
    let dd1 = Date.now();
    //console.log(new Date(dd1));
    let dd = dd1-duration*60*1000;
    //console.log("-date Dte ", dd, " ", new Date(dd));
    for(let i=1; dd<dd1; i=i+freq)
    {
        dd = dd + freq*1000;
        //console.log("+new date , i",i,"  ", new Date(dd));
        l.push(dd);
        d.push(getMedata());
    }
    //console.log(l)
    return {
        label: l,
        data: d,
    }

}

export {getMedata, getRangeData, DateOffset}