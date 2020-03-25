import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Card, Button, Table } from 'antd';
import { Select, Layout, InputNumber } from 'antd';
import { Row, Col } from 'antd';
import axios from 'axios';
const { Content } = Layout;
const { det } = require("mathjs");
const { Option } = Select;
function Cramer() {
  var x = []
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
    axios.get("http://192.168.99.100:8080/api/users/showcramer").then(res => {
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
  const codecramer = () => {
    var i = 0;
    var j = 0;
    console.log(MatrixA);
    console.log(MatrixB);
    var detA = det(MatrixA)
    for (i = 0; i < MatrixA.length; i++) {
      var temp = JSON.parse(JSON.stringify(MatrixA));
      for (j = 0; j < MatrixA.length; j++) {
        temp[j][i] = MatrixB[j]
      }
      x.push((det(temp) / detA).toFixed(6));
    }
    console.log(x)
    setdata(x);
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
      <div style={{ padding: 24, background: '#F8CEA5', minHeight: 30 }}><h1>Cramer's rule.</h1></div>
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
            <Button onClick={codecramer} type="primary">Enter</Button>
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
export default Cramer;

