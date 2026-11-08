/**
 * CEN227 Internet Programming Midterm Project
 * Kiralama Formu ve Doğrulama Mantığı (booking.js - booking.html)
 */

document.addEventListener("DOMContentLoaded", () => {
  initBookingPage();
});

let selectedCar = null;
let rentalDaysCount = 1;

function initBookingPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const carIdParam = urlParams.get("id");
  const daysParam = urlParams.get("days");

  // Araç seçim listesini doldur
  populateCarSelect(carIdParam);

  // Tarihleri hazırla (Alış = yarın 10:00, Teslim = 3 gün sonra 10:00)
  initDateTimeInputs(daysParam);

  // Olay dinleyicilerini bağla
  setupEventListeners();

  // İlk hesaplamayı çalıştır
  recalculateBookingSummary();
}

/**
 * Araç seçim açılır kutusunu doldurur ve URL'deki ID'yi seçer
 */
function populateCarSelect(selectedId) {
  const selectEl = document.getElementById("booking-car-select");
  if (!selectEl) return;

  const cars = getAllCars();
  selectEl.innerHTML = `
    <option value="" disabled>-- Lütfen bir araç seçiniz --</option>
    ${cars.map(c => `
      <option value="${c.id}" ${c.id == selectedId ? "selected" : ""}>
        ${c.brand} ${c.model} (${c.category} - ${formatPrice(c.dailyPrice)}/gün)
      </option>
    `).join("")}
  `;

  // Eğer seçilen ID yoksa ilk aracı seç
  if (!selectedId || !getCarById(selectedId)) {
    selectEl.selectedIndex = 1;
  }

  selectedCar = getCarById(selectEl.value);
}

/**
 * Tarih girişlerini ayarlar (geçmiş tarih seçilmesini engeller)
 */
function initDateTimeInputs(prefilledDays) {
  const pickupDateInput = document.getElementById("pickup-date");
  const returnDateInput = document.getElementById("return-date");

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const duration = prefilledDays ? parseInt(prefilledDays, 10) : 3;
  const returnDate = new Date(tomorrow);
  returnDate.setDate(tomorrow.getDate() + duration);

  const formatDate = (d) => d.toISOString().split("T")[0];

  if (pickupDateInput) {
    pickupDateInput.min = formatDate(today);
    pickupDateInput.value = formatDate(tomorrow);
  }

  if (returnDateInput) {
    returnDateInput.min = formatDate(tomorrow);
    returnDateInput.value = formatDate(returnDate);
  }
}

/**
 * Olay dinleyicilerini kurar
 */
function setupEventListeners() {
  const carSelect = document.getElementById("booking-car-select");
  const pickupDate = document.getElementById("pickup-date");
  const returnDate = document.getElementById("return-date");
  const form = document.getElementById("rental-booking-form");
  const extraCheckboxes = document.querySelectorAll(".extra-checkbox");

  if (carSelect) {
    carSelect.addEventListener("change", (e) => {
      selectedCar = getCarById(e.target.value);
      recalculateBookingSummary();
      validateDriverAge(); // Yaş şartı kontrolünü güncelle
    });
  }

  if (pickupDate) {
    pickupDate.addEventListener("change", () => {
      if (returnDate && pickupDate.value) {
        // Teslim tarihi alış tarihinden küçük olamaz
        returnDate.min = pickupDate.value;
        if (new Date(returnDate.value) <= new Date(pickupDate.value)) {
          const nextDay = new Date(pickupDate.value);
          nextDay.setDate(nextDay.getDate() + 1);
          returnDate.value = nextDay.toISOString().split("T")[0];
        }
      }
      recalculateBookingSummary();
    });
  }

  if (returnDate) {
    returnDate.addEventListener("change", recalculateBookingSummary);
  }

  if (extraCheckboxes) {
    extraCheckboxes.forEach(cb => {
      cb.addEventListener("change", recalculateBookingSummary);
    });
  }

  // Form Gönderimi ve Doğrulama
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }

  // İnteraktif anlık doğrulama
  setupLiveValidation();
}

