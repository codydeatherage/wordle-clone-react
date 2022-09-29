import React from 'react'
import styled from 'styled-components'
import FlippingTile from './FlippingTile'

const Tile = styled.div`
    height: 58px;
    width: 100%;
    border: 2px solid #3A3A3C;
    color: white;
    line-height: 58px;
    font-size: 36px;
    font-weight: bold;

`
export const BoardTile = ({ val }) => {
    if (val && val.length > 0) {
        return (<Tile>{val}</Tile>);
    }
    else {
        return (<Tile />);
    }

}
