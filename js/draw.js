var canvas2 = document.querySelector("#canvas2")

// 设置宽高
var w2 = 1200
var h2 = w2 -650

canvas2.width = w2
canvas2.height = h2

var ctx2 = canvas2.getContext('2d')
var isMouseDown2 = false
var lineWidth2 = 1
var strokeColor2 = 'black'
var lastLoc2 = {x:0,y:0}
var EndingLocHh
var imgData = ''
var imgData1 = ''

function beginStrokeHh (pointHh) {
	isMouseDown2 = true
	lastLoc2 = windowToCanvas2(pointHh.x,pointHh.y)
}

function endStrokeHh () {
	isMouseDown2 = false
}

function EndingStrokeHh (pointHh) {
	isMouseDown2 = false
	EndingLocHh = windowToCanvas2(pointHh.x,pointHh.y)
}

function moveStrokeHh (pointHh) {
	var curLocHh = windowToCanvas2(pointHh.x,pointHh.y)
	ctx2.beginPath()
	ctx2.moveTo(lastLoc2.x,lastLoc2.y)
	ctx2.lineTo(curLocHh.x,curLocHh.y)
	ctx2.strokeStyle = strokeColor2
	ctx2.lineWidth = lineWidth2
	ctx2.lineCap = 'round'
	ctx2.lineJoin = 'round'
	ctx2.stroke()
	lastLoc2 = curLocHh
}

drawHh()
function drawHh () {
	canvas2.onmousedown = function (e) {
		e.preventDefault()
		beginStrokeHh({x:e.clientX,y:e.clientY})
	}
	canvas2.onmouseup = function (e) {
		e.preventDefault()
		EndingStrokeHh({x:e.clientX,y:e.clientY})
	}
	canvas2.onmouseout = function (e) {
		e.preventDefault()
		endStrokeHh()
	}
	canvas2.onmousemove = function (e) {
		e.preventDefault()
		if (isMouseDown2) {
			moveStrokeHh({x:e.clientX,y:e.clientY})
		}
	}
}

// 转换坐标轴
function windowToCanvas2 (x,y) {
	var bbox = canvas2.getBoundingClientRect()
	// console.log(bbox);
	return {x:Math.round(x-bbox.left),y:Math.round(y-bbox.top)}
}

// 改变颜色
$('.color_btn').click(
	function () {
		$('.color_btn').removeClass("color_btn_selected")
		$(this).addClass("color_btn_selected")
		strokeColor2 = $(this).css("background-color")
	}
)

$('.tool_btn').click(
	function () {
		$('.tool_btn').removeClass("tool_btn_selected")
		$(this).addClass("tool_btn_selected")
	}
)

// 清除按钮
$('#draw_clear_btn').click(
	function () {
		ctx2.clearRect(0,0,w2,h2)
	}
)

// 保存按钮
$('#draw_keep_btn').click(
	function () {
		var haha = canvas2.toDataURL("image/png")
		$("#draw_download")[0].href = haha
	}
)

// 铅笔功能
$('#tool_pen').click(
	function () {
		drawHh()
	}
)

function toolDown () {
	canvas2.onmousedown = function (e) {
		beginStrokeHh({x:e.clientX,y:e.clientY})
		ctx2.beginPath()
		ctx2.moveTo(lastLoc2.x,lastLoc2.y)
		ctx2.strokeStyle = strokeColor2
		ctx2.fillStyle = strokeColor2
		ctx2.lineWidth = lineWidth2
		ctx2.lineCap = 'round'
		ctx2.lineJoin = 'round'
		this.imgData1 = ctx2.getImageData(0,0,w2,h2)
	}
	canvas2.onmouseout = null
	canvas2.onmousemove = null
}

// 直线功能
$('#tool_Line').click(
	function () {
		toolDown()
		canvas2.onmousemove = function (e) {
			e.preventDefault()
			if (isMouseDown2) {
				ctx2.clearRect(0,0,w2,h2)
				this.imgData1 && ctx2.putImageData(this.imgData1,0,0)
				var curLocHh = windowToCanvas2(e.clientX,e.clientY)
				ctx2.beginPath()
				ctx2.moveTo(lastLoc2.x,lastLoc2.y)
				ctx2.lineTo(curLocHh.x,curLocHh.y)
				ctx2.stroke()
				this.imgData = ctx2.getImageData(0,0,w2,h2)
				this.imgData && ctx2.putImageData(this.imgData,0,0)
			}
		}
		canvas2.onmouseup = function (e) {
			EndingStrokeHh({x:e.clientX,y:e.clientY})
			ctx2.lineTo(EndingLocHh.x,EndingLocHh.y)
			ctx2.stroke()
		}
	}
)

