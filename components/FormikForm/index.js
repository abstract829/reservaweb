import { Formik, Form } from 'formik'
import FormGroup from './FormGroup'
import RenderIf from '../RenderIf'

const FormikForm = ({
  inputForms,
  initialValues,
  validationSchema,
  submitFunction,
  btnText,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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
        <Form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <RenderIf isTrue={errors.submit}>
            <span className="px-2 text-white bg-red-400">{errors.submit}</span>
          </RenderIf>
          {inputForms.map((input, index) => (
            <FormGroup
              key={index}
              label={input.label}
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
            />
          ))}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-8 font-bold uppercase button"
          >
            {btnText}
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default FormikForm
