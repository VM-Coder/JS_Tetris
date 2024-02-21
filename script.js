function game(){
var canv = document.getElementById("canvas");
var ctx = canv.getContext("2d");
var canv2 = document.getElementById("canvas2");
var ctx2 = canv2.getContext("2d");
var RowsCounter = document.getElementById("rows");
var i = 0;
var isFell = true;
var f;
var rC;
var rN = Math.floor(Math.random()*7);
var X = 5, Y = -2;
var rows = 0;
var gameOver = false;
var go = document.getElementById("go");

ctx2.fillStyle = "black";
ctx2.fillRect(0, 0, 500, 600);

var field = [[9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],];
var colors = ["crimson", "orangered", "gold", "palegreen", "skyblue", "royalblue", "darkviolet"]		

class Figure {
	constructor(type){
		this.type = type;
		this.x = [];
		this.y = [];
		switch (type){
			case 0:
				this.x[0] = 0; this.y[0] = -1;
				this.x[1] = 0; this.y[1] = 0;
				this.x[2] = 0; this.y[2] = 1;
				this.x[3] = 1; this.y[3] = 1;
				break;
			case 1:
				this.x[0] = 0; this.y[0] = 0;
				this.x[1] = 0; this.y[1] = 1;
				this.x[2] = 1; this.y[2] = 0;
				this.x[3] = 1; this.y[3] = -1;	
				break;
			case 2:
				this.x[0] = -1; this.y[0] = 0;
				this.x[1] = 0; this.y[1] = 0;
				this.x[2] = 0; this.y[2] = 1;
				this.x[3] = 1; this.y[3] = 0;	
				break;
			case 3:
				this.x[0] = 0; this.y[0] = 0;
				this.x[1] = 0; this.y[1] = 1;
				this.x[2] = -1; this.y[2] = 0;
				this.x[3] = -1; this.y[3] = -1;	
				break;
			case 4:
				this.x[0] = 0; this.y[0] = 0;
				this.x[1] = 0; this.y[1] = 1;
				this.x[2] = 1; this.y[2] = 0;
				this.x[3] = 1; this.y[3] = 1;	
				break;
			case 5:
				this.x[0] = 0; this.y[0] = -1;
				this.x[1] = 0; this.y[1] = 0;
				this.x[2] = 0; this.y[2] = 1;
				this.x[3] = -1; this.y[3] = 1;	
				break;
			case 6:
				this.x[0] = 0; this.y[0] = -1;
				this.x[1] = 0; this.y[1] = 0;
				this.x[2] = 0; this.y[2] = 1;
				this.x[3] = 0; this.y[3] = -2;	
				break;	
		}

	}
}		  

function drawField(){
	ctx.fillStyle = "black";
	ctx.strokeStyle = "white";
	ctx.fillRect(0, 0, 1000, 2000);
	ctx.lineWidth = 3;
	for (var i = 0; i < 11; i++){
		ctx.beginPath();
		ctx.moveTo(0+100*i, 0);
		ctx.lineTo(0+100*i, 2000);
		ctx.stroke();
	}
	for (var i = 0; i < 21; i++){
		ctx.beginPath();
		ctx.moveTo(0, 0+100*i);
		ctx.lineTo(1000, 0+100*i);
		ctx.stroke();
	}
}



function drawTale(color, x, y){
	ctx.lineWidth = 15;
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.rect(8+x*100, 8+y*100, 84, 84);
	ctx.stroke();
}

function drawOld(){
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 10; j++){
			if (field[i][j] != 9) {
				drawTale(colors[field[i][j]], j, i);
			}			
		}
	}
}

function isFree(){
	for (var i = 0; i < 4; i++){
		if (f.y[i] + Y >= 0 && f.y[i] + Y + 1 < 20) {
			if (field[f.y[i] + Y + 1][f.x[i] + X] != 9)
				return false;
		} 
		if (f.y[i] + 1 + Y == 20) {
			return false;
		}
	}
	return true;
}

