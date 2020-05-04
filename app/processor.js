const sharp = require('sharp');
const fs = require('fs');

/**
 * Wrapper on the sharp.js library.
 * Handles the following operations
 *  resizing
 *  rotating
 *  trimming "boring" edges
 *
 * Initialize with an image.
 */
class ImageProcessor {
  constructor(image) {
    this.image = image;
    this._outputFile = {
      buffer: null,
      info: null,
    }
  }

  /**
   *
   * @param {string} image - filepath to image
   */
  setImage(image) {
    this.image = image;
  }

  /**
   * Set output file params.  Does not save the file to disk.
   *
   * @param {object} outputBuffer - the output image data
   * @param {object} info - contains format, height, width, channels, size
   */
  _setOutputFile(outputBuffer, info) {
    // TODO fix this
    this._outputFile.buffer = outputBuffer;
    this._outputFile.info = info;
    console.log(this._outputFile);
  }

  /**
   * Write an image to a file.
   *
   * @param {object} outputBuffer - the output image data
   * @param {object} info - contains format, height, width, channels, size
   */
  writeImage(outputBuffer, info) {
    sharp(outputBuffer)
      .toFile(`output.${info.format}`)
      .then(info => console.log(info))
      .catch(err => console.log(err));
  }

  /**
   *
   * @param {Number} height
   * @param {Number} width
   */
  resize(height, width) {
    const params = {};
    if (height > 0) {
      params.height = height;
    }
    if (width > 0) {
      params.width = width;
    }

    sharp(this.image)
      .resize(params)
      .toBuffer((err, outputBuffer, info) => {
        if (err) {
          console.log(err);
          return;
        }
        this.writeImage(outputBuffer, info);
      });
  }

  /**
   *
   * @param {Number} degrees
   */
  rotate(degrees) {
    const pipeline = sharp()
      .rotate(degrees)
      .toBuffer((err, outputBuffer, info) => {
        // auto-rotated using EXIF Orientation tag
        if (err) {
          console.log(err);
          return;
        }
        this.writeImage(outputBuffer, info);
      });
    fs.createReadStream(this.image).pipe(pipeline);
  }

  trim() {
    return;
  }
}


module.exports = ImageProcessor;
