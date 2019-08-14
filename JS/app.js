let userData = [];
const randomUserUrl = 'https://randomuser.me/api/?results=12';
// const employee = document.querySelector('.employee');
const userList = document.querySelector('#user-list');

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
          <h2>${data.name.first} ${data.name.last}</h2>
          <p>${data.email}</p>
          <p>${data.location.city}</p>
          </div>
          </div>
        `;
        li = liElement;
        li.className = "employee";
    });
    return Promises.all(promises);
}

