const apiUrl = 'http://localhost:5000/users';
const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

let editingUserId = null;

async function fetchUsers() {
  const response = await fetch(apiUrl);
  const users = await response.json();
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${user.name} - ${user.email} - ${user.dob}
      <button onclick="editUser(${user.id})">Edit</button>
      <button onclick="deleteUser(${user.id})">Delete</button>
    `;
    userList.appendChild(li);
  });
}

userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const dob = document.getElementById('dob').value;

  const method = editingUserId ? 'PUT' : 'POST';
  const url = editingUserId ? `${apiUrl}/${editingUserId}` : apiUrl;

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, dob })
  });

  editingUserId = null;
  userForm.reset();
  fetchUsers();
});

async function editUser(id) {
  const response = await fetch(`${apiUrl}/${id}`);
  const user = await response.json();
  document.getElementById('name').value = user.name;
  document.getElementById('email').value = user.email;
  document.getElementById('dob').value = user.dob;
  editingUserId = id;
}

async function deleteUser(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchUsers();
}

fetchUsers();
