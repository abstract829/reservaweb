import { useState } from 'react'

const useSearch = () => {
  const [searchValue, setSearchValue] = useState('')
  const filterListado = (arr) => {
    let search = searchValue.trim().toLowerCase()
    if (search.length > 0) {
      return arr.filter((u) => u.Nombre.toLowerCase().includes(search))
    } else {
      return arr
    }
  }
  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }
  return {
    searchValue,
    handleChange,
    filterListado,
  }
}
export default useSearch
