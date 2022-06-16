import { Form, Formik, Field } from 'formik'
import FormGroup from './FormGroup'
import * as Yup from 'yup'
import LoadIndicatorIf from '../LoadIndicatorIf'
import RenderIf from '../RenderIf'

const NewForm = ({ style, className, form, submitFunction }) => {
  const initialValues = {}
  const validations = {}

  for (const input of form) {
    initialValues[input.name] = input.value

    if (!input.validations) continue
    let schema = Yup.string()
    for (const rule of input.validations) {
      if (rule.type === 'required') {
        schema = schema.required('El campo es obligatorio')
      }
      if (rule.type === 'email') {
        schema = schema.email('Ingrese un email valido')
      }
    }
    validations[input.name] = schema
  }
  return (
    <div style={style} className={className}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(validations)}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await submitFunction(values)
          } catch (error) {
            const message = error.message || 'Hubo un error inesperado'
            setStatus({ success: false })
            setErrors({ submit: message })
            setSubmitting(false)
          }
        }}
      >
        {({ errors, handleSubmit, isSubmitting }) => (
          <Form className="max-w-3xl mx-auto">
            <RenderIf isTrue={errors.submit}>
              <span className="p-2 text-white bg-red-400">{errors.submit}</span>
            </RenderIf>
            <div className={scroll ? 'mt-4 max-h-96 overflow-y-auto' : 'mt-4'}>
              <div className={`grid grid-cols-12 gap-4`}>
                {form.map((input, index) => (
                  <div
                    key={input.name}
                    className={`${
                      input.type === 'textarea' ? 'col-span-8' : 'col-span-4'
                    }`}
                  >
                    <FormGroup
                      key={index}
                      label={input.label}
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                      options={input.options ? input.options : null}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center w-full mt-8 font-bold uppercase button"
            >
              <LoadIndicatorIf isTrue={isSubmitting} />
              Guardar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
export default NewForm
