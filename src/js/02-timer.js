document.addEventListener("DOMContentLoaded", function() {
  const startButton = document.getElementById("start-button");
  const datetimePicker = document.getElementById("datetime-picker");
  const errorMessage = document.getElementById("error-message");
  const daysElement = document.querySelector("[data-days]");
  const hoursElement = document.querySelector("[data-hours]");
  const minutesElement = document.querySelector("[data-minutes]");
  const secondsElement = document.querySelector("[data-seconds]");
  let interval;

  function updateCountdown(selectedDate) {
    return function() {
      const now = new Date();
      const timeDifference = new Date(selectedDate) - now;

      if (timeDifference <= 0) {
        clearInterval(interval);
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        alert("Termenul a expirat!");
        return;
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      daysElement.textContent = String(days).padStart(2, "0");
      hoursElement.textContent = String(hours).padStart(2, "0");
      minutesElement.textContent = String(minutes).padStart(2, "0");
      secondsElement.textContent = String(seconds).padStart(2, "0");
    };
  }

  startButton.addEventListener("click", function() {
    const selectedDate = datetimePicker.value;
    const now = new Date();
    if (!selectedDate) {
      alert("Te rog selectează o dată și oră validă!");
      return;
    }

    if (new Date(selectedDate) <= now) {
      datetimePicker.classList.add("invalid");
      errorMessage.style.display = "block";
      return;
    } else {
      datetimePicker.classList.remove("invalid");
      errorMessage.style.display = "none";
    }

    if (interval) {
      clearInterval(interval);
    }

    updateCountdown(selectedDate)();
    interval = setInterval(updateCountdown(selectedDate), 1000);
  });
});
