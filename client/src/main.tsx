import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Sepolia } from "@thirdweb-dev/chains";
import ReactDom from 'react-dom/client'
import App from './App';
import './index.css';
import { StateContextProvider } from './context';

const root = ReactDom.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <ThirdwebProvider activeChain={Sepolia}>
        <Router>
            <StateContextProvider>
                <App />
            </StateContextProvider>
        </Router>
    </ThirdwebProvider>
)
