"use strict";

const chess = {
    gameContainerEl: document.getElementById('game'),
    figures: [
        {name: 'p', color: 'W', pos: 'a2'},
        {name: 'p', color: 'W', pos: 'b2'},
        {name: 'p', color: 'W', pos: 'c2'},
        {name: 'p', color: 'W', pos: 'd2'},
        {name: 'p', color: 'W', pos: 'e2'},
        {name: 'p', color: 'W', pos: 'f2'},
        {name: 'p', color: 'W', pos: 'g2'},
        {name: 'p', color: 'W', pos: 'h2'},
        {name: 'R', color: 'W', pos: 'a1'},
        {name: 'R', color: 'W', pos: 'h1'},
        {name: 'H', color: 'W', pos: 'b1'},
        {name: 'H', color: 'W', pos: 'g1'},
        {name: 'B', color: 'W', pos: 'c1'},
        {name: 'B', color: 'W', pos: 'f1'},
        {name: 'Q', color: 'W', pos: 'd1'},
        {name: 'K', color: 'W', pos: 'e1'},
        {name: 'p', color: 'B', pos: 'a7'},
        {name: 'p', color: 'B', pos: 'b7'},
        {name: 'p', color: 'B', pos: 'c7'},
        {name: 'p', color: 'B', pos: 'e7'},
        {name: 'p', color: 'B', pos: 'd7'},
        {name: 'p', color: 'B', pos: 'f7'},
        {name: 'p', color: 'B', pos: 'g7'},
        {name: 'p', color: 'B', pos: 'h7'},
        {name: 'R', color: 'B', pos: 'a8'},
        {name: 'R', color: 'B', pos: 'h8'},
        {name: 'H', color: 'B', pos: 'b8'},
        {name: 'H', color: 'B', pos: 'g8'},
        {name: 'B', color: 'B', pos: 'c8'},
        {name: 'B', color: 'B', pos: 'f8'},
        {name: 'Q', color: 'B', pos: 'd8'},
        {name: 'K', color: 'B', pos: 'e8'},
    ],
    figureHtml: {
        pW: '&#9817;',
        RW: '&#9814;',
        HW: '&#9816;',
        BW: '&#9815;',
        QW: '&#9813;',
        KW: '&#9812;',
        pB: '&#9823;',
        RB: '&#9820;',
        HB: '&#9822;',
        BB: '&#9821;',
        QB: '&#9819;',
        KB: '&#9818;',
    },


    render() {
        // Названия колонок
        const cols = [0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 0];
        // Названия рядов
        const rows = [0, 8, 7, 6, 5, 4, 3, 2, 1, 0];


        // Цикл для строк
        for (let row = 0; row < 10; row++) {
            // Создаем и добавляем строку.
            const tr = document.createElement('tr');
            this.gameContainerEl.appendChild(tr);

            // Добавляем ячейки в строку.
            for (let col = 0; col < 10; col++) {
                // Создаем и добавляем ячейку.
                const td = document.createElement('td');
                tr.appendChild(td);

                // Если строка/столбец первая или последняя по счету, значит выводим буквы в ней.
                // Нули из массива с названиями не выводим.
                if (row === 0 && cols[col] !== 0) {
                    td.innerHTML = cols[col];
                } else if (row === 9 && cols[col] !== 0) {
                    td.innerHTML = cols[col];
                } else if (col === 0 && rows[row] !== 0) {
                    td.innerHTML = rows[row];
                } else if (col === 9 && rows[row] !== 0) {
                    td.innerHTML = rows[row];
                }

                // Проверяем, надо ли покрасить ячейку, передаем строку и колонку.
                if (this.isCellIsBlack(row, col)) {
                    td.style.backgroundColor = 'grey';
                }

                if (row > 0 && row < 3 && col > 0 && col < 9) {
                    td.innerHTML = this.renderFigure(rows[row], cols[col]);
                } else if (row > 6 && row < 9 && col > 0 && col < 9) {
                    td.innerHTML = this.renderFigure(rows[row], cols[col]);
                }
            }
        }
    },

    // Метод определяет нужно ли покрасить ячейку.
    isCellIsBlack(rowNum, colNum) {
        if (rowNum > 0 && rowNum < 9 && colNum > 0 && colNum < 9) {
            return (rowNum + colNum) % 2;
        }
        // Если будет остаток, то он даст true в условии, а если не будет, то 0 даст false в условии.
    },

    renderFigure(rowNum, colNum) {
        for (let figure = 0; figure < this.figures.length; figure++) {
            // Берем одну фигуру, для примера первую.
            const usedFigure = this.figures[figure];
            // Получаем имя фигуры и цвет в одну строку.
            const figureHtmlProperty = usedFigure.name + usedFigure.color;
            // Получаем код фигуры из this.figureHtml используя строку из названия фигуры и ее цвета.
            const figureCode = this.figureHtml[figureHtmlProperty];
            if (usedFigure.pos === colNum + rowNum) {
                return figureCode;
            }
        }
    }
};

// Запускаем метод render.
chess.render();
// chess.renderFigure();