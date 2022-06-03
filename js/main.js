// 获取屏幕像素
var w3 = window.innerWidth
var h3 = window.innerHeight

var canWidth = w3
var canHeight = h3

let can3
let can4
let ctx3
let ctx4

let lastTime
let deltaTime

let ane
let fruit
let mon
let data

// 定义鼠标的位置
let mx
let my

document.body.onload = game

function game () {
	init()
	lastTime = new Date()
	deltaTime = 0
	gameloop()
}

function init () {
	// 鱼
	can3 = document.getElementById('canvas3')
	// 海藻，果实
	can4 = document.getElementById('canvas4')
	
	// 设置宽高
	can3.width = this.w3
	can3.height = this.h3
	can4.width = this.w3
	can4.height = this.h3
	
	// 获取画笔
	ctx3 = can3.getContext('2d')
	ctx4 = can4.getContext('2d')
	
	can3.addEventListener('mousemove',onMouseMove,false)
	
	ane = new Ane()
	ane.init()
	fruit = new Fruit()
	fruit.init()
	mom = new Mom()
	mom.init()
	data = new Data()
	
	mx = canWidth * 0.5
	my = canHeight * 0.5
}

function gameloop() {
	window.requestAnimFrame(gameloop)
	var now = new Date()
	deltaTime = now - lastTime
	lastTime = now
	if (deltaTime >50) {
		deltaTime = 50
	}
	ane.draw()
	fruit.draw()
	fruit.fruitMonitor()
	ctx3.clearRect(0,0,canWidth,canHeight)
	mom.draw()
	data.draw()
	
	momFruitCollosion()
}

function onMouseMove (e) {
	mx = e.offsetX || e.layerX
	my = e.offsetY || e.layerY
}