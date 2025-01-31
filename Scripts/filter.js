import { state, updateRecipes } from "./state.js";

document.addEventListener('DOMContentLoaded', () => {
   
    const dropdowns = {
        cuisine: document.getElementById('cuisine-dropdown'),
        time: document.getElementById('time-dropdown'),
        diet: document.getElementById('diet-dropdown'),
        serving: document.getElementById('serving-dropdown')
    }

    const mockCuisines = ["Indian", "Italian", "Chinese", "Mexican", "Japanese"];
    const mockDiets = ["Vegan", "Vegetarian", "Lacto-Vegetarian", "Ketogenic", "Ovo-Vegetarian", "Pescetarian", "Paleo", "Primal", "Gluten-Free"];
    const prepTimes = ['15 minutes', '30 minutes', '45 minutes', '60 minutes', '120 minutes'];
    const servingSizes = ['2 servings', '4 servings', '6 servings', '7 servings', '8 servings'];

    const populateDropdown = (data, dropdown) => {
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            dropdown.appendChild(option);
        });
    };


    populateDropdown(mockCuisines, dropdowns.cuisine);
    populateDropdown(mockDiets, dropdowns.diet);
    populateDropdown(prepTimes, dropdowns.time);
    populateDropdown(servingSizes, dropdowns.serving);




    const chipsContainer = document.getElementById('chips-container');

    function handleDropdownChange(event, filterType) {
        const value = event.target.value

        if (value) {
            state.filters[filterType] = value
            createChip(value, filterType);
            updateRecipes();
        }
    }

    function createChip(value, filterType) {
        document.querySelectorAll('.chip').forEach(chip => {
            if (chip.dataset.filterType === filterType) {
                chip.remove();
            }
        })

        const chip = document.createElement('div')
        chip.className = 'chip'
        chip.dataset.filterType = filterType
        chip.textContent = `${value} ✕`

        chip.addEventListener('click', () => {
            chip.remove()
            state.filters[filterType] = null
            dropdowns[filterType].selectedIndex = 0
            updateRecipes()
        })

        chipsContainer.appendChild(chip)
    }

    Object.keys(dropdowns).forEach(filterType => {
        dropdowns[filterType].addEventListener('change', (event) => handleDropdownChange(event, filterType))
    })

    document.querySelectorAll('.accordion-header').forEach((header) => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            const body = header.nextElementSibling;
            body.classList.toggle('open');
        });
    });



});




