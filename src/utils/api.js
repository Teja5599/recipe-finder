export const fetchRecipes = async(query = "")=>{
    try {
        console.log(query)
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}` ,{cache:"no-store"})
        const data = await res.json()
        return data.meals || []
    } catch (error) {
        throw new Error("error while fetching data " , error)
        
    }
}
fetchRecipes()

