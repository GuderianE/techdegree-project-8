const randomUserUrl = 'https://randomuser.me/api/?results=12';
const employee = document.querySelector('.employee');
const userList = document.querySelector('#user-list');

const fetchRequest = async (url) => {
    try {
    const userResponse = await fetch(url);
    return await userResponse.json();
    } catch (error) {
        throw error;
    }
};

function createHTML (data) {
    const liElement = document.createElement('li');
    for (let i = 0; i < data.length; i++) {
        userList.appendChild(liElement);
        liElement.innerHTML = `
          <div class="profileImage">  
          <img src=${data[i].picture.thumbnail}>
          </div>
          <div class="userData">
          <h2>${data[i].name.first} ${data[i].name.last}</h2>
          <p>${data[i].email}</p>
          <p>${data[i].location.city}</p>
          </div>
        `;
    }
}

const userData = fetchRequest(randomUserUrl);
createHTML(userData);
console.log(createHTML(userData));