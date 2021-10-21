console.log('%c HI', 'color: firebrick')

let allBreeds;

document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    const breedDropDown = document.querySelector('#breed-dropdown');

    fetch(imgUrl)
    .then(response => response.json())
    .then(data => renderDogs(data.message));

    fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
        allBreeds = data.message
        renderBreeds(Object.entries(data.message))
    });

    breedDropDown.addEventListener("change", breedFilter)
})


function breedFilter(event) {
    const filterBreeds = Object.entries(allBreeds).filter((breed) => {
        return breed[0].charAt(0) == event.target.value 
    })

    document.querySelector('#dog-breeds').innerHTML = '';
    renderBreeds(filterBreeds)
}

function renderDogs(dogs) {
    const dogContainer = document.querySelector('#dog-image-container')
    
    dogs.forEach(dogUrl => {
        let newDog = document.createElement('img');
        
        newDog.src = dogUrl
        dogContainer.appendChild(newDog)
    });
}

function renderBreeds(breeds) {
    const dogBreedsContainer = document.querySelector('#dog-breeds')
    
    breeds.forEach(breed => {
        let dogBreed = document.createElement('li');

        dogBreed.addEventListener('click', (event) => event.target.style.color = "green")
        dogBreed.innerText = breed[0] // breed [0] === name of the breed
        dogBreedsContainer.appendChild(dogBreed)
    });
}