document.addEventListener("DOMContentLoaded", function () {
    const myOpcContainers = document.querySelectorAll('.cbs-select');

    myOpcContainers.forEach(myOpcContainer => {
        const btnSelect = myOpcContainer.querySelector('.cbs-btn');
        const mySelectOpc = myOpcContainer.querySelector('.cbs-main-container');
        const myFilterInput = myOpcContainer.querySelector('.cbs-search');
        const checkBoxFields = myOpcContainer.querySelectorAll('.cbs-field');
        const btnSelectText = myOpcContainer.querySelector('.cbs-btn-text')

        const selectedItemsContainer = myOpcContainer.querySelector('.cbs-selected');
        

        let rotation = -180;

        

        // Toggle dropdown on button click
        btnSelect.addEventListener('click', () => {
            openCloseMenu(myOpcContainer, btnSelect, mySelectOpc, myFilterInput);
        });

        function rotateArrow(button) {
            const btnArrow = button.querySelector('.btn-arrow');
                
            btnArrow.style.transform = `rotate(${rotation}deg)`;
            rotation = rotation === 0 ? -180 : 0;
            
        }

        function openCloseMenu(container, button, dropdown, filterInput) {

            
        
            dropdown.classList.toggle('active');
            scrollToTop(container, '.cbs-items');

            rotateArrow(button);
            

            // Clear filter input and show all options when opening
            if (dropdown.classList.contains('active')) {
                filterInput.value = "";
                showAllOptions(container);
                
                

                // button.innerHTML = `${btnSelectText} <span class="btn-arrow triangle-up">&#9650;</span>`;
            } else {
                // button.innerHTML = `${btnSelectText} <span class="btn-arrow triangle-down">&#9660;</span>`;
            }
        }

        // Filter options based on input
        myFilterInput.addEventListener('input', function () {
            let filterValue = this.value.toLowerCase();
            let labels = myOpcContainer.querySelectorAll('.cbs-label');

            labels.forEach(function (label) {
                let labelText = label.querySelector('.field-name').textContent.toLowerCase();

                if (labelText.includes(filterValue)) {
                    label.style.display = 'flex';
                } else {
                    label.style.display = 'none';
                }
            });
        });


        // Update Container with buttons of checked checkBoxes
        function updateSelecetdItemsContainer() {
            selectedItemsContainer.innerHTML = '';
            let selectedItemsCounter = 0;
        
            checkBoxFields.forEach((el, id) => {
                if (el.checked) {
                    const label = el.closest('.cbs-label');
                    const labelText = label.querySelector('.field-name').textContent;
                    createSelectedCheckBoxButton(labelText, id);
                    selectedItemsCounter++;
                }
            });

            btnSelectText.textContent = selectedItemsCounter > 0 ? `${selectedItemsCounter} Fields Selected` : "Escolher:";
        
            selectedItemsContainer.style.display = selectedItemsCounter > 0 ? 'block' : 'none';
        }


        // 
        checkBoxFields.forEach((el, id) => {
            el.addEventListener('change', () => {
                updateSelecetdItemsContainer();
                
            });
        });

        // Create Selected CheckBox Button
        function createSelectedCheckBoxButton(text, id) {
            const btn = document.createElement('button');
            btn.classList.add('cbs-selected-btn');
            btn.innerHTML = text + ' <i class="bi bi-x-circle"></i>';
        
            btn.addEventListener('click', () => {
                removeSelectedItem(btn, id);
            });
        
            selectedItemsContainer.appendChild(btn);
            selectedItemsContainer.style.display = 'block';
        }


        function removeSelectedItem(btn, id) {
            btn.remove();
            checkBoxFields[id].checked = false;
            updateSelecetdItemsContainer();
        }


        // Close dropdown when clicking outside
        function closeOnClickOutside(event) {
            if (!myOpcContainer.contains(event.target) && mySelectOpc.classList.contains('active')) {
                scrollToTop(myOpcContainer, '.cbs-items');
                openCloseMenu(myOpcContainer, btnSelect, mySelectOpc, myFilterInput);
            }
        }

        document.addEventListener('click', closeOnClickOutside);

        // Function to show all options
        function showAllOptions(container) {
            const labels = container.querySelectorAll('.cbs-items > .cbs-label');
            labels.forEach(function (label) {
                label.style.display = 'flex';
            });
        }

        // Scroll to top function with delay
        function scrollToTop(container, selector) {
            const element = container.querySelector(selector);
            if (element) {
                setTimeout(() => {
                    element.scrollTop = 0; // Set scroll position to top after 0.3 seconds
                    showAllOptions(container);
                    myFilterInput.value = "";
                }, 300); // 300 milliseconds (0.3 seconds)
            }
        }
    });
});


