import React, { useMemo, useContext } from 'react'
import styled from 'styled-components'
import { NavBar } from './NavBar';
import { KeyBoard } from './KeyBoard'
import { BoardRow } from './BoardRow';
import { GameContext } from './GameState'
import GameArea from './GameArea'

const Container = styled.div`
  background-color: #121213;
  height: calc(100vh - 65px);
  width: 100vw;
  margin: 0;
  padding: 0;
  padding-top: 65px;
  overflow: hidden;
  font-family:'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
`

const Board = styled.div`
  height: 420px;
  width: 330px;
  margin: auto;    
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  box-sizing: border-box;
`

const App = () => {
  const { currentGuess, flipped } = useContext(GameContext)

  return (
    <Container>
      <NavBar />
      <GameArea>
        <Board>
          <p style={{ color: 'white' }}>Current Guess: {currentGuess}</p>
          {flipped.map((_, index) =>
            <BoardRow rowIndex={index} key={index} />
          )}
        </Board>
        <KeyBoard />
      </GameArea>
    </Container>
  );
}

export default App;
