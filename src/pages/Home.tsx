import { Play } from "phosphor-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import zod from "zod"
import { useState } from "react"

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no máximo 5 min.")
    .max(60, "O ciclo precisa ser de no mínimo 60 min."),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  })

  function createNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle])

    reset()
  }

  const task = watch("task")
  const isSubmitDisabled = !task

  return (
    <div className="flex-1 flex flex-col items-center mt-[72px] justify-center ">
      <form
        onSubmit={handleSubmit(createNewCycle)}
        className="flex flex-col items-center gap-14"
      >
        <div className="w-full flex items-center justify-center gap-2 text-gray-100 text-lg font-bold flex-wrap">
          <label htmlFor="task">Vou trabalhar em</label>
          <input
            id="task"
            {...register("task")}
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
            {...register("minutesAmount", { valueAsNumber: true })}
            className="
          bg-transparent w-16 h-10 border-0 border-b-2 border-solid border-gray-500 
          font-bold text-lg py-0 px-2 text-gray-100 flex-1 placeholder:text-gray-400 focus:shadow-none
          focus:border-green-500 focus:outline-none"
          />

          <span>minutos.</span>
        </div>

        <div
          className="font-robotoMono text-[10rem] leading-[8rem] text-gray-100 flex gap-4
         [&>span]:bg-gray-700 [&>span]:py-8 [&>span]:px-4 [&>span]:rounded-lg"
        >
          <span>0</span>
          <span>0</span>
          <span className="py-8 px-0 text-green-500 w-16 flex overflow-hidden justify-center">
            :
          </span>
          <span>0</span>
          <span>0</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="flex w-full py-4 px-10 justify-center items-center gap-2
           shrink-0 rounded-lg bg-[#00875F] cursor-pointer
            disabled:opacity-70 disabled:cursor-not-allowed [&:not(:disabled):hover]:bg-green-700"
        >
          <Play size={24} />
          Começar
        </button>
      </form>
    </div>
  )
}
