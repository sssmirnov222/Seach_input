let input = document.querySelector("input");
input.addEventListener("input", onInput);

let userFetch;
let data;
let countUser = [];
async function getUserName() {
  userFetch = await fetch("https://api.github.com/repositories?q=Q");
  data = await userFetch.json();
  countUser = data.map((user) => {
    return user.name;
  });
}
getUserName();



function onInput() {
  removeAutocomplete();

  let value = input.value.toLowerCase();

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

  list.forEach((user) => {
    let listItem = document.createElement("li");
    listItem.classList.add("user_autocomplite_list");

    let button = document.createElement("button");
    button.classList.add("user_autocomplite_button");
    button.innerHTML = user;

    listItem.appendChild(button);
    listEL.appendChild(listItem);

    listItem.addEventListener("click", listInput);
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

  let buttonEl = e.target;
  input.value = buttonEl.innerHTML;
  removeAutocomplete();

  let div = document.querySelector(".user");
  let liName = document.createElement("li");
  let liID = document.createElement("li");
  

  liName.classList.add("userComplete")
  liID.classList.add("userComplete")

  liName.append("Name:" + " " + e.srcElement.innerText)
  liName.style.borderTop = "2px solid black"

  data.forEach(el => {
    if(el.name == e.srcElement.innerText) {
      liID.append("ID:" + " " + el.id)
      liID.style.borderBottom = "2px solid black"
    }
  })
 
  div.append(liName,liID)
  
}
