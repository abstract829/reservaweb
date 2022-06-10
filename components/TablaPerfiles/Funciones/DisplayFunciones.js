import { useMutatePerfil, useQueryPerfilById } from '../../../hooks/perfiles'
import Alert from '../../Alert'
import Alerts from '../../Alerts'
import LoaderWhen from '../../LoaderWhen'

const DisplayFunciones = ({ funciones, perfilId }) => {
  const {
    data: perfil,
    isLoading,
    isError,
  } = useQueryPerfilById({ id: perfilId })
  const { mutate: editPerfil, isErrorMutating, isSuccess } = useMutatePerfil()
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  const hasFunction = (id) => {
    if (perfil) {
      return perfil.data.MisFunciones.find(
        (funcion) => Number(funcion.FuncionId) === Number(id)
      )
    } else return false
  }
  const handleChange = (e, funcion) => {
    if (perfil) {
      const obj = {
        FuncionId: funcion.id,
        PerfilId: perfil.data.PerfilId,
      }
      if (e.target.checked) {
        perfil.data.MisFunciones.push(obj)
      } else {
        perfil.data.MisFunciones = perfil.data.MisFunciones.filter(
          (f) => f.FuncionId !== funcion.id
        )
      }
    }
  }
  const handleSubmit = () => {
    editPerfil(perfil.data)
  }
  return (
    <LoaderWhen isTrue={isLoading}>
      <div className="overflow-y-auto max-h-96">
        {funciones &&
          funciones.map((modulo) => (
            <div key={modulo.id}>
              <h2 className="text-center text-white bg-primary">
                {modulo.nombre}
              </h2>
              <div className="flex flex-wrap gap-4">
                {modulo.mis_submodulos.map((subModulo) => (
                  <div className="flex flex-wrap gap-4" key={subModulo.id}>
                    <div>
                      <h3 className="px-2 py-1 my-4 text-white bg-primary">
                        {subModulo.nombre}
                      </h3>
                      {subModulo.mis_funciones.map((funcion) => (
                        <div
                          className="flex items-center gap-1 my-2 "
                          key={funcion.id}
                        >
                          <input
                            type="checkbox"
                            defaultChecked={hasFunction(funcion.id)}
                            name={funcion.id}
                            onChange={(e) => handleChange(e, funcion)}
                          />
                          <label className="font-bold text-primary">
                            {funcion.nombre}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={handleSubmit}
        className="w-full mt-8 font-bold uppercase button"
      >
        Guardar
      </button>
      <Alerts
        successIf={isSuccess}
        failedIf={isErrorMutating}
        succesText="Funciones editadas correctamente!"
        failedText="Hubo un error inesperado"
      />
    </LoaderWhen>
  )
}
export default DisplayFunciones
