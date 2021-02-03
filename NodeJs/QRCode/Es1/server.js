var QRCode = require('qrcode')

 
//QRCode.toString('I am a pony!', function (err, url) {
//  console.log(url)
//})
x = QRCode.toDataURL("Sacco puzza di ebreo", function (err, url) {
    console.log( url.length * 2 )
      console.log(url)
    }
);
console.log(x);

QRCode.toFile("img.png", "Sacco puzza di ebreo");
