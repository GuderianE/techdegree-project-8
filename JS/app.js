let userData = [];
const randomUserUrl = 'https://randomuser.me/api/?results=12';
// const employee = document.querySelector('.employee');
const userList = document.querySelector('#user-list');

const fetchRequest = async (url) => {
    try {
    const fetchUrl = await fetch(url);
    const response = await fetchUrl.json();
    const jsonObject = await Object.values(response.results);
    return await jsonObject;
    } catch(error) {
        throw error;
    }
};
console.log(fetchRequest(randomUserUrl));
function createHTML (data) {
    userData = data;
    const liElement = document.createElement('li');
    const promises = userData.results.forEach(async data => {
        userList.classList.appendChild(liElement);
        liElement.innerHTML = `
          <div class="wrapper">  
          <img class="profileImage" src="${data.picture.thumbnail}">
          <div class="userData">
          <h2>${data.name.first} ${data.name.last}</h2>
          <p>${data.email}</p>
          <p>${data.location.city}</p>
          </div>
          </div>
        `;
        li = liElement.innerHTML;
        li.className = "employee";
    });
    return Promises.all(promises);
}

const randomUser = fetchRequest(randomUserUrl);

createHTML(randomUser);

