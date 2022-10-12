import React, { useMemo, createContext, useReducer, useEffect } from 'react'
import styled from 'styled-components'
import { NavBar } from './NavBar';
import { KeyBoard } from './KeyBoard'
import { BoardRow } from './BoardRow';

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
    padding-top: 3rem;
    margin: auto;
    text-align: center;
    align-items: center;
    justify-content: center;
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

const initialState = {
  answer: 'APPLE',
  guesses: [],
  currentGuess: [],
  flipped: [false, false, false, false, false, false],
  keys: [],
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
    case 'TOGGLE_FLIPPING': return { ...state, flipped: state.flipped.map((f, i) => i === state.attempts ? !f : f), attempts: state.attempts + value, currentGuess: [] }
    default: return state;
  }
}

function App() {
  const [gameInfo, dispatch] = useReducer(reducer, initialState);

  const keyColors = useMemo(() => {
    const colors = [];
    for (let guess of gameInfo.guesses) {
      const newGuess = guess.map((letter, index) =>
        gameInfo.answer.includes(letter) ?
          gameInfo.answer[index] === letter ?
            { val: letter, color: '#538D4E' }//GREEN: #538D4E
            :
            { val: letter, color: '#B59F3B' }//YELLOW : #B59F3B
          :
          { val: letter, color: '#3A3A3C' }//GRAY: #3A3A3C
      )
      for (let ng of newGuess) {
        const valMatch = colors.find(el => el.val === ng.val);
        const colorMatch = colors.find(el => el.color === ng.color);
        if (valMatch && colorMatch) {
          valMatch.color = ng.color;
        }
        else {
          colors.push(ng);
        }
      }
    }
    return colors;
  }, [gameInfo.guesses])

  return (
    <AppContext.Provider value={{ dispatch, currentGuess: gameInfo.currentGuess, guesses: gameInfo.guesses, answer: gameInfo.answer, flipped: gameInfo.flipped, attempts: gameInfo.attempts }}>
      <Container>
        <NavBar />
        <GameArea>
          <Board>
            <p style={{ color: 'white' }}>Current Guess: {gameInfo.currentGuess}</p>
            {gameInfo.flipped.map((_, index) =>
              <BoardRow rowIndex={index} key={index} />
            )}
          </Board>
          <KeyBoard colors={keyColors} />
        </GameArea>
      </Container>
    </AppContext.Provider>
  );
}

export default App;
