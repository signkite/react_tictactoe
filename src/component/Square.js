import React, { Component } from 'react'
import s from './Square.module.css'

export default function Square({status, onSquareClick}) {
  return (
    <div className={s.square} onClick={onSquareClick}>{status}</div>
  )
}
