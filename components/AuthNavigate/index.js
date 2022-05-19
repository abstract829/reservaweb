import Link from 'next/link'

const AuthNavigate = () => {
  return (
    <div className="flex justify-center gap-4 pt-24 mb-8">
      <Link href="/auth/sign-in">
        <a className="text-lg font-bold uppercase text-[#908161]">
          Iniciar sesión
        </a>
      </Link>
      <Link href="/auth/sign-up">
        <a className="text-lg font-bold uppercase text-[#908161]">
          Registrarme
        </a>
      </Link>
    </div>
  )
}
export default AuthNavigate
