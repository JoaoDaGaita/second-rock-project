import { Scroll, Timer } from "phosphor-react"
import logoIgnite from "../assets/logo-ignite.svg"
import { AnchorButton } from "./a"

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <img src={logoIgnite} alt="" />
      <nav className="flex gap-2">
        <AnchorButton to="/">
          <Timer width={24} height={24} />
        </AnchorButton>
        <AnchorButton
          to="/history"
          className={({ isActive }) =>
            isActive ? "active-class" : "non-active-class"
          }
        >
          <Scroll width={24} height={24} />
        </AnchorButton>
      </nav>
    </header>
  )
}
