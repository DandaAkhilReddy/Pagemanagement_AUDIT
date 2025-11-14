/**
 * Interactive Features for Billing Audit Documentation
 * Includes: Search, Expandable Sections, Data Filtering, Smooth Animations
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractiveFeatures();
});

function initializeInteractiveFeatures() {
    addSearchFunctionality();
    addExpandableSections();
    addTableFiltering();
    addSmoothScrolling();
    addPrintFunctionality();
    addThemeToggle();
    highlightCurrentPage();
}

/**
 * Search Functionality
 * Adds a search bar to filter content across the page
 */
function addSearchFunctionality() {
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <div class="search-wrapper">
            <input type="text" id="global-search" placeholder="Search documentation..." />
            <span class="search-icon">🔍</span>
            <span class="clear-search" style="display:none;">✕</span>
        </div>
        <div id="search-results" class="search-results"></div>
    `;

    // Insert after page header
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        pageHeader.after(searchContainer);

        const searchInput = document.getElementById('global-search');
        const clearBtn = searchContainer.querySelector('.clear-search');
        const resultsDiv = document.getElementById('search-results');

        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.trim();

            if (query.length > 0) {
                clearBtn.style.display = 'block';
                performSearch(query, resultsDiv);
            } else {
                clearBtn.style.display = 'none';
                resultsDiv.innerHTML = '';
                clearHighlights();
            }
        });

        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            resultsDiv.innerHTML = '';
            clearHighlights();
        });
    }
}

function performSearch(query, resultsDiv) {
    clearHighlights();

    const sections = document.querySelectorAll('section, .metric-card, .recommendation');
    let matches = [];

    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            matches.push(section);
            highlightText(section, query);
        }
    });

    if (matches.length > 0) {
        resultsDiv.innerHTML = `<p class="search-count">Found ${matches.length} result(s)</p>`;
        matches[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        resultsDiv.innerHTML = `<p class="search-count no-results">No results found</p>`;
    }
}

function highlightText(element, query) {
    element.classList.add('search-highlight');
}

function clearHighlights() {
    document.querySelectorAll('.search-highlight').forEach(el => {
        el.classList.remove('search-highlight');
    });
}

/**
 * Expandable Sections
 * Makes sections collapsible/expandable
 */
function addExpandableSections() {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const heading = section.querySelector('h2');
        if (heading) {
            heading.style.cursor = 'pointer';
            heading.innerHTML += ' <span class="toggle-icon">▼</span>';

            heading.addEventListener('click', function() {
                section.classList.toggle('collapsed');
                const icon = this.querySelector('.toggle-icon');
                icon.textContent = section.classList.contains('collapsed') ? '▶' : '▼';
            });
        }
    });
}

/**
 * Table Filtering
 * Add filter capability to tables
 */
function addTableFiltering() {
    const tables = document.querySelectorAll('table');

    tables.forEach(table => {
        const thead = table.querySelector('thead');
        if (thead) {
            const filterRow = document.createElement('tr');
            filterRow.className = 'filter-row';

            const headers = thead.querySelectorAll('th');
            headers.forEach((th, index) => {
                const filterCell = document.createElement('th');
                filterCell.innerHTML = `<input type="text" class="table-filter" data-column="${index}" placeholder="Filter...">`;
                filterRow.appendChild(filterCell);
            });

            thead.appendChild(filterRow);

            // Add filter event listeners
            filterRow.querySelectorAll('.table-filter').forEach(input => {
                input.addEventListener('input', function() {
                    filterTable(table, this.dataset.column, this.value);
                });
            });
        }
    });
}

function filterTable(table, columnIndex, query) {
    const rows = table.querySelectorAll('tbody tr');

    rows.forEach(row => {
        const cell = row.cells[columnIndex];
        if (cell) {
            const text = cell.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
}

/**
 * Smooth Scrolling for anchor links
 */
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Print Functionality
 * Add print button to page header
 */
function addPrintFunctionality() {
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        const printBtn = document.createElement('button');
        printBtn.className = 'btn-print';
        printBtn.innerHTML = '🖨️ Print Page';
        printBtn.onclick = () => window.print();
        pageHeader.appendChild(printBtn);
    }
}

/**
 * Theme Toggle (Light/Dark mode)
 */
function addThemeToggle() {
    const sidebar = document.querySelector('.sidebar .logo');
    if (sidebar) {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.title = 'Toggle Dark Mode';

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            this.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';

            // Save preference
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });

        sidebar.appendChild(themeToggle);

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '☀️';
        }
    }
}

/**
 * Highlight current page in navigation
 */
function highlightCurrentPage() {
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Back to Top Button
 */
(function addBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.title = 'Back to Top';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
})();

/**
 * Add loading animation
 */
(function addLoadingAnimation() {
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
})();
