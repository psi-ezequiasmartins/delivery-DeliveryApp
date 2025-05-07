// import { useState } from 'react';
import { Card, Form, Input, Button, Row, Col, Typography } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { imprimirChequeAoPortador } from './impressao';
import Menu from "../../../components/menu";
import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
