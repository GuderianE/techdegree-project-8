let userData = [];
const randomUserUrl = 'https://randomuser.me/api/?results=12';
const container = document.querySelector('.container');
const userList = document.querySelector('#user-list');

const capitalize = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

//requests URl, makes JSON readable in JS and calls createHTML to display the data in the browser
fetch(randomUserUrl)
    .then(res => res.json())
    .then(data => createHTML(data))
    .catch(err => console.log(err));


function createHTML (data) {
    userData = data;
    const promises = userData.results.forEach( data => {
        const liElement = document.createElement('li');
        userList.appendChild(liElement);
        liElement.innerHTML = `
          <div class="wrapper">  
          <img class="profileImage" src="${data.picture.large}">
          <div class="userData">
          <h2>${capitalize(data.name.first)} ${capitalize(data.name.last)}</h2>
          <p>${data.email}</p>
          <p>${capitalize(data.location.city)}</p>
          </div>
          </div>
        `;
        li = liElement;
        li.className = "employee";
    });
    container.addEventListener("click", e => {
        console.log("okidoki");
        const showOverlay = document.querySelector('.overlay');
        showOverlay.innerHTML = `
        <div id="userCard">
        <img class="profileImage" src="${data.picture.large}">
        <div class="userData">
        <h2>${data.name.first} ${data.name.last}</h2>
        <p>${data.email}</p>
        <p>${data.location.city}</p>
        <p>${data.phone}</p>
        <p>${data.location.street}, 
        ${data.location.state.toUpperCase()} ${data.location.postcode}
        </p>
        <p>${data.dob.date}</p>
        </div>
        </div>
        `;
        showOverlay.style.display = 'block';
    });
    return Promises.all(promises);
    
}


