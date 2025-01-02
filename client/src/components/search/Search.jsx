import React, { useState } from 'react'
import './search.css'
import { useDispatch } from 'react-redux'
import { setSearchedStudnet } from '../../redux/feature/search/searchSlice'

const Search = () => {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const handleSearchChange = (e) => {
    dispatch(setSearchedStudnet({ searchedStudent: e.target.value }))
    setQuery(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()

    console.log("Searching for:", query)
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          className="search-input"
          placeholder="Search..."
        />
      </form>
    </div>
  )
}

export default Search
