import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { BoardRow } from './BoardRow'
import { AppContext } from './App'

const Container = styled.div`
    height: 420px;
    width: 330px;
    margin: auto;    
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 5px;
    box-sizing: border-box;
`

export const Board = () => {
    const appContext = useContext(AppContext);
    return (
        <Container>
            <p style={{ color: 'white' }}>Current Guess: {appContext.currentGuess}</p>
            <BoardRow rowIndex={0} />
            <BoardRow rowIndex={1} />
            <BoardRow rowIndex={2} />
            <BoardRow rowIndex={3} />
            <BoardRow rowIndex={4} />
            <BoardRow rowIndex={5} />
        </Container>
    )
}
