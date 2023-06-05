import React from 'react'
import Square from './Square'
import s from './Board.module.css'

export default function Board({squares, onPlay, lock}) {
  const onHandleClick = (nextSquareNum) => {
    // 내용물이 있는 square의 경우 혹은 승자가 결정된 경우 아무 처리하지 않음
    if (squares[nextSquareNum - 1] || lock)
      return
    
    onPlay(nextSquareNum)
  }

  return (
    <div className={s.board}>
        <Square status={squares[0]} onSquareClick={()=>{onHandleClick(1)}}/>
        <Square status={squares[1]} onSquareClick={()=>{onHandleClick(2)}}/>
        <Square status={squares[2]} onSquareClick={()=>{onHandleClick(3)}}/>
        <Square status={squares[3]} onSquareClick={()=>{onHandleClick(4)}}/>
        <Square status={squares[4]} onSquareClick={()=>{onHandleClick(5)}}/>
        <Square status={squares[5]} onSquareClick={()=>{onHandleClick(6)}}/>
        <Square status={squares[6]} onSquareClick={()=>{onHandleClick(7)}}/>
        <Square status={squares[7]} onSquareClick={()=>{onHandleClick(8)}}/>
        <Square status={squares[8]} onSquareClick={()=>{onHandleClick(9)}}/>
    </div>
  )
}
