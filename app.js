document.addEventListener('DOMContentLoaded', () => {
	
	const grid = document.querySelector('.grid')
	const scoreDisplay = document.getElementById('score')
	const width = 8
	const squares = []
	let score = 0

	const candyColors = [
		'url(imagens/1.png)',
		'url(imagens/2.png)',
		'url(imagens/3.png)',
		'url(imagens/4.png)',
		'url(imagens/5.png)',
		'url(imagens/6.png)'
	]

	// create board
	function createBoard(){
		for (let i=0; i < width*width; i++){
			const square = document.createElement('div')
			square.setAttribute('draggable', true)
			square.setAttribute('id', i)
			let randomColor = Math.floor(Math.random() * candyColors.length)
			square.style.backgroundImage = candyColors[randomColor]
			grid.appendChild(square)
			squares.push(square)
		}
	}

	createBoard()

	// mover os docinhos

	let colorBeingDragged
	let colorBeingReplaced
	let squareIdBeignDragged
	let squareIdBeignReplaced

	squares.forEach(square => square.addEventListener('dragstart', dragStart))
	squares.forEach(square => square.addEventListener('dragend', dragEnd))
	squares.forEach(square => square.addEventListener('dragover', dragOver))
	squares.forEach(square => square.addEventListener('dragenter', dragEnter))
	squares.forEach(square => square.addEventListener('dragleave', dragLeave))
	squares.forEach(square => square.addEventListener('drop', dragDrop))

	function dragStart(){
		colorBeingDragged = this.style.backgroundImage
		squareIdBeignDragged = parseInt(this.id)

		console.log(colorBeingDragged)
		console.log(this.id, 'dragstart')
	}

	function dragEnd(){
		console.log(this.id, 'dragend')
		// what is a valid move?
		
		let validMoves = [
			squareIdBeignDragged -1, 
			squareIdBeignDragged -width,
			squareIdBeignDragged +1,
			squareIdBeignDragged +width
		]

		let validMove = validMoves.includes(squareIdBeignReplaced)

		if(squareIdBeignReplaced && validMove){
			squareIdBeignReplaced = null
		} else if (squareIdBeignReplaced && !validMove){
			squares[squareIdBeignReplaced].style.backgroundImage = colorBeingReplaced
			squares[squareIdBeignDragged].style.backgroundImage = colorBeingDragged
		} else squares[squareIdBeignDragged].style.backgroundImage = colorBeingDragged
		
	}

	function dragOver(e){
		e.preventDefault()
		console.log(this.id, 'dragover')
	}

	function dragEnter(e){
		e.preventDefault()
		console.log(this.id, 'dragenter')
	}

	function dragLeave(){
		console.log(this.id, 'dragleave')
	}

	function dragDrop(){
		console.log(this.id, 'dragdrop')
		colorBeingReplaced = this.style.backgroundImage
		squareIdBeignReplaced = parseInt(this.id)
		this.style.backgroundImage = colorBeingDragged
		squares[squareIdBeignDragged].style.backgroundImage = colorBeingReplaced	
	}

	// drop candies once some have been cleared
	function moveDown(){
		for(i=0; i< 55; i++){
			if(squares[i+width].style.backgroundImage === ''){
				squares[i+width].style.backgroundImage = squares[i].style.backgroundImage
				squares[i].style.backgroundImage = ''
				const firstRow = [0,1,2,3,4,5,6,7]
				const isFirstRow = firstRow.includes(i)
				if(isFirstRow && squares[i].style.backgroundImage === ''){
					let randomColor = Math.floor(Math.random() * candyColors.length)
					squares[i].style.backgroundImage = candyColors[randomColor]
				}
			}
		}
	}

	//check for matches

	function checkRowForFour(){
		for(i=0; i< 60; i++){
			let rowOfFour = [i, i+1, i+2, i+3]
			let decideColor = squares[i].style.backgroundImage
			const isBlank = squares[i].style.backgroundImage === ''

			const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]

			if(notValid.includes(i)) continue

			if (rowOfFour.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)){
				score += 4
				scoreDisplay.innerHTML = score
				rowOfFour.forEach(index => {
					squares[index].style.backgroundImage = ''
				})
			}
		}
	}

	checkRowForFour()

	// checkColumn of Four
	function checkColumnForFour(){
		for(i=0; i< 47; i++){
			let columnOfFour = [i, i+width, i+width*2, i+width*3]
			let decideColor = squares[i].style.backgroundImage
			const isBlank = squares[i].style.backgroundImage === ''

			if (columnOfFour.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)){
				score += 4
				scoreDisplay.innerHTML = score
				columnOfFour.forEach(index => {
					squares[index].style.backgroundImage = ''
				})
			}
		}
	}

	checkColumnForFour()


	function checkRowForThree(){
		for(i=0; i< 61; i++){
			let rowOfThree = [i, i+1, i+2]
			let decideColor = squares[i].style.backgroundImage
			const isBlank = squares[i].style.backgroundImage === ''

			const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]

			if(notValid.includes(i)) continue

			if (rowOfThree.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)){
				score += 3
				scoreDisplay.innerHTML = score
				rowOfThree.forEach(index => {
					squares[index].style.backgroundImage = ''
				})
			}
		}
	}

	checkRowForThree()

	// checkColumn of Three
	function checkColumnForThree(){
		for(i=0; i< 47; i++){
			let columnOfThree = [i, i+width, i+width*2]
			let decideColor = squares[i].style.backgroundImage
			const isBlank = squares[i].style.backgroundImage === ''

			if (columnOfThree.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)){
				score += 3
				scoreDisplay.innerHTML = score
				columnOfThree.forEach(index => {
					squares[index].style.backgroundImage = ''
				})
			}
		}
	}

	checkColumnForThree()


	window.setInterval(function(){
		moveDown()
		checkRowForFour()
		checkColumnForFour()
		checkRowForThree()
		checkColumnForThree()
	}, 100)
})