const openPopup = document.getElementById('profile_button');
const closePopup = document.getElementById('popup_close');
const popup = document.getElementById('popup');

openPopup.addEventListener('click', function(e) {
    e.preventDefault();
    popup.classList.add('active');
})

closePopup.addEventListener('click', () => {
    popup.classList.remove('active');
})


let nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const popupButton = document.querySelector('.popup__button');

const nameNode = document.getElementById('name');
const jobNode = document.getElementById('job');

popupButton.addEventListener('click', () => {
    nameNode.textContent = nameInput.value;
    jobNode.textContent = jobInput.value;
    popup.classList.remove('active');
})