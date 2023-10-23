import { useContext } from "react"
import { CyclesContext } from "../Home"
import { useFormContext } from "react-hook-form"

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <div className="w-full flex items-center justify-center gap-2 text-gray-100 text-lg font-bold flex-wrap">
      <label htmlFor="task">Vou trabalhar em</label>
      <input
        id="task"
        {...register("task")}
        disabled={!!activeCycle}
        className="bg-transparent h-10 border-0 border-b-2 border-solid border-gray-500 
             font-bold text-lg py-0 px-2 text-gray-100 flex-1 placeholder:text-gray-400 focus:shadow-none
             focus:border-green-500 focus:outline-none"
        placeholder=""
      />

      <label htmlFor="minutesAmount">durante</label>
      <input
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
        className="
          bg-transparent w-16 h-10 border-0 border-b-2 border-solid border-gray-500 
          font-bold text-lg py-0 px-2 text-gray-100 flex-1 placeholder:text-gray-400 focus:shadow-none
          focus:border-green-500 focus:outline-none"
      />

      <span>minutos.</span>
    </div>
  )
}
