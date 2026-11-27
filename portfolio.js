(() => {
    document.documentElement.classList.add('js');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    // Reveal content once as it enters the viewport.
    const revealItems = document.querySelectorAll('[data-reveal]');
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

        revealItems.forEach((item, index) => {
            item.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`);
            revealObserver.observe(item);
        });
    }

    // Keep the mobile menu and its accessibility state in sync.
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.primary-navigation');
    const navLinks = document.querySelectorAll('.nav-link');

    function closeNavigation() {
        if (!menuToggle || !navigation) return;
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
        navigation.classList.remove('is-open');
    }

    if (menuToggle && navigation) {
        menuToggle.addEventListener('click', () => {
            const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!isOpen));
            menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
            navigation.classList.toggle('is-open', !isOpen);
        });

        navLinks.forEach((link) => link.addEventListener('click', closeNavigation));
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeNavigation();
        });
        document.addEventListener('click', (event) => {
            if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) closeNavigation();
        });
    }

    // Highlight the section currently in view on the main portfolio page.
    const observedSections = document.querySelectorAll('main > section[id]');
    if (navLinks.length && observedSections.length && 'IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            const visible = entries.filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (!visible) return;

            const activeLink = [...navLinks].find((link) => {
                const href = link.getAttribute('href');
                return href === `#${visible.target.id}` || href === `index.html#${visible.target.id}`;
            });
            if (!activeLink) return;
            navLinks.forEach((link) => link.classList.toggle('is-active', link === activeLink));
        }, { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.1, 0.3, 0.6] });

        observedSections.forEach((section) => sectionObserver.observe(section));
    }

    // A single, frame-limited scroll update drives the slim page progress bar.
    const progressBar = document.getElementById('scroll-progress-bar');
    if (progressBar) {
        let progressFrame = 0;
        const updateProgress = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
            progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
            progressFrame = 0;
        };

        window.addEventListener('scroll', () => {
            if (progressFrame) return;
            progressFrame = window.requestAnimationFrame(updateProgress);
        }, { passive: true });
        window.addEventListener('resize', updateProgress, { passive: true });
        updateProgress();
    }

    // Rotate the professional role gently, and pause while hidden or motion is reduced.
    const roleText = document.getElementById('role-text');
    if (roleText) {
        const roles = ['AI/ML Developer', 'Computer Vision Enthusiast', 'Software Developer'];
        let roleIndex = 0;
        let roleTimer;
        let swapTimer;

        function clearRoleTimers() {
            window.clearTimeout(roleTimer);
            window.clearTimeout(swapTimer);
        }

        function scheduleRole() {
            window.clearTimeout(roleTimer);
            if (reducedMotion.matches || document.hidden) return;

            roleTimer = window.setTimeout(() => {
                roleText.classList.add('is-changing');
                swapTimer = window.setTimeout(() => {
                    roleIndex = (roleIndex + 1) % roles.length;
                    roleText.textContent = roles[roleIndex];
                    window.requestAnimationFrame(() => roleText.classList.remove('is-changing'));
                    scheduleRole();
                }, 220);
            }, 3800);
        }

        scheduleRole();
        document.addEventListener('visibilitychange', () => {
            clearRoleTimers();
            roleText.classList.remove('is-changing');
            if (!document.hidden) scheduleRole();
        });
        reducedMotion.addEventListener('change', () => {
            clearRoleTimers();
            roleText.classList.remove('is-changing');
            scheduleRole();
        });
    }

    // Pointer-driven composition and gentle button magnetism on fine pointers only.
    const hero = document.querySelector('.hero');
    if (hero && finePointer.matches && !reducedMotion.matches) {
        let pointerFrame = 0;
        let pointer = { x: 0, y: 0 };

        hero.addEventListener('pointermove', (event) => {
            pointer = { x: event.clientX, y: event.clientY };
            if (pointerFrame) return;

            pointerFrame = window.requestAnimationFrame(() => {
                pointerFrame = 0;
                const bounds = hero.getBoundingClientRect();
                const x = pointer.x - bounds.left;
                const y = pointer.y - bounds.top;
                const offsetX = x / bounds.width - 0.5;
                const offsetY = y / bounds.height - 0.5;
                hero.style.setProperty('--pointer-x', `${(x / bounds.width) * 100}%`);
                hero.style.setProperty('--pointer-y', `${(y / bounds.height) * 100}%`);
                hero.style.setProperty('--grid-x', `${offsetX * -7}px`);
                hero.style.setProperty('--grid-y', `${offsetY * -7}px`);
                hero.style.setProperty('--art-x', `${offsetX * 8}px`);
                hero.style.setProperty('--art-y', `${offsetY * 8}px`);
            });
        });

        hero.addEventListener('pointerleave', () => {
            if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
            pointerFrame = 0;
            ['--pointer-x', '--pointer-y', '--grid-x', '--grid-y', '--art-x', '--art-y']
                .forEach((property) => hero.style.removeProperty(property));
        });

        hero.querySelectorAll('[data-magnetic]').forEach((button) => {
            button.addEventListener('pointermove', (event) => {
                const bounds = button.getBoundingClientRect();
                const x = (event.clientX - bounds.left - bounds.width / 2) / bounds.width;
                const y = (event.clientY - bounds.top - bounds.height / 2) / bounds.height;
                button.style.setProperty('--magnetic-x', `${x * 6}px`);
                button.style.setProperty('--magnetic-y', `${y * 5}px`);
            });
            button.addEventListener('pointerleave', () => {
                button.style.removeProperty('--magnetic-x');
                button.style.removeProperty('--magnetic-y');
            });
        });
    }

    // Low-amplitude depth on skill and project panels, only for a fine pointer.
    if (finePointer.matches && !reducedMotion.matches) {
        document.querySelectorAll('[data-tilt]').forEach((card) => {
            card.addEventListener('pointermove', (event) => {
                const bounds = card.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                const y = (event.clientY - bounds.top) / bounds.height - 0.5;
                card.style.setProperty('--tilt-x', `${x * 4}deg`);
                card.style.setProperty('--tilt-y', `${y * -4}deg`);
            });
            card.addEventListener('pointerleave', () => {
                card.style.removeProperty('--tilt-x');
                card.style.removeProperty('--tilt-y');
            });
        });
    }

    // Select and spotlight a technology without hiding the rest of the skill list.
    document.querySelectorAll('.skill-list').forEach((list) => {
        list.addEventListener('click', (event) => {
            const selected = event.target.closest('.skill-item');
            if (!selected) return;
            const wasSelected = selected.getAttribute('aria-pressed') === 'true';
            list.querySelectorAll('.skill-item').forEach((item) => item.setAttribute('aria-pressed', 'false'));
            selected.setAttribute('aria-pressed', String(!wasSelected));
        });
    });

    // Project detail tabs support direct links, browser history and arrow-key navigation.
    const projectTabs = [...document.querySelectorAll('[data-project-tab]')];
    const projectPanes = [...document.querySelectorAll('[data-project-pane]')];
    if (projectTabs.length && projectPanes.length) {
        function activateProject(project, updateHistory = false, focusTab = false) {
            const activeTab = projectTabs.find((tab) => tab.dataset.projectTab === project) || projectTabs[0];
            const activeProject = activeTab.dataset.projectTab;

            projectTabs.forEach((tab) => {
                const isActive = tab === activeTab;
                tab.classList.toggle('is-active', isActive);
                tab.setAttribute('aria-selected', String(isActive));
                tab.tabIndex = isActive ? 0 : -1;
                if (isActive && focusTab) tab.focus();
            });
            projectPanes.forEach((pane) => {
                const isActive = pane.dataset.projectPane === activeProject;
                pane.hidden = !isActive;
                pane.classList.toggle('is-active', isActive);
            });

            if (updateHistory && window.location.hash !== `#${activeProject}`) {
                window.history.replaceState(null, '', `#${activeProject}`);
            }
        }

        projectTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => activateProject(tab.dataset.projectTab, true));
            tab.addEventListener('keydown', (event) => {
                let nextIndex = index;
                if (event.key === 'ArrowRight') nextIndex = (index + 1) % projectTabs.length;
                else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + projectTabs.length) % projectTabs.length;
                else if (event.key === 'Home') nextIndex = 0;
                else if (event.key === 'End') nextIndex = projectTabs.length - 1;
                else return;
                event.preventDefault();
                activateProject(projectTabs[nextIndex].dataset.projectTab, true, true);
            });
        });

        window.addEventListener('hashchange', () => activateProject(window.location.hash.slice(1)));
        activateProject(window.location.hash.slice(1));
    }

    // The form is deliberately front-end-only; make its no-backend behavior explicit.
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const status = document.getElementById('form-status');
            if (status) {
                status.textContent = 'No message was sent: this form is not connected to an email service yet. Please use the email link above.';
            }
            contactForm.reset();
        });
    }
})();
