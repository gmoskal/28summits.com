import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
	}
	body {
	
		background: ${({ theme }) => theme.primaryBlack};
		color: ${({ theme }) => theme.primaryBlack};
		text-rendering: optimizeLegibility;
		font-family: Montserrat, Helvetica, Times;
		font-size: 16px;
		padding: 0;
	}
	*,
	*::before,
	*::after {
		outline: none;
		box-sizing: inherit;
	}

`
