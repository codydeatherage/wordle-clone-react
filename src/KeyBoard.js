import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'
import { AppContext } from './App'

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

const Key = styled.div`
  height: 100%;
  flex: 1;
  background-color: ${props => props.bg ? props.bg : '#818384'};
  border-radius: 5%;
  line-height: 58px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
`

const SpecialKey = styled(Key)`
  min-width: 72px;
`

const keys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
];

export const KeyBoard = ({ colors }) => {
  const appContext = useContext(AppContext);

  const handleSpecial = (value) => {
    if (value === 'ENTER') {
      if (appContext.currentGuess.length === 5) {
        console.log('submitting ', appContext.currentGuess, appContext.flipping, appContext.attempts);
        appContext.dispatch({ type: 'TOGGLE_FLIPPING', value: 1 });
        appContext.dispatch({ type: 'ADD_NEW_GUESS', value: appContext.currentGuess });
      }
    }
    else if (value === 'BACK') {
      if (appContext.currentGuess.length > 0) {
        appContext.dispatch({ type: 'DELETE_FROM_CURRENT_GUESS' });
      }
    }
  }

  return (
    <Container>
      <Row>
        {keys[0].map((val) =>
          <Key
            key={val}
            bg={(colors && colors.find((el) => el.val === val)) ? colors.find((el) => el.val === val).color : '#818384'}
            onClick={() => appContext.currentGuess.length < 5 && appContext.dispatch({ type: 'ADD_TO_CURRENT_GUESS', value: val })}
          >{val}</Key>)}
      </Row>
      <Row style={{ maxWidth: '95%' }}>
        {keys[1].map((val) =>
          <Key
            key={val}
            bg={(colors && colors.find((el) => el.val === val)) ? colors.find((el) => el.val === val).color : '#818384'}
            onClick={() => appContext.currentGuess.length < 5 && appContext.dispatch({ type: 'ADD_TO_CURRENT_GUESS', value: val })}
          >{val}</Key>
        )}
      </Row>
      <Row>
        {keys[2].map((val) =>
          val.length <= 1 ?
            <Key
              bg={(colors && colors.find((el) => el.val === val)) ? colors.find((el) => el.val === val).color : '#818384'}
              key={val}
              onClick={() => appContext.currentGuess.length < 5 && appContext.dispatch({ type: 'ADD_TO_CURRENT_GUESS', value: val })}
            >{val}</Key>
            :
            <SpecialKey
              bg={(colors && colors.find((el) => el.val === val)) ? colors.find((el) => el.val === val).color : '#818384'}
              key={val}
              onClick={() => handleSpecial(val)}
            >{val}</SpecialKey>
        )}
      </Row>
    </Container>
  )
}
