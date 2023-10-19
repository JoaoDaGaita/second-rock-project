import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"

export function DefaultLayout() {
  return (
    <div className="max-w-[74rem] h-[100%] my-20 mx-auto bg-gray-800 p-10 flex flex-col rounded-lg">
      <Header />
      <Outlet />
    </div>
  )
}
