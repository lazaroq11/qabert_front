const contextInput = document.getElementById('context');
const setContextButton = document.getElementById('set-context');
const userInputInput = document.getElementById('user-input');
const sendQuestionButton = document.getElementById('send-question');
const chatMessages = document.getElementById('chat-messages');
const statusMessage = document.getElementById('status-message');
const instructionsButton = document.getElementById('instructions-button');
const instructionsModal = document.getElementById('instructions-modal');
const closeModalButton = document.getElementById('close-modal');

function validateContext() {
    const contextText = contextInput.value;

    if (!contextText.trim()) {
        document.getElementById('context-error').textContent = 'Por favor, insira um contexto válido.';
        return false;
    } else {
        document.getElementById('context-error').textContent = '';
        return true;
    }
}

function validateUserInput() {
    const userInputText = userInputInput.value;


    if (!userInputText.trim()) {
        document.getElementById('user-input-error').textContent = 'Por favor, insira uma pergunta válida.';
        return false;
    } else {
        document.getElementById('user-input-error').textContent = '';
        return true;
    }
}

function setContext() {
    if (!validateContext()) {
        return;
    }

    const contextText = contextInput.value;

    fetch('http://127.0.0.1:5000/set_context', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            context: contextText
        })
    })
    .then(response => response.json())
    .then(data => {
        statusMessage.textContent = data.message; 
    });
}

function sendQuestion() {
    if (!validateUserInput()) {
        return;
    }

    const userInputText = userInputInput.value;
    const modelType = 'qa'; 

    fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_input: userInputText,
            model_type: modelType
        })
    })
    .then(response => response.json())
    .then(data => {
        const responseText = data.response;
        const messageElement = document.createElement('p');
        messageElement.textContent = `Resposta: ${responseText}`;
        chatMessages.appendChild(messageElement);
        userInputInput.value = '';

     
        statusMessage.textContent = '';
    });
}


instructionsButton.addEventListener('click', () => {
    instructionsModal.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
    instructionsModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === instructionsModal) {
        instructionsModal.style.display = 'none';
    }
});
setContextButton.addEventListener('click', setContext);
sendQuestionButton.addEventListener('click', sendQuestion);
