import React, { useState } from 'react'
import s from './App.module.css'
import Board from './component/Board'

export default function App() {
  const [history, setHistory] = useState([])
  const [curMove, setCurMove] = useState(0)
  const [isX, setIsX] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))

  const onPlay = (nextSquareNum) => {
    const newHistory = [...history.slice(0, curMove), nextSquareNum]
    setHistory(newHistory)
    setCurMove(curMove + 1)
    setIsX(!isX)
    setSquares(calcSquares(newHistory))
  }

  const turnBackOnClick = (move) => {
    setCurMove(move)
    if (move % 2 === 0) {
      setIsX(true)
    }
    setSquares(calcSquares([...history.slice(0, move)]))
  }

  const {isWinner, description} = getDescription(squares, isX)

  return (
    <div className={s.mainBoard}>
      <div>
        <div className={s.turn}>{description}</div>
        <Board squares={squares} onPlay={onPlay} lock={isWinner}/>
      </div>
      <div className={s.turnList}>
        <ul>
          <li>
            <button onClick={()=>{turnBackOnClick(0)}}>Game clean</button>
          </li>

          {history.length === 0 ? <></> : 
          history.map((e, i)=>(
            <li key={e}>
              <button onClick={()=>{turnBackOnClick(i + 1)}}>
                {`${i + 1}번째 턴으로`}
              </button>
            </li>
          ))
          }
        </ul>
      </div>
    </div>
  )
}

function calcSquares(history) {
  const squares = Array(9).fill(null)
  history.forEach((element, move) => {
    if (move % 2 === 0) {
      squares[element - 1] = 'X'
    } else {
      squares[element - 1] = 'O'
    }
  })
  return squares
}

function calcWinner(squares) {
  const winPosition = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ]

  for(let i = 0; i < winPosition.length; ++i) {
    const [s1, s2, s3] = [squares[winPosition[i][0] - 1],
                          squares[winPosition[i][1] - 1],
                          squares[winPosition[i][2] - 1]]

    // squares가 null이 아니고, winPosition에 있는 라인 중 하나를 만족한다면
    if (s1 && s1 === s2 && s2 === s3) {
      return s1
    }
  }

  return null
}

function getDescription(squares, isX) {
  const flag = calcWinner(squares)
  if (flag === null) return {
    isWinner: false,
    description: `현재 차례: ${isX ? 'X' : 'O'}` 
  }
  else return {
    isWinner: true,
    description: `${flag} 승리!`
  }
}