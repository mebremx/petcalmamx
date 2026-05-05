/* Pet Calma MX - theme.js
   JS mínimo para interacciones esenciales (variantes, cantidad, galería) */

(function () {
  'use strict';

  /* ---------- Galería de producto ---------- */
  document.querySelectorAll('[data-product-gallery]').forEach(function (gallery) {
    var mainImg = gallery.querySelector('[data-main-image]');
    var thumbs = gallery.querySelectorAll('[data-thumb]');
    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var src = thumb.getAttribute('data-src');
        if (mainImg && src) {
          mainImg.src = src;
          thumbs.forEach(function (t) { t.classList.remove('is-active'); });
          thumb.classList.add('is-active');
        }
      });
    });
  });

  /* ---------- Selector de variantes ---------- */
  document.querySelectorAll('[data-variant-selector]').forEach(function (selector) {
    var form = selector.closest('form');
    if (!form) return;
    var hiddenInput = form.querySelector('[name="id"]');
    var priceEl = document.querySelector('[data-product-price]');
    var compareEl = document.querySelector('[data-product-compare]');
    var saveEl = document.querySelector('[data-product-save]');
    var atcBtn = form.querySelector('[data-add-to-cart]');

    selector.querySelectorAll('[data-variant]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var variantId = btn.getAttribute('data-variant');
        var price = btn.getAttribute('data-price');
        var compare = btn.getAttribute('data-compare');
        var available = btn.getAttribute('data-available') === 'true';

        selector.querySelectorAll('[data-variant]').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');

        if (hiddenInput) hiddenInput.value = variantId;
        if (priceEl && price) priceEl.textContent = price;
        if (compareEl) compareEl.textContent = compare && compare !== '0' ? compare : '';
        if (saveEl && compare && price) {
          var savings = parseFloat(compare.replace(/[^0-9.]/g, '')) - parseFloat(price.replace(/[^0-9.]/g, ''));
          if (savings > 0) {
            saveEl.style.display = '';
            saveEl.textContent = 'Ahorra $' + savings.toFixed(0);
          } else {
            saveEl.style.display = 'none';
          }
        }
        if (atcBtn) {
          atcBtn.disabled = !available;
          atcBtn.textContent = available ? (atcBtn.getAttribute('data-text-add') || 'Agregar al carrito') : 'Agotado';
        }
      });
    });
  });

  /* ---------- Cantidad +/- ---------- */
  document.querySelectorAll('[data-qty]').forEach(function (wrapper) {
    var input = wrapper.querySelector('input');
    wrapper.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!input) return;
        var current = parseInt(input.value || '1', 10);
        var action = btn.getAttribute('data-action');
        var min = parseInt(input.getAttribute('min') || '1', 10);
        if (action === 'increase') input.value = current + 1;
        else if (action === 'decrease' && current > min) input.value = current - 1;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
  });

  /* ---------- Comprar ahora ---------- */
  document.querySelectorAll('[data-buy-now]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var form = btn.closest('form');
      if (!form) return;
      var checkoutInput = document.createElement('input');
      checkoutInput.type = 'hidden';
      checkoutInput.name = 'checkout';
      checkoutInput.value = '1';
      form.appendChild(checkoutInput);
      form.submit();
    });
  });
})();
