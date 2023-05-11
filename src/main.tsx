import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { NextUIProvider, createTheme } from '@nextui-org/react'

const dark = createTheme({
    type: "dark",
    theme: {
        colors: {
            primaryLight: '#8bd5ca',
            primaryLightHover: '#8bd5ca',
            primaryLightActive: '#8bd5ca',
            primaryLightContrast: '#8bd5ca',
            primaryAlpha: '#cad3f5',
            primary: '#8bd5ca',
            primaryBorder: '#8bd5ca',
            primaryBorderHover: '#8bd5ca',
            primarySolidHover: '#8bd5ca',
            primarySolidContrast: '$white',
            primaryShadow: '#89b4fa',
            
    
            gradient: 'linear-gradient(112deg, #8bd5ca -25%, #91d7e3 -10%, #8bd5ca 80%)',
            link: '#b8c0e0',
    
            sidebarUnselectedText: "#a5adcb",
            waitingBackground: "#181825",
            backgroundSecondary: "#11111b",
            background: "#181825",
            backgroundContrast: "#181825",
        },
        space: {},
        fonts: {
            sans: "'Inter', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
        },
        shadows: {
            center: "0 0 20px 6px rgb(0 0 0 / 0.2)"
        }
    }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <NextUIProvider theme={dark}>
            <App />
        </NextUIProvider>
    </React.StrictMode>
)
