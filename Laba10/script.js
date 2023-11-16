let images = [
	'colokol.png',
	'heart.png',
	'diamond.png',
	'podkova.png',
	'dollar.png',
	'bar.png',
]
let results = document.querySelectorAll('.result')
let userName = prompt('Please, enter your name:')

if (userName === null || userName === '') {
	userName = 'User'
}

document.querySelector('#user h1').textContent = userName

let startGameButton = document.querySelector('#spinner')
let countOfSpins = 0

startGameButton.addEventListener('click', () => {
	spin()
})

async function spin() {
	start(false, 11, 1)
	countOfSpins++
	for (let result of results) {
		let boxes = result.querySelector('.boxes')
		let duration = parseInt(boxes.style.transitionDuration)
		boxes.style.transform = 'translateY(0)'
		await new Promise(resolve => setTimeout(resolve, duration * 100))
	}

	let res1Element = document.getElementById('res1')
	let firstBox1 = res1Element.querySelector('.box')
	let backgroundImage1 = getComputedStyle(firstBox1).backgroundImage

	let res2Element = document.getElementById('res2')
	let firstBox2 = res2Element.querySelector('.box')
	let backgroundImage2 = getComputedStyle(firstBox2).backgroundImage

	let res3Element = document.getElementById('res3')
	let firstBox3 = res3Element.querySelector('.box')
	let backgroundImage3 = getComputedStyle(firstBox3).backgroundImage

	document.getElementById('score').innerHTML = countOfSpins

	if (
		backgroundImage1 === backgroundImage2 &&
		backgroundImage1 === backgroundImage3
	) {
		alert('You won')
	} else if (countOfSpins >= 3) {
		alert('You lost')
		countOfSpins = 0
	}
}

function start(first = true, groups = 1, duration = 1) {
	for (let result of results) {
		let boxes = result.querySelector('.boxes')
		let boxesClone = boxes.cloneNode(false)
		const pool = ['pit.png']

		if (!first || result.dataset.spinned === '1') {
			result.dataset.spinned = '0'
			let array = []
			for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
				array.push(...images)
			}
			pool.push(...shuffle(array))
		}

		for (let i = pool.length - 1; i >= 0; i--) {
			let box = document.createElement('div')
			box.classList.add('box')
			box.style.width = result.clientWidth + 'px'
			box.style.height = result.clientHeight + 'px'
			box.style.backgroundImage = `url(${pool[i]})`
			boxesClone.appendChild(box)
		}
		boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`
		boxesClone.style.transform = `translateY(-${result.clientHeight * (pool.length - 1)}px)`
		result.replaceChild(boxesClone, boxes)
		
	}
}

function shuffle([...array]) {
	let length = array.length
	while (length) {
		let i = Math.floor(Math.random() * length--)
		;[array[length], array[i]] = [array[i], array[length]]
	}
	return array
}
start();