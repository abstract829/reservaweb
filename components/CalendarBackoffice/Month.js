import { useState, useEffect } from 'react'
import { useQueryReservas } from '../../hooks/reservas'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import Alert from '../Alert'
import LoaderWhen from '../LoaderWhen'
import { parseDayNumberToName, parseMonthNumberToName } from '../../utils/utils'
import RenderIf from '../RenderIf'
import ModalComponent from '../Modal'
import useReserva from '../../hooks/useReserva'
import PlusButton from '../PlusButton'

const Month = () => {
  const [calendario, setCalendario] = useState([])
  const { setDatosFecha, resetReserva } = useReserva()
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const { data, isError, isLoading } = useQueryReservas()
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  useEffect(() => {
    if (data) {
      let daysInMonth = new Date(year, month, 0).getDate()
      setCalendario(
        new Array(daysInMonth).fill(undefined).map((val, i) => {
          let fecha = `${year}-${month < 10 ? '0' + month : month}-${
            i < 9 ? '0' + (i + 1) : i + 1
          }T00:00:00`
          let filter = data.data.filter((f) => f.Fecha === fecha)
          return {
            Fecha: fecha,
            Reserva: filter,
          }
        })
      )
    }
  }, [month, year, data])
  useEffect(() => {
    console.log(calendario)
  }, [calendario])

  const increaseYear = () => {
    setYear((prev) => prev + 1)
  }
  const decreaseYear = () => {
    const currentYear = new Date().getFullYear()
    if (year - 1 >= currentYear) {
      setYear((prev) => prev - 1)
    }
  }
  const increaseMonth = () => {
    if (month + 1 <= 12) {
      setMonth((prev) => prev + 1)
    }
  }
  const decreaseMonth = () => {
    const currentMonth = new Date().getMonth() + 1
    const thisYear = new Date().getFullYear()
    if (month - 1 < 1) return
    if (month - 1 >= currentMonth || year > thisYear) {
      setMonth((prev) => prev - 1)
    }
  }
  const parseFechaToDayDisplay = (fecha) => {
    const date = new Date(fecha)
    const num = date.getDate()
    let day = date.getDay()
    day = parseDayNumberToName(day)
    return `${day} ${num < 10 ? '0' + num : num}`
  }
  const getTitle = (fecha, horario) => {
    return `Reserva ${parseFechaToDayDisplay(
      fecha
    )} de ${parseMonthNumberToName(month)} de ${year} a las ${horario}`
  }
  return (
    <LoaderWhen isTrue={isLoading}>
      <div className="flex items-center justify-between">
        <PlusButton />
        <div className="flex gap-8 mb-8 ">
          <div className="flex items-center gap-4">
            <GrFormPrevious
              className="w-8 h-8 bg-white cursor-pointer rounded-3xl"
              onClick={decreaseYear}
            />
            <span className="my-4 text-4xl font-semibold font-helvetica">
              {year}
            </span>
            <GrFormNext
              className="w-8 h-8 bg-white cursor-pointer rounded-3xl"
              onClick={increaseYear}
            />
          </div>
          <div className="flex items-center gap-2">
            <GrFormPrevious
              className="w-8 h-8 bg-white cursor-pointer rounded-3xl"
              onClick={decreaseMonth}
            />
            <span className="w-20 my-4 text-3xl font-semibold text-center">
              {parseMonthNumberToName(month)}
            </span>
            <GrFormNext
              className="w-8 h-8 bg-white cursor-pointer rounded-3xl"
              onClick={increaseMonth}
            />
          </div>
        </div>
      </div>
      <div className="grid w-full gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {calendario.length > 0 &&
          calendario.map(({ Fecha, Reserva }) => (
            <div
              className="bg-[url('../public/imgs/donmelchor.jpg')] bg-cover  bg-center"
              key={Fecha}
            >
              <div className="h-56 text-white bg-black border-4 max-w-72 border-primary bg-opacity-80">
                <p className="my-2 text-2xl font-semibold text-center">
                  {parseFechaToDayDisplay(Fecha)}
                </p>
                <div className="flex flex-col items-center mb-4">
                  <p className="text-xl font-semibold text-center">Horarios:</p>
                  <RenderIf isTrue={Reserva.length < 2}>
                    {Reserva.map((sala, i) => (
                      <ul
                        className="flex flex-col items-center gap-2 mt-4 text-xl "
                        key={i}
                      >
                        <li className="text-center calendar-item">
                          <p>{sala.SalaNombre}</p>
                          <p>
                            {sala.HorarioInicio} - {sala.HorarioTermino}
                          </p>
                        </li>
                      </ul>
                    ))}
                  </RenderIf>
                  <RenderIf isTrue={Reserva.length >= 2}>
                    <ModalComponent
                      title="Seleccione su horario"
                      btn={
                        <p className="px-4 py-2 mt-4 text-xl font-bold text-white uppercase shadow cursor-pointer bg-primary rounded-3xl">
                          ({Reserva.length}) Reservas
                        </p>
                      }
                      content={
                        <ul className="flex items-center justify-center gap-2 mt-4 text-xl w-96 ">
                          {Reserva.map((sala, i) => (
                            <li key={i} className="text-center calendar-item">
                              <p>{sala.SalaNombre}</p>
                              <p>
                                {sala.HorarioInicio} - {sala.HorarioTermino}
                              </p>
                            </li>
                          ))}
                        </ul>
                      }
                    />
                  </RenderIf>
                </div>
              </div>
            </div>
          ))}
      </div>
    </LoaderWhen>
  )
}
export default Month
