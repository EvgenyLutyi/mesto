const isValidInput = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

// Проверка кнопки
const isButtonDisable = (inputList, formElement) => {
    // Кнопка сохранить
    const buttonElement = formElement.querySelector('.form__submit');
    buttonElement.disabled = false;
    //Если хотя бы одно поле не валидно дизеблим кнопку
    inputList.forEach((inputElement) => {
        if (!inputElement.validity.valid) {
            buttonElement.disabled = true
        }
    })
};

const addValidationListner = (inputList, formElement) => {
    inputList.forEach((inputElement) => {
        //Первичная валидация каждого поля
        // isValidInput(formElement, inputElement);????????????????????????????????????
        inputElement.addEventListener('input', () => {
            // Валидируем поля при каждом вводе
            isValidInput(formElement, inputElement);
            // Валидируем кнопку при каждом вводе
            isButtonDisable(inputList, formElement);
        });
    });
}

const setEventListeners = (formElement, inputSelector) => {
    // все инпуты
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    // Валидируем кнопку при инициализации
    isButtonDisable(inputList, formElement);
    addValidationListner(inputList, formElement);
};

const enableValidation = ({
    formSelector,
    inputSelector,
    creationFormSelector
}) => {
    initPopupValidation(creationFormSelector, inputSelector)
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        // Отменяет очищение формы при нажатии на сабмит
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, inputSelector);
    });
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

function initPopupValidation(formSelector, inputSelector) {
    const formElement = document.getElementById(formSelector);
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonOpenAddPopup = document.querySelector('.profile__edit-button');
    buttonOpenAddPopup.addEventListener('click', () => {
        isButtonDisable(inputList, formElement);
    });
};

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    creationFormSelector: 'createElementForm',
});