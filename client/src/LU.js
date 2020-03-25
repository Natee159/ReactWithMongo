import React, { useState,useEffect } from 'react';
import 'antd/dist/antd.css';
import { Card, Button, Table } from 'antd';
import { Layout, Select,InputNumber } from 'antd';
import { Row, Col } from 'antd';
import axios from 'axios';
const { Option } = Select;
const { Content } = Layout;
function LU() {
  let [n, setn] = useState(3);
  var MatrixA = [];
  var MatrixB = [];
  var ans = [];
  const [data, setdata] = useState(Array(n).fill(0));
  var temp;
  const [getafcs, setgetafcs] = useState();
  const [getMatrixA, setgetMatrixA] = useState();
  let [getMatrixB, setgetMatrixB] = useState()
  let [getN, setgetN] = useState()
  useEffect(() => {
    axios.get("http://192.168.99.100:8080/api/users/showlu").then(res => {
      console.log(res.data);
      console.log(MatrixA, MatrixB, n)
      const tempA = []
      const tempfcs = []
      const tempB = []
      const tempN = []
      for (let i = 0; i < res.data.data.length; i++) {
        tempfcs.push(<Option key={i} value={i} label={res.data.data[i].n}>A : {res.data.data[i].MatrixA} || B: {res.data.data[i].MatrixB} || N: {res.data.data[i].n} </Option>)
        tempA.push(res.data.data[i].MatrixA)
        tempB.push(res.data.data[i].MatrixB)
        tempN.push(res.data.data[i].n)
      }
      setgetafcs(tempfcs)
      setgetMatrixA(tempA)
      setgetMatrixB(tempB)
      setgetN(tempN)
    })
  }, [])
  function changevalue(value) {
    MatrixA=getMatrixA[value]
    MatrixB=getMatrixB[value]
    n=getN[value]
    console.log('Matrix A =', MatrixA)
    console.log('Matrix B =', MatrixB)
    console.log('n =', n)
  }
  const codeLU = () => {
    var i = 0;
    var j = 0;
    var k = 0;
    var X = [0, 0, 0], Y = [0, 0, 0]
    var L = Array.from(Array(3), _ => Array(3).fill(0))
    var U = Array.from(Array(3), _ => Array(3).fill(0))
    for (i = 0; i < MatrixA.length; i++) {
      for (j = 0; j < MatrixA.length; j++) {
        if (j > i) {
          U[i][j] = MatrixA[i][j];
        }
        else {
          if (i == j) {
            U[i][j] = 1;
          }
          L[i][j] = MatrixA[i][j];
        }
      }
    }
    for (k = 0; k < MatrixA.length; k++) {
      for (i = 0; i < MatrixA.length; i++) {
        for (j = 0; j < MatrixA.length; j++) {
          if (i > k) {
            if (j != k) {
              U[k][i] -= L[k][j] * U[j][i];
            }
          }
          else {
            if (j != i) {
              L[k][i] -= L[k][j] * U[j][i];
            }
          }
        }
        if (k >= i) {
          L[k][i] /= U[i][i];
        }
        else {
          U[k][i] /= L[k][k];
        }
      }
    }
    for (i = 0; i < MatrixA.length; i++) {
      Y[i] = (MatrixB[i] / L[i][i]).toFixed(6)
      for (j = i + 1; j < MatrixA.length; j++) {
        MatrixB[j] -= L[j][i] * Y[i];
      }
    }
    for (i = MatrixA.length - 1; i >= 0; i--) {
      X[i] = (Y[i] / U[i][i]).toFixed(6)
      for (j = i - 1; j >= 0; j--) {
        Y[j] -= U[j][i] * X[i];
      }
    }
    console.log(X)
    setdata(X)
  }
  const createInput = () => {
    temp = Array.from(Array(n), _ => Array(n + 1).fill(0))
    MatrixA = Array.from(Array(n), _ => Array(n).fill(0))
    MatrixB = Array(n).fill(0)
    return (
      <div>
        <tr>
          <th></th>
          {createHead()}
          {(n > 0) ? <th>b</th> : ""}
        </tr>
        {createRow()}
      </div>
    );
  }

  const createHead = () => {
    return temp.map((x, j) => <th>x{j + 1}</th>);
  }

  const createRow = () => {
    return temp.map((x, i) => (
      <tr>
        <th>{i + 1}</th>
        {createCol(i)}
      </tr>
    ));
  }

  const createCol = (i) => {
    return temp[0].map((x, j) => (
      <td>
        <InputNumber defaultValue={0} size="small" onChange={value => {
          if (j === n) {
            MatrixB[i] = value
          } else {
            MatrixA[i][j] = value
          }
        }}
        />
      </td>
    ));
  }
  const print = () => {
    ans = Array(n).fill(0)
    return ans.map((x, j) => <p>x{j + 1}={data[j]}</p>)
  }
  return (
    <Content style={{ margin: '0 16px' }}>
      <div style={{ padding: 24, background : '#F8CEA5', minHeight: 30 }}><h1>LU Decomposition Method</h1></div>
      <Row>
        <Col span={8}>
          <div><h1>Input 'n' matrix</h1>
            <InputNumber placeholder="input function" min={1} onChange={value => setn(value)} />
          </div>
        </Col>
      </Row>
      <div>
        {createInput(n)}
      </div>
      <Row>
        <Col span={8}>
          <div>
            <Button onClick={codeLU} type="primary">Enter</Button>
          </div>
        </Col>
        <Col span={8}>
          <Select defaultValue="0" style={{ width: 250 }} onChange={changevalue}>
            {getafcs}
          </Select>
        </Col>
      </Row>
      <Row>
        <Row>
          <Col span={8}>
            <Card title="Answer :X" bordered={false} style={{ width: 300 }}>
              {print(n)}
            </Card>
          </Col>
        </Row>
      </Row>
    </Content>
  );
}
export default LU;

