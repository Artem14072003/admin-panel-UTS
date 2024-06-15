import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/fonts/style.css'
import './assets/style/style.scss'
import Route from "./route/Route.tsx";
import Provider from "./Provider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider>
            <Route/>
        </Provider>
    </React.StrictMode>,
)
