/*!
 * HUNT!
 * JavaScript
 * License MIT
 */

function setCookie(c_name,value,expiredays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +
	escape(value) +
	((expiredays==null) ? "" : "; expires="+exdate.toGMTString());
}
function getCookie(c_name) {
	if (document.cookie.length>0) {
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1) {
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}
//执行搜索
function doSearch(engine) {
	var hunt = encodeURIComponent(document.getElementById('textSearch').value);
	switch (engine) {
		case 'baidu':
			location.href = "https://www.baidu.com/s?wd="+hunt;
			break;
		case 'google':
			location.href = "https://www.google.com/search?q="+hunt;
		default:
			break;
	}

}
//显示/隐藏背景图改变器
var bgChangerStat = false;
function bgChanger() {
	if(bgChangerStat == false) {
		document.getElementById("bgchanger").style.top="0";
		bgChangerStat = true;
	} else {
		document.getElementById("bgchanger").style.top="-60px";
		bgChangerStat = false;
	}
}
//显示/隐藏颜色改变器
var colorChangerStat = false;
function colorChanger() {
	if(colorChangerStat == false) {
		document.getElementById("colorchanger").style.display="block";
		colorChangerStat = true;
	} else {
		document.getElementById("colorchanger").style.display="none";
		colorChangerStat = false;
	}
}
//改变背景图
function changeBackground() {
	var bgURL = document.getElementById("bgurl").value;
	var bgColor1 = getCookie("bgColor1");
	var bgColor2 = getCookie("bgColor2");
	if(bgURL == "" && bgColor1 != "") {
		document.body.style="background:linear-gradient(to right,"+bgColor1+","+bgColor2+");";
		document.getElementsByTagName("meta")[2].content=bgColor1;
		setCookie("bgurl","",-1);
	} else if(bgURL != "") {
		document.body.style.background="url("+bgURL+") 60% 0% / cover";
		document.getElementsByTagName("meta")[2].content="#fff";
		setCookie("bgurl",bgURL,180);
	} else if(bgURL == "" && bgColor1 == "") {
		document.body.style="background:linear-gradient(to right,#f76b1d,#fad961);";
		document.getElementsByTagName("meta")[2].content="#f8a240";
		setCookie("bgurl","",-1);
	}
}
//改变背景颜色
function changeColor() {
	var bgColor1 = document.getElementById("bgcolor1").value;
	var bgColor2 = document.getElementById("bgcolor2").value;
	if(getCookie("bgurl") == "") {
		document.body.style="background:linear-gradient(to right,"+bgColor1+","+bgColor2+");";
		document.getElementsByTagName("meta")[2].content=bgColor1;
	}
	setCookie("bgColor1",bgColor1,180);
	setCookie("bgColor2",bgColor2,180);
}
//设为默认颜色
function setDefault() {
	document.body.style="background:linear-gradient(to right,#f76b1d,#fad961);";
	document.getElementsByTagName("meta")[2].content="#f8a240";
	setCookie("bgColor1","",-1);
	setCookie("bgColor2","",-1);
}

window.onload = function() {
	//背景颜色读取
	if(getCookie("bgColor1")!="") {
		var bgColor1 = getCookie("bgColor1");
		var bgColor2 = getCookie("bgColor2");
		document.getElementById("bgcolor1").value=bgColor1;
		document.getElementById("bgcolor2").value=bgColor2;
		if(bgColor1 == bgColor2) {
			document.body.style.background=bgColor1;
		} else {
			document.body.style="background:linear-gradient(to right,"+bgColor1+","+bgColor2+");";
		}
		document.getElementsByTagName("meta")[2].content=bgColor1;
	}
	//读取保存的背景图
	if(getCookie("bgurl")!="") {
		var bgURL = getCookie("bgurl");
		document.getElementById("bgurl").value=bgURL;
		document.body.style.background="url("+bgURL+") 60% 0% / cover";
		document.getElementsByTagName("meta")[2].content="#fff";
	}
	//关闭bgChanger和colorChanger的操作
	var bgButtonObj = document.getElementById("bgbtn");
	var colorButtonObj = document.getElementById("clbtn");
	var bgChangerObj = document.getElementById("bgchanger");
	var colorChangerObj = document.getElementById("colorchanger");
	document.body.addEventListener('click',function(e) {
	    if(e.target !== bgButtonObj && e.target != colorButtonObj && e.target != bgChangerObj && e.target != colorChangerObj) {
	        if (!bgButtonObj.contains(e.target) && !colorButtonObj.contains(e.target) && !bgChangerObj.contains(e.target) && !colorChangerObj.contains(e.target)) {
	            bgChangerStat = true;
	            colorChangerStat = true;
	            bgChanger();
	            colorChanger();
	        }
	    }
	});
	document.getElementById('heart').addEventListener('mouseover', function () {
		this.classList.add('animated', 'rubberBand');
	})

	document.getElementById('heart').addEventListener('mouseout', function () {
		this.classList.remove('animated', 'rubberBand');
	})

	document.getElementById('author').addEventListener('mouseover', function () {
		this.classList.add('animated', 'tada');
	})

	document.getElementById('author').addEventListener('mouseout', function () {
		this.classList.remove('animated', 'tada');
	})
}