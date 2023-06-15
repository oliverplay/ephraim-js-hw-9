const formEl = document.querySelector('.form'); // Select the form element with class 'form'

formEl.addEventListener('submit', onFormSubmit); // Add event listener to listen for form submission

function onFormSubmit(evt) {
  evt.preventDefault(); // Prevent the default form submission behavior

  // Extract the input values from the form
  let delay = parseInt(evt.currentTarget.delay.value); // Get the 'delay' input value and convert it to an integer
  let step = parseInt(evt.currentTarget.step.value); // Get the 'step' input value and convert it to an integer
  let amount = parseInt(evt.currentTarget.amount.value); // Get the 'amount' input value and convert it to an integer

  promise({ delay, step, amount }); // Call the promise function with the input values

  evt.target.reset(); // Reset the form fields
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3; // Randomly determine if the promise should resolve or reject

  // Create a new promise that resolves or rejects randomly based on shouldResolve
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay }); // Resolve the promise with an object containing position and delay
    } else {
      reject({ position, delay }); // Reject the promise with an object containing position and delay
    }
  });
}

function promise({ delay, step, amount }) {
  for (let position = 1; position <= amount; position += 1) {
    // Create a promise for each position with the given delay
    createPromise(position, delay)
      .then(({ position, delay }) => {
        // Log a success message after the specified delay
        setTimeout(() => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        // Log a failure message after the specified delay
        setTimeout(() => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });

    delay += step; // Increase the delay by the step value for the next promise
  }
}
