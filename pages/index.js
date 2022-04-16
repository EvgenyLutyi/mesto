const openPopap = document.getElementById('profile_button');
const closePopap = document.getElementById('popap_close');
const popap = document.getElementById('popap');

openPopap.addEventListener('click', function(e) {
    e.preventDefault();
    popap.classList.add('active');
})

closePopap.addEventListener('click', () => {
    popap.classList.remove('active');
})


const nameInput = document.querySelector('.popap__input_name');
const jobInput = document.querySelector('.popap__input_job');
const popapButton = document.querySelector('.popap__button');

const nameNode = document.getElementById('name');
const jobNode = document.getElementById('job');

popapButton.addEventListener('click', () => {
    nameNode.textContent = nameInput.value;
    jobNode.textContent = jobInput.value;
    popap.classList.remove('active');
})