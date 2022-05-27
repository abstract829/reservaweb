import useSelecteds from '../../../hooks/useSelecteds'
import LoaderWhen from '../../LoaderWhen'

const Funcion = ({ funcion }) => {
  const { selectedPerfil, setSelectedPerfil } = useSelecteds()

  const handleChange = (e) => {
    const obj = {
      FuncionId: funcion.id,
      PerfilId: selectedPerfil.PerfilId,
    }
    if (e.target.checked) {
      setSelectedPerfil((prev) => {
        return {
          ...prev,
          MisFunciones: [...prev.MisFunciones, obj],
        }
      })
    } else {
      setSelectedPerfil((prev) => {
        return {
          ...prev,
          MisFunciones: prev.MisFunciones.filter(
            (f) => f.FuncionId !== funcion.id
          ),
        }
      })
    }
  }
  const hasFunction = (id) => {
    if (selectedPerfil) {
      return selectedPerfil.MisFunciones.find(
        (funcion) => Number(funcion.FuncionId) === Number(id)
      )
    } else return false
  }
  return (
    <LoaderWhen isTrue={!selectedPerfil}>
      <div className="flex items-center gap-1 my-2 ">
        <input
          type="checkbox"
          defaultChecked={hasFunction(funcion.id)}
          name={funcion.id}
          onChange={handleChange}
        />
        <label className="font-bold text-primary">{funcion.nombre}</label>
      </div>
    </LoaderWhen>
  )
}
export default Funcion
