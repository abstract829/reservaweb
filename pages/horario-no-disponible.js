const HorarioNoDisponiblePage = () => {
  return (
    <div className=" h-screen bg-[url('../public/imgs/bgdonmelchor.jpg')]">
      <div className="h-full py-12 bg-black font-primary bg-opacity-80">
        <div className="flex flex-col items-center justify-center h-full text-3xl text-center text-white">
          <p>No es posible retomar la reserva</p>
          <p>ya que el horario no está disponible.</p>
        </div>
      </div>
    </div>
  )
}
export default HorarioNoDisponiblePage
