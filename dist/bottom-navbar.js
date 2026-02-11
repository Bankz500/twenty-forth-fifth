// Reusable Bottom Navbar Script
// This script handles active state for the bottom navigation bar

(function() {
    // Function to set active navbar item based on current page
    function setActiveNavItem() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop().replace('.html', '') || 'dashboard';
        
        // Map page names to data attributes
        const pageMap = {
            'dashboard': 'dashboard',
            'deposit': 'deposit',
            'transfer': 'deposit', // Transfer uses deposit icon
            'debit-card': 'dashboard', // Debit Card page lives under dashboard
            'support': 'support',
            'profile': 'profile',
            'profile-2': 'profile',
            'security': 'profile' // Security is under profile
        };
        
        const activePage = pageMap[currentPage] || 'dashboard';
        
        // Reset all items
        document.querySelectorAll('.nav-item').forEach(item => {
            const icon = item.querySelector('div');
            const text = item.querySelector('span');
            if (icon) {
                icon.classList.remove('bg-gray-800', 'text-white');
                icon.classList.add('bg-white');
            }
            if (text) {
                text.classList.remove('text-gray-900', 'font-bold');
                text.classList.add('text-gray-700');
            }
        });
        
        // Set active item
        const activeItem = document.querySelector(`.nav-item[data-page="${activePage}"]`);
        if (!activeItem) {
            // Fallback: try to find by href
            const allItems = document.querySelectorAll('.nav-item');
            allItems.forEach(item => {
                if (item.href && item.href.includes(currentPage)) {
                    const icon = item.querySelector('div');
                    const text = item.querySelector('span');
                    if (icon) {
                        icon.classList.remove('bg-white');
                        icon.classList.add('bg-gray-800', 'text-white');
                    }
                    if (text) {
                        text.classList.remove('text-gray-700');
                        text.classList.add('text-gray-900', 'font-bold');
                    }
                }
            });
        } else {
            const icon = activeItem.querySelector('div');
            const text = activeItem.querySelector('span');
            if (icon) {
                icon.classList.remove('bg-white');
                icon.classList.add('bg-gray-800', 'text-white');
            }
            if (text) {
                text.classList.remove('text-gray-700');
                text.classList.add('text-gray-900', 'font-bold');
            }
        }
    }
    
    // Set active on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setActiveNavItem);
    } else {
        setActiveNavItem();
    }
    
    // Also set active on click
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // Reset all
            document.querySelectorAll('.nav-item').forEach(navItem => {
                const icon = navItem.querySelector('div');
                const text = navItem.querySelector('span');
                if (icon) {
                    icon.classList.remove('bg-gray-800', 'text-white');
                    icon.classList.add('bg-white');
                }
                if (text) {
                    text.classList.remove('text-gray-900', 'font-bold');
                    text.classList.add('text-gray-700');
                }
            });
            
            // Set clicked item as active
            const icon = this.querySelector('div');
            const text = this.querySelector('span');
            if (icon) {
                icon.classList.remove('bg-white');
                icon.classList.add('bg-gray-800', 'text-white');
            }
            if (text) {
                text.classList.remove('text-gray-700');
                text.classList.add('text-gray-900', 'font-bold');
            }
        });
    });
})();


