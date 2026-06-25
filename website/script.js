// script.js - Frontend Controller for High-End Portfolio SPA

let isUnlocked = false; // Track lock state of Personal tab
let activeTab = 'home';

// Page content mapping for global search
const searchDatabase = [
  { term: 'home', title: 'Home - Welcome Page', tab: 'home', action: null },
  { term: 'welcome', title: 'Home - Welcome Page', tab: 'home', action: null },
  { term: 'about', title: 'About - My Journey', tab: 'about', action: null },
  { term: 'who i am', title: 'About - My Journey', tab: 'about', action: null },
  { term: 'education', title: 'About - My Journey', tab: 'about', action: null },
  { term: 'college', title: 'About - My Journey', tab: 'about', action: null },
  { term: 'projects', title: 'Projects - Portfolio', tab: 'projects', action: null },
  { term: 'portfolio', title: 'Projects - Portfolio', tab: 'projects', action: null },

  { term: 'internships', title: 'Personal - Work Experience', tab: 'personal', action: null },
  { term: 'work', title: 'Personal - Work Experience', tab: 'personal', action: null },
  { term: 'experience', title: 'Personal - Work Experience', tab: 'personal', action: null },
  { term: 'skills', title: 'Personal - Technical Skills', tab: 'personal', action: null },
  { term: 'contact', title: 'Personal - Get in Touch', tab: 'personal', action: 'contact' },
  { term: 'email', title: 'Personal - Get in Touch', tab: 'personal', action: 'contact' }
];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu setup
  const menuIcon = document.getElementById('menu-icon');
  const menu = document.getElementById('menu');

  menuIcon.addEventListener('click', () => {
    menu.classList.toggle('active');
    if (menu.classList.contains('active')) {
      menuIcon.innerHTML = '&times;'; // Change to close icon
    } else {
      menuIcon.innerHTML = '&#9776;'; // Change back to hamburger
    }
  });

  // Restore unlocked session if it exists
  if (sessionStorage.getItem('portfolioUnlocked') === 'true') {
    isUnlocked = true;
    document.getElementById('password-gate').style.display = 'none';
    document.getElementById('personal-content').style.display = 'block';
  }

  // Set up global search listener for Enter key
  document.getElementById('searchInput').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      globalSearch();
    } else {
      showRealtimeSearchResults();
    }
  });

  // Close search results dropdown on clicking outside
  document.addEventListener('click', (e) => {
    const searchResults = document.getElementById('searchResults');
    const navSearch = document.querySelector('.nav-search');
    if (!navSearch.contains(e.target)) {
      searchResults.style.display = 'none';
    }
  });


});

// Dynamic Tab Switching with smooth scrolling/fade transitions
function switchTab(tabId) {
  // Update state
  activeTab = tabId;

  // Toggle active tab sections
  const sections = document.querySelectorAll('.tab-section');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');

  // Toggle active class on nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-tab') === tabId) {
      link.classList.add('active');
    }
  });

  // Check lock on personal portal
  if (tabId === 'personal') {
    if (isUnlocked) {
      document.getElementById('password-gate').style.display = 'none';
      document.getElementById('personal-content').style.display = 'block';
      animateSkillBars();
    } else {
      document.getElementById('password-gate').style.display = 'flex';
      document.getElementById('personal-content').style.display = 'none';
    }
  }

  // Scroll to top of window smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Reset mobile drawer
  const menu = document.getElementById('menu');
  const menuIcon = document.getElementById('menu-icon');
  menu.classList.remove('active');
  menuIcon.innerHTML = '&#9776;';
}

// Password verification gate
function checkPassword() {
  const passwordInput = document.getElementById('passwordInput');
  const errorContainer = document.getElementById('errorContainer');
  const lockContainer = document.getElementById('password-gate');

  // Clear errors
  errorContainer.style.display = 'none';

  if (passwordInput.value === '12345') {
    isUnlocked = true;
    sessionStorage.setItem('portfolioUnlocked', 'true');

    // Fade out lock screen, reveal contents
    lockContainer.style.display = 'none';
    document.getElementById('personal-content').style.display = 'block';

    // Animate competencies progress bars
    animateSkillBars();
  } else {
    // Shake animation
    lockContainer.classList.add('shake');
    errorContainer.style.display = 'block';
    passwordInput.value = '';

    setTimeout(() => {
      lockContainer.classList.remove('shake');
    }, 400);
  }
}

