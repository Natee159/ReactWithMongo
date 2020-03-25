import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { Layout, Select, InputNumber } from 'antd';
import { Row, Col } from 'antd';
import axios from 'axios';
const { Content } = Layout;
const { Option } = Select;
function Lagrange() {
  let [n, setn] = useState(0)
  let [x, setx] = useState(0)
  const [size, setsize] = useState(0)
  const [data, setdata] = useState()
  const [data1, setdata1] = useState()
  var temp, inx = [], iny = []
  var [ch, setch] = useState({ inx: [], iny: [] })

  const runcode = () => {
    console.log(inx)
    console.log(iny)
    setdata1(x)
    x = codeLagrange(x, inx, iny)
    console.log(x)
    setdata(x)
  }
  const [getafcs, setgetafcs] = useState();
  const [getA, setgetA] = useState();
  let [getB, setgetB] = useState()
  let [getX, setgetX] = useState()
  let [getN, setgetN] = useState()
  useEffect(() => {
    axios.get("http://192.168.99.100:8080/api/users/showlagrange").then(res => {
      console.log(res.data);
      console.log(inx, iny, x, n)
      const tempA = []
      const tempfcs = []
      const tempB = []
      const tempX = []
      const tempN = []
      for (let i = 0; i < res.data.data.length; i++) {
        tempfcs.push(<Option key={i} value={i} label={res.data.data[i].n}>A : {res.data.data[i].inx} || B: {res.data.data[i].iny} || X: {res.data.data[i].x} || N: {res.data.data[i].n} </Option>)
        tempA.push(res.data.data[i].inx)
        tempB.push(res.data.data[i].iny)
        tempX.push(res.data.data[i].x)
        tempN.push(res.data.data[i].n)
      }
      setgetafcs(tempfcs)
      setgetA(tempA)
      setgetB(tempB)
      setgetX(tempX)
      setgetN(tempN)
    })
  }, [])
  function changevalue(value) {
    inx = getA[value]
    iny = getB[value]
    x = getX[value]
    n = getN[value]
    console.log('Matrix A =', inx)
    console.log('Matrix B =', iny)
    console.log('x =', x)
    console.log('n =', n)
  }
  const create = () => {
    setch({ inx: Array.from(n).fill(0), iny: Array.from(n).fill(0) })
    setsize(n)
  }

  const createInput = () => {
    temp = Array(size).fill(0)
    inx = ch.inx
    iny = ch.iny
    return (
      <div>
        <tr>
          X:
          {createinx()}
        </tr>
        <tr>
          F(x):
          {createiny()}
        </tr>
      </div>
    );
  }
  const createinx = () => {
    return temp.map((x, j) => (
      <td>
        <InputNumber size="small" onChange={value => inx[j] = value} />
      </td>
    ));
  }


  const createiny = () => {
    return temp.map((x, j) => (
      <td>
        <InputNumber size="small" onChange={value => iny[j] = value} />
      </td>
    ));
  }
  const codeLagrange = (xn, x, y) => {
    const L = (xn, x, i) => {
      var l = 1
      for (j = 0; j < x.length; j++) {
        if (j !== i) {
          l *= (x[j] - xn) / (x[j] - x[i])
        }
      }
      return l
    }
    var i, j
    var ans = 0
    for (i = 0; i < x.length; i++) {
      ans += (y[i] * L(xn, x, i))
      console.log(ans.toFixed(6))
    }

    return ans.toFixed(6)
  }

  return (
    <Content style={{ margin: '0 16px' }}>
      <div style={{ padding: 24, background: '#F8CEA5', minHeight: 30 }}><h1>Lagrange</h1></div>
      <Row>
        <Col span={8}>
          <div><h1>Input 'n' matrix</h1>
            <InputNumber placeholder="input function" defaultValue={n} min={0} max={10} onChange={value => setn(value)} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div>
            <Button onClick={create} type="primary">Create</Button>
          </div>
        </Col>
      </Row>
      {createInput(size)}
      <Row>
        <Col span={8}>
          <div><h1>X :</h1><InputNumber placeholder="X" min={1} onChange={value => setx(value)} />
          </div>
        </Col>
        <Col span={8}>
          <Select defaultValue="0" style={{ width: 250 }} onChange={changevalue}>
            {getafcs}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div>
            <Button onClick={runcode} type="primary">Enter</Button>
          </div>
        </Col>
      </Row>
      <h1>f({data1})={data}</h1>
    </Content>
  );
}
export default Lagrange;

