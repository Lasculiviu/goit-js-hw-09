document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('.form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const delay = parseInt(form.elements['delay'].value);
    const step = parseInt(form.elements['step'].value);
    const amount = parseInt(form.elements['amount'].value);

    createPromises(amount, delay, step);
  });

  function createPromises(amount, initialDelay, step) {
    let currentDelay = initialDelay;

    for (let i = 1; i <= amount; i++) {
      createPromise(i, currentDelay)
        .then(({ position, delay }) => {
          showNotification(`✅ Fulfilled promise ${position}`, `Fulfilled in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          showNotification(`❌ Rejected promise ${position}`, `Rejected in ${delay}ms`);
        });

      currentDelay += step;
    }
  }

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }

  function showNotification(title, message) {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      new Notification(title, { body: message });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          new Notification(title, { body: message });
        }
      });
    }
  }
});
