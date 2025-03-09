/**
* Template Name: Medilab
* Template URL: https://bootstrapmade.com/medilab-free-medical-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 1 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });
  document.addEventListener("DOMContentLoaded", function () {
    const breadcrumbContainer = document.querySelector(".page-title nav ol");
    if (!breadcrumbContainer) return; // Exit if breadcrumb container is missing

    // Define custom breadcrumb names with their respective URLs
    const customBreadcrumbs = {
        "index.html": { name: "Home", url: "index.html" },
        "capabilities.html": { name: "Capabilities", url: "capabilities.html" },
        "bastudies.html": { name: "BA/BE Studies", url: "bastudies.html" },
        "clinicpharmacologyunit.html": { name: "Clinic Pharmacology Unit", url: "clinicpharmacologyunit.html" },
        "projectmanagement.html": { name: "Project Management", url: "projectmanagement.html" },
        "biostatistics-data-management.html": { name: "Biostatistics & Data Management", url: "biostatistics-data-management.html" },
        "regulatoryaffairs.html": { name: "Regulatory Affairs", url: "regulatoryaffairs.html" },
        "qualityassurance.html": { name: "Quality Assurance", url: "qualityassurance.html" },
        "medical-and-scientific-affairs.html": { name: "Medical & Scientific Affairs", url: "medical-and-scientific-affairs.html" }
    };

    // Get the current page filename
    let currentPage = window.location.pathname.split('/').pop() || "index.html";

    // Retrieve navigation history from sessionStorage
    let history = JSON.parse(sessionStorage.getItem("breadcrumbHistory")) || [];

    // Remove duplicate entries while keeping order
    history = history.filter((page, index, self) => self.indexOf(page) === index);

    // If the last visited page is different from the current page, add it
    if (history.length === 0 || history[history.length - 1] !== currentPage) {
        history.push(currentPage);
    }

    // Save updated history
    sessionStorage.setItem("breadcrumbHistory", JSON.stringify(history));

    // Start breadcrumb with Home
    let breadcrumbHTML = `<li><a href="index.html">Home</a></li>`;

    // Build the breadcrumb trail, ensuring correct order and no duplicates
    history.forEach((page, index) => {
        if (customBreadcrumbs[page]) {
            let { name, url } = customBreadcrumbs[page];

            if (index === history.length - 1) {
                breadcrumbHTML += `<li class="active">${name}</li>`; // Last page (active)
            } else {
                breadcrumbHTML += `<li><a href="${url}">${name}</a></li>`; // Clickable breadcrumb
            }
        }
    });

    // Inject the breadcrumb HTML into the container
    breadcrumbContainer.innerHTML = breadcrumbHTML;
});




  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();