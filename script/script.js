const formContainer = document.getElementById('form-container');
const errorContainer = document.getElementById('error-container');
const successContainer = document.getElementById('success-container');

function renderForm() {
  let nameInput = document.createElement('input');
  let mailInput = document.createElement('input');
  let submitButton = document.createElement('button');

  nameInput.type = 'text';
  mailInput.type = 'email';
  mailInput.placeholder = 'epost@mail.com';
  nameInput.placeholder = 'namn';

  submitButton.innerHTML = 'skicka';

  formContainer.append(nameInput, mailInput, submitButton);

  submitButton.addEventListener('click', () => {
    let formData = { userName: nameInput.value, userMail: mailInput.value };

    if (
      nameInput.value === '' ||
      mailInput.value === '' ||
      !mailInput.value.match('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')
    ) {
      printError();
      return;
    }

    printSuccess();
    postForm(formData);
    nameInput.value = '';
    mailInput.value = '';
    errorContainer.innerHTML = '';
  });
}

function postForm(formData) {
  fetch('http://localhost:3001/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
}

function printError() {
  errorContainer.innerHTML = '';
  errorContainer.innerHTML = 'du måste fylla i fälten korrekt!';
}

function printSuccess() {
  errorContainer.innerHTML = '';
  successContainer.innerHTML = 'Konto skapat';
}

renderForm();
