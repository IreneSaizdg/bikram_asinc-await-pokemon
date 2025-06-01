//LINK EJERCICIO: https://github.com/TheBridge-FullStackDeveloper/advanced-js-bikram-async-await




//EJERCICIO 1: Retornar un pokemon aleatorio ------------------------------------------- /
    async function getRandomPokemon() {


        const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/`) //Llamada a API de todos los pokemons
        const apiData = await apiResponse.json();
        const totalNumberOfPokemons = apiData.count;


        const randomPokemonId = Math.floor(Math.random() * totalNumberOfPokemons); //Randomizador


        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`) //Llamada a API del pokemon random.
        const randomPokemonData = await pokemonResponse.json();
       
        return randomPokemonData
    }


    /*//Comprobación
    async function showRandomPokemon(){
        const randomPokemon = await getRandomPokemon()
        console.log(randomPokemon)
        console.log(randomPokemon.name)
    }
    showRandomPokemon()*/






//EJERCICIO 2: Retornar nombre e imagen de un pokemon ----------------------------------- /
const chosenPokemon = "pikachu";
async function getImageAndName(chosenPokemon){
    try {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${chosenPokemon}`) //Hace una petición a la API. El await pausa la ejecución hasta que la respuesta está lista.
        if (!apiResponse.ok){
            throw new Error(`Error ${apiResponse.status}: Pokémon no encontrado`); //Sale de la función y manda el error al catch
        }//apiResponse.status = códigos de error (200, 400, 500...)
        const apiData = await apiResponse.json(); //Convierte la respuesta de la API en un objeto-js. Data contendrá toda la info del pokemon.
       
        const name = apiData.name;
        const img = apiData.sprites.front_default;
        return { name, img }


    }catch(error){
        console.error(`Hubo un error al obtener el Pokémon ${chosenPokemon}`, error)
        return null;
    }
}






//EJERCICIO 3: Imprimir imagen y nombre de un pokemon ------------------------------------- //


/*//Pintado en el DOM
    // async function printImageAndName() {
    //     const pokemonData = await getImageAndName(chosenPokemon)
       
    //     if (pokemonData) {
    //         const pokemonContainer = document.createElement("SECTION");


    //         const imgElement = document.createElement("img");
    //         imgElement.src = pokemonData.img;
    //         imgElement.alt = pokemonData.name;


    //         const nameElement = document.createElement("H1");
    //         nameElement.textContent = pokemonData.name;


    //         pokemonContainer.append(imgElement, nameElement);
    //         document.body.append(pokemonContainer);


    //     } else {
    //         console.error(`No tenemos la información del pokemon elegido "${chosenPokemon}"`)
    //     }
       
    // }*/


    async function printImageAndName() {
        const pokemonData = await getImageAndName(chosenPokemon);


        if (pokemonData) {
            const pokemonImageAndNameString =
                `<section>
                    <img src="${pokemonData.img}" alt="${pokemonData.name}">
                    <h1>${pokemonData.name}</h1>
                </section>`
                ;    
            document.body.innerHTML += pokemonImageAndNameString ;//Pintar en el DOM sin borrar todo el contenido con el +=
            return pokemonImageAndNameString;


        } else {
            console.error(`No tenemos la información del Pokémon "${chosenPokemon}"`);
            return null;
        }
    }












//Batalla entre Pokemon y perritos 'https://dog.ceo/dog-api/'
//EJERCICIO 4: Retornar la url de la imagen de un perro aleatorio --------------------------- //
    async function getRandomDogImage(){
        const apiResponse = await fetch(`https://dog.ceo/api/breeds/image/random`)
        const randomDogData = await apiResponse.json();
        const randomDogImgUrl = randomDogData.message;


        return randomDogImgUrl
    }






//EJERCICIO 5: Retornar la url de la imagen de un pokemon aleatorio ------------------------- //
    async function getRandomPokemonImage(){
            const randomPokemonData = await getRandomPokemon()
            const pokemonImgUrl = randomPokemonData.sprites.front_default;


            return pokemonImgUrl
        }






//EJERCICIO 6: Pintar la batalla entre "Pug" y "Pikachu"------------------------------------ //
    /*Pseudocode
        Función asíncrona (imgpug, imgpikachu){
            llamada a la api para traer pug
            localizar la imagen entre la data


            llamada a la api para traer a pikachu
            localizar la imagen entre la data


            return console.log(imgpug, imgpikachu)
        }
    */










       
//Ejercicios con Rick y Morty https://rickandmortyapi.com/
//EJERCICIO 7: Retornar un personaje aleatorio ------------------------------------ //
    async function getRandomCharacter(){
        const apiResponse = await fetch(`https://rickandmortyapi.com/api/character`);
        const allCharactersData = await apiResponse.json();
        // console.log(allCharactersData)


        const characterTotalnumber = allCharactersData.info.count
        const randomCharacterNumber = Math.floor(Math.random() * characterTotalnumber); //Saca un número aleatorio del numero total de personajes


        const apiResponseCharacter = await fetch(`https://rickandmortyapi.com/api/character/${randomCharacterNumber}`);
        const randomCharacterData = await apiResponseCharacter.json();


        console.log(randomCharacterData)
        return randomCharacterData
    }






/*EJERCICIO 8: ----------------------------------------------------------------------------- //
    Retornar de un personaje:
    imagen, nombre, episodios en los que aparece,
    nombre del primer episodio en el que aparece + fecha de estreno,
    Formato de retorno => (return {img, name, episodes, firstEpisode, dateEpisode})
    */


    async function getRandomCharacterInfo(){
        const randomCharacter = await getRandomCharacter();
       
        const img = randomCharacter.image;
        const name = randomCharacter.name;
        const episodes = randomCharacter.episode;


        const firstEpisode = episodes[0]; //link directo a la API 1er episodio en el que aparece el personaje


        const apiResponse = await fetch(firstEpisode);
        const episodeData = await apiResponse.json();
        const dateEpisode = episodeData.air_date;


        return {img, name, episodes, firstEpisode, dateEpisode}
    }
