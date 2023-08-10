export const formatAddress = (address) => {
    var addr = address.slice(0, 8) + "..." + address.slice(-6);
    return addr;
}

export const trim = (str, length) => {
    var trimmedStr = str.slice(0, length);
    return trimmedStr;
}