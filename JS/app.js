let userData = [];
let currentEmployee = 0;
const randomUserUrl = 'https://randomuser.me/api/?results=12&&nat=us,ca,gb&inc=picture,name,email,location,phone,dob,login&noinfo';
const container = document.querySelector('.container');
const showOverlay = document.querySelector('.overlay');
const closeOverlay = document.querySelector('.close-overlay');

//requests URl, makes JSON readable in JS and calls createHTML to display the data in the browser
fetch(randomUserUrl)
    .then(res => res.json())
    .then(res => res.results)
    .then(createEmployeeHTML)
    .catch(err => console.log(err));


function createEmployeeHTML (data) {

        userData = data;
        let employeeHTML = '';
        userData.forEach((employee, index) => {
            
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        

        employeeHTML += `
        <div class="employee" data-index="${index}">
            <div class="wrapper">
                <img class="profileImage" src="${picture.large}" alt="${name.first} ${name.last}">
            <div class="user-data">
                <h2 class="capitalize">${name.first} ${name.last}</h2>
                <p>${email}</p>
                <p class="capitalize">${city}</p>
            </div>
            </div>
        </div>
        `;
        container.innerHTML = employeeHTML;
    });
}

const createEmployeeDetailHTML = (index) => {

    let {name, dob, phone, email, location: {city, street, state, postcode}, picture} = userData[index];
    const div = document.createElement('div');
    let date = new Date(dob.date);
    div.className = 'usercard';
    let arrow = '';
    if (userData.length > 1) {
        arrow =`
        <img class='icon-back' src="img/left.png" alt="back-icon">
        <img class='icon-next' src="img/right.png" alt="next-icon">
      `;
    }
    div.innerHTML = ` 
        <button class="close-overlay">X</button>   
        <img class="profileImage" src="${picture.large}" alt="${name.first} ${name.last}">
        <div class="user-data-detail">
            <h2 class="capitalize">${name.first} ${name.last}</h2>
            <p class="capitalize">${city}</p> 
            <p>${email}</p>
            <div class="user-data-extra">
                <p>${phone}</p>
                <p class="capitalize">${street}, 
                ${state} ${postcode}
                </p>
                <p>Birthday:
                ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
        </div>
        ${arrow}
        `;
    showOverlay.classList.remove('hidden');
    showOverlay.appendChild(div);
};

document.addEventListener("DOMContentLoaded", function(){

    container.addEventListener('click', e => {
        if (e.target !== container) {
            const card = e.target.closest(".employee");
            const index = card.getAttribute('data-index');
            createEmployeeDetailHTML(index);
            currentEmployee = index;
        }
    });
});

showOverlay.addEventListener('click', e => {
    if (e.target.className === 'close-overlay') {
        showOverlay.classList.add('hidden');
        while (showOverlay.firstChild) {
            showOverlay.removeChild(showOverlay.firstChild);
        }
    } else if (e.target.className === 'icon-next') {
        if (currentEmployee < userData.length -1) {
            while (showOverlay.firstChild) {
                showOverlay.removeChild(showOverlay.firstChild);
            }
            currentEmployee++;
            createEmployeeDetailHTML(currentEmployee);
        }
    } else if(e.target.className === 'icon-back'){
        if(currentEmployee > 0) {
            while (showOverlay.firstChild) {
                showOverlay.removeChild(showOverlay.firstChild);
            }
           currentEmployee--;
           createEmployeeDetailHTML(currentEmployee);
        }
    }
});



const input = document.querySelector('#input');


input.addEventListener("input", () => {
    const inputValue = input.value.toLowerCase();
    const userList = document.querySelectorAll('.employee');

    let x = 0;

  const firstName = userData.map(data => data.name.first);
  const lastName = userData.map(data => data.name.last);

  for (let i =0; i < userList.length; i++) {
    if(firstName[i].indexOf(inputValue) === -1 && lastName[i].indexOf(inputValue) === -1) {
        userList[i].classList.add('hidden');
        x++;
    } else {
        userList[i].classList.remove('hidden');
    }
  }
});

    