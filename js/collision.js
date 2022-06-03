function momFruitCollosion () {
	for (let i = 0;i < fruit.num; i ++) {
		if (fruit.active[i]) {
			let l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y)
			if (l < 900) {
				fruit.dead(i)
				mom.bodyIndex ++
				mom.eatTimer = 0
				if(mom.bodyIndex > 7){
					mom.bodyIndex = 7
				}
				data.double = 1
				if(fruit.fruitType[i] === 'blue') {
					data.double = 2
				}
				
				haha ()
			}
		}
	}
}
function haha () {
	data.addScore()
	data.fruitNum = 0
}