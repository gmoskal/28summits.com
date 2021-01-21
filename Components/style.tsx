import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
	}
	body {
		display: flex;
		justify-content: center;
		align-items: center;
		background: ${({ theme }) => theme.primaryBlack};
		color: ${({ theme }) => theme.primaryBlack};
		min-height: 98vh;
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
