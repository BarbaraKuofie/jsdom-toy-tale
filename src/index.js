
// DECLARED VARIABLES
const toyArray = fetchToys
const url = "http://localhost:3000/toys"
const form = document.querySelector('.add-toy-form')
let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
  

// DEFINED FUNCTIONS
function fetchToys(){
 return fetch(url)
  .then(resp => resp.json())
  .then(json => renderToys(json))
}

function renderOneToy(toy){
  const toyCollection = document.getElementById('toy-collection')
  const divToy = document.createElement('div')
  const h2Tag = document.createElement('h2')
  const pTag = document.createElement('p')
  const imageTag = document.createElement('img')
  const button = document.createElement("button")
  button.class = "like-btn"
  button.dataset = `${toy.id}`

  h2Tag.innerText = toy["name"]
  imageTag.src = toy['image']
  pTag.innerText = toy['likes']
  button.innerText  = "Likes"
  button.class = "like-btn"

  divToy.append(h2Tag)
  divToy.append(pTag)
  divToy.append(imageTag)
  divToy.append(button)

  toyCollection.append(divToy)
}

function renderToys(toys){
  toys.forEach( toy=> {
    renderOneToy(toy)
  });
}



function handlePostToy(event){
  event.preventDefault()

  const formData = {
    name: event.target['name'].value, 
    image: event.target['image'].value,
    likes: 0
  }
  event.target.reset()

  const reqObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(formData)
  }

  fetch(url, reqObj)
  .then(resp => resp.json())
  .then(toy => {
    renderOneToy(toy)
  })
}

function addLikeBtnListener(){
  const toyContainer = document.firstElementChild("toy-collection")
  
  toyContainer.addEventListener('click', function(event)
  {
    console.log(event.target.className === 'like-butn')
    {
      likeToy(event)
    }
  })
}


function likeToy(event){
  
  
}

// INVOKED FUNCTIONS
fetchToys(url)


// EVENT LISTENERS
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});

form.addEventListener('submit', handlePostToy)

