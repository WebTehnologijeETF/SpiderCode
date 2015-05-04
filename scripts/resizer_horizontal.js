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

ResizerHorizontal.prototype.resize = function(width, height, left, top){
	//alert("w:" + width + ", h:" + height + ", l:" + left + ", t:" + top);
	this.left.resize(width*this.rate, height, left, 0);
	this.right.resize(width - width*this.rate,  height, left + width*this.rate, 0);
}
