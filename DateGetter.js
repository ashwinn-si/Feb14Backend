
function DateGetter(){
    const date = new Date();
    return (date.toLocaleDateString("en-IN"));
}

module.exports = DateGetter;