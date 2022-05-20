import { LoadIndicator } from 'devextreme-react'

const LoadIndicatorIf = ({ isTrue }) => {
  return <>{isTrue ? <LoadIndicator width={18} height={18} /> : null}</>
}
export default LoadIndicatorIf
