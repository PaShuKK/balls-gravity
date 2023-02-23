class Ball {
	ballElement = document.createElement('div')
	speed
	position
	size
	bouncePercent
	
    /**
    * @param {{x: number, y: number}} position Позиция шара
    * @param {number} size размер шара
		* @param {number} bouncePercent процент отскакивания от нижнего края (от 0 до 1)
    * @param {string | undefined} color цвет фона шара
    */
	constructor(position, size, bouncePercent = 1, color = 'transparent') {
		this.position = position
        this.size = size
		this.speed = size / 10
		this.bouncePercent = bouncePercent

		this.ballElement.classList.add('ball')
		this.ballElement.style.left = position.x - (size / 2) + 'px'
		this.ballElement.style.top = position.y - (size / 2) + 'px'
        this.ballElement.style.backgroundColor = color
        this.ballElement.style.width = size + 'px'
        this.ballElement.style.height = size + 'px'
		document.body.appendChild(this.ballElement)
	}

    fall() {
        const intervalId = setInterval( () => {
            this.ballElement.style.top = this.position.y + this.speed + 'px'
            this.position.y = this.position.y + this.speed
            if (this.position.y + this.speed < window.innerHeight - this.size) {
                this.speed = this.speed + this.size / 100
            } else {
                this.speed = -this.speed * this.bouncePercent
                if (this.speed <= 0.5 && this.speed >= -0.5) {
                    clearInterval(intervalId)
                }
            } 
        }, 50)
				return this
	}
}

class Counter {
    counterElement = document.createElement('div')
    ballsCount = 0

    constructor() {
        this.counterElement.innerText = 0
        this.counterElement.classList.add('counter')
        document.body.appendChild(this.counterElement)
    }

    increase(count) {
        this.ballsCount = this.ballsCount + count
        this.counterElement.innerText = this.ballsCount
    }
}

const counter = new Counter()

document.addEventListener('click', (event) => {
    counter.increase(1)
	const randomSize = Math.random() * 200
    if (randomSize < window.innerHeight - event.y) {
        new Ball({x: event.x, y: event.y}, randomSize, 0.7, getRandomColor()).fall()
    }
})


function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
