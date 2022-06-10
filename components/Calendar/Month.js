import { useState } from 'react'
import { useQueryCalendario } from '../../hooks/reservas'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import Alert from '../Alert'
import LoaderWhen from '../LoaderWhen'
import { parseDayNumberToName, parseMonthNumberToName } from '../../utils/utils'
import RenderIf from '../RenderIf'
import ModalComponent from '../Modal'
import ReservaForm from './ReservaForm'
import useReserva from '../../hooks/useReserva'

const Month = () => {
  const { setDatosFecha, resetReserva } = useReserva()
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const { data, isError, isLoading } = useQueryCalendario({
    Fecha: `${year}-${month}-01`,
  })
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
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
    if (month - 1 >= currentMonth) {
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
  const setFechas = (reserva) => {
    setDatosFecha({
      Horario: reserva.Horario,
      Fecha: reserva.Fecha,
      Idioma: 'Español',
    })
  }
  const getTitle = (reserva) => {
    return `Reserva ${parseFechaToDayDisplay(
      reserva.Fecha
    )} de ${parseMonthNumberToName(month)} de ${year} a las ${reserva.Horario}`
  }
  return (
    <LoaderWhen isTrue={isLoading}>
      <div className="flex gap-8 mb-8 text-white">
        <div className="flex items-center gap-2">
          <GrFormPrevious
            className="w-12 h-12 cursor-pointer"
            onClick={decreaseYear}
          />
          <span className="my-4 text-5xl">{year}</span>
          <GrFormNext
            className="w-12 h-12 cursor-pointer "
            onClick={increaseYear}
          />
        </div>
        <div className="flex items-center gap-2">
          <GrFormPrevious
            className="w-12 h-12 cursor-pointer "
            onClick={decreaseMonth}
          />
          <span className="w-20 my-4 text-3xl font-semibold text-center">
            {parseMonthNumberToName(month)}
          </span>
          <GrFormNext
            className="w-12 h-12 cursor-pointer "
            onClick={increaseMonth}
          />
        </div>
      </div>
      <RenderIf isTrue={data && data.data.length > 0}>
        <div className="grid w-full gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data &&
            data.data.map((reserva) => (
              <div
                className="bg-[url('../public/imgs/donmelchor.jpg')] bg-cover bg-center"
                key={reserva.Fecha}
              >
                <div className="text-white bg-black border-4 max-w-72 border-primary max-h-96 bg-opacity-80">
                  <p className="my-2 text-2xl font-semibold text-center">
                    {parseFechaToDayDisplay(reserva.Fecha)}
                  </p>
                  <div className="mb-4">
                    <p className="text-xl font-semibold text-center">
                      Horarios:
                    </p>
                    <ul className="flex flex-col items-center gap-2 mt-4 text-xl ">
                      <li>
                        <ModalComponent
                          title={getTitle(reserva)}
                          onOpen={() => setFechas(reserva)}
                          onClose={resetReserva}
                          btn={
                            <li className="px-4 py-2 font-semibold text-white shadow cursor-pointer bg-primary rounded-3xl">
                              {reserva.Horario}
                            </li>
                          }
                          content={<ReservaForm />}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </RenderIf>
      <RenderIf isTrue={data && data.data.length === 0}>
        <p className="h-screen text-white">
          Esta fecha no tiene horarios disponibles
        </p>
      </RenderIf>
    </LoaderWhen>
  )
}
export default Month