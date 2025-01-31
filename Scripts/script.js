import { state, updateRecipes } from "./state.js"

document.addEventListener('DOMContentLoaded', () => {

    const searchIngredient = document.querySelector('#search-item')
    const searchBtn = document.querySelector('.submit-btn')
    const ingredientList = document.querySelector('.ingredient-list')
    const languageSelector = document.getElementById('languageSelector')

    ingredientList.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'button') {
            const btn = e.target
            const value = btn.textContent.toLowerCase()

            if (state.ingredients.includes(value)) {
                state.ingredients = state.ingredients.filter(ing => ing !== value)
                btn.classList.remove('selected')
            } else {
                state.ingredients.push(value)
                btn.classList.add('selected')
            }
        }
    })

    searchBtn.addEventListener('click', () => {
        let inputIngredient = searchIngredient.value.trim().toLowerCase()
        if (inputIngredient && !state.ingredients.includes(inputIngredient)) {
            state.ingredients.push(inputIngredient);
        }

        updateRecipes()
    })

   
    
})