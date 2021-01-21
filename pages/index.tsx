import * as React from "react"
import { media } from "../utils/colors"

import styled from "styled-components"

const Title = styled.h1`
    font-weight: 700;
    font-size: 6em;
    padding: 0;
    text-align: center;
    color: white;
    margin: 0;
    margin-top: -200px;
    span {
        padding: 0;
        margin: 0;
        font-size: 4rem;

        color: rgb(255, 64, 86);
    }
    ${media("mobileM")} {
        font-size: 3em;
        margin: 0;
        span {
            font-size: 2rem;
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
