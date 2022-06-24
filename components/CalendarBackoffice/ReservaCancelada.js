const ReservaCancelada = ({ closeModal }) => {
  return (
    <div className="w-full">
      <p className="my-8 text-xl text-center">Esta reserva fue cancelada</p>
      <div className="flex justify-end mt-4">
        <button className="button-cancel" onClick={closeModal}>
          Cerrar
        </button>
      </div>
    </div>
  )
}
export default ReservaCancelada
