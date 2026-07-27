/* ==========================================================================
   GPR Accounting & Consultancy Services - Main Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Drawer Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  function openDrawer() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.add('open');
      drawerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.remove('open');
      drawerOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // Modal Functionality for Consultation Booking
  const modal = document.getElementById('consultationModal');
  const modalClose = document.getElementById('modalClose');
  const consultationTriggers = document.querySelectorAll('.open-consultation-modal');

  function openModal() {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  consultationTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Toast Notification System
  window.showToast = function(message) {
    let toast = document.getElementById('globalToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'globalToast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  };

  // Consultation & Contact Form Submissions
  const forms = document.querySelectorAll('.consultation-form, .contact-form-element');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Submitting Request...';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          form.reset();
          if (modal) closeModal();
          showToast('Thank you! Your consultation request has been received. Our CPAs will contact you within 24 hours.');
        }, 1200);
      }
    });
  });

  // Interactive Fee Calculator Widget (if present on page)
  const calcEntity = document.getElementById('calcEntity');
  const calcRevenue = document.getElementById('calcRevenue');
  const calcService = document.getElementById('calcService');
  const calcOutput = document.getElementById('calcOutput');

  function calculateFee() {
    if (!calcEntity || !calcRevenue || !calcService || !calcOutput) return;

    let base = 5000;
    const entityVal = calcEntity.value;
    const revVal = parseFloat(calcRevenue.value) || 0;
    const serviceVal = calcService.value;

    if (entityVal === 'corporation') base += 3500;
    if (entityVal === 'branch') base += 5000;

    if (revVal > 10000000) {
      base += 15000;
    } else if (revVal > 3000000) {
      base += 8000;
    } else if (revVal > 1000000) {
      base += 4000;
    }

    if (serviceVal === 'audit') base *= 1.8;
    if (serviceVal === 'full') base *= 2.2;
    if (serviceVal === 'tax_audit') base += 10000;

    calcOutput.textContent = '₱' + Math.round(base).toLocaleString('en-PH') + ' / mo';
  }

  if (calcEntity) calcEntity.addEventListener('change', calculateFee);
  if (calcRevenue) calcRevenue.addEventListener('input', calculateFee);
  if (calcService) calcService.addEventListener('change', calculateFee);

  // FAQ Accordion Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close other FAQs
      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Resource Filter Search
  const resourceSearch = document.getElementById('resourceSearch');
  if (resourceSearch) {
    resourceSearch.addEventListener('keyup', (e) => {
      const query = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.resource-card');
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
});
