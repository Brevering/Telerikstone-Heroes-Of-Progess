(function () {
    'use strict';
    function loadWelcomeScreen(selector) {
        
        if (!selector || !(selector instanceof HTMLElement)) {
            throw new Error("Invalid HTML element or selector");
        }

        var target=document.getElementById(selector);

        var fragment = document.createDocumentFragment();
        //create form container 
        var form = document.createElement("form");
        //create fieldset
        var fieldSet=document.createElement('fieldset');
        fieldSet.id = "fieldSet";
        
        //create custom error message
        var errorMsg = document.createElement('div');
        errorMsg.id = 'notify';
        errorMsg.style.display = 'none';
        //create input for user name
        var tbUserName = document.createElement("input");
        tbUserName.id = "tb-username";
        tbUserName.type = "text";
        tbUserName.name = "userName";
        tbUserName.placeholder = "Enter nickname";
        tbUserName.pattern = "[A-Za-z0-9]{3,20}";
        tbUserName.required = 'true';
        //if input invalid message pop up
        tbUserName.addEventListener('invalid', onInvalidInput, false);
        //once input is valid message pop up is gonne
        tbUserName.addEventListener('input', onValidInput, false);
        
        //create new line    
        var newLine = document.createElement('br');
        //create button to enter input of username
        var tbButton = document.createElement("input");
        tbButton.id = 'tb-button';
        tbButton.type='submit';
        tbButton.value='Start Game';
        tbButton.innerHTML = 'Start game';
        tbButton.addEventListener("click", onAddButtonClick, false);
        tbButton.style.display = 'inline-block';
                      
        //append all elements of the fieldSet
        fieldSet.appendChild(errorMsg);
        fieldSet.appendChild(tbUserName);
        fieldSet.appendChild(newLine);
        fieldSet.appendChild(tbButton);
        //append all elements of the form
        form.appendChild(fieldSet);
        //append form to fragment
        fragment.appendChild(form);
        //append fragment to the DOM div
        target.appendChild(fragment);

        function onInvalidInput(event) {
            event.preventDefault();
            if (!event.target.validity.valid) {
                errorMsg.innerHTML = 'Username should only contain letters and numbers,min length = 3, max = 20: e.g. <em><strong>John13</strong></em>';
                errorMsg.className = 'error';
                errorMsg.style.display = 'block';
            }
        }
        function onValidInput(event) {
            if ('block' === errorMsg.style.display) {
                tbUserName.className = '';
                errorMsg.style.display = 'none';
            }
        }
        function onAddButtonClick(event) {
         //TODO work on the id.value and how it goes to statistics   
        }

    return {
        loadWelcomeScreen: loadWelcomeScreen
    };
}
} ());