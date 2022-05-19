import { ErrorMessage, Field } from 'formik'

const FormGroup = ({
  name,
  label,
  type,
  placeholder,
  isInvalid,
  onBlur,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 font-bold text-[#908161]" htmlFor={name}>
        {label}
      </label>
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className="mb-2 rounded border-2 border-[#908161] p-2"
      />
      <span className="text-red-400">
        <ErrorMessage name={name} />
      </span>
    </div>
  )
}
export default FormGroup
