
function spiltString(leng){ 
	var me = this;
	var arglen = arguments.length;
	this.flds = new Array();
	this.maxlen = leng;
	for (var i=1; i<arglen; i++){
		this.flds[i-1] = arguments[i];
	}
	if (this.flds.length > 0){
		var fld1 = this.flds[0];
		fld1.onkeydown = function(event){
			extendMaxLength(me.flds, me.maxlen, event);
		}
		fld1.onkeyup = function(event){
			splitPaste(me.flds, me.maxlen, event)
		}
		if (typeof fld1.onbeforepaste != "undefined"){
			fld1.onbeforepaste = function(event){
				extendMaxLength(me.flds, me.maxlen, event);
			}
		}
		if (typeof fld1.onpaste != "undefined"){
			fld1.onpaste = function(event){
				//we need a little delay here before calling the function
				setTimeout(function(){
					splitPaste(me.flds, me.maxlen, event);
				}, 10);
			}
		}
		$('#item1').bind('mousedown',function(e){
		if(!e.keyCode && e.which == '3'){
			e.type = "beforepaste";
			extendMaxLength(me.flds, me.maxlen, e); 
		 	
		}}); 
	}

	
}
function extendMaxLength(arrFlds, maxlen1, evt){
			if (!evt) evt = event;
			if (evt.ctrlKey || evt.type=="beforepaste"){
			var len = maxlen1;
			var arrlen = arrFlds.length;
			for (var i=1; i<arrlen; i++){
				len += arrFlds[i].maxLength;
			}
			arrFlds[0].maxLength = len + arrlen
		}
	}

	function splitPaste(arrFlds, maxlen1, evt){
		var s = arrFlds[0].value;
		var len = s.length;
		if (len <= maxlen1){
			arrFlds[0].value = s;
			if (arrFlds.length > 1 && len==maxlen1){
				arrFlds[1].focus();
			}
			return;
		}
		else {
			var len=0, start=0, arrlen=arrFlds.length, el;
			for (var i=0; i<arrlen; i++){
				el = arrFlds[i];
				len = (i>0) ? el.maxLength:maxlen1;
				el.value = s.substr(start, len);
				if (el.value=="" || el.value.length < len){
					el.focus();
					el.value = el.value; 
					return;
				}
				start += len;
			}
		}
		arrFlds[0].maxLength = maxlen1; 
	}




function init(){
	var f = document.forms[0];
	var item = new spiltString(f.item1.maxLength, f.item1, f.item2, f.item3); 
	
}
window.onload = init;

