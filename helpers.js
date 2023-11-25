function isInnerRange(x1min,x1max,x2min,x2max){
	if(x2min > x1min && x2min < x1max) { return true;}
	if(x2max > x1min && x2max < x1max) {return true;}
	return false;
}

let generatorYPipeCoord = (ymin,ymax) => {
	y_render = Math.floor(Math.random() * (ymax-ymin) + ymin);
	return y_render;
}