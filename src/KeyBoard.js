import React, { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from './App'
import allowed from './allowed.txt'

const Container = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 5em;
  color: white;
`

const Row = styled.div`
  width: 100%;
  height: 58px;
  display: flex;
  gap: 5px;
  margin: 5px auto;
`

const LetterKey = styled.div`
  height: 100%;
  flex: 1;
  background-color: ${props => props.bg ? props.bg : '#818384'};
  border-radius: 5%;
  line-height: 58px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
`

const SpecialKey = styled(LetterKey)`
  min-width: 72px;
`

let allowedGuesses = '';
fetch(allowed)
  .then((res) => res.text())
  .then(text => { allowedGuesses = text.split(/\r?\n/) });

function binarySearch(arr, key) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (arr[mid] === key) {
      return mid;
    } else if (arr[mid] < key) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}

const Key = ({ val, colors }) => {
  const foundVal = colors.find((el) => el.val === val);
  const appContext = useContext(AppContext);

  const handleSpecial = (value) => {
    if (value === 'ENTER') {
      if (appContext.currentGuess.length === 5) {
        const guess = appContext.currentGuess.join('').toString().toLowerCase();
        const guessCheck = binarySearch(allowedGuesses, guess);
        if (guessCheck > 0) {
          appContext.dispatch({ type: 'TOGGLE_FLIPPING', value: 1 });
          appContext.dispatch({ type: 'ADD_NEW_GUESS', value: appContext.currentGuess });
        }
      }
    }
    else if (value === 'BACK') {
      if (appContext.currentGuess.length > 0) {
        appContext.dispatch({ type: 'DELETE_FROM_CURRENT_GUESS' });
      }
    }
  }

  return val === 'ENTER' || val === 'BACK' ?
    <SpecialKey
      bg='#818384'
      key={val}
      onClick={() => handleSpecial(val)}
    >{val}</SpecialKey>
    :
    <LetterKey
      key={val}
      bg={(colors && foundVal) ? foundVal.color : '#818384'}
      onClick={() => appContext.currentGuess.length < 5 && appContext.dispatch({ type: 'ADD_TO_CURRENT_GUESS', value: val })}
    >{val}</LetterKey>
}

const keys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
];

export const KeyBoard = ({ colors }) => {
  return (
    <Container>
      {keys.map((keyRow, index) =>
        /*identify second row since it is slightly shorter*/
        <Row key={index} style={{ maxWidth: keyRow[0] === 'A' ? '95%' : '100%' }}>
          {keyRow.map((val) =>
            <Key
              key={val}
              colors={colors}
              val={val}
            />
          )}
        </Row>
      )}
    </Container>
  )
}
