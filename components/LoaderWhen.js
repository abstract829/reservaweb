import Loading from './Loading'

const LoaderIf = ({ isTrue, children }) => {
  return <>{isTrue ? <Loading /> : children}</>
}
export default LoaderIf
