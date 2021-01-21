import * as React from "react"
import styled from "styled-components"

const Title = styled.h1`
    margin: 0;
    margin-top: -200px;
    max-width: 700px;
    font-weight: 900;
`

const Content = styled.div`
    max-width: 700px;
    text-align: center;

    z-index: 1;
    p {
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        color: ${p => p.theme.withLightness("primaryBlack", 50)};
    }
`

const Home: React.FC = () => (
    <Content>
        <Title>28 summits</Title>
        <p>comming soon</p>
    </Content>
)

export default Home
