export const hexToBase64 = (hex) => {
    const bytes = new Uint8Array(hex.match(/[\da-f]{2}/gi).map((h) => parseInt(h, 16)));
    return btoa(String.fromCharCode.apply(null, bytes));
}