drawField();

document.addEventListener("keydown", function(e){
	drawField();
	drawOld();
	if(e.keyCode == 37){

		var free = true;

		for (var i = 0; i < 4; i++) {	
			if (f.x[i] + X == 0){
				free = false;
			}	
			if (f.y[i] + Y >= 0){
				if (f.x[i] + X > 0) {
					if(field[f.y[i] + Y][f.x[i] + X - 1] != 9){
						free = false;
					}
				}
			}
		}

		if (free) {
			X--;			
		}
	}	

	if (e.keyCode == 39) {
		var free = true;

		for (var i = 0; i < 4; i++) {	
			if (f.x[i] + X == 9){
				free = false;
			}	
			if (f.y[i] + Y >= 0){
				if (f.x[i] + X < 9) {
					if(field[f.y[i] + Y][f.x[i] + X + 1] != 9){
						free = false;
					}
				}
			}
		}

		if (free) {
			X++;			
		}
	}

	if (e.keyCode == 38){
		if (rC != 4) {
			var free = true;
			var tx = [], ty = [];
			for (var i = 0; i < 4; i++) {
				tx[i] = -f.y[i];
				ty[i] = f.x[i];
				if (tx[i] + X < 0 || tx[i] + X > 9 || ty[i] + Y > 19) {
					free = false;
				}

				if (ty[i] + Y >= 0) {
					if (field[ty[i] + Y][tx[i] + X] != 9) {
						free = false;
					}					
				}
			}	
			if (free) {
				for (var i = 0; i < 4; i++) {
					f.x[i] = tx[i];
					f.y[i] = ty[i];
				}
			}		
		}

	}

	if (e.keyCode == 40){
		if (isFree()){
			Y++;
		}
	}

	for (var i = 0; i < 4; i++) {
		drawTale(colors[rC], f.x[i] + X, f.y[i] + Y)		
	}


})

function drawNext(r){
	var nf = new Figure(r);
	for (var i = 0; i < 4; i++) {
		ctx2.lineWidth = 15;
		ctx2.strokeStyle = colors[r];
		ctx2.beginPath();
		ctx2.rect(200+8+nf.x[i]*100, 300+8+nf.y[i]*100, 84, 84);
		ctx2.stroke();
	}
}

drawNext(rN);

var interval = setInterval(function(){
	drawField();
	drawOld();

	if (isFell){
		rC = rN;
		document.getElementById("canvasDiv").style.backgroundColor = colors[rC];
		document.getElementById("canvas2Div").style.backgroundColor = colors[rC];
		rN = Math.floor(Math.random()*7);
		ctx2.fillRect(0, 0, 500, 600);
		drawNext(rN);
		f = new Figure(rC);
		X = 5;
		Y = -2;
		isFell = false;
	}

	if(isFree()){
		Y++;
		for (var i = 0; i < 4; i++) {
			drawTale(colors[rC], f.x[i] + X, f.y[i] + Y)		
		}
	} else {
		for (var i = 0; i < 4; i++) {
			if(f.y[i] + Y >= 0){
				field[f.y[i] + Y][f.x[i] + X] = rC;				
			}
		}
		drawOld();	
		for (var i = 1; i < 20; i++){
			if(field[i].includes(9)){
				continue;
			} else {
				for (var j = i; j > 0; j--){
					for (var k = 0; k < 10; k++){
						field[j][k] = field[j-1][k];						
					}
				}
				rows++;
				RowsCounter.innerHTML = "Rows: " + String(rows);
			}
		}

		for (var i = 0; i < 10; i++) {
			if (field[0][i] != 9){
				gameOver = true;
			}
		}

		if (gameOver) {
			clearInterval(interval);
			go.innerHTML = "Game Over";
			go.style.opacity = 0.75;
		}	

		isFell = true;
	}

}, 1000)


}

game();
