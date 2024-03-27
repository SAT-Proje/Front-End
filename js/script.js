const hearts = document.querySelectorAll('.fa-heart');

for (let i=0; i<hearts.length; i++) {
    hearts[i].addEventListener('mouseover',() => {
        let classValue = hearts[i].className;
        classValue = classValue.replace(new RegExp("fa-regular", "g"), "");
        classValue += " fa-solid";
        hearts[i].className = classValue;
    });
    hearts[i].addEventListener('mouseout',() => {
        let classValue = hearts[i].className;
        classValue = classValue.replace(new RegExp("fa-solid", "g"), "");
        classValue += " fa-regular";
        hearts[i].className = classValue;
    });
}

