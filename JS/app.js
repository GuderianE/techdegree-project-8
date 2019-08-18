let userData = [];
let employeeId = 0;
let closeOverlay = 0;
const randomUserUrl = 'https://randomuser.me/api/?results=12&&nat=us,ca,gb&inc=picture,name,email,location,phone,dob,login&noinfo';
const container = document.querySelector('.container');
const userList = document.querySelector('#user-list');
const showOverlay = document.querySelector('.overlay');

const capitalize = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

//requests URl, makes JSON readable in JS and calls createHTML to display the data in the browser
fetch(randomUserUrl)
    .then(res => res.json())
    .then(data => data.results)
    .then(results => results.forEach(result => createEmployeeHTML(result)))
    .catch(err => console.log(err));


function createEmployeeHTML (data) {
    
        const li = document.createElement('li');
        li.className = "employee";

        li.innerHTML = `
          <img class="profileImage" src="${data.picture.large}" alt="${data.name.first} ${data.name.last}">
          <div class="user-data">
          <h2>${capitalize(data.name.first)} ${capitalize(data.name.last)}</h2>
          <p>${data.email}</p>
          <p>${capitalize(data.location.city)}</p>
          </div>
        `;
        userList.appendChild(li);
        userData.push(data);
}

const createEmployeeDetailHTML = (data) => {
    data = userData;
    const div = document.createElement('div');
    div.className = 'usercard';
    div.innerHTML = `
        <img class="profileImage" src="${data.picture.large}" alt="${data.name.first} ${data.name.last}">
        <div class="userData">
            <h2>${data.name.first} ${data.name.last}</h2>
            <p>${data.email}</p>
            <p>${data.location.city}</p>
            <p>${data.phone}</p>
            <p>${data.location.street}, 
            ${data.location.state} ${data.location.postcode}
            </p>
            <p>${data.dob.date}</p>
        </div>
        `;

    showOverlay.appendChild(div);
};



document.addEventListener("DOMContentLoaded", function(){

    userList.addEventListener('click', e => {
        if (!e.target.classList.contains('employee')) {
            console.log("okidoki");
            showOverlay.style.display = 'block';
            userData = e.target;
            createEmployeeDetailHTML(userData);
        }
    });
});