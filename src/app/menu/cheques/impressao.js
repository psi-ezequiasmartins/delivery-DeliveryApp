export function imprimirChequeAoPortador(dadosParaImpressao) {
  if (!dadosParaImpressao) {
    console.warn('Nenhum dado disponível para criar o cheque.');
    return null;
  }

  const documento = {
    pageSize: { width: 600, height: 250 },
    pageMargins: [0, 0, 0, 0],
    content: [
      {
        text: `R$ ${parseFloat(dadosParaImpressao.valor).toFixed(2).replace('.', ',')}`,
        absolutePosition: { x: 470, y: 25 },
        fontSize: 13
      },
      {
        text: dadosParaImpressao.valorPorExtenso,
        absolutePosition: { x: 50, y: 45 },
        fontSize: 12
      },
      {
        text: `${dadosParaImpressao.cidade}, ${dadosParaImpressao.data}`,
        absolutePosition: { x: 50, y: 85 },
        fontSize: 12
      },
      {
        text: dadosParaImpressao.pagueA || "AO PORTADOR",
        absolutePosition: { x: 50, y: 105 },
        fontSize: 12
      }
    ],
    // defaultStyle: {
    //   font: 'Helvetica'
    // }
  };

  return documento;
}