const canvas = document.querySelector('canvas');
//grabs 2d superclass
const c = canvas.getContext('2d');

//set height/width to 16x9 for any screen width
canvas.width = innerWidth;
canvas.height = canvas.width*9/16;

//fillRect(x,y,width,height) ; set to be canvas size
c.fillRect(0, 0, canvas.width, canvas.height);

