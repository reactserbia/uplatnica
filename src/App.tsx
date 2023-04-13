import { Route, Routes } from 'react-router-dom'
import Payslip from '@pages/Payslip.jsx'
import styled, { createGlobalStyle } from 'styled-components'

function App() {
    return (
        <Container>
            <GlobalStyles />
            <Routes>
                <Route path='/' element={<Payslip />} />
            </Routes>
        </Container>
    )
}

const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    body, h1, h2, h3, h4, p, figure, blockquote, dl, dd { margin: 0; }
    ul[role='list'], ol[role='list'] { list-style: none; }
    html:focus-within { scroll-behavior: smooth; }
    body {
        min-height: 100vh;
        text-rendering: optimizeSpeed;
        line-height: 1.5;
        overflow: hidden;
    }
    a:not([class]) { text-decoration-skip-ink: auto; }
    img, picture {
        max-width: 100%;
    }
    input, button, textarea, select { font: inherit; }
    @media (prefers-reduced-motion: reduce) {
        html:focus-within { scroll-behavior: auto; }
        
        *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
        }
    }
`

const Container = styled.div``

export default App
