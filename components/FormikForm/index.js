import { Formik, Form } from 'formik'
import FormGroup from './FormGroup'
import RenderIf from '../RenderIf'
import LoadIndicatorIf from '../LoadIndicatorIf'

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
        <Form onSubmit={handleSubmit} className="mx-auto max-w-sm">
          <RenderIf isTrue={errors.submit}>
            <span className="bg-red-400 px-2 text-white">{errors.submit}</span>
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
            className="button mt-8 flex w-full items-center justify-center font-bold uppercase"
          >
            <LoadIndicatorIf isTrue={isSubmitting} />
            {btnText}
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default FormikForm
