export function imprimirChequeAoPortador(dadosParaImpressao) {
  if (!dadosParaImpressao) {
    console.warn('Nenhum dado disponível para criar o cheque.');
    return null;
  }

  // Função para formatar a data
  function formatarData(data) {
    const meses = [
      "JANEIRO  ", "FEVEREIRO", "MARÇO    ", 
      "ABRIL    ", "MAIO     ", "JUNHO    ",
      "JULHO    ", "AGOSTO   ", "SETEMBRO ", 
      "OUTUBRO  ", "NOVEMBRO ", "DEZEMBRO "
    ];

    const partes = data.split('/');
    const dia = partes[0];
    const mes = meses[parseInt(partes[1], 10) - 1];
    const ano = partes[2];

    // Adiciona 13 espaços entre os componentes da data
    return `${dia}             ${mes}             ${ano}`;
  }

  const documento = {
    pageSize: { width: 493, height: 216 }, // Dimensões do formulário em pontos
    pageMargins: [14, 0, 0, 0], // Margem esquerda de 5 mm (14.17325 pontos)
    content: [
      {
        text: `R$ ${parseFloat(dadosParaImpressao.valor)
          .toFixed(2)
          .replace('.', ',')
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`, // Formata o valor com separador de milhares
        // absolutePosition: { x: 470, y: 25 },
        absolutePosition: { x: 396, y: 20 },
        fontSize: 13
      },
      {
        text: dadosParaImpressao.valorPorExtenso,
        absolutePosition: { x: 99, y: 38 },
        fontSize: 12
      },
      {
        text: dadosParaImpressao.pagueA || "AO PORTADOR",
        absolutePosition: { x: 23, y: 70 },
        fontSize: 12
      },
      {
        text: `${dadosParaImpressao.cidade},   ${formatarData(dadosParaImpressao.data)}`, // Formata a data
        absolutePosition: { x: 212, y: 90 },
        fontSize: 12
      },
    ],
    defaultStyle: {
      font: 'Roboto'
    }
  };

  return documento;
}
