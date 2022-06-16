import { Wizard } from 'react-use-wizard'
import Month from './Month'

const CustomCalendar = () => {
  const months = [1, 2, 3, 4, 5, 6]
  return (
    <div className="max-w-5xl mx-auto ">
      <Month />
    </div>
  )
}
export default CustomCalendar
