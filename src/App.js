import React, { useState, createContext, useReducer } from 'react'
import styled from 'styled-components'
import { NavBar } from './NavBar';
import { Board } from './Board'
import { KeyBoard } from './KeyBoard'

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
const GameArea = styled.div`
    overflow: hidden;
    width: 450px;
    height: 100%;
    padding-top: 8rem;
    margin: auto;
    text-align: center;
    align-items: center;
    justify-content: center;
`

const initialState = {
  answer: 'APPLE',
  guesses: [],
  currentGuess: [],
  flipping: [false, false, false, false, false, false],
  attempts: 0
}

export const AppContext = createContext(initialState);

function reducer(state, action) {
  const { value, type } = action;
  switch (type) {
    case 'ADD_ANSWER': return { ...state, answer: value }
    case 'ADD_TO_CURRENT_GUESS': return { ...state, currentGuess: [...state.currentGuess, value] }
    case 'DELETE_FROM_CURRENT_GUESS': return { ...state, currentGuess: state.currentGuess.filter((curr, i) => i !== state.currentGuess.length - 1) }
    case 'ADD_NEW_GUESS': return { ...state, guesses: [...state.guesses, value] }
    case 'TOGGLE_FLIPPING': return { ...state, flipping: state.flipping.map((f, i) => i === state.attempts ? !f : f), attempts: state.attempts + value, currentGuess: [] }
    default: return state;
  }
}

function App() {

  const [gameInfo, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ dispatch, currentGuess: gameInfo.currentGuess, guesses: gameInfo.guesses, answer: gameInfo.answer, flipping: gameInfo.flipping, attempts: gameInfo.attempts }}>
      <Container>
        <NavBar />
        <GameArea>
          <Board />
          <KeyBoard />
        </GameArea>
      </Container>
    </AppContext.Provider>
  );
}

export default App;
