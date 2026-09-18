const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = new Date().getFullYear();

  // Mobile navigation
  const toggle = $(".menu-toggle");
  const mobileNav = $(".mobile-nav");
  toggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$(".mobile-nav a").forEach(a => a.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));

  // Menu tabs
  $$(".menu-tabs button").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".menu-tabs button").forEach(b => b.classList.remove("active"));
      $$(".menu-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      $(`[data-panel="${btn.dataset.tab}"]`).classList.add("active");
    });
  });

  // Reservation modal
  const modal = $("#reservationModal");
  const openModal = () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  $$("[data-open-reservation]").forEach(btn => btn.addEventListener("click", openModal));
  $$("[data-close-modal]").forEach(btn => btn.addEventListener("click", closeModal));
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

  const dateInput = $('input[name="date"]');
  const today = new Date();
  const isoToday = new Date(today.getTime() - today.getTimezoneOffset()*60000).toISOString().split("T")[0];
  dateInput.min = isoToday;

  $("#reservationForm").addEventListener("submit", e => {
    e.preventDefault();
    $("#formSuccess").style.display = "block";
    e.target.reset();
  });

  // Gallery lightbox
  const lightbox = $("#lightbox");
  const lbImg = $("#lightboxImage");
  $$(".gallery-item").forEach(item => item.addEventListener("click", () => {
    lbImg.src = item.dataset.full;
    lbImg.alt = $("img", item).alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }));
  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  $(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });

  // Reviews
  const reviews = $$(".review");
  let reviewIndex = 0;
  const showReview = i => {
    reviewIndex = (i + reviews.length) % reviews.length;
    reviews.forEach((r, idx) => r.classList.toggle("active", idx === reviewIndex));
  };
  $("#prevReview").addEventListener("click", () => showReview(reviewIndex - 1));
  $("#nextReview").addEventListener("click", () => showReview(reviewIndex + 1));
  let reviewTimer = setInterval(() => showReview(reviewIndex + 1), 6500);
  $$(".review-controls button").forEach(b => b.addEventListener("click", () => {
    clearInterval(reviewTimer);
    reviewTimer = setInterval(() => showReview(reviewIndex + 1), 6500);
  }));

  // Back to top
  const backTop = $("#backTop");
  window.addEventListener("scroll", () => {
    backTop.classList.toggle("show", window.scrollY > 700);
  }, {passive:true});
  backTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

  // Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeModal();
      closeLightbox();
    }
  });

});

// Disable right-click
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

// Disable F12 and common developer shortcuts
document.addEventListener("keydown", function (e) {

    // F12
    if (e.key === "F12") {
        e.preventDefault();
        return false;
    }

    // Ctrl + Shift + I
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
        return false;
    }

    // Ctrl + Shift + J
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") {
        e.preventDefault();
        return false;
    }

    // Ctrl + Shift + C
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        return false;
    }

    // Ctrl + U - View Source
    if (e.ctrlKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
        return false;
    }

    // Ctrl + S - Save page
    if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        return false;
    }
});
