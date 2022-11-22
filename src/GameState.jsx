import React, { createContext, useReducer } from 'react'

const initialState = {
    answer: 'SOILY',
    guesses: [],
    currentGuess: [],
    flipped: [false, false, false, false, false, false],
    keys: [],
    attempts: 0
}

export const GameContext = createContext(initialState);

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

const GameState = ({ children }) => {
    const [gameInfo, dispatch] = useReducer(reducer, initialState);
    return (
        <GameContext.Provider value={{ dispatch, currentGuess: gameInfo.currentGuess, guesses: gameInfo.guesses, answer: gameInfo.answer, flipped: gameInfo.flipped, attempts: gameInfo.attempts }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameState