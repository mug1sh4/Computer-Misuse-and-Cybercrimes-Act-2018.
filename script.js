// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(!el) return;
    el.scrollIntoView({behavior:'smooth', block:'start'});
    // close mobile nav if open
    const navList = document.querySelector('.nav-list');
    if(navList.classList.contains('show')) navList.classList.remove('show');
  });
});

// Toggle subsection content when header clicked
document.querySelectorAll('.subhead').forEach(h=>{
  h.setAttribute('aria-expanded','false');
  h.addEventListener('click', ()=>{
    const content = h.nextElementSibling;
    const isOpen = content && !content.classList.contains('collapsed');
    if(isOpen){
      content.classList.add('collapsed');
      h.setAttribute('aria-expanded','false');
    } else {
      content.classList.remove('collapsed');
      h.setAttribute('aria-expanded','true');
    }
  });
});

// Toggle "Collapse / Expand" for entire section
document.querySelectorAll('.toggle-all').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const section = btn.closest('.doc-section');
    if(!section) return;
    const contents = section.querySelectorAll('.content');
    // if first is collapsed -> expand all
    const firstCollapsed = contents.length && contents[0].classList.contains('collapsed');
    contents.forEach(c=>{
      if(firstCollapsed) c.classList.remove('collapsed');
      else c.classList.add('collapsed');
      const h = c.previousElementSibling;
      if(h && h.matches('.subhead')) h.setAttribute('aria-expanded', firstCollapsed ? 'true' : 'false');
    });
  });
});

// Back to top button
const btop = document.getElementById('back-to-top');
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 280) btop.style.display = 'block';
  else btop.style.display = 'none';
});
btop.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navList = document.querySelector('.nav-list');
navToggle.addEventListener('click', ()=> navList.classList.toggle('show'));

// Basic client-side search (title and subsection text)
const search = document.getElementById('search');
search.addEventListener('input', e=>{
  const q = e.target.value.trim().toLowerCase();
  document.querySelectorAll('.subsection').forEach(s=>{
    const title = s.getAttribute('data-title') || s.querySelector('.subhead')?.textContent || '';
    const bodyText = s.querySelector('.content')?.textContent || '';
    const hay = (title + ' ' + bodyText).toLowerCase();
    if(!q) {
      s.style.display = '';
    } else {
      s.style.display = hay.includes(q) ? '' : 'none';
    }
  });
});

// Accessibility: allow Enter/Space to toggle subheads
document.querySelectorAll('.subhead').forEach(h=>{
  h.addEventListener('keydown', (ev)=>{
    if(ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      h.click();
    }
  });
});
