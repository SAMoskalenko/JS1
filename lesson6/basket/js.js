/**  @property {object} settings Настройки корзины товаров. 
 * @property {{price: number, name: string}[]} goods Список товаров что купил пользователь. 
 * @property {HTMLElement} basketCountEl Место для показа количества товаров. 
 * @property {HTMLElement} basketPriceEl Место для показа цены всех товаров. 
 */
const basket = {
    settings: {
        countSelector: '#basket-count',
        priceSelector: '#basket-price',
    },
    goods: [],
    countEl: null,
    priceEl: null,


    init: function (Settings = {}) {
        Object.assign(this.settings, Settings);

        this.countEl = document.querySelector(this.settings.countSelector);
        this.priceEl = document.querySelector(this.settings.priceSelector);

        const goods = document.querySelectorAll('button');
        for (const good of goods) {
            good.addEventListener('click', event => {
                this.add(event);
                this.render()
            });
        }
    },


    render() {
        this.priceEl.innerHTML = this.getGoodsPrice();
        this.countEl.innerHTML = this.goods.length;
    },


    getGoodsPrice() {
        let goodsPrice = 0;

        for (const el of this.goods) {
            goodsPrice += +el.price;
        }

        return goodsPrice;
    },


    add(event) {
        let good = {};
        good.name = event.target.dataset.name;
        good.price = event.target.dataset.price;
        this.goods.push(good);
    },
};

// Инициализируем корзину при загрузке страницы.
window.onload = () => basket.init();