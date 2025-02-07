
function DateGetter(){
    const dateTime = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true
    });
    return dateTime;
}

module.exports = DateGetter;