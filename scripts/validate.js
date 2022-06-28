const isValidInput = (formElement, inputElement, inputError, inputErrorActive) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputError, inputErrorActive);
    } else {
        hideInputError(formElement, inputElement, inputError, inputErrorActive);
    }
};

const showInputError = (formElement, inputElement, errorMessage, inputError, inputErrorActive) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(inputErrorActive);
};

const hideInputError = (formElement, inputElement, inputError, inputErrorActive) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputError);
    errorElement.classList.remove(inputErrorActive);
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

const addValidationListner = (inputList, formElement, inputError, inputErrorActive) => {
    inputList.forEach((inputElement) => {
        //Первичная валидация каждого поля
        // isValidInput(formElement, inputElement);????????????????????????????????????
        inputElement.addEventListener('input', () => {
            // Валидируем поля при каждом вводе
            isValidInput(formElement, inputElement, inputError, inputErrorActive);
            // Валидируем кнопку при каждом вводе
            isButtonDisable(inputList, formElement);
        });
    });
}

const setEventListeners = (formElement, inputSelector, inputError, inputErrorActive) => {
    // все инпуты
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    // Валидируем кнопку при инициализации
    isButtonDisable(inputList, formElement);
    addValidationListner(inputList, formElement, inputError, inputErrorActive);
};

const enableValidation = ({
    formSelector,
    inputSelector,
    creationFormSelector,
    inputError,
    inputErrorActive
}) => {
    initPopupValidation(creationFormSelector, inputSelector)
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        // Отменяет очищение формы при нажатии на сабмит
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, inputSelector, inputError, inputErrorActive);
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
    inputError: 'popup__input_type_error',
    inputErrorActive: 'form__input-error_active'
});