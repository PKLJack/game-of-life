import React from "react"

export default function Tile(props) {
  const style = {
    color: props.isOn ? "white" : "gray",
    backgroundColor: props.isOn ? "white" : "gray",
  }

  // const content = `(${props.row}, ${props.column}) ${props.isOn ? "T" : "F"}`
  // const content = `${props.isOn ? "T" : "F"}`
  const content = ``
  return (
    <button className="tile" style={style} onClick={props.toggleTile}>
      {content}
    </button>
  )
}
