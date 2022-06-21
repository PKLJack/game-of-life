import React from "react"

export default function Controls(props) {
  const { handleAbout, handleReset, handlePause, handlePlay, handleNext, handleRandom } = props

  return (
    <div className="controls-container">
      <button onClick={handleAbout}>About</button>
      <button onClick={handleRandom}>Random</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handlePause} className={!props.isPlaying ? "isOff" : ""}>Pause</button>
      <button onClick={handlePlay} className={props.isPlaying ? "isOff" : ""}>Play</button>
      <button onClick={handleNext}>Next</button>
    </div>
  )
}
