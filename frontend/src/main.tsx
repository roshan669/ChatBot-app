import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'
import {BrowserRouter} from "react-router-dom"
import { AuthProvider } from './context/AuthContext.tsx'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

axios.defaults.baseURL="https://chatbot-app-backend-0p4o.onrender.com/api/v1/";
axios.defaults.withCredentials=true;

const theme=createTheme(
  {typography:{
    fontFamily:"Roboto Slab,serif",
    allVariants:{color:"white"}
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <ThemeProvider theme={theme}/>
    <Toaster position='top-center'/>
    <App />
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
