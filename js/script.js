// Ganti nomor ini dengan nomor WhatsApp bisnis Anda, format internasional tanpa tanda + atau spasi.
const WHATSAPP_NUMBER = "6281234567890";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Tahun otomatis di footer.
const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Animasi masuk saat elemen terlihat. Tetap berfungsi tanpa IntersectionObserver.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Preview demo proyek yang disimpan di folder /projects/.
const previewModal = document.getElementById("previewModal");
const previewFrame = document.getElementById("previewFrame");
const modalTitle = document.getElementById("modalTitle");
const openPreviewNew = document.getElementById("openPreviewNew");
const closeModalButton = document.getElementById("closeModal");
let lastFocusedElement = null;

const projectTitles = {
  "projects/landing-page/index.html": "Launch — Landing Page",
  "projects/company-profile/index.html": "Nexora — Company Profile",
  "projects/coffee-shop/index.html": "Kopi Rumah — Website UMKM",
  "projects/gula-semut/index.html": "Gula Aren — Produk Gula Semut"
};

function openPreview(path) {
  if (!previewModal || !previewFrame) return;
  lastFocusedElement = document.activeElement;
  previewFrame.src = path;
  openPreviewNew.href = path;
  modalTitle.textContent = projectTitles[path] || "Preview proyek";
  previewModal.classList.add("is-open");
  previewModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeModalButton?.focus();
}

function closePreview() {
  if (!previewModal) return;
  previewModal.classList.remove("is-open");
  previewModal.setAttribute("aria-hidden", "true");
  previewFrame.src = "about:blank";
  document.body.style.overflow = "";
  lastFocusedElement?.focus();
}

document.querySelectorAll("[data-preview]").forEach((button) => {
  button.addEventListener("click", () => openPreview(button.dataset.preview));
});
closeModalButton?.addEventListener("click", closePreview);
previewModal?.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closePreview);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && previewModal?.classList.contains("is-open")) closePreview();
});

// Form kontak: menyusun pesan lalu membuka WhatsApp. Tidak memerlukan backend.
const contactForm = document.getElementById("contactForm");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const service = String(formData.get("service") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const text = [
    "Halo RuangWeb, saya ingin konsultasi pembuatan website.",
    "",
    `Nama: ${name}`,
    email ? `Email: ${email}` : "",
    `Layanan: ${service}`,
    `Kebutuhan: ${message}`
  ].filter(Boolean).join("\n");

  if (WHATSAPP_NUMBER === "6281234567890") {
    const continueAnyway = confirm("Nomor WhatsApp masih berupa contoh. Klik OK untuk membuka WhatsApp dengan nomor contoh, atau Cancel untuk mengedit nomor di file js/script.js.");
    if (!continueAnyway) return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
});
