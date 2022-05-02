const openPopup = document.getElementById('profile_button');
const closePopup = document.getElementById('popup_close');
const popup = document.getElementById('popup');


//-> Открытие попапа редактирования !
function popupOpen(e) {
    e.preventDefault();
    popup.classList.add('active');
}
//-> Закрытие попапа редактирования !
function popupClose() {
    popup.classList.remove('active');
}

openPopup.addEventListener('click', popupOpen); //-> Открытие попапа редактирования !
closePopup.addEventListener('click', popupClose); //-> Закрытие попапа редактирования !

let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');
const popupButton = document.querySelector('.popup__button');

let nameNode = document.getElementById('name');
let jobNode = document.getElementById('job');

//->Запись изменений в форму !
function popupEdit(e) {
    e.preventDefault();
    nameNode.textContent = nameInput.value;
    jobNode.textContent = jobInput.value;
    popup.classList.remove('active');
}

popupButton.addEventListener('click', popupEdit); //->Запись изменений в форму !


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

const popupZoom = document.getElementById('popupImageZoom'); //- попап зума !
const popupZoomTagImg = document.querySelector('.popup__img-zoom'); //- картинка из зума !
const popupZoomText = document.querySelector('.popup__description'); //- текст из зума !
const popupCloseZoom = document.getElementById('popupCloseZoom'); //- Получение айди кнопки закрытия зума

//-> Удаление element !
const removeCard = (e) => {
        e.target.parentElement.remove()
    }
    //-> Активация лайка !
const toggleLike = (e) => {
        e.target.classList.toggle('active');
    }
    //-> Вставка картинки и описания в попап с большой картинкой
const popupImageInit = (e) => {
    popupZoom.classList.add('active');
    popupZoomTagImg.src = e.target.src;
    popupZoomText.textContent = e.target.alt;
}

//- Закрытие зума
function popupZoomClose() {
    popupZoom.classList.remove('active');
}
popupCloseZoom.addEventListener('click', popupZoomClose);



//-> Работа с массивом по добавлению element и действия с ними
let root = document.querySelector('.elements');
const createCard = (card) => {
    const element = document.createElement('div'); //-> Создание и добавление дива в elements
    element.classList.add('element');
    root.prepend(element);

    const elementPic = document.createElement('img'); //-> Создание картинки и
    elementPic.src = card.link;
    elementPic.alt = card.name;
    elementPic.classList.add('element__pic');
    elementPic.addEventListener('click', popupImageInit);
    element.append(elementPic);

    const elementTrash = document.createElement('button'); //-> Кнопка удаления element
    elementTrash.classList.add('element__pic_trash');
    elementTrash.addEventListener('click', removeCard);
    element.append(elementTrash);

    const elementContent = document.createElement('div'); //-> Создание и добавление дива в element
    elementContent.classList.add('element__content');
    element.append(elementContent);

    const elementName = document.createElement('h2'); //-> Создание и добавление имени в див с контентом
    elementName.textContent = card.name;
    elementName.classList.add('element__name');
    elementContent.append(elementName);

    const elementLike = document.createElement('button'); //-> Создание и добавление лайка в див с контентом
    const classList = elementLike.classList;
    classList.add('element__like');
    elementLike.addEventListener('click', toggleLike)
    elementContent.append(elementLike);
}
initialCards.forEach(function(card) { //-> работа с массивом
    createCard(card);
})

const editButton = document.getElementById('profile_edit-button'); //-> Получение элементов по ID
const addButton = document.getElementById('popupButtonAddForm');
const closeForm = document.getElementById('popupCloseAddForm');
const popupAddForm = document.getElementById('popupAddForm');

//-> Открытие попапа добавления
function popupEditOpen(e) {
    e.preventDefault();
    popupAddForm.classList.add('active');
}
//-> Закрытие попапа добавления
function popupEditClose() {
    popupAddForm.classList.remove('active');
}

//-> Функция получения имени и url и невозможности создания пустой карточки
const handlerAddCard = (e) => {
    let name = document.getElementById('input_name').value;
    let link = document.getElementById('input_url').value;
    if (name && link) {
        createCard({ name, link });
        name = '';
        link = '';
        popupEditClose();
        e.preventDefault();
    } else {
        alert('Пожалуйст заполните все поля')
    }
}

editButton.addEventListener('click', popupEditOpen); //-> Оработка событий Создания элемента, Закрытия и Открытия попапа добавления.
closeForm.addEventListener('click', popupEditClose);
addButton.addEventListener('click', handlerAddCard);