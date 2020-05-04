const ImageProcessor = require('./app/processor');

const ip = new ImageProcessor('./data/dog.jpg');

// resizing/rotating testing
// ip.resize(undefined, 2000);
ip.rotate(90);

// svg testing
// ip.setImage('./data/bmw.svg');
// ip.resize(undefined, 2000);
