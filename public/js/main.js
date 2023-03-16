// Elements
const messageEl = document.querySelector('.msg')
const promptEl = document.querySelector('#prompt')
const sizeEl = document.querySelector('#size')
const spinnerEl = document.querySelector('.spinner')
const imageFormEl = document.querySelector('#image-form')
const numberEl = document.querySelector('#number')
const imagesContainerEl = document.querySelector('#images-container')

// Methods
function onSubmit(e) {
  e.preventDefault();

  messageEl.textContent = '';
  imagesContainerEl.innerHTML = generateImageEls([''])

  const prompt = promptEl.value;
  const size = sizeEl.value;
  const number = numberEl.value;

  if (prompt === '') {
    messageEl.textContent = 'Please enter some text';
    return;
  }

  generateImageRequest(prompt, size, number);
}

async function generateImageRequest(prompt, size, number) {
  try {
    showSpinner();

    const response = await fetch('/openai/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
        number: Number(number) || 1
      }),
    });

    if (!response.ok) {
      removeSpinner();
      messageEl.textContent = 'That image could not be generated';
      return;
    }

    const { urls } = await response.json();
    imagesContainerEl.innerHTML = generateImageEls(urls)

    removeSpinner();
  } catch (error) {
    messageEl.textContent = error;
  }
}

// Spinner helpers
function showSpinner() {
  spinnerEl.classList.add('show');
}

function removeSpinner() {
  spinnerEl.classList.remove('show');
}

const generateImageEls = (srcs) => srcs.map(src => `<img src="${src}" alt="" id="image" />`).join('')

// Init
imageFormEl.addEventListener('submit', onSubmit);
