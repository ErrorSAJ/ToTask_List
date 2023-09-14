document.addEventListener("DOMContentLoaded", () => {
    activeCheckStatus();
    displayItems();
    // clearitems();
});
let taskVal = document.querySelector('#task');
let addBtn = document.querySelector('.add_btn');
let ulContent = document.querySelector('.conten_task');
let itemsArray = JSON.parse(localStorage.getItem("items")) ?? [];


console.log(itemsArray);
addBtn.addEventListener("click", () => {
    let item = taskVal
    createItem(item)
});
function createItem(item) {
    if (item.value == '') {
        alert('text some thing');
    }
    else {
        itemsArray.push(item.value)
    }
    localStorage.setItem("items", JSON.stringify(itemsArray));
    location.reload();
}
function displayItems() {
    let items = "";
    for (let i = 0; i < itemsArray.length; i++) {
        items += `<li><span class="status"><ion-icon class ="tick" name="checkmark-done-outline"id=""></ion-icon></span>
                <div class="text_Task">${itemsArray[i]}</div>
                <span class="delet_Task"><ion-icon name="trash-outline"></ion-icon></span>                    
            </li>`
    }
    ulContent.innerHTML = items;
    activedeleteItems();
    activeCheckStatus();
}

function activeCheckStatus() {
    let icons = document.querySelectorAll('ion-icon');

    icons.forEach((icon, i) => {
        const iconId = i; // Use a unique identifier (e.g., the icon's id attribute)

        // Check localStorage for the icon's previous status
        const isChecked = localStorage.getItem(iconId) === "true";

        if (isChecked) {
            icon.classList.add("checked");
        }

        icon.addEventListener("click", () => {
            icon.classList.toggle("checked");

            localStorage.setItem(iconId, icon.classList.contains("checked"));
        });
    });
}


function activedeleteItems() {
    let deletBtn = document.querySelectorAll('.delet_Task');

    deletBtn.forEach((delBtn, i) => {
        delBtn.addEventListener("click", () => { deleteItems(i) })
    })
}
function deleteItems(i) {
    itemsArray.splice(i, 1)
    localStorage.setItem("items", JSON.stringify(itemsArray));
    location.reload();
}




function clearitems() {
    localStorage.clear()
}
