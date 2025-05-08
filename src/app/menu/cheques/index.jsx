// import { useState } from 'react';
import { Card, Form, Input, Button, Row, Col, Typography } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { imprimirChequeAoPortador } from './impressao';
import Menu from "../../../components/menu";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.vfs

const { Title } = Typography;

export default function Cheques() {
  const [form] = Form.useForm();
  const initialValues = {
    valor: '',
    valorPorExtenso: '',
    cidade: 'Belo Horizonte',
    data: new Date().toLocaleDateString('pt-BR'),
    pagueA: ''
  };


  function convertToFullSTRING(valor) {
    if (!valor || isNaN(valor)) return "zero reais";

    const unidades = ["", "hum", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
    const especiais = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
    const dezenas = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
    const centenas = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];
    
    function converteParte(valor) {
      if (valor < 10) return unidades[valor];
      if (valor < 20) return especiais[valor - 10];
      if (valor < 100) return dezenas[Math.floor(valor / 10)] + (valor % 10 !== 0 ? " e " + unidades[valor % 10] : "");
      if (valor < 1000) return centenas[Math.floor(valor / 100)] + (valor % 100 !== 0 ? " e " + converteParte(valor % 100) : "");
      
      let milhares = Math.floor(valor / 1000);
      let resto = valor % 1000;
      let milharesTexto = milhares === 1 ? "mil" : converteParte(milhares) + " mil";
      let restoTexto = resto !== 0 ? " e " + converteParte(resto) : "";
      
      return milharesTexto + restoTexto;
    }
  
    if (valor === 0) return "zero reais";
    if (valor === 100) return "cem reais";
  
    let valorStr = valor.toFixed(2).replace(".", ",").split(",");
    let inteiro = parseInt(valorStr[0]);
    let centavos = parseInt(valorStr[1]);
  
    let resultado = converteParte(inteiro);
    resultado += inteiro > 1 ? " reais" : " real";
  
    if (centavos > 0) {
      resultado += " e " + converteParte(centavos) + " centavos";
    }
  
    return resultado
  }

  function handleImprimirCheque(values) {
    try {
      const dadosCheque = {
        valor: values.valor,
        valorPorExtenso: values.valorPorExtenso,
        cidade: values.cidade,
        data: values.data,
        pagueA: values.pagueA || "AO PORTADOR"
      };
  
      const documento = imprimirChequeAoPortador(dadosCheque);
      if (documento) {
        pdfMake.createPdf(documento).open({}, window.open('', '_blank'));
      }
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
      // Adicione aqui tratamento de erro adequado
    }
  };

  function handleValuesChange(changedValues, allValues) {
    if (changedValues.valor !== undefined) {
      const valor = parseFloat(changedValues.valor);
      if (!isNaN(valor)) {
        const valorPorExtenso = convertToFullSTRING(valor);
        form.setFieldsValue({ valorPorExtenso });
      }
    }
  }

  function handleBlurValor() {
    const valor = parseFloat(form.getFieldValue('valor'));
    if (!isNaN(valor)) {
      const valorPorExtenso = convertToFullSTRING(valor);
      form.setFieldsValue({ valorPorExtenso });
    }
  }

  return <>
    <div className="container-fluid">
      <div className="row flex-nowrap">

        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
          <Menu page="cheques" />
        </div>

        <div className="col py-3 me-3">
          <Card>
            <Title level={3}>Impressão de Cheques</Title>
            
            <Form
              form={form}
              layout="vertical"
              onFinish={handleImprimirCheque}
              onValuesChange={handleValuesChange}
              initialValues={initialValues}
            >
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="valor"
                    label="Valor"
                    rules={[{ required: true, message: 'Informe o valor' }]}
                  >
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="0,00"
                      onBlur={handleBlurValor} // Atualiza o valor por extenso ao sair do campo
                    />
                  </Form.Item>
                </Col>

                <Col span={16}>
                  <Form.Item
                    name="valorPorExtenso"
                    label="Valor por Extenso"
                    rules={[{ required: true, message: 'Informe o valor por extenso' }]}
                  >
                    <Input placeholder="Ex: Um mil e quinhentos reais" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="cidade"
                    label="Cidade"
                    rules={[{ required: true, message: 'Informe a cidade' }]}
                  >
                    <Input placeholder="Ex: São Paulo" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="data"
                    label="Data"
                    rules={[{ required: true, message: 'Informe a data' }]}
                  >
                    <Input placeholder="Ex: 05 de maio de 2025" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="pagueA"
                    label="Pague a"
                  >
                    <Input placeholder="Deixe em branco para 'AO PORTADOR'" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  icon={<PrinterOutlined />}
                >
                  Imprimir Cheque
                </Button>
              </Form.Item>
            </Form>
          </Card>    
        </div>

      </div>
    </div>
  </>;
}
