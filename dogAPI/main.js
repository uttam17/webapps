document.addEventListener("DOMContentLoaded", listDogBreeds);
var breedNames = ["Affenpinscher", "African", "Airedale", "Akita", "Appenzeller", "Basenji", "Beagle", "Bluetick", "Borzoi", "Bouvier", "Boxer", "Brabancon", "Briard", "Bull Dog", "Bull Terrier", "Cairn", "Chihuahua", "Chow", "Clumber", "Collie", "Coon Hound", "Corgi", "Dachshund", "Dane", "Deer Hound", "Dhole", "Dingo", "Doberman", "Glkhound", "Gntlebucher", "Gskimo", "German Shepherd", "Greyhound", "Groenendael", "Hound", "Husky", "Keeshond", "Kelpie", "Komondor", "Kuvasz", "Labrador", "Leonberg", "Lhasa", "Malamute", "Malinois", "Maltese", "Mastiff", "Mexican Hairless", "Mountain", "Newfoundland", "Otterhound", "Papillon", "Pekinese", "Pembroke", "Pinscher", "Pointer", "Pomeranian", "Poodle", "Pug", "Pyrenees", "Redbone", "Retriever", "Ridgeback", "Rottweiler", "Saluki", "Samoyed", "Schipperke", "Schnauzer", "Setter", "Sheepdog", "Shiba", "Shihtzu", "Spaniel", "Springer", "St. Bernard", "Terrier", "Vizsla", "Weimaraner", "Whippet", "Wolf Hound"];

function getBreedList(object) {
    let keys = [];
    for (var breed in object) {
        keys.push(breed);
    }
    return keys;
}

function listDogBreeds() {
    return fetch('https://dog.ceo/api/breeds/list/all')
        .then(res => {
                res.json()
                    .then(data => {
                            var options = [];
                        for (var breed in data.message) {
                            options.push(breed);
                        }
                        for (var i = 0; i < options.length; i = i + 1) {
                            var opt = options[i];
                            var elt = document.createElement('option');
                            elt.textContent = breedNames[i];
                            elt.value = opt;
                            document.getElementById('selectBreed').appendChild(elt);
                        }
                    })
        })
.catch(err => {
    console.log(err);
});
}

var selectedBreed = "";

function breedSelect(breed){
	selectedBreed = breed.value;
}

function showImage(){
  fetch('https://dog.ceo/api/breed/' + selectedBreed + '/images/random')
  .then( res => {
    res.json()
    .then( pic => {
      console.log(pic.message);
      document.getElementById('randomPicture').src = pic.message;
    })
    .catch()
  })
  .catch (error => console.log("ERROR"+error))
}
