var canvas1 = document.querySelector("#canvas1")

// 设置宽高
var w = 500
var h = w

canvas1.width = w
canvas1.height = h

var ctx1 = canvas1.getContext('2d')
var isMouseDown = false
var lastTimestamp = 0
var lastLineWidth = -1
var strokeColor = 'black'

drawGrid()

var lastLoc = {x:0,y:0}

canvas1.onmousedown = function (e) {
	e.preventDefault()
	isMouseDown = true
	lastLoc = windowToCanvas(e.clientX,e.clientY)
	lastTimestamp = new Date().getTime()
}
canvas1.onmouseup = function (e) {
	e.preventDefault()
	isMouseDown = false
}
canvas1.onmouseout = function (e) {
	e.preventDefault()
	isMouseDown = false
}
canvas1.onmousemove = function (e) {
	e.preventDefault()
	if (isMouseDown) {
		var curLoc = windowToCanvas(e.clientX,e.clientY)
		var s = calcDistance(curLoc,lastLoc)
		var curTinestamp = new Date().getTime()
		var t = curTinestamp - lastTimestamp
		var lineWidth = calcLineWidth(t,s)
		
		ctx1.beginPath()
		ctx1.moveTo(lastLoc.x,lastLoc.y)
		ctx1.lineTo(curLoc.x,curLoc.y)
		ctx1.strokeStyle = strokeColor
		ctx1.lineWidth = lineWidth
		ctx1.lineCap = 'round'
		ctx1.lineJoin = 'round'
		ctx1.stroke()
		lastLoc = curLoc
		lastLineWidth = lineWidth
	}
}

// 实现速度快慢改变线条粗细
var maxLineWidth = 20
var minLineWidth = 1
var maxStrokeV = 10
var minStrokeV = 0.1
function calcLineWidth (t,s) {
	var v = s/t
	var resultLineWidth = maxLineWidth
	if (v <= minStrokeV) {
		resultLineWidth = maxLineWidth
	} else if (v >= maxStrokeV) {
		resultLineWidth = minLineWidth
	} else {
		resultLineWidth = maxLineWidth-(v-minStrokeV)/(maxStrokeV-minStrokeV)*(maxLineWidth-minLineWidth)
	}
	// return resultLineWidth
	if (lastLineWidth == -1) {
		return resultLineWidth
	}
	return lastLineWidth*3/5 + resultLineWidth*1/3
}

// 两点之间的长度
function calcDistance (loc1,loc2) {
	return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y))
}

// 转换坐标轴
function windowToCanvas (x,y) {
	var bbox = canvas1.getBoundingClientRect()
	// console.log(bbox);
	return {x:Math.round(x-bbox.left),y:Math.round(y-bbox.top)}
}

function drawGrid() {
	ctx1.save()
	ctx1.strokeStyle = 'red'
	
	// 绘制米字格的框
	ctx1.beginPath()
	ctx1.moveTo(2,2)
	ctx1.lineTo(w-2,2)
	ctx1.lineTo(w-2,w-2)
	ctx1.lineTo(2,w-2)
	ctx1.closePath()
	// 设置线宽
	ctx1.lineWidth = 4
	ctx1.stroke()
	
	// 绘制里面的虚线
	ctx1.beginPath()
	ctx1.lineWidth = 1
	// 设置虚线
	ctx1.setLineDash([20,5])
	ctx1.moveTo(0,0)
	ctx1.lineTo(w,w)
	ctx1.moveTo(w,0)
	ctx1.lineTo(0,w)
	ctx1.moveTo(w/2,0)
	ctx1.lineTo(w/2,w)
	ctx1.moveTo(0,w/2)
	ctx1.lineTo(w,w/2)
	ctx1.stroke()
	ctx1.restore()
}

// 改变颜色
$('.color_btn').click(
	function () {
		$('.color_btn').removeClass("color_btn_selected")
		$(this).addClass("color_btn_selected")
		strokeColor = $(this).css("background-color")
	}
)

// 清除按钮
$('#clear_btn').click(
	function () {
		ctx1.clearRect(0,0,w,h)
		drawGrid()
	}
)

// 保存按钮
$('#keep_btn').click(
	function () {
		var haha = canvas1.toDataURL("image/png")
		$("#write_download")[0].href = haha
	}
)