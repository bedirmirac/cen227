/**
 * CEN227 Internet Programming Midterm Project
 * Genel Yardımcı ve Gezinme Mantığı (main.js)
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  highlightActiveNav();
});

/**
 * Mobil Menü Aç/Kapa Desteği
 */
function initMobileNav() {
  const toggleBtn = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }
}

/**
 * Aktif Sayfayı Menüde Vurgula
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const page = currentPath.split("/").pop() || "index.html";

  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Flow adımı aktiflik kontrolü
  const flowSteps = document.querySelectorAll(".flow-step");
  if (flowSteps.length > 0) {
    flowSteps.forEach(step => {
      const stepPage = step.getAttribute("data-page");
      if (stepPage === page || (page === "" && stepPage === "index.html")) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
  }
}

/**
 * Global Bildirim / Toast Gösterici
 */
function showToast(message, type = "info") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  const bg = type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#2563eb";
  toast.style.cssText = `
    background: ${bg};
    color: #fff;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    font-size: 0.9rem;
    font-weight: 600;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
  `;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  }, 10);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
