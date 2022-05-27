import { createContext, useState } from 'react'
export const SelectedsContext = createContext(null)
export const SelectedsProvider = ({ children }) => {
  const [selectedPerfil, setSelectedPerfil] = useState(null)
  const [selectedSala, setSelectedSala] = useState(null)
  return (
    <SelectedsContext.Provider
      value={{
        selectedPerfil,
        selectedSala,
        setSelectedPerfil,
        setSelectedSala,
      }}
    >
      {children}
    </SelectedsContext.Provider>
  )
}
