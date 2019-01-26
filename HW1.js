"use strict";

const chess = {
    gameContainerEl: document.getElementById('game'),
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
};

// Запускаем метод render.
chess.render();