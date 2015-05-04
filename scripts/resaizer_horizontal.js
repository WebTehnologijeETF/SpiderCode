function ResizerHorizontal(left, right, rate){
	if(typeof(rate) !== 'number')
		throw new "Rate must be number";
	if(rate < 0.0 || rate > 1.0)
		throw new "Rate must be in range [0,1]";
	if(typeof(left) !== 'object' )
		throw new "left must be object";
	if(typeof(right) !== 'object' )
		throw new "right must be object";

	this.left = left;
	this.right = right;
	this.rate = rate;
}

ResizerHorizontal.prototype.setLeftDiv = function(element){
	if(typeof(element) !== 'object' )
		throw new "DOMElement must be object";

	this.left = element;
}


ResizerHorizontal.prototype.setRightDiv = function(element){
	if(typeof(element) !== 'object' )
		throw new "DOMElement must be object";

	this.right = element;
}

ResizerHorizontal.prototype.resize = function(width, height, top, left){
	this.left.resize(width*rate, height, top, left);
	this.right.resize(width - width*rate,  height, top, left + width*rate);
}
