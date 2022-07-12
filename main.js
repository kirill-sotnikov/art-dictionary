// Находим на странице элемент с классом buttonAdd
const buttonAdd = document.querySelector(".buttonAdd");
const loginFormBlock = document.querySelector(".loginFormBlock");
const loginFormButton = document.querySelector(".loginFormButton");

// Находим на странице элемент с идентификатором (id) username
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const addBanner = document.querySelector(".addBanner");
const butNo = document.querySelector("#No");
const butAdd = document.querySelector("#Add");
const inputTranslate = document.querySelector("#inputTranslate");
const inputWord = document.querySelector("#inputWord");
const workList = document.querySelector(".worklist");

/**
 * Элементу loginFormButton вешаем слушатель на нажатие (данный элемент будет
 * выполнять код, написанный в {}, когда на него нажмут)
 */
loginFormButton.addEventListener("click", () => {
  if (username.value === "user" && password.value === "123") {
    // показываем элемент workList при нажатии, если правильный логин и пароль
    workList.style.display = "block";
    // скрываем элемент loginFormBlock при нажатии, если правильный логин и пароль
    loginFormBlock.style.display = "none";
    // показываем элемент buttonAdd при нажатии, если правильный логин и пароль
    buttonAdd.style.display = "block";
  } else {
    alert("Неверный логин или пароль");
    // Стираем значение написанные в поле ввода логина, если он не верный
    username.value = "";
    // Стираем значение написанные в поле ввода пароля, если он не верный
    password.value = "";
  }
});

buttonAdd.addEventListener("click", () => {
  // скрываем элемент buttonAdd при нажатии
  buttonAdd.style.display = "none";
  // показываем элемент addBanner при нажатии
  addBanner.style.display = "block";
});

butNo.addEventListener("click", () => {
  // показываем элемент buttonAdd при нажатии
  buttonAdd.style.display = "block";
  // скрываем элемент addBanner при нажатии
  addBanner.style.display = "none";
  // стираем значение ранее введенное в поле ввода слова
  inputWord.value = "";
  // стираем значение ранее введенное в поле ввода перевода слова
  inputTranslate.value = "";
});

butAdd.addEventListener("click", () => {
  if (
    // Делаем проверку введенной пары слова, чтобы не добавить пустое значение
    inputWord.value === "" ||
    inputTranslate.value === "" ||
    !inputTranslate.value.trim() ||
    !inputWord.value.trim()
  ) {
    return false;
  } else {
    // Добавляем пару слова в локальное хранилище браузера
    localStorage.setItem(inputWord.value.trim(), inputTranslate.value.trim());
  }
  // стираем значение ранее введенное в поле ввода слова
  inputWord.value = "";
  // стираем значение ранее введенное в поле ввода перевода слова
  inputTranslate.value = "";
  buttonAdd.style.display = "block";
  addBanner.style.display = "none";
  // Создаем список табличек, которые отображаются на странице
  buildWorkList();
});

document.addEventListener("click", (item) => {
  if (
    /** Если на странице нажимаем на элемент, который содержит класс buttonShow
     * и не содержит id Add и No, тогда при нажатии на кнопку Show показываем
     * перевод слова
     *  */
    item.target.classList.contains("buttonShow") &&
    item.target.id != "Add" &&
    item.target.id != "No"
  ) {
    if (item.target.innerHTML == "Show") {
      // Родитель элемента
      let itemParent = item.target.parentNode.parentNode.firstElementChild;
      // Создаем элемент текст (translate) на странице
      const translate = document.createElement("p");
      // В ранее созданный элемент (translate) записываем перевод слова
      translate.innerHTML = `${
        localStorage[itemParent.firstElementChild.innerHTML]
      }`;
      // Добавляем новый класс для translate
      translate.classList.add("blockWithoutTranslateText");
      // Добавляем элемент translate на страницу
      itemParent.append(translate);
      // При нажатии на кнопку show меняем ее текст на Hide
      item.target.innerHTML = "Hide";
    } else if (item.target.innerHTML == "Hide") {
      let itemParent = item.target.parentNode.parentNode.firstElementChild;
      // Выводим в консоль последний элемент родительского элемента
      console.log(itemParent.lastElementChild);
      // Скрываем перевод слова
      itemParent.removeChild(itemParent.lastElementChild);
      // Меняем текст кнопки с Show на Hide
      item.target.innerHTML = "Show";
    }
  }
});

document.addEventListener("click", (item) => {
  let delItemParent =
    item.target.parentNode.parentNode.firstElementChild.firstElementChild;

  // Нажатие на кнопку крестик (удаляем пару слово-перевод)
  if (item.target.classList.contains("buttonDel")) {
    // Удаляем пару слово-перевод со странице
    item.target.parentNode.parentNode.parentNode.removeChild(
      item.target.parentNode.parentNode
    );
    // Удаляем пару слово-перевод из локального хранилища браузера
    localStorage.removeItem(`${delItemParent.innerHTML}`);
  }
});

// Создаем список табличек, которые отображаются на странице
buildWorkList();

// Создаем функцию, которая будет создавать карточки (слово-перевод) на странице
function buildWorkList() {
  // Стираем все карточки со страницы
  workList.innerHTML = "";
  // Создаем цикл, перебирая все пары
  for (let i = 0; i < localStorage.length; i++) {
    // Создаем элемент
    const newBlock = document.createElement("div");
    // Добавляем ему класс blockWithoutTranslate
    newBlock.classList.add("blockWithoutTranslate");
    // Присваиваем ему данное значение
    newBlock.innerHTML = `<div style="display: inline-block;">
        <p class="blockWithoutTranslateText">${localStorage.key(i)}</p>
    </div>
    <div style="display: inline-block;">
        <button class="buttonDel" style="margin-left: 195px;">X</button>
        <button class="buttonShow" style="margin-left: 4px;">Show</button>
    </div>`;
    // Добавляем данный элемент на страницу
    workList.append(newBlock);
  }
}
