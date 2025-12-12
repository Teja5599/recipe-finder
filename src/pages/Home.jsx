import React from 'react'
import { useState, useEffect } from 'react'
import { fetchRecipes } from '../utils/api'
import RecipeCard from '../components/RecipeCard'
import RecipeModel from '../components/RecipeModal'
import SearchBar from '../components/SearchBar'
import "./Home.css"
import Loader from '../components/Loader'
const Home = ({resetHome}) => {
  const [chickenRecipes, setChickenRecipes] = useState([])
  const [soupRecipes, setSoupRecipes] = useState([])
  const [exploreAll, setExploreAll] = useState([])
  const [visibleCount, setVisibleCount] = useState(15)
  const [loading, setlLoading] = useState(true)
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [recipes, setRecipes] = useState([])

  useEffect(()=>{
    setSearchQuery("")
    setRecipes([])
  },[resetHome])

  useEffect(() => {
    const fetchData = async () => {
      setlLoading(true)
      const chicken = await fetchRecipes("chicken")
      setChickenRecipes(chicken.slice(0, 6))
      const soup = await fetchRecipes("soup")
      setSoupRecipes(soup.slice(0, 6))
      const all = await fetchRecipes("a")
      setExploreAll(all)
      setlLoading(false)

    }
    fetchData()
  }, [])


  const showMore = () => {
    setVisibleCount((prev) => prev + 7)
  }

  const handleSearch = async (query) => {
    setSearchQuery(query)
    if (query.trim() === "") return
    setlLoading(true)
    const results = await fetchRecipes(query)
    setlLoading(false)
    setRecipes(results)

  }
  const clearSearch = () => {
    setSearchQuery("")
    setRecipes([])
  }

  if (loading) return <Loader />

  return (
    <div className='home-container'>
      <SearchBar onSearch={handleSearch} onClear={clearSearch} />
      {
        searchQuery ? (
          <div className='section'>
            <h2>Search results for "{searchQuery}"</h2>
              {
                recipes.length>0?(
                  <div className='recipe-grid'>
                    {
                      recipes.map((recipe , key)=>(
                        <RecipeCard 
                        recipe={recipe} 
                        key={key} 
                        selected={setSelectedRecipe}/>
                      ))
                    }
                  </div>
                ):(
                  <p>No recipes found for "{searchQuery}"</p>
                )
              }
          </div>
        ) : (
          <>
            <div className="section">
              <h2>Chicken Recipes</h2>
              <div className='recipe-grid'>
                {
                  chickenRecipes.map((r, key) => (
                    <RecipeCard recipe={r} key={key} selected={setSelectedRecipe} />
                  ))
                }
              </div>
            </div>

            <div className="section">
              <h2>Soup Recipes</h2>
              <div className='recipe-grid'>
                {
                  soupRecipes.map((r, key) => (
                    <RecipeCard recipe={r} key={key} selected={setSelectedRecipe} />
                  ))
                }
              </div>
            </div>
            <div className="section">
              <h2>Explore All Recipes</h2>
              <div className='recipe-grid'>
                {
                  exploreAll.slice(0, visibleCount).map((r, key) => (
                    <RecipeCard recipe={r} key={key} selected={setSelectedRecipe} />
                  ))
                }
              </div>
              {
                visibleCount < exploreAll.length && <button className='load-more' onClick={() => showMore()}>Show More</button>
              }
            </div>
          </>
        )

      }
      {selectedRecipe && (
        <RecipeModel recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  )
}

export default Home