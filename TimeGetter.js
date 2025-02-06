
function TimeGetter(){
    const time = new Date();
    return(time.toLocaleTimeString("en-IN", { hour12: true }));
}

module.exports =  TimeGetter;