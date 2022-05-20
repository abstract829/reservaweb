import Sidebar from './Sidebar'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
const DashboardLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false)
  return (
    <div className="w-100 min-h-100 flex h-screen">
      <Sidebar collapsed={openSidebar} />
      <div className="w-full">
        <nav className="w-full py-2 shadow">
          <AiOutlineMenu
            className="ml-2 h-8 w-8 cursor-pointer"
            onClick={() => setOpenSidebar(!openSidebar)}
          />
        </nav>
        <div className="px-4 py-4 lg:px-4">
          <div className="p-8 shadow">{children}</div>
        </div>
      </div>
    </div>
  )
}
export default DashboardLayout
