import Sidebar from './Sidebar'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
const DashboardLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false)
  return (
    <div className="flex h-screen w-100 min-h-100">
      <Sidebar collapsed={openSidebar} />
      <div className="w-full">
        <nav className="w-full py-2 shadow">
          <AiOutlineMenu
            className="w-8 h-8 ml-2 cursor-pointer"
            onClick={() => setOpenSidebar(!openSidebar)}
          />
        </nav>
        <div className="px-4 py-4 lg:px-36">
          <div className="p-8 shadow">{children}</div>
        </div>
      </div>
    </div>
  )
}
export default DashboardLayout
