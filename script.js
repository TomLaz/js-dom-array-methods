const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const duplicateFollowersBtn = document.getElementById("duplicate-followers");
const showMillionFollowersBtn = document.getElementById("show-million-followers");
const sortBtn = document.getElementById("sort");
const calculateFollowersBtn = document.getElementById("calculate-followers");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add followers
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];
    console.log( user );

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        followers: Math.floor(Math.random() * 1000000),
        img: user.picture.medium,
        username: user.login.username
    }

    addData(newUser);
}

// Duplicate followers
function duplicateFollowers() {
    data = data.map((user) => {
        return {...user, followers: user.followers * 2};
    });

    updateDOM();
}

// Sort users by followers
function sortByFollowers() {
    data.sort((a, b) => b.followers - a.followers);

    updateDOM();
}

// Filter only +1 million followers
function showMillionFollowers() {
    data = data.filter(item => {
        return item.followers > 1000000;
    });

    updateDOM();
}

// Calculate the total followers
function calculateFollowers() {
    const totalFollowers = data.reduce((acc, user) => (acc + user.followers), 0);
    const totalFollowersEl = document.createElement("div");
    const followersTitle = `<h3>Total Followers: <strong>${formatMoney(totalFollowers)}</strong></h3>`;
    totalFollowersEl.innerHTML = `<div class="total">${followersTitle}</div>`;
    main.appendChild(totalFollowersEl);
}

// Add new obj to data arr
function addData(obj){
    data.push(obj);

    updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
    // Clear main div
    main.innerHTML = "";

    providedData.forEach(item => {
        const element = document.createElement("div");
        element.classList.add("person");
        const img = `<img src="${item.img}" />`;
        const name = `<div class='name'>${item.name}</div>`;
        const username = `<div class='username'>${item.username}</div>`;
        const userBox = `<div class='user-box'>${name}${username}</div>`;
        element.innerHTML += `<div class='wrapper'>${img}${userBox}</div>`;
        const followersCount = `<div>${formatMoney(item.followers)}</div>`;
        const followers = "<div class='followers'>Followers</div>";
        element.innerHTML += `<div class='followers-box'>${followersCount}${followers}</div>`;
        main.appendChild(element);
    });
}

// Format number as money
function formatMoney(number) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// Event listeners
addUserBtn.addEventListener("click", getRandomUser);
duplicateFollowersBtn.addEventListener("click", duplicateFollowers);
sortBtn.addEventListener("click", sortByFollowers);
showMillionFollowersBtn.addEventListener("click", showMillionFollowers);
calculateFollowersBtn.addEventListener("click", calculateFollowers);