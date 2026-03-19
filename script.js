document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('#navbar');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = document.querySelectorAll('.nav-link.has-submenu');
    const menuText = hamburger.querySelector('.menu-text');
    const menuIcon = hamburger.querySelector('i');
    const menuTriggers = document.querySelectorAll('.menu-trigger');
    const navItems = document.querySelector('.nav-items');
    const sliders = document.querySelectorAll('.slider');
    const searchTrigger = document.querySelector('.search-trigger');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    const closeSearch = document.querySelector('.close-search');
    const searchResults = document.querySelector('.search-results');
    
    // Function to open menu and trigger specific item
    function setMenuButtonState(isOpen) {
        if (isOpen) {
            menuText.textContent = 'Close';
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
            hamburger.classList.add('is-open');
        } else {
            menuText.textContent = 'Menu';
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            hamburger.classList.remove('is-open');
        }
    }

    function openMenuAndTriggerItem(itemName) {
        // First open the navbar
        navbar.classList.add('active');
        setMenuButtonState(true);
        
        // Find and trigger the corresponding menu item
        menuItems.forEach(item => {
            const itemText = item.querySelector('.nav-text').textContent.trim();
            if (itemText === itemName) {
                // Remove active class from all items
                document.querySelectorAll('.nav-item.active').forEach(active => {
                    active.classList.remove('active');
                });
                
                // Add active class to parent
                const parent = item.parentElement;
                parent.classList.add('active');
                
                // Add has-active class to nav-items
                navItems.classList.add('has-active');
            }
        });
    }
    
    // Service card click handlers
    menuTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const menuItem = this.getAttribute('data-menu-item');
            openMenuAndTriggerItem(menuItem);
        });
    });
    
    // Hamburger menu click
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        navbar.classList.toggle('active');
        setMenuButtonState(navbar.classList.contains('active'));
    });
    
    // Close button click
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navbar.classList.remove('active');
        setMenuButtonState(false);
        // Remove active states
        document.querySelectorAll('.nav-item.active').forEach(item => {
            item.classList.remove('active');
        });
        navItems.classList.remove('has-active');
    });
    
    // Menu item click handlers
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const parent = this.parentElement;
            
            // Remove active class from all items
            document.querySelectorAll('.nav-item.active').forEach(active => {
                if (active !== parent) {
                    active.classList.remove('active');
                }
            });
            
            // Toggle current item
            parent.classList.toggle('active');
            
            // Toggle has-active class
            if (document.querySelector('.nav-item.active')) {
                navItems.classList.add('has-active');
            } else {
                navItems.classList.remove('has-active');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
            navbar.classList.remove('active');
            setMenuButtonState(false);
            document.querySelectorAll('.nav-item.active').forEach(item => {
                item.classList.remove('active');
            });
            navItems.classList.remove('has-active');
        }
    });
    
    // Slider functionality
    function scrollLeft(sliderId) {
        const slider = document.getElementById(sliderId);
        slider.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    }

    function scrollRight(sliderId) {
        const slider = document.getElementById(sliderId);
        slider.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    }

    // Add event listeners after DOM is loaded
    const leftButtons = document.querySelectorAll('.slider-btn.left');
    const rightButtons = document.querySelectorAll('.slider-btn.right');

    leftButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sliderId = this.parentElement.querySelector('.slider').id;
            scrollLeft(sliderId);
        });
    });

    rightButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sliderId = this.parentElement.querySelector('.slider').id;
            scrollRight(sliderId);
        });
    });

    let lastScrollTop = 0;
    const logo = document.querySelector('.fixed-logo');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            logo.style.opacity = '0';
        } else {
            // Scrolling up
            logo.style.opacity = '1';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });

    // ============================================
    // COURSE DATABASE — single source of truth
    // ============================================
    const courses = [
        // -------- Semester 1 --------
        { sem: 1, name: 'AEM-1 (Mathematics)', aliases: ['aem1', 'maths', 'calculus', 'applied engineering mathematics'],
          lecture: './sem1/lecture.html#aem1', solutions: './sem1/solutions.html#aem1-solutions', pyqs: './sem1/pyqs.html#aem1-pyqs' },
        { sem: 1, name: 'Physics', aliases: ['engineering physics'],
          lecture: './sem1/lecture.html#physics', solutions: './sem1/solutions.html#physics-solutions', pyqs: './sem1/pyqs.html#physics-pyqs' },
        { sem: 1, name: 'Programming in C', aliases: ['c programming', 'c language', 'c'],
          lecture: './sem1/lecture.html#c-programming', solutions: './sem1/solutions.html#c-solutions', pyqs: './sem1/pyqs.html#c-pyqs' },
        { sem: 1, name: 'Linux', aliases: ['linux os', 'unix'],
          lecture: './sem1/lecture.html#linux', solutions: './sem1/solutions.html#linux-solutions', pyqs: null },
        { sem: 1, name: 'Problem Solving', aliases: ['ps'],
          lecture: './sem1/lecture.html#problem-solving', solutions: './sem1/solutions.html#problem-solving-solutions', pyqs: null },
        { sem: 1, name: 'EVS', aliases: ['environmental studies', 'environment'],
          lecture: './sem1/lecture.html#evs', solutions: './sem1/solutions.html#evs-solutions', pyqs: null },
        { sem: 1, name: 'Managing Self', aliases: ['self management'],
          lecture: null, solutions: null, pyqs: './sem1/pyqs.html#managing-self' },

        // -------- Semester 2 --------
        { sem: 2, name: 'AEM-2 (Mathematics)', aliases: ['aem2', 'maths 2', 'applied engineering mathematics 2'],
          lecture: './sem2/lecture.html#aem2', solutions: './sem2/solutions.html#aem2-solutions', pyqs: './sem2/pyqs.html#aem2-solutions' },
        { sem: 2, name: 'Physics', aliases: ['engineering physics', 'physics theory', 'physics lab'],
          lecture: './sem2/lecture.html#physics-theory', solutions: './sem2/solutions.html#physics-solutions', pyqs: './sem2/pyqs.html#physics-solutions' },
        { sem: 2, name: 'Digital Electronics', aliases: ['de', 'digital logic'],
          lecture: './sem2/lecture.html#de', solutions: './sem2/solutions.html#de-solutions', pyqs: './sem2/pyqs.html#de-solutions' },
        { sem: 2, name: 'Computer Organisation & Architecture', aliases: ['coa', 'computer architecture'],
          lecture: './sem2/lecture.html#coa', solutions: './sem2/solutions.html#coa-solutions', pyqs: './sem2/pyqs.html#coa-solutions' },
        { sem: 2, name: 'Data Structures & Algorithms', aliases: ['dsa', 'data structures', 'algorithms'],
          lecture: './sem2/lecture.html#ds', solutions: './sem2/solutions.html#ds-solutions', pyqs: null },
        { sem: 2, name: 'Python Programming', aliases: ['python', 'python lab'],
          lecture: './sem2/lecture.html#python', solutions: './sem2/solutions.html#python-solutions', pyqs: null },
        { sem: 2, name: 'Time Management & Priority Setting', aliases: ['tmps', 'time management'],
          lecture: './sem2/lecture.html#tmps', solutions: './sem2/solutions.html#tmps-solutions', pyqs: null },
        { sem: 2, name: 'EVS Living Lab', aliases: ['evs lab', 'environmental studies lab'],
          lecture: './sem2/lecture.html#evs-lab', solutions: './sem2/solutions.html#evs-lab-solutions', pyqs: null },

        // -------- Semester 3 --------
        { sem: 3, name: 'Discrete Mathematical Structures', aliases: ['dms', 'discrete maths', 'discreet mathematical structures'],
          lecture: './sem3/lecture.html#aem2', solutions: './sem3/solutions.html#aem2-solutions', pyqs: './sem3/pyqs.html#aem2-solutions' },
        { sem: 3, name: 'Operating Systems', aliases: ['os'],
          lecture: './sem3/lecture.html#physics-theory', solutions: './sem3/solutions.html#physics-solutions', pyqs: './sem3/pyqs.html#physics-solutions' },
        { sem: 3, name: 'Elements of AIML', aliases: ['aiml', 'ai', 'machine learning', 'artificial intelligence'],
          lecture: './sem3/lecture.html#de', solutions: './sem3/solutions.html#de-solutions', pyqs: './sem3/pyqs.html#de-solutions' },
        { sem: 3, name: 'Database Management Systems', aliases: ['dbms', 'database', 'sql'],
          lecture: './sem3/lecture.html#coa', solutions: './sem3/solutions.html#coa-solutions', pyqs: './sem3/pyqs.html#coa-solutions' },
        { sem: 3, name: 'Design & Analysis of Algorithms', aliases: ['daa', 'algorithms'],
          lecture: './sem3/lecture.html#python', solutions: './sem3/solutions.html#dsa-solutions', pyqs: './sem3/pyqs.html#daa-solutions' },

        // -------- Semester 4 --------
        { sem: 4, name: 'Object Oriented Programming', aliases: ['oop', 'oops', 'java', 'object oriented'],
          lecture: './sem4/lecture.html#python', solutions: './sem4/solutions.html#dsa-solutions', pyqs: './sem4/pyqs.html#daa-solutions' },
        { sem: 4, name: 'Linear Algebra', aliases: ['la', 'matrices', 'linear algebra maths'],
          lecture: './sem4/lecture.html#aem2', solutions: './sem4/solutions.html#aem2-solutions', pyqs: './sem4/pyqs.html#aem2-solutions' },
        { sem: 4, name: 'Software Engineering', aliases: ['se', 'software dev'],
          lecture: './sem4/lecture.html#coa', solutions: './sem4/solutions.html#coa-solutions', pyqs: './sem4/pyqs.html#coa-solutions' },
        { sem: 4, name: 'Data Communication & Networks', aliases: ['dcn', 'networking', 'data communication and networks', 'computer networks'],
          lecture: './sem4/lecture.html#de', solutions: './sem4/solutions.html#de-solutions', pyqs: './sem4/pyqs.html#de-solutions' },
        { sem: 4, name: 'Information Technology & Cyber Security', aliases: ['itcs', 'cyber security', 'it security', 'information technology and cyber security'],
          lecture: './sem4/lecture.html#phys-theory', solutions: './sem4/solutions.html#physics-solutions', pyqs: './sem4/pyqs.html#physics-solutions' },
        { sem: 4, name: 'Cloud Computing', aliases: ['cloud', 'aws', 'azure'],
          lecture: './sem4/lecture.html#cloud', solutions: null, pyqs: './sem4/pyqs.html#physi-solutions' },
        { sem: 4, name: 'AIML', aliases: ['ai ml', 'artificial intelligence machine learning'],
          lecture: null, solutions: null, pyqs: './sem4/pyqs.html#aiml-solutions' },
        { sem: 4, name: 'Data Science', aliases: ['ds', 'data analytics'],
          lecture: null, solutions: null, pyqs: './sem4/pyqs.html#ds-solutions' },
    ];

    // Also include the About page
    const aboutEntry = { title: 'About UniCheatSheet', description: 'Learn about the team behind UniCheatSheet', url: './about.html' };

    // ============================================
    // SEARCH UI
    // ============================================
    if (searchTrigger) {
        searchTrigger.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            searchInput.focus();
            // Show all courses grouped by semester when first opening
            if (!searchInput.value.trim()) {
                showAllCourses();
            }
        });
    }

    if (closeSearch) {
        closeSearch.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '';
        });
    }

    // Close search on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });

    // Show all courses grouped by semester (default view)
    function showAllCourses() {
        const semesters = [1, 2, 3, 4];
        let html = '';
        semesters.forEach(sem => {
            const semCourses = courses.filter(c => c.sem === sem);
            html += `<div class="search-semester-group">
                <h3 class="search-sem-heading">Semester ${sem}</h3>
                <div class="search-course-list">
                    ${semCourses.map(c => renderCourseCard(c)).join('')}
                </div>
            </div>`;
        });
        searchResults.innerHTML = html;
        attachCardListeners();
    }

    // Render a single course card — expandable
    function renderCourseCard(course) {
        const links = [];
        if (course.lecture)   links.push(`<a href="${course.lecture}" class="search-link link-lecture"><span class="search-link-icon">📖</span><span class="search-link-label">Lecture Notes</span><span class="search-link-arrow">›</span></a>`);
        if (course.solutions) links.push(`<a href="${course.solutions}" class="search-link link-solutions"><span class="search-link-icon">✏️</span><span class="search-link-label">Solutions</span><span class="search-link-arrow">›</span></a>`);
        if (course.pyqs)      links.push(`<a href="${course.pyqs}" class="search-link link-pyqs"><span class="search-link-icon">📝</span><span class="search-link-label">PYQs</span><span class="search-link-arrow">›</span></a>`);
        return `<div class="search-course-card">
            <div class="search-card-header" role="button" tabindex="0">
                <div class="search-course-name">${course.name}</div>
                <span class="search-sem-badge">Sem ${course.sem}</span>
                <span class="search-card-chevron">▾</span>
            </div>
            <div class="search-card-body">${links.join('')}</div>
        </div>`;
    }

    // Attach expand/collapse listeners via event delegation
    function attachCardListeners() {
        searchResults.querySelectorAll('.search-card-header').forEach(header => {
            header.addEventListener('click', function(e) {
                e.preventDefault();
                const card = this.closest('.search-course-card');
                const wasOpen = card.classList.contains('expanded');
                // Close all other cards
                searchResults.querySelectorAll('.search-course-card.expanded').forEach(c => {
                    c.classList.remove('expanded');
                });
                // Toggle this card
                if (!wasOpen) {
                    card.classList.add('expanded');
                }
            });
        });
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            const query = searchInput.value.trim().toLowerCase();
            if (!query) {
                showAllCourses();
                return;
            }
            // Filter courses by name or aliases
            const filtered = courses.filter(c => {
                if (c.name.toLowerCase().includes(query)) return true;
                if (c.aliases && c.aliases.some(a => a.includes(query))) return true;
                return false;
            });
            // Also check about page
            const aboutMatch = 'about'.includes(query) || 'unicheatsheet'.includes(query) || 'team'.includes(query);
            displayCourseResults(filtered, aboutMatch);
        }, 200));
    }

    function displayCourseResults(filtered, showAbout) {
        if (!filtered.length && !showAbout) {
            searchResults.innerHTML = `<div class="search-no-results">
                <p>😕 No courses found</p>
                <span>Try searching by course name, abbreviation, or semester</span>
            </div>`;
            return;
        }
        let html = '';
        if (filtered.length) {
            html += `<div class="search-course-list">
                ${filtered.map(c => renderCourseCard(c)).join('')}
            </div>`;
        }
        if (showAbout) {
            html += `<div class="search-course-card expanded">
                <div class="search-card-header" role="button" tabindex="0">
                    <div class="search-course-name">About UniCheatSheet</div>
                    <span class="search-card-chevron">▾</span>
                </div>
                <div class="search-card-body">
                    <a href="./about.html" class="search-link link-lecture"><span class="search-link-icon">🏠</span><span class="search-link-label">Visit About Page</span><span class="search-link-arrow">›</span></a>
                </div>
            </div>`;
        }
        searchResults.innerHTML = html;
        attachCardListeners();
    }

    // Debounce helper function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Initialize quotes
    displayQuote();
    setupMidnightCheck();

    // Store initial quote date
    localStorage.setItem('lastQuoteDate', new Date().toDateString());
});