/**
 * Gün sayısını ve fiyat dökümünü anlık hesaplar
 */
function recalculateBookingSummary() {
  if (!selectedCar) return;

  const pickupDateVal = document.getElementById("pickup-date")?.value;
  const returnDateVal = document.getElementById("return-date")?.value;

  if (pickupDateVal && returnDateVal) {
    const start = new Date(pickupDateVal);
    const end = new Date(returnDateVal);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    rentalDaysCount = diffDays > 0 ? diffDays : 1;
  } else {
    rentalDaysCount = 1;
  }

  // Sağ taraftaki araç önizlemesini güncelle
  updateCarPreviewCard(selectedCar);

  // Fiyat Hesaplama
  const grossRent = selectedCar.dailyPrice * rentalDaysCount;
  let discountAmount = 0;
  if (rentalDaysCount >= 7) {
    discountAmount = Math.round(grossRent * (selectedCar.weeklyDiscountPercent / 100));
  }
  const netRent = grossRent - discountAmount;

  // Ekstra Hizmetler
  let extrasTotal = 0;
  const babySeat = document.getElementById("extra-baby-seat")?.checked;
  const extraDriver = document.getElementById("extra-driver")?.checked;
  const fullInsurance = document.getElementById("extra-insurance")?.checked;
  const hgsPass = document.getElementById("extra-hgs")?.checked;

  if (babySeat) extrasTotal += 150 * rentalDaysCount;
  if (extraDriver) extrasTotal += 200 * rentalDaysCount;
  if (fullInsurance) extrasTotal += 350 * rentalDaysCount;
  if (hgsPass) extrasTotal += 100; // Sabit paket

  const grandTotal = netRent + extrasTotal;

  // DOM Güncelleme
  document.getElementById("sum-days-label").textContent = `${rentalDaysCount} Gün`;
  document.getElementById("sum-base-rent").textContent = formatPrice(grossRent);

  const discountRow = document.getElementById("sum-discount-row");
  if (discountRow) {
    if (discountAmount > 0) {
      discountRow.style.display = "flex";
      document.getElementById("sum-discount-val").textContent = `-${formatPrice(discountAmount)} (%${selectedCar.weeklyDiscountPercent})`;
    } else {
      discountRow.style.display = "none";
    }
  }

  const extrasRow = document.getElementById("sum-extras-row");
  if (extrasRow) {
    if (extrasTotal > 0) {
      extrasRow.style.display = "flex";
      document.getElementById("sum-extras-val").textContent = `+${formatPrice(extrasTotal)}`;
    } else {
      extrasRow.style.display = "none";
    }
  }

  document.getElementById("sum-deposit-val").textContent = formatPrice(selectedCar.deposit);
  document.getElementById("sum-grand-total").textContent = formatPrice(grandTotal);
}

/**
 * Özet kartındaki araç bilgilerini günceller
 */
function updateCarPreviewCard(car) {
  const imgEl = document.getElementById("summary-car-img");
  const nameEl = document.getElementById("summary-car-name");
  const metaEl = document.getElementById("summary-car-meta");
  const dailyEl = document.getElementById("summary-car-daily");

  if (imgEl) imgEl.src = car.image;
  if (nameEl) nameEl.textContent = `${car.brand} ${car.model}`;
  if (metaEl) metaEl.textContent = `${car.category} • ${car.transmission} • ${car.fuel}`;
  if (dailyEl) dailyEl.textContent = `${formatPrice(car.dailyPrice)} / gün`;
}

/**
 * Form Alanları İçin İnteraktif Canlı Doğrulama
 */
function setupLiveValidation() {
  const fields = [
    { id: "full-name", validator: validateFullName },
    { id: "tc-id", validator: validateTCKN },
    { id: "email", validator: validateEmail },
    { id: "phone", validator: validatePhone },
    { id: "birth-date", validator: validateDriverAge },
    { id: "pickup-location", validator: validateRequired },
    { id: "return-location", validator: validateRequired }
  ];

  fields.forEach(({ id, validator }) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("blur", () => validator(el));
      el.addEventListener("input", () => {
        if (el.classList.contains("is-invalid")) {
          validator(el);
        }
      });
    }
  });
}

