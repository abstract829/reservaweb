import { ErrorMessage, Field } from 'formik'
import RenderIf from '../RenderIf'

const FormGroup = ({ name, label, type, placeholder, options }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 font-bold text-[#908161]" htmlFor={name}>
        {label}
      </label>

      <RenderIf isTrue={type === 'select'}>
        <Field as="select" name={name} className="input">
          {options &&
            options.map((op) => (
              <option key={op.value} value={op.value}>
                {op.text}
              </option>
            ))}
        </Field>
      </RenderIf>
      <RenderIf isTrue={type !== 'select' && type !== 'checkbox'}>
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          className="input"
        />
      </RenderIf>

      <span className="text-red-400">
        <ErrorMessage name={name} />
      </span>
    </div>
  )
}
export default FormGroup
