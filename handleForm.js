const userLanguage = navigator.language || navigator.userLanguage;
document.getElementById('contactForm').addEventListener('submit', function () {
  // Check if the form inputs meet HTML requirements
  if (this.checkValidity()) {
    // If inputs meet HTML requirements, show the custom alert
    showCustomAlert();
  } else {
    // If inputs don't meet HTML requirements, display browser's default validation messages
    this.reportValidity();
  }
});

function showCustomAlert() {
  let customAlert = document.getElementById('customAlert'); // Seleciona o elemento do alerta
  let customAlertContainer = document.getElementById('customAlertContent');
  if (!customAlert) {
    const customAlertContent = `
        <div id="customAlert" class="custom-alert" style="display: none; opacity: 0;">
          <div id="customAlertContent" class="custom-alert-content" style="scale: 0.5">
            <p id="customAlertMessage">${
              userLanguage.includes('pt')
                ? 'Obrigado por sua mensagem! Entrarei em contato assim que possível.'
                : 'Thank you for your message! I will get back to you as soon as possible.'
            }</p>
            <button id="closeCustomAlert">OK</button>
          </div>
        </div>
      `;

    document.body.insertAdjacentHTML('beforeend', customAlertContent); // Cria e insere o elemento do alerta

    // Atualiza a referência para o elemento do alerta
    customAlert = document.getElementById('customAlert');
    customAlertContainer = document.getElementById('customAlertContent');

    customAlert.style.display = 'flex';

    setTimeout(() => {
      customAlert.style.opacity = 1;
      customAlertContainer.style.opacity = 1;
      customAlertContainer.style.scale = 1;
    }, 100);

    const closeButton = document.getElementById('closeCustomAlert');

    // Adiciona um evento de clique ao botão de fechar o alerta
    closeButton.addEventListener('click', function () {
      // Oculta o alerta personalizado
      customAlertContainer.style.opacity = 0;
      customAlertContainer.style.scale = 0.5;
      customAlert.style.opacity = 0;
      setTimeout(() => {
        customAlert.style.display = 'none';
      }, 500);
    });
    // Seleciona o botão de fechar o alerta
  } else {
    customAlert.style.display = 'flex';
    setTimeout(() => {
      customAlert.style.opacity = 1;
      customAlertContainer.style.opacity = 1;
      customAlertContainer.style.scale = 1;
    }, 100);
  }
}
