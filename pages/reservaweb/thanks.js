import { useRouter } from 'next/router'

const ThanksPage = () => {
  const router = useRouter()
  return (
    <div className=" h-screen bg-[url('../public/imgs/bgdonmelchor.jpg')]">
      <div className="h-full py-12 bg-black font-primary bg-opacity-80">
        <div className="flex flex-col items-center justify-center h-full text-3xl text-center text-white">
          <p>Gracias por su solicitud!</p>
          <p>Nos pondremos en contacto con usted</p>
          <button
            className="mt-12 button"
            onClick={() => router.push('/reservaweb')}
          >
            Volver a la reserva
          </button>
        </div>
      </div>
    </div>
  )
}
export default ThanksPage
