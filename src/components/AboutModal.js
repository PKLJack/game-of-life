import React from "react"
import ReactModal from "react-modal"

export default function AboutModal(props) {
  return (
    <ReactModal
      isOpen={props.isAboutModalOn}
      className="Modal"
      overlayClassName="Overlay"
    >
      <button onClick={props.handleAbout}>x</button>
      <div>
      <h1>Game of Life</h1>
      <p>
      <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">The Game of Life</a>, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. 

      In this version, you can toggle cells on and off at will.
      </p>
      <h2>Rules</h2>
      <p>
        <ol>
          <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
          <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
          <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
          <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
        </ol>
      </p>
      </div>
    </ReactModal>
  )
}
