import SubModulo from './SubModulo'

const Modulo = ({ modulo, myFunciones, perfil }) => {
  return (
    <div>
      <h2 className="text-center text-white bg-primary">{modulo.nombre}</h2>
      {modulo.mis_submodulos.map((subModulo) => (
        <SubModulo
          subModulo={subModulo}
          key={subModulo.id}
          myFunciones={myFunciones}
          perfil={perfil}
        />
      ))}
    </div>
  )
}
export default Modulo
