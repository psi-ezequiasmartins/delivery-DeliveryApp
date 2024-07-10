export class Impressao {
  
  constructor(dadosParaImpressao) {
    this.dadosParaImpressao = dadosParaImpressao;
  }  

  async PreparaDocumento() {
    const corpoDocumento = this.CriaCorpoDocumento();
    const documento = this.GerarDocumento(corpoDocumento);
    return documento;
  }
  
  CriaCorpoDocumento() {
    const header = [
      { text: 'ID', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Produto', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Descrição', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Vr. Unitário', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
    ];
    const body = this.dadosParaImpressao.map((produto) => {
      return [
        { text: produto.ProdutoID, fontSize: 8 },
        { text: produto.Nome, fontSize: 8 },
        { text: produto.Descricao, fontSize: 8 },
        { text: produto.VrUnitario, fontSize: 8 },
      ];
    });
    const lineHeader = [
      { text:
          '__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
        alignment: 'center',
        fontSize: 5,
        colSpan: 3,
      },
      {},
      {},
    ];

    let content = [header, lineHeader];
    content = [...content, ...body];
    return content;
  }

  GerarDocumento(corpoDocumento) {
    const documento = {
      pageSize: 'A4',
      pageMargins: [10, 20, 15, 50],
      header: function () {
        return {
            margin: [15, 15, 15, 0],
            layout: 'noBorders',
            table: {
              widths: ['*'],
              body: [
                [
                  { text: 'LISTAGEM DE PRODUTOS', style: 'reportName' }
                ]
              ],
            },
          };
      },
    content: [
      {
            layout: 'noBorders',
            table: {
              headerRows: 1,
              widths: ['*', 150, 150, 150],
      
              body: corpoDocumento
            }
          },
    ],
    footer(currentPage, pageCount) {
          return {
            layout: 'noBorders',
            margin: [15, 0, 15, 20],
            table: {
              widths: ['auto'],
              body: [
                [
                  {
                    text:
                      '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                    alignment: 'center',
                    fontSize: 5,
                  },
                ],
                [
                  [
                    {
                      text: `Página ${currentPage.toString()} de ${pageCount}`,
                      fontSize: 7,
                      alignment: 'right',
                      /* horizontal, vertical */
                      margin: [3, 0],
                    },
                    {
                      text: '© 1999-2021 PSI-SOFTWARE',
                      fontSize: 7,
                      alignment: 'left',
                    },
                  ],
                ],
              ],
            },
          };
        },
    styles: {
      reportName: {
        fontSize: 9,
        bold: true,
        alignment: 'center',
        margin: [0, 4, 0, 0],
        color:'#145E7D',
      }
    },
    
  };
    return documento;
  }
}