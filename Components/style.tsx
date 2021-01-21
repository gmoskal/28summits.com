import { createGlobalStyle } from "styled-components"
import { media } from "../utils/colors"

export const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
	}
	body {
		display: flex;
		justify-content: center;
		align-items: center;
		background: ${({ theme }) => theme.primaryWhite};
		color: ${({ theme }) => theme.primaryBlack};
		min-height: 98vh;
		text-rendering: optimizeLegibility;
		font-family: 'Montserrat', sans-serif;
		font-size: 16px;
		${media("mobileM")} {
        	font-size: 12px;
		}
		padding: 1rem;
		
	}
	*,
	*::before,
	*::after {
		outline: none;
		box-sizing: inherit;
	}
	p {
		color: ${p => p.theme.withLightness("primaryBlack", 20)};
		line-height: 1.5em;
	}

	h1 {
		font-size: 4rem;
		font-weight: 500;
		${media("mobileM")} {
			font-size: 1.5rem;
		    margin-top: .6rem;
		}

		b {
			font-weight: 900;
		}
	}
	ul {
		color: ${p => p.theme.withLightness("primaryBlack", 30)};
		${media("mobileM")} {
            padding-left: 1rem;
            padding-top: 1.2rem;
        }

		li {
			margin-bottom: 2rem;

		}
    }
	main {
		max-width: 80vw;
	}
`
