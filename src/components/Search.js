import React from 'react'
export default function Search(props) {
  return (
    <>
    <div className="part2-item">
        <input type="text" name="" id=""  placeholder="Search for a Developer"  value = {props.user} onChange = {props.onChangeHandler}/>
        <button type="submit" onClick={props.searchUser}>Search</button>
    </div>
    
    </>
  )
}