function setError(inputEl, errorMsg) {
  inputEl.classList.remove("is-valid");
  inputEl.classList.add("is-invalid");
  const errorEl = document.getElementById(`${inputEl.id}-error`);
  if (errorEl) {
    errorEl.textContent = errorMsg;
    errorEl.style.display = "block";
  }
}

function setSuccess(inputEl) {
  inputEl.classList.remove("is-invalid");
  inputEl.classList.add("is-valid");
  const errorEl = document.getElementById(`${inputEl.id}-error`);
  if (errorEl) {
    errorEl.textContent = "";
    errorEl.style.display = "none";
  }
}

function validateFullName(el) {
  const val = el.value.trim();
  const parts = val.split(/\s+/);
  if (parts.length < 2 || val.length < 5) {
    setError(el, "Lütfen adınızı ve soyadınızı eksiksiz giriniz.");
    return false;
  }
  setSuccess(el);
  return true;
}

function validateTCKN(el) {
  const val = el.value.trim();
  const tcRegex = /^[1-9]{1}[0-9]{10}$/; // 11 haneli, 0 ile başlamaz
  if (!tcRegex.test(val)) {
    setError(el, "Geçerli 11 haneli T.C. Kimlik Numarası giriniz.");
    return false;
  }
  setSuccess(el);
  return true;
}

function validateEmail(el) {
  const val = el.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(val)) {
    setError(el, "Geçerli bir e-posta adresi giriniz (Örn: isim@mail.com).");
    return false;
  }
  setSuccess(el);
  return true;
}

function validatePhone(el) {
  const val = el.value.replace(/\D/g, "");
  if (val.length < 10 || val.length > 11) {
    setError(el, "Geçerli 10 haneli telefon numarası giriniz (5XX XXX XX XX).");
    return false;
  }
  setSuccess(el);
  return true;
}

function validateDriverAge(el) {
  const birthEl = el || document.getElementById("birth-date");
  if (!birthEl || !birthEl.value) return false;

  const birthDate = new Date(birthEl.value);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  const requiredAge = selectedCar ? selectedCar.minAge : 21;

  if (age < 18) {
    setError(birthEl, "Araç kiralamak için en az 18 yaşında olmalısınız.");
    return false;
  }

  if (age < requiredAge) {
    setError(birthEl, `Seçilen ${selectedCar.brand} ${selectedCar.model} için minimum yaş şartı: ${requiredAge} yaştır (Mevcut yaşınız: ${age}).`);
    return false;
  }

  setSuccess(birthEl);
  return true;
}

function validateRequired(el) {
  if (!el.value.trim()) {
    setError(el, "Bu alanın doldurulması zorunludur.");
    return false;
  }
  setSuccess(el);
  return true;
}

/**
 * Form Submit İşleyicisi
 */
