// app.js - simple logic for Azure auth built-in endpoints
document.addEventListener('DOMContentLoaded', async () => {
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const signedIn = document.getElementById('signed-in');
  const notSignedIn = document.getElementById('not-signed-in');
  const welcome = document.getElementById('welcome');

  loginBtn.onclick = () => {
    // Static Web Apps / App Service built-in login endpoint for Azure AD
    // This will redirect to Azure sign-in
    window.location.href = '/.auth/login/aad';
  };

  logoutBtn.onclick = () => {
    window.location.href = '/.auth/logout';
  };

  // Check .auth/me to see if user is signed in (works for Static Web Apps and App Service Easy Auth)
  try {
    const r = await fetch('/.auth/me');
    if (r.ok) {
      const me = await r.json();
      if (Array.isArray(me) && me.length > 0) {
        const user = me[0];
        const name = (user && user.user_claims && user.user_claims.find(c=>c.typ==='name')) ?
                     user.user_claims.find(c=>c.typ==='name').val : (user && user.user_id) || 'User';
        welcome.textContent = `Hello, ${name}`;
        signedIn.style.display = 'block';
        notSignedIn.style.display = 'none';
      } else {
        // not signed in
        signedIn.style.display = 'none';
        notSignedIn.style.display = 'block';
      }
    } else {
      signedIn.style.display = 'none';
      notSignedIn.style.display = 'block';
    }
  } catch (e) {
    // network or endpoint not available (before deploy)
    signedIn.style.display = 'none';
    notSignedIn.style.display = 'block';
  }
});
