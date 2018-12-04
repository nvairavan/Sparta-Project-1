var cube1 = document.getElementsByClassName('piece1')
var cube2 = document.getElementsByClassName('piece2')
var cube3 = document.getElementsByClassName('piece3')
var cube4 = document.getElementsByClassName('piece4')
var cube5 = document.getElementsByClassName('piece5')
var cube6 = document.getElementsByClassName('piece6')
var cube7 = document.getElementsByClassName('piece7')
var cube8 = document.getElementsByClassName('piece8')

var top = ["piece1", "piece2", "piece3", "piece4"];
var bottom = ["piece5", "piece6", "piece7", "piece8"];
var left = ["piece2", "piece4", "piece7", "piece8"];
var right = ["piece1", "piece3", "piece5", "piece6"];
var front = ["piece1", "piece4", "piece5", "piece7"];
var back = ["piece2", "piece3", "piece6", "piece8"];

// function rotateLeft() {
// let top_move = document.querySelector(“.top”);
// tops.style.transform = “rotate(90deg) ”;
// Standard syntax
//   top.style.transform = "rotate(190deg)";
// }

document.addEventListener('DOMContentLoaded', () => { reset(); }, false);

const getPieceData = (pieceElem) => ({
  x: Number(pieceElem.getAttribute('x')),
  y: Number(pieceElem.getAttribute('y')),
  z: Number(pieceElem.getAttribute('z')),
  rotX: Number(pieceElem.style.getPropertyValue("--rotationX")),
  rotY: Number(pieceElem.style.getPropertyValue("--rotationY")),
  rotZ: Number(pieceElem.style.getPropertyValue("--rotationZ")),
});

const setPieceData = (pieceElem, pieceData) => {
  pieceElem.setAttribute('x', pieceData.x);
  pieceElem.setAttribute('y', pieceData.y);
  pieceElem.setAttribute('z', pieceData.z);
  pieceElem.style.setProperty("--rotationX", pieceData.rotX);
  pieceElem.style.setProperty("--rotationY", pieceData.rotY);
  pieceElem.style.setProperty("--rotationZ", pieceData.rotZ);
};

const reset = () => {
  document.querySelectorAll('.cube').forEach((element, i) => {
    setPieceData(element, {
      x: (i % 3),
      y: (Math.floor(i / 3) % 3),
      z: (Math.floor(i / 9) % 3),
      rotX: 0,
      rotY: 0,
      rotZ: 0,
    });
  });
}

const rotX = () => {
  document.querySelectorAll('.cube[x="0"]').forEach(element => {
    const oldPiece = getPieceData(element);
    let newPiece = { ...oldPiece };

    newPiece.rotX += 1;
    newPiece.y = oldPiece.z;
    newPiece.z = Math.abs(2 - oldPiece.y);

    setPieceData(element, newPiece);
  });
}
const rotY = () => {
  document.querySelectorAll('.cube[y="0"]').forEach(element => {
    const oldPiece = getPieceData(element);
    let newPiece = { ...oldPiece };

    switch (oldPiece.rotX % 4) {
      case 0:
        newPiece.rotY += 1;
        break;
      case 1:
        newPiece.rotZ -= 1;
        break;
      case 2:
        newPiece.rotY -= 1;
        break;
      case 3:
        newPiece.rotZ += 1;
        break;
    }

    newPiece.x = Math.abs(2 - oldPiece.z);
    newPiece.z = oldPiece.x;

    setPieceData(element, newPiece);
  });
}
const rotZ = () => {
  document.querySelectorAll('.cube[z="0"]').forEach(element => {
    const oldPiece = getPieceData(element);
    let newPiece = { ...oldPiece };

    switch (oldPiece.rotX % 4) {
      case 0:
        newPiece.rotZ += 1;
        break;
      case 1:
        newPiece.rotY += 1;
        break;
      case 2:
        newPiece.rotZ -= 1;
        break;
      case 3:
        newPiece.rotY -= 1;
        break;
    }

    newPiece.x = Math.abs(2 - oldPiece.y);
    newPiece.y = oldPiece.x;

    setPieceData(element, newPiece);
  });
}