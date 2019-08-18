let userData = [];
let employeeId = 0;
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
        li.setAttribute('id', employeeId);
        employeeId++;

        li.innerHTML = `
          <img class="profileImage" src="${data.picture.large}" alt="${data.name.first} ${data.name.first}">
          <div class="user-data">
          <h2>${capitalize(data.name.first)} ${capitalize(data.name.last)}</h2>
          <p>${data.email}</p>
          <p>${capitalize(data.location.city)}</p>
          </div>
        `;
        userList.appendChild(li);
        userData.push(data);
}

const createEmployeeDetailHTML = (data, index) => {
    const div = document.createElement('div');
    div.className = 'usercard';
    div.innerHTML = `
        <img class="profileImage" src="${data[index].picture.large}" alt="${data[index].name.first} ${data[index].name.last}">
        <div class="userData">
            <h2>${data[index].name.first} ${data[index].name.last}</h2>
            <p>${data[index].email}</p>
            <p>${data[index].location.city}</p>
            <p>${data[index].phone}</p>
            <p>${data[index].location.street}, 
            ${data[index].location.state.toUpperCase()} ${data[index].location.postcode}
            </p>
            <p>${data[index].dob.date}</p>
        </div>
    `;

    showOverlay.appendChild(div);
};




userList.addEventListener('click', e => {
    if (e.target.classList.tagName === 'LI') {
        console.log("okidoki");
        showOverlay.style.display = 'block';
        createEmployeeDetailHTML(userData, e.target.id);        
    }
   
});