function handleFormSubmit(e) {
  e.preventDefault();

  const fullNameEl = document.getElementById("full-name");
  const tcEl = document.getElementById("tc-id");
  const emailEl = document.getElementById("email");
  const phoneEl = document.getElementById("phone");
  const birthEl = document.getElementById("birth-date");
  const pickupLocEl = document.getElementById("pickup-location");
  const returnLocEl = document.getElementById("return-location");
  const termsCb = document.getElementById("terms-accept");

  const isNameValid = validateFullName(fullNameEl);
  const isTcValid = validateTCKN(tcEl);
  const isEmailValid = validateEmail(emailEl);
  const isPhoneValid = validatePhone(phoneEl);
  const isAgeValid = validateDriverAge(birthEl);
  const isPickupLocValid = validateRequired(pickupLocEl);
  const isReturnLocValid = validateRequired(returnLocEl);

  if (!termsCb.checked) {
    showToast("Lütfen kiralama sözleşmesini ve şartları onaylayınız.", "error");
    termsCb.focus();
    return;
  }

  const isFormValid = isNameValid && isTcValid && isEmailValid && isPhoneValid && isAgeValid && isPickupLocValid && isReturnLocValid;

  if (!isFormValid) {
    showToast("Lütfen formdaki işaretli hataları düzeltiniz.", "error");
    return;
  }

  // Rezervasyon verisini topla
  const bookingCode = `REZ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const pickupDateVal = document.getElementById("pickup-date").value;
  const returnDateVal = document.getElementById("return-date").value;
  const pickupTimeVal = document.getElementById("pickup-time")?.value || "10:00";
  const returnTimeVal = document.getElementById("return-time")?.value || "10:00";

  const totalAmountText = document.getElementById("sum-grand-total").textContent;

  const reservationData = {
    code: bookingCode,
    createdAt: new Date().toISOString(),
    car: {
      id: selectedCar.id,
      name: `${selectedCar.brand} ${selectedCar.model}`,
      category: selectedCar.category,
      transmission: selectedCar.transmission,
      dailyPrice: selectedCar.dailyPrice,
      deposit: selectedCar.deposit
    },
    customer: {
      fullName: fullNameEl.value.trim(),
      tc: tcEl.value.trim(),
      email: emailEl.value.trim(),
      phone: phoneEl.value.trim()
    },
    rental: {
      pickupLocation: pickupLocEl.value,
      returnLocation: returnLocEl.value,
      pickupDate: `${pickupDateVal} ${pickupTimeVal}`,
      returnDate: `${returnDateVal} ${returnTimeVal}`,
      days: rentalDaysCount,
      totalAmount: totalAmountText
    }
  };

  // LocalStorage'a kaydet (Data Persistence)
  saveReservationToStorage(reservationData);

  // Başarı Modalı Aç
  openConfirmationModal(reservationData);
}

/**
 * Rezervasyonları LocalStorage'da tutar
 */
function saveReservationToStorage(res) {
  try {
    const existing = JSON.parse(localStorage.getItem("cen227_car_rentals") || "[]");
    existing.unshift(res);
    localStorage.setItem("cen227_car_rentals", JSON.stringify(existing));
  } catch (err) {
    console.warn("LocalStorage kaydedilemedi:", err);
  }
}

/**
 * Onay Modalını Gösterir
 */
function openConfirmationModal(res) {
  const modalOverlay = document.getElementById("booking-success-modal");
  const voucherCodeEl = document.getElementById("modal-voucher-code");
  const voucherDetailsEl = document.getElementById("modal-voucher-details");

  if (voucherCodeEl) voucherCodeEl.textContent = res.code;
  if (voucherDetailsEl) {
    voucherDetailsEl.innerHTML = `
      <div class="voucher-row">
        <span>Müşteri Ad Soyad:</span>
        <strong>${res.customer.fullName}</strong>
      </div>
      <div class="voucher-row">
        <span>İletişim:</span>
        <span>${res.customer.phone} / ${res.customer.email}</span>
      </div>
      <div class="voucher-row">
        <span>Kiralanan Araç:</span>
        <strong>${res.car.name} (${res.car.category})</strong>
      </div>
      <div class="voucher-row">
        <span>Alış Noktası & Tarih:</span>
        <span>${res.rental.pickupLocation} - ${res.rental.pickupDate}</span>
      </div>
      <div class="voucher-row">
        <span>Teslim Noktası & Tarih:</span>
        <span>${res.rental.returnLocation} - ${res.rental.returnDate}</span>
      </div>
      <div class="voucher-row">
        <span>Toplam Süre:</span>
        <span>${res.rental.days} Gün</span>
      </div>
      <div class="voucher-row">
        <span>Güvence Depozitosu (İadeli):</span>
        <span>${formatPrice(res.car.deposit)}</span>
      </div>
      <div class="voucher-row highlight">
        <span>Toplam Kiralama Tutarı:</span>
        <span style="font-size: 1.15rem; color: #2563eb;">${res.rental.totalAmount}</span>
      </div>
    `;
  }

  if (modalOverlay) {
    modalOverlay.classList.add("open");
  }
}

/**
 * Modal Kapatma
 */
function closeModal() {
  const modalOverlay = document.getElementById("booking-success-modal");
  if (modalOverlay) {
    modalOverlay.classList.remove("open");
  }
}
