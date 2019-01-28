"use strict";

/**
 * @property {Object} settings Объект с настройками галереи.
 * @property {string} settings.previewSelector Селектор обертки для миниатюр галереи.
 * @property {string} settings.openedImageWrapperClass Класс для обертки открытой картинки.
 * @property {string} settings.openedImageClass Класс открытой картинки.
 * @property {string} settings.openedImageScreenClass Класс для ширмы открытой картинки.
 * @property {string} settings.openedImageCloseBtnClass Класс для картинки кнопки закрыть.
 * @property {string} settings.openedImageCloseBtnSrc Путь до картинки кнопки открыть.
 */
const gallery = {
    settings: {
        previewSelector: '.mySuperGallery',
        openedImageWrapperClass: 'galleryWrapper',
        openedImageClass: 'galleryWrapper__image',
        openedImageScreenClass: 'galleryWrapper__screen',
        openedImageCloseBtnClass: 'galleryWrapper__close',
        openedImageCloseBtnSrc: 'images/gallery/close.png',
    },

    /**
     * Инициализирует галерею, ставит обработчик события.
     * @param {Object} userSettings Объект настроек для галереи.
     */
    init(userSettings = {}) {
        // Записываем настройки, которые передал пользователь в наши настройки.
        Object.assign(this.settings, userSettings);

        // Находим элемент, где будут превью картинок и ставим обработчик на этот элемент,
        // при клике на этот элемент вызовем функцию containerClickHandler в нашем объекте
        // gallery и передадим туда событие MouseEvent, которое случилось.
        document
            .querySelector(this.settings.previewSelector)
            .addEventListener('click', event => {
                this.containerClickHandler(event);
                gallery.init({eventPicture: event.target});
            });
    },

    /**
     * Обработчик события клика для открытия картинки.
     * @param {MouseEvent} event Событие клики мышью.
     * @param {HTMLElement} event.target Целевой объект, куда был произведен клик.
     */
    containerClickHandler(event) {
        // Если целевой тег не был картинкой, то ничего не делаем, просто завершаем функцию.
        if (event.target.tagName !== 'IMG') {
            return;
        }
        // Открываем картинку с полученным из целевого тега (data-full_image_url аттрибут).
        this.openImage(event.target.dataset.full_image_url);
    },

    /**
     * Открывает картинку.
     * @param {string} src Ссылка на картинку, которую надо открыть.
     */
    openImage(src) {
        // Получаем контейнер для открытой картинки, в нем находим тег img и ставим ему нужный src.
        this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src = src;
    },

    /**
     * Возвращает контейнер для открытой картинки, либо создает такой контейнер, если его еще нет.
     * @returns {Element}
     */
    getScreenContainer() {
        // Получаем контейнер для открытой картинки.
        const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);
        // Если контейнер для открытой картинки существует - возвращаем его.
        if (galleryWrapperElement) {
            return galleryWrapperElement;
        }

        // Возвращаем полученный из метода createScreenContainer контейнер.
        return this.createScreenContainer();
    },

    /**
     * Создает контейнер для открытой картинки.
     * @returns {HTMLElement}
     */
    createScreenContainer() {
        // Создаем сам контейнер-обертку и ставим ему класс.
        const galleryWrapperElement = document.createElement('div');
        galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

        // Создаем контейнер занавеса, ставим ему класс и добавляем в контейнер-обертку.
        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
        galleryWrapperElement.appendChild(galleryScreenElement);

        // Создаем картинку для кнопки закрыть, ставим класс, src и добавляем ее в контейнер-обертку.
        const closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close());
        galleryWrapperElement.appendChild(closeImageElement);

        // Создаем картинку для кнопки влево, ставим класс, src и добавляем ее в контейнер-обертку.
        const letImageElement = new Image();
        letImageElement.classList.add(this.settings.openedImageLeftBtnClass);
        letImageElement.src = this.settings.openedImageLeftBtnSrc;
        letImageElement.addEventListener('click', () => this.getLeftImage());
        galleryWrapperElement.appendChild(letImageElement);

        // Создаем картинку для кнопки вправо, ставим класс, src и добавляем ее в контейнер-обертку.
        const rightImageElement = new Image();
        rightImageElement.classList.add(this.settings.openedImageRightBtnClass);
        rightImageElement.src = this.settings.openedImageRightBtnSrc;
        rightImageElement.addEventListener('click', () => this.getRightImage());
        galleryWrapperElement.appendChild(rightImageElement);


        // Создаем картинку, которую хотим открыть, ставим класс и добавляем ее в контейнер-обертку.
        const image = new Image();
        image.classList.add(this.settings.openedImageClass);
        galleryWrapperElement.appendChild(image);
        //вешаем обработчик на ошибку по выводу большого изображения, если его нет то открываем изображение об ошибке
        image.addEventListener("error", () => image.src = this.settings.openedImageErrorBtnSrc);

        // Добавляем контейнер-обертку в тег body.
        document.body.appendChild(galleryWrapperElement);

        // Возвращаем добавленный в body элемент, наш контейнер-обертку.
        return galleryWrapperElement;
    },

    /**
     * Закрывает (удаляет) контейнер для открытой картинки.
     */
    close() {
        document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
    },

    getRightImage() {
        const images = document.querySelector(this.settings.previewSelector).getElementsByTagName('img');

        const allImages = [];
        let count = 0;
        let num = 0;

        for (const image of images) {
            allImages.push(image);
            count += 1;
            if ((image.src) == (this.settings.eventPicture.src)) {
                num = count;
            }
        }

        if (num === allImages.length) {
            num = 0;
        }

        const nextImage = allImages[num];


        gallery.init({eventPicture: nextImage});
        this.openImage(nextImage.dataset.full_image_url)
    },

    getLeftImage() {
        const images = document.querySelector(this.settings.previewSelector).getElementsByTagName('img');

        const allImages = [];
        let count = 0;
        let num = 0;

        for (const image of images) {
            allImages.push(image);
            count += 1;
            if ((image.src) == (this.settings.eventPicture.src)) {
                num = count - 2;
            }
        }

        if (num < 0) {
            num = allImages.length - 1;
        }

        const prewImage = allImages[num];


        gallery.init({eventPicture: prewImage});
        this.openImage(prewImage.dataset.full_image_url)
    }
};

// Инициализируем нашу галерею при загрузке страницы.
window.onload = () => gallery.init({previewSelector: '.galleryPreviewsContainer'});