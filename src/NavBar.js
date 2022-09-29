import React from 'react'
import styled from 'styled-components'
import { List } from 'react-bootstrap-icons'
import { QuestionCircle } from 'react-bootstrap-icons'
import { BarChartLine } from 'react-bootstrap-icons'
import { GearFill } from 'react-bootstrap-icons'

const Nav = styled.div`
    position: fixed;
    display: flex;
    top: 0;
    width: calc(100vw - 2em);
    height: 65px;
    border-bottom: 1px solid #3A3A3C;
    font-size: 16px;
    
    color: white;
    align-items: center;
    justify-content: space-between;
    padding: 0 1em;
    > * {
        flex: 1;
        }
    > div {
        text-align: left;
    }
    > h1{
        text-align: center;
        font-family: Bevan, Arial;
        font-size: 36px;
        font-weight: 100;
    }
`

const HalfBox = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 50vw;
    height: 100vh;
    border-right: 1px solid red;
`

const NavItems = styled.div`
    display: flex;
    gap: 1em;
    justify-content: flex-end;
`

export const NavBar = () => {
    return (
        <Nav>
            {/* <HalfBox /> */}
            <div>
                <List fontSize={28} />
            </div>
            <h1>Wordle</h1>
            <NavItems>
                <QuestionCircle fontSize={30} />
                <BarChartLine fontSize={30} />
                <GearFill fontSize={30} />
            </NavItems>
            

        </Nav>
    )
}
