import "./App.css"

import React, { useEffect, useState } from "react"
import AboutModal from "./components/AboutModal"
import Controls from "./components/Controls"
import Footer from "./components/Footer"
import Tile from "./components/Tile"

function newTiles(rows, columns, random = false) {
  const newArr = Array(rows)
  for (let i = 0; i < newArr.length; i++) {
    newArr[i] = new Array(columns).fill(false)

    for (let j = 0; j < newArr[i].length; j++) {
      const value = !random ? false : Boolean(Math.floor(Math.random() * 2))
      newArr[i][j] = value
    }
  }
  return newArr
}

function generate(tiles, row, col, nrows, ncols) {
  let total = 0
  for (const r of [-1, 0, 1]) {
    for (const c of [-1, 0, 1]) {
      if (r === 0 && c === 0) continue
      if (row + r < 0 || row + r >= nrows) continue
      if (col + c < 0 || col + r >= ncols) continue

      total += tiles[row + r][col + c]
    }
  }

  if (tiles[row][col] && 2 <= total && total <= 3) return true
  if (!tiles[row][col] && total === 3) return true

  return false
}

function App() {
  console.log("App reload")

  const ROWS = 50
  const COLUMNS = 100

  const [tiles, setTiles] = useState(
    JSON.parse(localStorage.getItem("tiles")) || newTiles(ROWS, COLUMNS)
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [timer, setTimer] = useState(null)
  const [isAboutModalOn, setIsAboutModalOn] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      if (timer) return
      setTimer(window.setInterval(handleNext, 1000))
    } else {
      window.clearInterval(timer)
      setTimer(null)
    }
  }, [isPlaying])

  useEffect(() => {
    localStorage.setItem("tiles", JSON.stringify(tiles))
  }, [tiles])

  function toggleTile(row, column) {
    // console.log("updating", row, column)
    setTiles((prevTiles) => {
      const newTiles = []

      for (const element1 of prevTiles) {
        newTiles.push(element1)
      }
      newTiles[row][column] = !newTiles[row][column]
      return newTiles
    })
  }

  function handleNext() {
    setTiles((prevTiles) => {
      const newTiles = []

      for (let row = 0; row < prevTiles.length; row++) {
        newTiles.push([])
        for (let col = 0; col < prevTiles[row].length; col++) {
          const xxx = generate(prevTiles, row, col, ROWS, COLUMNS)
          newTiles[row].push(xxx)
        }
      }
      return newTiles
    })
  }

  function handlePlay() {
    setIsPlaying(true)
  }

  function handlePause() {
    setIsPlaying(false)
  }

  function handleRandom() {
    setTiles(newTiles(ROWS, COLUMNS, true))
  }

  function handleReset() {
    setTiles(newTiles(ROWS, COLUMNS))
    window.clearInterval(timer)
    localStorage.removeItem("tiles") // TODO: DEBUG only?
  }

  function handleAbout() {
    setIsAboutModalOn((prevState) => !prevState)
  }

  /*  */
  const tileElements = tiles.map((obj1, idx1) =>
    obj1.map((obj2, idx2) => (
      <Tile
        key={`${idx1} ${idx2}`}
        row={idx1}
        column={idx2}
        isOn={tiles[idx1][idx2]}
        toggleTile={() => toggleTile(idx1, idx2)}
      />
    ))
  )

  return (
    <div className="App">
      <AboutModal isAboutModalOn={isAboutModalOn} handleAbout={handleAbout} />
      <h1>Game of Life</h1>
      <main className="tiles">{tileElements}</main>
      <Controls
        handleAbout={handleAbout}
        handleRandom={handleRandom}
        handleNext={handleNext}
        handleReset={handleReset}
        handlePlay={handlePlay}
        handlePause={handlePause}
        isPlaying={isPlaying}
      />
      <Footer />
    </div>
  )
}

export default App
