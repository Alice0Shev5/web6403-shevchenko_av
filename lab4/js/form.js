// js/form.js

/**
 * Класс заявки на аренду.
 * Хранит данные формы и умеет форматированно выводить их в консоль.
 */
class RentalRequest {
  constructor({ name, email, phone, duration, consent }) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.duration = duration;
    this.consent = consent;
    this.createdAt = new Date();
  }

  /** Расшифровка срока аренды */
  get durationLabel() {
    const map = { '1w': '1 неделя', '1m': '1 месяц', '6m': '6 месяцев', '1y': '1 год' };
    return map[this.duration] || this.duration;
  }

  /** Форматированный вывод в консоль */
  print() {
    console.group('%c📋 Новая заявка на аренду', 'color:#c2410c;font-weight:bold');
    console.log('Имя:          ', this.name);
    console.log('Email:        ', this.email);
    console.log('Телефон:      ', this.phone);
    console.log('Срок аренды:  ', this.durationLabel);
    console.log('Согласие:     ', this.consent ? 'да' : 'нет');
    console.log('Создано:      ', this.createdAt.toLocaleString('ru-RU'));
    console.groupEnd();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rentForm');
  const status = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = 'Пожалуйста, заполните все поля корректно.';
      status.dataset.state = 'error';
      return;
    }

    const data = new FormData(form);
    const request = new RentalRequest({
      name:     String(data.get('name')  || '').trim(),
      email:    String(data.get('email') || '').trim(),
      phone:    String(data.get('phone') || '').trim(),
      duration: String(data.get('duration') || ''),
      consent:  data.get('consent') === 'on',
    });

    request.print();               

    status.textContent = 'Заявка отправлена! Откройте консоль (F12) — там данные.';
    status.dataset.state = 'success';
    form.reset();
  });
});