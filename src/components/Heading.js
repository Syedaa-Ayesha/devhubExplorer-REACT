import React from 'react'
import light from './Images/icons8-light-mode-78.png';
import dark from './Images/icons8-dark-mode-60.png';
export default function Heading(props) {
  return (
        <div className="part1-item">
    <p className="heading">{props.heading}</p>
    <span className="mode">
       <span className='modeWrapper' onClick={props.changeMode}><img className='modeimg' src = {props.mode === 'dark' ? light : dark}  alt="Not Found" /></span>
        </span>
</div>

  )
}
