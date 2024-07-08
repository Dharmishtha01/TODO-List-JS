const addItemBtn = document.getElementById('additem')
let btnText = addItemBtn.innerText
const addItemInputField = document.getElementById('itemField')
let displayItem = document.getElementById('records')
let searchField = document.getElementById('searchField')

let itemArray = []
let edit_id = null
let objStr = localStorage.getItem('item')
if (objStr != null) {

    itemArray = JSON.parse(objStr)
}

DisplayItems(itemArray)

// AddButton to add item into list
addItemBtn.onclick = () => {
    const item = addItemInputField.value.trim();
    if (item) {
        // id exist then update exist record
        if (edit_id != null) {
            itemArray[edit_id] = { 'name': item }
            edit_id = null
        } else {
            // add new item
            itemArray.push({ 'name': item })
        }

        SaveItem(itemArray)
        addItemInputField.value = ""
        // change button color
        addItemBtn.innerText = btnText
        addItemBtn.classList.remove('btn-success');
        addItemBtn.classList.add('btn-info')
    } else {
        alert("Add item First")
        addItemInputField.focus();
    }
}

function SaveItem(itemArray) {
    let objToStr = JSON.stringify(itemArray)
    localStorage.setItem("item", objToStr)
    DisplayItems(itemArray)
}

function DisplayItems(items, searchMode = false) {
    if (items.length === 0) {
        if (searchMode) {
            displayItem.innerHTML = document.getElementById('noSearchResultsMsg').innerHTML;
        } else {
            displayItem.innerHTML = document.getElementById('noItemsMsg').innerHTML;
        }
    } else {
        let itemRow = ''
        items.forEach((item, index) => {
            itemRow += `<tr>
            <th scope="row">${index + 1}</th>
            <td>${item.name}</td>
            <td><i class="btn text-white fa fa-edit btn-info" onClick='EditItem(${index})'> Edit</i> 
                <i class="btn btn-danger text-white fa fa-trash" onClick='DeleteItem(${index})'> Delete</i>
            </td>
          </tr>`
        })
        displayItem.innerHTML = itemRow
    }
}

function DeleteItem(id) {
    if (confirm("Are you sure you want to delete this item?")) {
        itemArray.splice(id, 1);
        SaveItem(itemArray);
    }
}

function EditItem(id) {
    edit_id = id
    addItemInputField.value = itemArray[id].name
    addItemBtn.innerText = "save changes"
    addItemBtn.classList.remove('btn-info')
    addItemBtn.classList.add('btn-success')
}

// search functioanlity
searchField.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase()
    if (searchValue === "") {
        DisplayItems(itemArray);
    } else {
        const filteredItems = itemArray.filter((item) => {
            return item.name.toLowerCase().includes(searchValue);
        });
        DisplayItems(filteredItems, true);
    }
})