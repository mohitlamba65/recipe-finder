// apiKey = '1bcb674bbfb7448998564c5c61dea7c3'

const apiKey = '6ddec63f7cc542a5af38ee3b38720397'
const apiBase = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&fillIngredients=true`

export const state = {
    ingredients: [],
    filters: {
        cuisine: null,
        diet: null,
        time: null,
        serving: null
    }
}

export function updateRecipes() {
    let queryParams = [];

    if (state.ingredients.length) {
        queryParams.push(`includeIngredient=${state.ingredients.join()}`)
    }

    if (state.filters.cuisine) queryParams.push(`cuisine=${state.filters.cuisine.toLowerCase()}`)
    if (state.filters.diet) queryParams.push(`diet=${state.filters.diet.toLowerCase()}`)
    if (state.filters.time) queryParams.push(`maxReadyTime=${state.filters.time.split(' ')[0]}`)
    if (state.filters.serving) queryParams.push(`serving=${state.filters.serving.split(' ')[0]}`)

    const finalApi = `${apiBase}&${queryParams.join('&')}`
    console.log(finalApi)

    fetch(finalApi)
        .then((response) => {
            if (response) document.querySelector('.result').classList.remove('hidden')
            return response.json()
        })
        .then(data => displayRecipes(data))
        .catch(error => console.log("Error fetching recipes: ", error))


}

function displayRecipes(data) {
    const recipeList = document.getElementById('card-list')
    recipeList.innerHTML = ''

    if (!data.results.length) {
        recipeList.innerHTML = `<p>No recipes found. Try adjusting your filters.</p>`
        return
    }

    recipeList.innerHTML = `
        <i class="fa-solid fa-list-ul"></i>
        ${data.totalResults} recipes based on your ingredients
    `

    data.results.forEach((recipe) => {
        const li = document.createElement('li')
        li.className = 'card';
        li.innerHTML = `
            <div class="card-item">
                <a href="${recipe.sourceUrl}" target="_blank">
                    <img src="${recipe.image}" class="card-img" alt="Recipe Image">
                </a>
                <div class="card-body">
                    <a href="${recipe.sourceUrl}" target="_blank">
                        <h5 class="card-title" data-translate>${recipe.title}</h5>
                    </a>
                    <p class="card-text" data-translate>${recipe.summary}</p>
                    <div class="card-icons">
                        <i class="fa-solid fa-thumbs-up"><span data-translate> ${recipe.aggregateLikes} likes</span></i>
                        <i class="fa-solid fa-clock"><span data-translate>${recipe.readyInMinutes} mins</span></i>
                        <i class="fa-solid fa-user"><span data-translate>${recipe.servings} servings</span></i>
                    </div>
                </div>
            </div>
        `;
        recipeList.appendChild(li);
    })
}