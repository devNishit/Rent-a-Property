
// set selected in edit DropDown
    let editDropDown = document.querySelectorAll('.editDropDown option');
    
    for (const option of editDropDown) {
        
        if(option.value == editListCategory ){
            option.setAttribute("selected","selected");
        } else{
            option.removeAttribute("selected");
        }
    }