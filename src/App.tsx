import { Router } from "./Router"
import { BrowserRouter } from "react-router-dom"

import "./index.css"

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}
