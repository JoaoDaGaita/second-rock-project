import { differenceInSeconds } from "date-fns"
import { useContext, useEffect } from "react"
import { CyclesContext } from "../Home"

export function CountDown() {
  const {
    activeCycle,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, "0")
  const seconds = String(secondsAmount).padStart(2, "0")

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        )
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, setSecondsPassed, markCurrentCycleAsFinished])

  return (
    <div
      className="font-robotoMono text-[10rem] leading-[8rem] text-gray-100 flex gap-4
     [&>span]:bg-gray-700 [&>span]:py-8 [&>span]:px-4 [&>span]:rounded-lg"
    >
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <span className="py-8 px-0 text-green-500 w-16 flex overflow-hidden justify-center">
        :
      </span>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </div>
  )
}
