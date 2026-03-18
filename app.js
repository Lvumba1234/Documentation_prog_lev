/**
 * Получаем все кнопки игрового поля (9 клеток)
 */
let boxes = document.querySelectorAll(".box");

/**
 * Кнопки управления игрой
 */
let resetBtn = document.querySelector("#reset-btn"); // кнопка сброса
let newGameButton = document.querySelector("#new-btn"); // новая игра

/**
 * Элементы для показа сообщений
 */
let msgContainer = document.querySelector(".msg-container"); // контейнер победителя
let msgContainer2 = document.querySelector(".msg-container2"); // (похоже не используется)
let msg = document.querySelector("#msg"); // текст сообщения
let msg2 = document.querySelector("#msg2"); // (не используется)

/**
 * Основной контейнер игры
 */
let container = document.querySelector(".container");

/**
 * Счётчик ходов (максимум 9)
 */
let count = 0;

/**
 * Чей сейчас ход
 * true = O, false = X
 */
let turnO = true;

/**
 * Все возможные выигрышные комбинации
 */
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
];

/**
 * Сброс игры
 * - очищает поле
 * - сбрасывает ход
 * - показывает игру заново
 */
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    container.classList.remove("hide");
}

/**
 * Обработка клика по клетке
 */
boxes.forEach((box) => {
    box.addEventListener("click", () => {

        // если игра закончена — ничего не делаем
        if (count === 9 || checkWinner()) {
            return;
        }

        /**
         * Ставим символ (O или X)
         */
        if (turnO) {
            box.innerText = "O";
            box.style.color = "white";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "cyan";
            turnO = true;
        }

        // блокируем клетку после хода
        box.disabled = true;

        // увеличиваем счётчик ходов
        count++;

        // проверяем победителя
        let isWinner = checkWinner();

        // если все клетки заполнены — ничья
        if (count === 9) {
            drawGame();
        }
    });
});

/**
 * Блокирует все клетки
 */
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

/**
 * Включает все клетки и очищает их
 */
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

/**
 * Показывает победителя
 * @param {string} winner - "X" или "O"
 */
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    container.classList.add("hide");

    // (этот код выглядит лишним или недописанным)
    if (hideDisplay == "inline") {
        hide2.style.display = "none";
    }

    disableBoxes();
}

/**
 * Проверяет ничью
 */
const drawGame = () => {
    if (!checkWinner()) {
        msg.innerText = "This Game is a Draw.";
        msgContainer.classList.remove("hide");
        container.classList.add("hide");
        disableBoxes();
    }
}

/**
 * Проверяет, есть ли победитель
 * @returns {boolean} true если есть победитель
 */
const checkWinner = () => {
    for (let pattern of winPatterns) {

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        // проверяем, что клетки не пустые
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {

            // если все одинаковые — победа
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner is ", pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

/**
 * Кнопки запуска новой игры и сброса
 */
newGameButton.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
