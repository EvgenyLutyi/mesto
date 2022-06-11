const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const popup = document.querySelector('.popup');
const popupProfile = document.getElementById('popup_profile');
const profileButton = document.getElementById('profile_button');
const profileSave = document.querySelector('.popup__button');
const popupCloseProfile = document.getElementById('popup_profile_close');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
let nameNode = document.getElementById('name');
let jobNode = document.getElementById('job');
const popupAddFormOpen = document.getElementById('profile_edit-button');
const popupAddFormClose = document.getElementById('popupCloseAddForm');
const popupAddForm = document.getElementById('popupAddForm');
const popupZoom = document.getElementById('popupImageZoom');
const popupZoomTagImg = document.querySelector('.popup__img-zoom'); //- картинка из зума !
const popupZoomText = document.querySelector('.popup__description'); //- текст из зума !
const popupZoomOpenButton = document.querySelector('.element__pic');
const popupZoomCloseButton = document.getElementById('popupCloseZoom'); //- Получение айди кнопки закрытия зума
const elementRemoveButton = document.querySelector('.element__pic_trash'); //-> Удаление element !
const elements = document.querySelector('.elements'); //-> Работа с массивом по добавлению element и действия с ними
const addForm = document.getElementById('createElementForm');
const nameInputAddCard = document.getElementById('input_name');
const linkInputAddCard = document.getElementById('input_url');
const forms = document.querySelector('.form');

//-> Открытие попапа
function openPopup(modal) {
    modal.classList.add('active');
}
//-> Закрытие попапа
function closePopup(modal) {
    modal.classList.remove('active');
}

//- измеение данных формы
function saveProfile(e) {
    nameNode.textContent = nameInput.value;
    jobNode.textContent = jobInput.value;
    closePopup(popupProfile);
    e.preventDefault();
}

//-> Активация лайка !
const toggleLike = (e) => {
    e.target.classList.toggle('active');
}


const initPopupImage = (e) => {
    popupZoomTagImg.src = e.target.src;
    popupZoomTagImg.alt = e.target.alt;
    popupZoomText.textContent = e.target.alt;
    openPopup(popupZoom);
}

//-> Удаление element !
const removeCard = (e) => {
    e.target.closest('.element').remove();
}

const createCard = (initCard) => {
    const card = elements.content.cloneNode(true).querySelector('.element');
    const pic = card.querySelector('.element__pic');
    const cardTitle = card.querySelector('.element__name');
    const elementTrash = card.querySelector('.element__pic_trash');
    const elementLike = card.querySelector('.element__like');

    pic.src = initCard.link;
    pic.alt = initCard.name;
    cardTitle.textContent = initCard.name;
    elementTrash.addEventListener('click', removeCard);
    pic.addEventListener('click', initPopupImage);
    elementLike.addEventListener('click', toggleLike);

    return card;

}

function addCard(card) {
    elements.prepend(card);
}
initialCards.forEach(function(card) {
    addCard(createCard(card));
})

//-> Функция получения имени и url и невозможности создания пустой карточки и очистка инпутов
const handlerAddCard = (e) => {
    e.preventDefault();
    const name = nameInputAddCard.value;
    const link = linkInputAddCard.value;
    addCard(createCard({ name, link }));
    closePopup(popupAddForm);
}



profileSave.addEventListener('click', saveProfile);
profileButton.addEventListener('click', () => openPopup(popupProfile));
popupCloseProfile.addEventListener('click', () => closePopup(popupProfile));
popupAddFormOpen.addEventListener('click', () => {
    openPopup(popupAddForm)
    nameInputAddCard.value = '';
    linkInputAddCard.value = '';
});
popupAddFormClose.addEventListener('click', () => closePopup(popupAddForm));
popupZoomCloseButton.addEventListener('click', () => closePopup(popupZoom));
addForm.addEventListener('submit', handlerAddCard);