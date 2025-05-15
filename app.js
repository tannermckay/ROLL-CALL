function loadContacts() {
  return JSON.parse(localStorage.getItem('contacts') || '[]');
}

function saveContacts(list) {
  localStorage.setItem('contacts', JSON.stringify(list));
}

function render() {
  const list = loadContacts();
  const ul = document.getElementById('contacts');
  ul.innerHTML = '';
  list.forEach((c, i) => {
    const li = document.createElement('li');
    const last = c.lastCalled ? new Date(c.lastCalled) : new Date();
    const nextDate = new Date(last);
    nextDate.setDate(nextDate.getDate() + c.freq);
    li.innerHTML = \`
      <strong>\${c.name}</strong> (\${c.contact})<br>
      Every \${c.freq} days<br>
      Next call: \${nextDate.toLocaleDateString()}<br>
      <button onclick="markCalled(\${i})">Mark Called</button>
    \`;
    ul.appendChild(li);
  });
}

window.markCalled = function(i) {
  const list = loadContacts();
  list[i].lastCalled = new Date();
  saveContacts(list);
  render();
  alert('Call logged and invite would be sent (stub).');
};

document.getElementById('add').onclick = function() {
  const name = document.getElementById('name').value.trim();
  const contact = document.getElementById('contact').value.trim();
  const freq = parseInt(document.getElementById('freq').value, 10);
  if (!name || !contact || !freq) {
    return alert('Please fill all fields.');
  }
  const list = loadContacts();
  list.push({ name, contact, freq, lastCalled: null });
  saveContacts(list);
  render();
  document.getElementById('name').value = '';
  document.getElementById('contact').value = '';
  document.getElementById('freq').value = '';
};

render();
