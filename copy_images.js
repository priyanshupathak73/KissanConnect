const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\priya\\.gemini\\antigravity\\brain\\f2112bf4-c530-4816-96f1-fdc6a5f369b8';
const destDir = path.join(__dirname, 'frontend', 'public', 'images');

const files = [
  ['tomato_product_1774630589817.png', 'tomato.png'],
  ['broccoli_product_1774631251492.png', 'broccoli.png'],
  ['capsicum_product_1774631301763.png', 'capsicum.png'],
  ['onion_product_1774631357507.png', 'onion.png'],
  ['beans_product_1774631717389.png', 'beans.png'],
  ['carrot_product_1774631752608.png', 'carrot.png'],
  ['cabbage_product_1774631782577.png', 'cabbage.png'],
  ['sweetpotato_product_1774631814435.png', 'sweetpotato.png'],
  ['pumpkin_product_1774631842086.png', 'pumpkin.png'],
  ['corn_product_1774631929114.png', 'corn.png'],
  ['radish_product_1774631958045.png', 'radish.png'],
  ['aubergine_product_1774631988112.png', 'aubergine.png'],
  ['beetroot_product_1774632011916.png', 'beetroot.png'],
  ['cucumber_product_1774632039976.png', 'cucumber.png'],
  ['bittergourd_product_1774632087588.png', 'bittergourd.png'],
];

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

files.forEach(([src, dest]) => {
  try {
    fs.copyFileSync(path.join(srcDir, src), path.join(destDir, dest));
    console.log('OK: ' + dest);
  } catch (e) {
    console.error('FAIL: ' + dest + ' - ' + e.message);
  }
});
console.log('ALL DONE');
