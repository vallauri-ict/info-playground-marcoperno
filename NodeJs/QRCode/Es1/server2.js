import QrScanner from 'qr-scanner';

const qrScanner = new QrScanner(videoElem, result => console.log('decoded qr code:', result));