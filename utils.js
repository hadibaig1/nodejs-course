function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function celciusToFarenheight(celsuis) {
  return (celsuis * 9) / 5 + 32
}

// Common Js export
module.exports = {generateRandomNumber, celciusToFarenheight}