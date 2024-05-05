// custom-form.js

function maskPhoneNumber(value) {
  if(!value) { 
    return '' 
  } else { 
    return value.replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(value[5] !== "9" ? /(\d{4})(\d)/ : /(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)/, '$1')
  }
}

function applyPhoneNumberMask(input) {
  input.value = maskPhoneNumber(input.value)
}

async function formTelegram() {
  // const { value: formValues } = 
  await Swal.fire({
    title: 'Contato via Telegram',
    html: 
      '<p>Por favor, informe seu Nome e Telefone</p>'+
      '<input id="swal-input1" class="swal2-input" placeholder="Nome" >' +
      '<input id="swal-input2" class="swal2-input" placeholder="Telefone" oninput="applyPhoneNumberMask(this)" >',
    showCancelButton: true,
    cancelButtonText: 'CANCELAR',
    focusConfirm: false,
    preConfirm: () => {
      const FullName = Swal.getPopup().querySelector('#swal-input1').value;
      const TelephoneNumber = Swal.getPopup().querySelector('#swal-input2').value;
      if (!FullName || !TelephoneNumber) {
        Swal.showValidationMessage('Por favor, preencha o Nome e Telefone!');
      }
      return { nome: FullName, telefone: TelephoneNumber };
    }
  }).then(async(result) => {
    if (result.isConfirmed) {
      const nome = result.value.nome;
      const telefone = result.value.telefone;
      // Enviando os dados para o servidor Node.js
      const response = await fetch('https://srv.deliverybairro.com/send-message', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, telefone }),
      });
      if (response.ok) {
        // Redirecione para a API do WhatsApp
        window.location.href = `https://t.me/psi_software`;
      }
    // } else if (formValues) {
    //   Swal.fire(JSON.stringify(formValues));
    }
  })
}

async function formWhatsApp() {
  const { value: formValues } = await Swal.fire({
    title: 'Contato via WhatsApp',
    html: 
      '<p>Por favor, informe seu Nome e Telefone</p>'+
      '<input id="swal-input1" class="swal2-input" placeholder="Nome" >' +
      '<input id="swal-input2" class="swal2-input" placeholder="Telefone" oninput="applyPhoneNumberMask(this)" >',
    showCancelButton: true,
    cancelButtonText: 'CANCELAR',
    focusConfirm: false,
    preConfirm: () => {
      const FullName = Swal.getPopup().querySelector('#swal-input1').value;
      const TelephoneNumber = Swal.getPopup().querySelector('#swal-input2').value;
      if (!FullName || !TelephoneNumber) {
        Swal.showValidationMessage('Por favor, preencha o Nome e Telefone!');
      }
      return { nome: FullName, telefone: TelephoneNumber };
    }
  }).then(async(result) => {
    if (result.isConfirmed) {
      const nome = result.value.nome;
      const telefone = result.value.telefone;
      // Enviando os dados para o servidor Node.js
      const response = await fetch('https://srv.deliverybairro.com/send-message', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, telefone }),
      });
      if (response.ok) {
        // Redirecione para a API do WhatsApp
        window.location.href = `https://api.whatsapp.com/send?phone=5531984107540&text=Olá! Meu nome é ${nome}, gostaria de mais informações por favor. (clique aqui p/ enviar) ->`;
      }
    } else if (formValues) {
      Swal.fire(JSON.stringify(formValues));
    }
  })
}

