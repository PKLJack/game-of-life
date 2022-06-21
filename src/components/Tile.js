import React from "react"

export default function Tile(props) {
  const style = {
    color: props.isOn ? "white" : "gray",
    backgroundColor: props.isOn ? "white" : "gray",
  }
  const content = ``
  return (
    <button className="tile" style={style} onClick={props.toggleTile}>
      {content}
    </button>
  )
}
