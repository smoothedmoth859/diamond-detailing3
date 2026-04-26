const fs = require('fs');
const https = require('https');

const data = encodeURIComponent('https://smoothedmoth859.github.io/diamond-detailing3/');
const size = '1000x1000';
const bgcolor = '0a0a0a';
const color = 'ffffff';
const margin = 2;

const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${data}&color=${color}&bgcolor=${bgcolor}&margin=${margin}`;

const file = fs.createWriteStream('qrcode.png');

https.get(url, (response) => {
    if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log('QR Code saved successfully as qrcode.png');
        });
    } else {
        console.error('Failed to download QR code:', response.statusCode);
    }
}).on('error', (err) => {
    console.error('Error downloading QR code:', err.message);
});
