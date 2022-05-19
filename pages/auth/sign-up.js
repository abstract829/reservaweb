import { useEffect } from 'react'
import * as Yup from 'yup'
import FormikForm from '../../components/FormikForm'
import AuthNavigate from '../../components/AuthNavigate'
const SignUpPage = () => {
  useEffect(() => {
    localStorage.clear()
  }, [])

  const inputForms = [
    {
      label: 'Nombre',
      type: 'text',
      name: 'nombre',
      placeholder: 'Nombre Apellido',
    },
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
    nombre: 'Nombre random',
    email: 'test@test.com',
    password: 'password',
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Debe ingresar un email valido')
      .max(255)
      .required('Debe ingresar un email'),
    password: Yup.string().max(255).required('Debe ingresar la contraseña'),
    nombre: Yup.string()
      .min(3, 'Debe tener al menos 3 caracteres')
      .required('El nombre es obligatorio'),
  })
  const handleSubmit = async (values) => {
    // const { nombre, email, password } = values
    // const res = await fetchAutenticarUsuario({
    //   Nombre: nombre,
    //   Email: email,
    //   Password: password,
    // })
    console.log('sign up')
  }
  return (
    <div className="h-screen w-full bg-[url('../public/imgs/loginimage.jpg')] px-4 pt-4 xl:pt-36">
      <div className="max-w-lg px-4 pb-24 mx-auto bg-neutral-900">
        <AuthNavigate />
        <FormikForm
          inputForms={inputForms}
          initialValues={initialValues}
          validationSchema={validationSchema}
          submitFunction={handleSubmit}
          btnText="Registrar"
        />
      </div>
    </div>
  )
}
export default SignUpPage