// 矩形功能
$('#tool_rect').click(
	function () {
		toolDown()
		canvas2.onmousemove = function (e) {
			e.preventDefault()
			if (isMouseDown2) {
				ctx2.clearRect(0,0,w2,h2)
				this.imgData1 && ctx2.putImageData(this.imgData1,0,0)
				var curLocHh = windowToCanvas2(e.clientX,e.clientY)
				ctx2.strokeRect(lastLoc2.x,lastLoc2.y,curLocHh.x-lastLoc2.x,curLocHh.y-lastLoc2.y)
				this.imgData = ctx2.getImageData(0,0,w2,h2)
				this.imgData && ctx2.putImageData(this.imgData,0,0)
			}
		}
		canvas2.onmouseup = function (e) {
			EndingStrokeHh({x:e.clientX,y:e.clientY})
			ctx2.strokeRect(lastLoc2.x,lastLoc2.y,EndingLocHh.x-lastLoc2.x,EndingLocHh.y-lastLoc2.y)
		}
	}
)

// 填充矩形功能
$('#tool_rect-fill').click(
	function () {
		toolDown()
		canvas2.onmouseup = function (e) {
			EndingStrokeHh({x:e.clientX,y:e.clientY})
			ctx2.fillRect(lastLoc2.x,lastLoc2.y,EndingLocHh.x-lastLoc2.x,EndingLocHh.y-lastLoc2.y)
		}
	}
)

// 圆功能
$('#tool_arc').click(
	function () {
		toolDown()
		canvas2.onmouseup = function (e) {
			EndingStrokeHh({x:e.clientX,y:e.clientY})
			ctx2.beginPath()
			ctx2.arc(lastLoc2.x,lastLoc2.y,Math.abs(EndingLocHh.x-lastLoc2.x),0,Math.PI*2)
			ctx2.stroke()
		}
	}
)

// 填充圆功能
$('#tool_arc-fill').click(
	function () {
		toolDown()
		canvas2.onmouseup = function (e) {
			EndingStrokeHh({x:e.clientX,y:e.clientY})
			ctx2.beginPath()
			ctx2.arc(lastLoc2.x,lastLoc2.y,Math.abs(EndingLocHh.x-lastLoc2.x),0,Math.PI*2)
			ctx2.fill()
		}
	}
)

// 三角形功能
$('#tool_triangle').click(
	function () {
		toolDown()
		canvas2.onmouseup = function (e) {
			EndingStrokeHh({x:e.clientX,y:e.clientY})
			ctx2.lineTo(lastLoc2.x-(EndingLocHh.x-lastLoc2.x),EndingLocHh.y)
			ctx2.lineTo(EndingLocHh.x,EndingLocHh.y)
			ctx2.closePath()
			ctx2.stroke()
		}
	}
)

// 填充三角形功能
$('#tool_triangle-fill').click(
	function () {
		toolDown()
		canvas2.onmouseup = function (e) {
			EndingStrokeHh({x:e.clientX,y:e.clientY})
			ctx2.lineTo(lastLoc2.x-(EndingLocHh.x-lastLoc2.x),EndingLocHh.y)
			ctx2.lineTo(EndingLocHh.x,EndingLocHh.y)
			ctx2.closePath()
			ctx2.fill()
		}
	}
)

// 线条宽度功能
$('#tool_LineWidth-one').click(
	function () {
		lineWidth2 = '1'
	}
)

// 线条宽度功能
$('#tool_LineWidth-two').click(
	function () {
		lineWidth2 = '5'
	}
)

// 线条宽度功能
$('#tool_LineWidth-three').click(
	function () {
		lineWidth2 = '10'
	}
)

// 橡皮擦功能
$('#tool_eraser').click(
	function () {
		toolDown()
		canvas2.onmouseup = function (e) {
			EndingStrokeHh({x:e.clientX,y:e.clientY})
			ctx2.fillStyle = '#fff'
			ctx2.fillRect(lastLoc2.x,lastLoc2.y,EndingLocHh.x-lastLoc2.x,EndingLocHh.y-lastLoc2.y)
		}
	}
)

