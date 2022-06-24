const formElement = document.querySelector('.form');
const formInput = document.querySelectorAll('.form__input');
const formError = formElement.querySelector(`.${formInput.id}-error`);



const isValidInput = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

// Проверка кнопки
const isButtonDisable = (inputList, formElement) => {
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
        isValidInput(formElement, inputElement);
        inputElement.addEventListener('input', () => {
            // Валидируем поля при каждом вводе
            isValidInput(formElement, inputElement);
            // Валидируем кнопку при каждом вводе
            isButtonDisable(inputList, formElement);
        });
    });

}


const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    // Валидируем кнопку при инициализации
    isButtonDisable(inputList, formElement);
    addValidationListner(inputList, formElement);
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
        // Отменяет очищение формы при нажатии на сабмит
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement);
    });
};

enableValidation();


// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};