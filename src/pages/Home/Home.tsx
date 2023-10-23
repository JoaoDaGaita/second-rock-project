import { HandPalm, Play } from "phosphor-react"
import { createContext, useState } from "react"
import { NewCycleForm } from "./components/NewCycleForm"
import { CountDown } from "./components/CountDown"
import { FormProvider, useForm } from "react-hook-form"
import zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no máximo 5 min.")
    .max(60, "O ciclo precisa ser de no mínimo 60 min."),
})

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  })

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      })
    )
  }

  function handleInterruptCycle() {
    setActiveCycleId(null)
  }

  const { handleSubmit, watch, reset } = newCycleForm

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const task = watch("task")
  const isSubmitDisabled = !task

  console.log(isSubmitDisabled)

  return (
    <div className="flex-1 flex flex-col items-center mt-[72px] justify-center ">
      <form
        onSubmit={handleSubmit(handleCreateNewCycle)}
        action=""
        className="flex flex-col items-center gap-14"
      >
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />
        </CyclesContext.Provider>
        {activeCycle ? (
          <button
            type="button"
            onClick={handleInterruptCycle}
            className="flex w-full py-4 px-10 justify-center items-center gap-2
           shrink-0 rounded-lg bg-red-500 cursor-pointer
            disabled:opacity-70 disabled:cursor-not-allowed [&:not(:disabled):hover]:bg-red-700"
          >
            <HandPalm size={24} />
            Interromper
          </button>
        ) : (
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
        )}
      </form>
    </div>
  )
}
