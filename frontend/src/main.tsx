import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx'
import {NextUIProvider} from "@nextui-org/react";

createRoot(document.getElementById('root')!).render(
    <NextUIProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </NextUIProvider>
)
