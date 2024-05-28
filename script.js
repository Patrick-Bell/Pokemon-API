const searchIcon = document.querySelector('.bi-search')
const input = document.querySelector('.input-box')
const pokemonContainer = document.querySelector('.pokemon-container')
const errorText = document.querySelector('.error-text')
const hardcodePikachu = document.querySelector('.hard-code')
const loader = document.querySelector('.loader');



searchIcon.addEventListener('click', () => {
  loader.style.display = 'block'; // Show the loader
  console.log('search button has been clicked')


  const userInput = input.value.trim().toLowerCase();
  console.log(userInput);
  
  if (userInput === '') {
    errorText.style.display = "block"
    errorText.innerHTML = 'Input is empty';
    loader.style.display = "none"
    pokemonContainer.style.display = "none"
    return;
  }

  let abilitiesApi = `https://pokeapi.co/api/v2/pokemon/${userInput}/`; // replace with your API endpoint
  
  fetch(abilitiesApi)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      pokemonContainer.style.display = "block"
      errorText.style.display = "none"
      loader.style.display = "none"
      // Handle the list of abilities
      console.log(data);
      const name = data.name;
      const img1 = data.sprites.front_default;
      const img2 = data.sprites.back_default;
      const height = data.height;
      const abilities = data.abilities.map(el => ({
        name: el.ability.name,
      }));
      console.log(abilities);
      const type = data.types[0].type.name
      console.log(type);
      const baseExperience = data.base_experience;
      const weight = data.weight;

      const stats = data.stats.map(el => ({
        stat: el.stat.name,
        base: el.base_stat
      }))

      console.log(stats)

      // Ensure these elements exist
      const pokemonName = document.getElementById('name');
      const sliderImg1 = document.getElementById('img1');
      const sliderImg2 = document.getElementById('img2');
      const pokemonAbilities = document.getElementById('abilities');
      const pokemonWeight = document.getElementById('weight')
      const pokemonHeight = document.getElementById('height')
      const pokemonExperience = document.getElementById('experience')
      const pokemonType = document.getElementById('type')
      const pokemonStats = document.getElementById('stats')

      pokemonName.innerHTML = `<strong>${name}</strong>`;
      sliderImg1.src = img1;
      sliderImg2.src = img2;

      pokemonHeight.innerHTML = `<strong>${height}</strong>`
      pokemonWeight.innerHTML = `<strong>${weight}</strong>`

      pokemonType.innerHTML = `<strong>${type}</strong>`

      pokemonExperience.innerHTML = `<strong>${baseExperience}</strong>`

      pokemonAbilities.innerHTML = abilities.map(abil => 
        `<strong>${abil.name}</strong>`
      ).join(', '); // Joining with <br> to add line breaks

      pokemonStats.innerHTML = stats.map(stat => 
        `<div class="flex">
        <p><strong>${stat.stat}</strong></p> 
        <p class="stat-bot">${stat.base}</p>
        </div>`
      ).join('\n')

    })
    .catch(error => {
      console.error('Fetch error:', error);
      errorText.innerHTML = `
      <div class="error-text">
        No results found for <strong>${userInput}</strong>. Please try again or try 
        <div class="hard-code">
          <strong>pikachu</strong>
        </div>
      </div>`;    
      loader.style.display = "none"  
      pokemonContainer.style.display = "none"
      errorText.style.display = "block"
      const hardcodePikachu = document.querySelector('.hard-code');



      hardcodePikachu.addEventListener('click', () => {
        input.value = 'pikachu';
        searchIcon.click();
        pokemonContainer.style.display = "block"
        errorText.style.display = "none"
      })
    });
})



const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
});
