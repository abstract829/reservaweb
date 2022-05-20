import { useEffect } from 'react'
import * as Yup from 'yup'
import AuthNavigate from '../../components/AuthNavigate'
import FormikForm from '../../components/FormikForm'
import useAuth from '../../hooks/useAuth'
const SignInPage = () => {
  const { signIn } = useAuth()

  useEffect(() => {
    localStorage.clear()
  }, [])

  const inputForms = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'example@email.com',
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      placeholder: '******',
    },
  ]
  const initialValues = {
    email: 'ignacio.alvarez@desintegra.com',
    password: '81dc9bdb52d04dc20036dbd8313ed055',
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Debe ingresar un email valido')
      .max(255)
      .required('Debe ingresar un email'),
    password: Yup.string().max(255).required('Debe ingresar la contraseña'),
  })

  return (
    <div className="h-screen w-full bg-[url('../public/imgs/loginimage.jpg')] px-4 pt-36">
      <div className="max-w-lg px-4 pb-24 mx-auto bg-neutral-900 ">
        <AuthNavigate />
        <FormikForm
          inputForms={inputForms}
          initialValues={initialValues}
          validationSchema={validationSchema}
          submitFunction={signIn}
          btnText="Ingresar"
        />
      </div>
    </div>
  )
}
export default SignInPage