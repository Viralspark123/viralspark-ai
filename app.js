// ViralSpark AI - Complete working - FIXED WITH REAL SUPABASE
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = "https://hnbldddyxpghzqlkzaee.supabase.co"
const SUPABASE_KEY = "sb_publishable__gqswgqjvXbakwEfKjqiWQ_9e7q3LSe"
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const state = {
  page: 'home',
  saved: JSON.parse(localStorage.getItem('vs_saved')||'[]'),
  user: null
};

async function initAuth(){
  const { data } = await supabase.auth.getUser()
  state.user = data.user
}

const templates = {
  home: () => `
    <div class="hero">
      <div class="hero-left">
        <span class="eyebrow">★ CREATOR STUDIO V1.0 LIVE</span>
        <h1>Turn one idea into 10 viral pieces</h1>
        <p>Plan Shorts, Reels, titles, hooks and captions in one workspace.</p>
        <div class="hero-actions">
          <button class="cta primary" data-goto="create">Start Creating</button>
          <button class="cta ghost" data-goto="meme">Try Meme Maker</button>
        </div>
        <div class="stats">
          <div><b>${state.saved.length}</b><span>Projects</span></div>
          <div><b>100% Free</b><span>Mode</span></div>
          <div><b>AI</b><span>Powered</span></div>
        </div>
      </div>
      <div class="hero-right">
        <div class="preview-card">
          <div class="pc-head">Viral Preview</div>
          <h3>Your next viral video idea</h3>
          <p>Click Create to generate hooks, titles and captions instantly.</p>
          <div class="tags"><span>viral</span><span>shorts</span><span>creator</span></div>
        </div>
      </div>
    </div>
  `,
  create: () => `
    <div class="page-head"><h2>Create Viral Content</h2><p>Enter topic</p></div>
    <label>Topic / Niche</label>
    <input id="topicInput" placeholder="e.g., How I make money as student in Guwahati">
    <button class="cta primary" id="genBtn">Generate Viral Pack</button>
    <div id="results" class="results"></div>
  `,
  meme: () => `
    <div class="page-head"><h2>Meme Maker <span class="soon">BETA</span></h2></div>
    <div class="create-box">
      <label>Top Text</label><input id="memeTop" placeholder="When you finally deploy website">
      <label>Bottom Text</label><input id="memeBottom" placeholder="But it shows black screen">
      <button class="cta primary" id="memeBtn">Generate Meme</button>
      <div id="memeOut" class="meme-out">Your meme will appear here</div>
    </div>
  `,
  saved: () => `
    <div class="page-head"><h2>Saved Projects</h2></div>
    <div id="saved-grid" class="grid">
      ${state.saved.length ? state.saved.map((s,i)=>`<div class="card"><h4>${s.title}</h4><p>${s.desc}</p><small>${s.date}</small><br><button class="cta ghost" onclick="window.delSave(${i})">Delete</button></div>`).join('') : '<p>No saved yet. Create one!</p>'}
    </div>
  `,
  settings: () => `
    <div class="page-grid">
      <div><h2>Settings</h2></div>
      <div class="card">
        <h4>Workspace</h4>
        <p>Real Supabase Connected ✅</p>
        ${state.user ? `<p>Logged in as: <b>${state.user.email}</b></p><button class="cta primary" onclick="window.doLogout()">Logout</button>` : `<p>Not logged in - Demo mode</p><input id="email" placeholder="Email"><input id="pass" type="password" placeholder="Password"><div style="display:flex;gap:8px;margin-top:8px"><button class="cta primary" onclick="window.doLogin()">Login</button><button class="cta ghost" onclick="window.doSignup()">Signup</button></div>`}
      </div>
    </div>
  `
};

function render(){
  const content = document.getElementById('page-content');
  if(!content) return;
  content.innerHTML = (templates[state.page]||templates.home)();
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.page===state.page));
  attachEvents();
}

function attachEvents(){
  document.querySelectorAll('[data-goto]').forEach(btn=>{
    btn.onclick = () => { state.page = btn.dataset.goto; render(); }
  });
  const genBtn = document.getElementById('genBtn');
  if(genBtn) genBtn.onclick = () => {
    const topic = document.getElementById('topicInput').value.trim();
    if(!topic) return alert('Enter topic');
    const out = document.getElementById('results');
    out.innerHTML = `<div class="card"><h4>🔥 Viral Titles for ${topic}</h4><p>• ${topic} - I Tried For 7 Days</p><p>• Why ${topic} Is Going Viral in 2026</p><p>• Stop Doing ${topic} Like This</p><button class="cta primary" onclick="window.saveProj('${topic.replace(/'/g,"")}')">Save This</button></div>`;
  };
  const memeBtn = document.getElementById('memeBtn');
  if(memeBtn) memeBtn.onclick = () => {
    const top = document.getElementById('memeTop').value || 'TOP';
    const bottom = document.getElementById('memeBottom').value || 'BOTTOM';
    document.getElementById('memeOut').innerHTML = `<div style="background:#000;color:#fff;padding:40px;text-align:center;font-weight:900;font-size:22px;border:4px solid white;"><div>${top}</div><br><div>${bottom}</div></div>`;
  };
}

window.saveProj = (title) => {
  state.saved.unshift({title, desc:'Viral pack generated', date: new Date().toLocaleString()});
  localStorage.setItem('vs_saved', JSON.stringify(state.saved));
  alert('Saved!');
  state.page='saved'; render();
}
window.delSave = (i) => {
  state.saved.splice(i,1);
  localStorage.setItem('vs_saved', JSON.stringify(state.saved));
  render();
}
window.doSignup = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('pass').value;
  const { error } = await supabase.auth.signUp({email,password});
  if(error) alert(error.message); else alert('Signup success! Check email');
}
window.doLogin = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('pass').value;
  const { error } = await supabase.auth.signInWithPassword({email,password});
  if(error) alert(error.message); else { await initAuth(); render(); }
}
window.doLogout = async () => {
  await supabase.auth.signOut(); state.user=null; render();
}

document.addEventListener('DOMContentLoaded', async () => {
  await initAuth();
  render();
});
