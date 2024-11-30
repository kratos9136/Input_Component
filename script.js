// Input Component Builder
function createInputComponent(type, options = {}) {
    const { label, placeholder, name, optionsList } = options;
  
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';
  
    // Create Label
    if (label) {
      const inputLabel = document.createElement('label');
      inputLabel.textContent = label;
      formGroup.appendChild(inputLabel);
    }
  
    // Create Input Types
    switch (type) {
      case 'text':
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.placeholder = placeholder || '';
        textInput.name = name || '';
        formGroup.appendChild(textInput);
        break;
  
      case 'textarea':
        const textarea = document.createElement('textarea');
        textarea.placeholder = placeholder || '';
        textarea.name = name || '';
        formGroup.appendChild(textarea);
        break;
  
      case 'checkbox':
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = name || '';
        formGroup.appendChild(checkbox);
        break;
  
      case 'radio':
        if (optionsList && Array.isArray(optionsList)) {
          optionsList.forEach(opt => {
            const radioContainer = document.createElement('div');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = name || '';
            radio.value = opt;
  
            const radioLabel = document.createElement('label');
            radioLabel.textContent = opt;
  
            radioContainer.appendChild(radio);
            radioContainer.appendChild(radioLabel);
            formGroup.appendChild(radioContainer);
          });
        }
        break;
    }
  
    return formGroup;
  }
  
  // Initialize Form Elements
  document.addEventListener('DOMContentLoaded', () => {
    const formElements = document.querySelectorAll('#formElements > div');
    const form = document.getElementById('sharedForm');
  
    formElements.forEach(element => {
      const type = element.getAttribute('data-type');
      const label = element.getAttribute('data-label');
      const placeholder = element.getAttribute('data-placeholder');
      const name = element.getAttribute('data-name');
      const options = JSON.parse(element.getAttribute('data-options') || '[]');
  
      const inputComponent = createInputComponent(type, { label, placeholder, name, optionsList: options });
      element.appendChild(inputComponent);
    });
  
    //  form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const formData = new FormData(form);
      console.log('Form Data:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
  
      alert('Form submitted! Check the console for details.');
    });
  });
  