document.addEventListener('DOMContentLoaded', () =>  {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    let squares = []
    const width = 4
    let score = 0
  
    //create the playing board
    function createBoard() {
      for (let i=0; i < width*width; i++) {
        square = document.createElement('div')
        square.innerHTML = 0
        gridDisplay.appendChild(square)
        squares.push(square)
      }
      generate()
      generate()
    }
    createBoard()
  
    //generate a new number
    function generate() {
      randomNumber = Math.floor(Math.random() * squares.length)
      if (squares[randomNumber].innerHTML == 0) {
        squares[randomNumber].innerHTML = 2
      } else generate()
      checkForGameOver()
    }

    function updateRow(i, newRow) {
      squares[i].innerHTML = newRow[0]
      squares[i +1].innerHTML = newRow[1]
      squares[i +2].innerHTML = newRow[2]
      squares[i +3].innerHTML = newRow[3]    
    }

    function getRow(i){
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+1].innerHTML
      let totalThree = squares[i+2].innerHTML
      let totalFour = squares[i+3].innerHTML
      let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      return row
    }
  
    function moveRight() {
      for (let i=0; i < 16; i++) {
        if (i % 4 === 0) {
          // let totalOne = squares[i].innerHTML
          // let totalTwo = squares[i+1].innerHTML
          // let totalThree = squares[i+2].innerHTML
          // let totalFour = squares[i+3].innerHTML
          // let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
          let row = getRow(i)

          let filteredRow = row.filter(num => num)
          let missing = 4 - filteredRow.length
          let zeros = Array(missing).fill(0)
          let newRow = zeros.concat(filteredRow)
  
          // squares[i].innerHTML = newRow[0]
          // squares[i +1].innerHTML = newRow[1]
          // squares[i +2].innerHTML = newRow[2]
          // squares[i +3].innerHTML = newRow[3]
          updateRow(i, newRow)
        }
      }
    }
  
    function moveLeft() {
      for (let i=0; i < 16; i++) {
        if (i % 4 === 0) {
          // let totalOne = squares[i].innerHTML
          // let totalTwo = squares[i+1].innerHTML
          // let totalThree = squares[i+2].innerHTML
          // let totalFour = squares[i+3].innerHTML
          // let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
          let row = getRow(i)
  
          let filteredRow = row.filter(num => num)
          let missing = 4 - filteredRow.length
          let zeros = Array(missing).fill(0)
          let newRow = filteredRow.concat(zeros)
  
          // squares[i].innerHTML = newRow[0]
          // squares[i +1].innerHTML = newRow[1]
          // squares[i +2].innerHTML = newRow[2]
          // squares[i +3].innerHTML = newRow[3]
          updateRow(i, newRow)
        }
      }
    }

    function getCol(i){
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+4].innerHTML
      let totalThree = squares[i+8].innerHTML
      let totalFour = squares[i+12].innerHTML
      let col = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      return col
    }

    function updateCol(i, newCol) {
      squares[i].innerHTML = newCol[0]
      squares[i+4].innerHTML = newCol[1]
      squares[i+8].innerHTML = newCol[2]
      squares[i+12].innerHTML = newCol[3]
    }    
  
  
    function moveUp() {
      for (let i=0; i < 4; i++) {
        // let totalOne = squares[i].innerHTML
        // let totalTwo = squares[i+width].innerHTML
        // let totalThree = squares[i+(width*2)].innerHTML
        // let totalFour = squares[i+(width*3)].innerHTML
        // let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
        let col = getCol(i)

        let filteredColumn = col.filter(num => num)
        let missing = 4 - filteredColumn.length
        let zeros = Array(missing).fill(0)
        let newColumn = filteredColumn.concat(zeros)
  
        // squares[i].innerHTML = newColumn[0]
        // squares[i+4].innerHTML = newColumn[1]
        // squares[i+8].innerHTML = newColumn[2]
        // squares[i+12].innerHTML = newColumn[3]
        updateCol(i, newColumn)
      }
    }
  
    function moveDown() {
      for (let i=0; i < 4; i++) {
        // let totalOne = squares[i].innerHTML
        // let totalTwo = squares[i+width].innerHTML
        // let totalThree = squares[i+(width*2)].innerHTML
        // let totalFour = squares[i+(width*3)].innerHTML
        // let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
        let col = getCol(i)
  
        let filteredColumn = col.filter(num => num)
        let missing = 4 - filteredColumn.length
        let zeros = Array(missing).fill(0)
        let newColumn = zeros.concat(filteredColumn)
  
        // squares[i].innerHTML = newColumn[0]
        // squares[i+4].innerHTML = newColumn[1]
        // squares[i+8].innerHTML = newColumn[2]
        // squares[i+12].innerHTML = newColumn[3]
        updateCol(i, newColumn)
      }
    }
  
    function combineRow() {
      for (let i =0; i < 15; i++) {
        if (squares[i].innerHTML === squares[i +1].innerHTML) {
          let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +1].innerHTML)
          squares[i].innerHTML = combinedTotal
          squares[i +1].innerHTML = 0
          score += combinedTotal
          scoreDisplay.innerHTML = score
        }
      }
      checkForWin()
    }
  
    function combineColumn() {
      for (let i =0; i < 12; i++) {
        if (squares[i].innerHTML === squares[i +width].innerHTML) {
          let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +width].innerHTML)
          squares[i].innerHTML = combinedTotal
          squares[i +width].innerHTML = 0
          score += combinedTotal
          scoreDisplay.innerHTML = score
        }
      }
      checkForWin()
    }
  
    //assign functions to keyCodes
    function control(e) {
      if(e.keyCode === 37) {
        keyLeft()
      } else if (e.keyCode === 38) {
        keyUp()
      } else if (e.keyCode === 39) {
        keyRight()
      } else if (e.keyCode === 40) {
        keyDown()
      }
    }
    document.addEventListener('keyup', control)
  
    function keyRight() {
      moveRight()
      combineRow()
      moveRight()
      generate()
    }
  
    function keyLeft() {
      moveLeft()
      combineRow()
      moveLeft()
      generate()
    }
  
    function keyUp() {
      moveUp()
      combineColumn()
      moveUp()
      generate()
    }
  
    function keyDown() {
      moveDown()
      combineColumn()
      moveDown()
      generate()
    }
  
    //check for the number 2048 in the squares to win
    function checkForWin() {
      for (let i=0; i < squares.length; i++) {
        if (squares[i].innerHTML == 2048) {
          resultDisplay.innerHTML = 'You WIN'
          document.removeEventListener('keyup', control)
          setTimeout(() => clear(), 3000)
        }
      }
    }
  
    //check if there are no zeros on the board to lose
    function checkAround(i) {
      let adj = []
      
      if (i + 1 < 16){
        adj.push(squares[i+1].innerHTML)
      }
      if (i - 1 > 0){
        adj.push(squares[i-1].innerHTML)
      }
      if (i+4 < 16){        
        adj.push(squares[i+4].innerHTML)
      }
      if (i - 4 > 0){
        adj.push(squares[i-4].innerHTML)
      }
      console.log(adj)
      adj.forEach((val) => {
        if (squares[i].innerHTML === val || squares[i].innerHTML === 0) {
          return true
        }
      })
    }

    function canMove(){
      let move = false
      for (let i = 0; i < 16; i++) {
        if (checkAround(i)){
          move = true
        }
      }
      return move
    }

    function checkForGameOver() {
      let zeros = 0
      for (let i=0; i < squares.length; i++) {
        if (squares[i].innerHTML == 0) {
          zeros++
        }
      }
      if (zeros === 0) {
        resultDisplay.innerHTML = 'You LOSE'
        document.removeEventListener('keyup', control)
        setTimeout(() => clear(), 3000)
      }
    }
  
    //clear timer
    function clear() {
      clearInterval(myTimer)
    }
  
  
    //add colours
    function addColours() {
      for (let i=0; i < squares.length; i++) {
        if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#8479f7'
        else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#9d79f7'
        else if (squares[i].innerHTML  == 4) squares[i].style.backgroundColor = '#7056b0' 
        else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = '#6d49ab' 
        else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = '#6134ad' 
        else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor = '#38107a' 
        else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#260261' 
        else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#0f0126' 
        else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#563575' 
        else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#541c73' 
        else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#5d1c73' 
        else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#7d068f' 
      }
  }
  addColours()
  
  var myTimer = setInterval(addColours, 50)
  
  })