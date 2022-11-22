import React, { useContext } from 'react'
import styled from 'styled-components'
import { GameContext } from './GameState'
import { FlippingTile, Tile } from './FlippingTile'
/*
YELLOW : #B59F3B
GRAY: #3A3A3C
GREEN: #538D4E
*/
const Row = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 5px;
    width: 100%;
`

export const BoardRow = ({ rowIndex }) => {
    const appContext = useContext(GameContext);
    const filledWord = [];
    const word = rowIndex === appContext.attempts ? appContext.currentGuess : appContext.guesses[rowIndex];
    for (let i = 0; i < 5; i++) {
        if (word && word[i]) {
            filledWord.push(word[i]);
        }
        else {
            filledWord.push('');
        }
    }
    return (
        <Row>
            {filledWord.map((letter, index) =>
                letter.length > 0 ?
                    <FlippingTile
                        key={index}
                        isFlipped={appContext.flipped[rowIndex]}
                        value={letter}
                        flippedBg={appContext.answer.includes(letter) ?
                            appContext.answer[index] === letter ? '#538D4E' : '#B59F3B' : '#3A3A3C'}
                        index={index}
                    />
                    :
                    <Tile key={index} />
            )}
        </Row>
    )
}
