

const USERS_KEY = 'spk_users_db';
const SESSION_KEY = 'spk_active_session';

if (!localStorage.getItem(USERS_KEY)) {
  localStorage.setItem(USERS_KEY, JSON.stringify({}));
}

const auth = {
  getUsers: function() {
    return JSON.parse(localStorage.getItem(USERS_KEY));
  },
  
  saveUsers: function(usersObj) {
    localStorage.setItem(USERS_KEY, JSON.stringify(usersObj));
  },
  
  register: function(username, password, fullName, track) {
    const users = this.getUsers();
    if (users[username]) {
      return { success: false, message: 'Username sudah terdaftar.' };
    }
    
    users[username] = {
      username,
      password, // Note: In a real app, NEVER store plain text passwords. This is a client-side mockup.
      fullName,
      track,
      history: [],
      draftGrades: {}
    };
    
    this.saveUsers(users);
    this.login(username, password);
    return { success: true, message: 'Registrasi berhasil!' };
  },
  
  login: function(username, password) {
    const users = this.getUsers();
    const user = users[username];
    
    if (user && user.password === password) {
      localStorage.setItem(SESSION_KEY, username);
      return { success: true, user: user };
    }
    return { success: false, message: 'Username atau password salah.' };
  },
  
  logout: function() {
    localStorage.removeItem(SESSION_KEY);
  },
  
  getCurrentUser: function() {
    const username = localStorage.getItem(SESSION_KEY);
    if (!username) return null;
    
    const users = this.getUsers();
    return users[username] || null;
  },
  
  saveHistory: function(assessmentData) {
    const user = this.getCurrentUser();
    if (!user) return false;

    assessmentData.timestamp = new Date().toISOString();
    
    const users = this.getUsers();
    users[user.username].history.unshift(assessmentData); // prepend latest

    users[user.username].draftGrades = assessmentData.rawGrades || {};
    
    this.saveUsers(users);
    return true;
  },
  
  saveDraft: function(gradesObj) {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    const users = this.getUsers();
    users[user.username].draftGrades = gradesObj;
    this.saveUsers(users);
    return true;
  },
  
  getDraft: function() {
    const user = this.getCurrentUser();
    return user ? user.draftGrades : null;
  }
};

function handleLogout() {
  auth.logout();
  updateNavbarState();

  window.location.href = 'index.html';
}

function updateNavbarState() {
  const user = auth.getCurrentUser();
  const ctaDesktop = document.getElementById('nav-cta-desktop');
  
  if (!ctaDesktop) return;

  if (user) {
    ctaDesktop.innerHTML = `
      <span style="font-size:0.9rem; font-weight:600; margin-right:16px;">Hai, ${user.fullName.split(' ')[0]}</span>
      <a href="profile.html" class="btn-ghost" style="margin-right:12px;">Profil</a>
      <a href="app.html" class="btn-primary">Lanjut Asesmen</a>
    `;
  } else {
    ctaDesktop.innerHTML = `
      <a href="auth.html" class="btn-ghost" style="margin-right:12px;">Login</a>
      <a href="auth.html" class="btn-primary">Mulai Asesmen</a>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateNavbarState();
});