// Skill bars progress load animation
function animateSkillBars() {
  const fills = document.querySelectorAll('.skill-bar-fill');
  fills.forEach(fill => {
    const percent = fill.getAttribute('data-percent');
    // Set width after a tiny layout pause
    setTimeout(() => {
      fill.style.width = percent;
    }, 100);
  });
}

// Search utility (Realtime Dropdown)
function showRealtimeSearchResults() {
  const input = document.getElementById('searchInput').value.trim().toLowerCase();
  const dropdown = document.getElementById('searchResults');
  dropdown.innerHTML = '';

  if (input.length === 0) {
    dropdown.style.display = 'none';
    return;
  }

  const matches = searchDatabase.filter(item => item.term.includes(input));

  if (matches.length === 0) {
    const emptyMsg = document.createElement('div');
    emptyMsg.className = 'search-result-item';
    emptyMsg.innerText = 'No matches found.';
    dropdown.appendChild(emptyMsg);
  } else {
    // Remove duplicates by tab + action
    const uniqueMatches = [];
    const seen = new Set();
    
    matches.forEach(item => {
      const key = `${item.tab}-${item.action}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueMatches.push(item);
      }
    });

    uniqueMatches.slice(0, 5).forEach(match => {
      const row = document.createElement('div');
      row.className = 'search-result-item';
      row.innerText = match.title;
      row.onclick = () => {
        dropdown.style.display = 'none';
        document.getElementById('searchInput').value = '';
        executeSearchAction(match);
      };
      dropdown.appendChild(row);
    });
  }

  dropdown.style.display = 'block';
}

// Executing search redirect options
function executeSearchAction(match) {
  switchTab(match.tab);
  
  if (match.action === 'widget') {
    setTimeout(scrollToWidget, 400);
  } else if (match.action === 'contact') {
    setTimeout(() => {
      if (isUnlocked) {
        document.querySelector('.contact-section-wrapper').scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  }
}

// Search fallback for button click/Enter key
function globalSearch() {
  const input = document.getElementById('searchInput').value.trim().toLowerCase();
  document.getElementById('searchResults').style.display = 'none';

  if (input.length === 0) return;

  const match = searchDatabase.find(item => item.term.includes(input));
  if (match) {
    document.getElementById('searchInput').value = '';
    executeSearchAction(match);
  } else {
    showToast(`No matches found for "${input}"`, 'error');
  }
}



// Filter projects showcase category
function filterProjects(category) {
  // Toggle filter buttons active state
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-filter') === category) {
      btn.classList.add('active');
    }
  });

  // Filter project cards
  const cards = document.querySelectorAll('.projects-grid .project-card');
  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}



// Show premium custom toast notifications
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  
  if (type === 'success') {
    toast.style.borderColor = 'rgba(190, 95, 45, 0.4)'; // Cyan border
  } else {
    toast.style.borderColor = 'rgba(263, 90, 60, 0.4)'; // Pink/Accent border
  }

  const iconClass = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
  
  toast.innerHTML = `
    <div class="toast-icon" style="color: ${type === 'success' ? 'hsl(var(--secondary))' : 'hsl(var(--accent))'}">
      <i class="${iconClass}"></i>
    </div>
    <div class="toast-message">${message}</div>
    <button class="toast-close">&times;</button>
  `;

  container.appendChild(toast);

  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  });

  setTimeout(() => {
    if (toast.parentNode) {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
}

// Handle contact form submission
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('input[type="text"]').value;
  
  showToast(`Thank you, ${name}! Your message has been sent successfully.`);
  form.reset();
}


