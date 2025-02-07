
function TimeGetter(){
    const time = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true
    });
    return time;
}

module.exports =  TimeGetter;