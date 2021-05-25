let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');

addToDoButton.addEventListener('click', function(){
    var paragraph = document.createElement('p');
    paragraph.classList.add('paragraph-styling')
    paragraph.innerText = inputField.value;
    toDoContainer.appendChild(paragraph);
    inputField.value = "";
    paragraph.addEventListener('click', function(){
        paragraph.style.textDecoration = "line-through";
        paragraph.style.color = "#5a534c";
        paragraph.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
    });
    paragraph.addEventListener('dblclick', function(){
        toDoContainer.removeChild(paragraph);
    });
});