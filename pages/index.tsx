import * as React from "react"
import { media } from "../utils/colors"

import styled from "styled-components"

const Title = styled.h1`
    font-weight: 900;
    font-size: 8em;
    padding: 0;
    text-align: center;
    color: white;
    margin: 0;
    padding-top: 30vh;
    line-height: 0.7em;
    span {
        padding: 0;
        font-weight: 700;
        margin: 0;
        font-size: 4rem;

        color: rgb(255, 64, 86);
    }
    ${media("tablet")} {
        font-size: 3em;
        line-height: 0.9em;
        margin: 0;
        span {
            font-size: 1.6rem;
        }
    }
`

const Home: React.FC = () => (
    <>
        <Title>
            28 summits
            <br />
            <span>comming soon</span>
        </Title>
    </>
)

export default Home
