function toTitleCase(str) {
    return str.replace(/\w*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function toDBReadyValue(str) {
    let newStr = toTitleCase(str).replace(/\W/g, '');

    return newStr.charAt(0).toLowerCase() + newStr.substr(1);
}
