const openPopup = document.getElementById('profile_button');
const closePopup = document.getElementById('popup_close');
const popup = document.getElementById('popup');

function popupOpen(e) {
    e.preventDefault();
    popup.classList.add('active');
}

function popupClose() {
    popup.classList.remove('active');
}

openPopup.addEventListener('click', popupOpen);
closePopup.addEventListener('click', popupClose);

let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');
const popupButton = document.querySelector('.popup__button');

let nameNode = document.getElementById('name');
let jobNode = document.getElementById('job');

function popupEdit(e) {
    e.preventDefault();
    nameNode.textContent = nameInput.value;
    jobNode.textContent = jobInput.value;
    popup.classList.remove('active');
}

popupButton.addEventListener('click', popupEdit);