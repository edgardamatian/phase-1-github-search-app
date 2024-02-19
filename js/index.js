const githubContainer = document.querySelector('#github-container');
const form = document.querySelector('#github-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  fetch(`https://api.github.com/search/users?q=${form.children[0].value}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      displayUsers(data);
    });
});

function displayUsers(data) {
    const userList = document.querySelector('#user-list');
    userList.innerHTML = '';
  
    const userElements = data.items.map(user => {
      const listItem = document.createElement('li');
      listItem.innerHTML = user.login;
  
      const avatar = document.createElement('img');
      avatar.src = user.avatar_url;
  
      avatar.addEventListener('click', (event) => {
        getUserRepos(user.login); // Call getUserRepos with the username as an argument
      });
  
      const profileLink = document.createElement('a');
      profileLink.href = user.html_url;
      profileLink.textContent = user.login;
  
      const div = document.createElement('div');
      div.append(listItem, avatar, profileLink);
  
      return div;
    });
  
    userList.append(...userElements);
  }

function getUserRepos(listItem) {
  fetch(`https://api.github.com/users/${listItem}/repos`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const usernames = ['user1', 'user2', 'user3'];
    usernames.forEach(username => {
    getUserRepos(username);
});
    })
    .catch(error => {
      console.error('Error:', error);
    });
}