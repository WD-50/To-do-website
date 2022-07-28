const todo = document.querySelector('.list')
var list = ["Sample Item"];
var checkedItems = [];

if (localStorage.getItem('array') !== null){
    list = JSON.parse(localStorage.getItem('array'));
}

if (localStorage.getItem('checkArray') !== null){
    checkedItems = JSON.parse(localStorage.getItem('checkArray'));
}

renderList();

function renderList(){
    todo.innerHTML = "";
    list.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = "item";
        const span1 = document.createElement('span');
        span1.className = "i-content";
        span1.innerText = item;
        const span2 = document.createElement('span');
        span2.className = "i-buttons";
        span2.innerHTML = '<button class="check" onclick="check(this)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg></button><button class="delete" onclick="removeItem('+ index +')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg></button>';
        listItem.appendChild(span1);
        listItem.appendChild(span2);
        todo.appendChild(listItem);
        if (index != 0){
            span1.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                list.splice(index, 1);
                list.splice(index - 1, 0, item);
                renderList();
                updateLS();
            }, false);
        }
        if (index != list.length - 1){
            span1.addEventListener('click', (e) => {
                e.preventDefault();
                list.splice(index, 1);
                list.splice(index + 1, 0, item);
                renderList();
                updateLS();
            }, false);
        }
        if (checkedItems.includes(item)){
            span1.classList.toggle("checked");
            span1.nextElementSibling.firstChild.classList.toggle("checked");
        }
    });
}

function check(but){
    if (but.parentElement.previousElementSibling.classList.contains("checked")){
        const location = checkedItems.indexOf(but.parentElement.parentElement.innerText);
        checkedItems.splice(location, 1);
    }else{
        checkedItems.push(but.parentElement.parentElement.innerText);
    }
    but.parentElement.previousElementSibling.classList.toggle("checked");
    but.classList.toggle("checked");
    updateLS();
}

function removeItem(index){
    list.splice(index, 1);
    renderList();
    updateLS();
}

function addItem(){
    const content = prompt("Enter new todo:");
    if (content.trim() === "") return;
    if (list.includes(content)){
        alert("This list doesnt yet support having 2 identical items at the same time... why even do that?");
        return;
    }
    if (checkedItems.includes(content)){
        const location = checkedItems.indexOf(content);
        checkedItems.splice(location, 1);
    }
    list.push(content);
    renderList();
    updateLS();
}

function updateLS(){
    localStorage.setItem('array', JSON.stringify(list));
    localStorage.setItem('checkArray', JSON.stringify(checkedItems));
}