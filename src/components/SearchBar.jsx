import React from 'react'
import "./styles/Searchbar.css"
import { useState } from 'react'
const SearchBar = ({onSearch , onClear}) => {
    const [query, setQuery] = useState("")
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(query.trim()==="") return
        onSearch(query)
    }

    const handleClear = ()=>{
        setQuery("")
        onClear("")
    }
  return (
    <form onSubmit={handleSubmit} action="" className='search-bar'>
        <input 
        className='input'
        type="text" 
        placeholder='Search for a recipe.'
        value={query}
        onChange={(e)=> setQuery(e.target.value)}/>
        <button className='btn1' type='button' onClick={handleSubmit}>Search</button>

        {
            query && (
                <button className='clear-btn' type='button' onClick={handleClear}>x</button>
            )
        }
    </form>
  )
}

export default SearchBar