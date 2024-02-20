function debounce  (fn, debounceTime) {

 let times;
 return function wraper() {

   const deb = () =>  fn.apply(this,arguments)

   clearTimeout(times)

   times = setTimeout(deb,debounceTime)  
  }
};

onInput = debounce(onInput,600)

let input = document.querySelector("input");
input.addEventListener("keyup", onInput);

let userFetch;
let data;
let countUser = [];
async function getUserName(value) {
  userFetch = await fetch(`https://api.github.com/repositories?q=${value}`);
  data = await userFetch.json();
  console.log(data)
  countUser = data.map((user) => {
    return user.name;
  });
}




function onInput() {
  removeAutocomplete();
  
  let value = input.value.toLowerCase();

  getUserName(value);

  if (value.length == 0) return;

  let filterUser = [];

  countUser.forEach((user) => {
    if (user.substr(0, value.length).toLowerCase() === value)
      filterUser.push(user);
  });

  createAutocomplete(filterUser);
}

function createAutocomplete(list) {
  let listEL = document.createElement("ul");
  listEL.className = "user_autocomplite";
  let slice = list.slice(0,5)

  slice.forEach((user) => {
    
    let listItem = document.createElement("li");
    listItem.classList.add("user_autocomplite_list");

    let button = document.createElement("button");
    button.classList.add("user_autocomplite_button");
    button.innerHTML = user;

    listItem.appendChild(button);
    listEL.appendChild(listItem);
    
    listItem.addEventListener("click", listInput);
    console.log(listItem.length)
    
  });

  let wrapper = document.querySelector("#autocomplete-wrapper");
  
     wrapper.appendChild(listEL);
  
 
}

function removeAutocomplete() {
  let listEl = document.querySelector(".user_autocomplite");
  if (listEl) listEl.remove();
}





function listInput(e) {
  console.log(e);
 
  
  input.value = "";
  removeAutocomplete();

  let div = document.querySelector(".user");

  let liName = document.createElement("li");
  liName.classList.add("userComplete")

  let liID = document.createElement("li");
   liID.classList.add("userComplete")

  let button = document.createElement("button");
  button.append('✖')
  button.classList.add("buttonExit")
  button.addEventListener("click", () => {
    divFlex.style.display = "none"
  })
  
  let divUser = document.createElement("div")
  divUser.append(liName,liID)

  let divFlex = document.createElement("div");
  divFlex.classList.add("divFlex")
  divFlex.append(divUser,button)
  
  
  liName.append("Name:" + " " + e.srcElement.innerText)
  

  data.forEach(el => {
    if(el.name == e.srcElement.innerText) {
      liID.append("ID:" + " " + el.id)
    }
  })

  div.append(divFlex)
  
}



