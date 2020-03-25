import React, { useState, useEffect ,useRef } from 'react';
import 'antd/dist/antd.css';
import { Button, Table } from 'antd';
import { Layout, Input, InputNumber } from 'antd';
import { Select, Row, Col } from 'antd';
import axios from 'axios';
import d3 from "d3";
window.d3 = d3;
const functionPlot = require("function-plot");
const { Content } = Layout;
const { parse } = require("mathjs");
const { Column } = Table;
const { Option } = Select;
function Secant() {
  let [x0, setx0] = useState(0)
  const [fx, setfx] = useState('(x^2)-7')
  let [x, setx] = useState(0)
  const temp = []
  const [data, setdata] = useState();
  const [getafcs, setgetafcs] = useState();
  const [getafx, setgetafx] = useState();
  let [getaX, setgetaX] = useState()
  let [getaX0, setgetaX0] = useState();
  const chart = useRef(null);
  useEffect(() => {
    axios.get("http://192.168.99.100:8080/api/users/showsecant").then(res => {
      console.log(res.data);
      console.log(fx, x0, x)
      const tempfx = []
      const tempfcs = []
      const tempX = []
      const tempX0 = []
      for (let i = 0; i < res.data.data.length; i++) {
        tempfcs.push(<Option key={i} value={i} label={res.data.data[i].fx}>x0 : {res.data.data[i].x0} || x1 : {res.data.data[i].x1} </Option>)
        tempfx.push(res.data.data[i].fx)
        tempX.push(res.data.data[i].x0)
        tempX0.push(res.data.data[i].x1)
        console.log(tempfx[i])
        console.log(tempX[i])
        console.log(tempX0[i])
      }
      setgetafcs(tempfcs)
      setgetafx(tempfx)
      setgetaX(tempX)
      setgetaX0(tempX0)
    })
  }, [])
  function changevalue(value) {
    setfx(getafx[value])
    setx0(getaX[value])
    setx(getaX0[value])
    console.log('fx =', fx)
    console.log('X =', x)
    console.log('X0 =', x0)
  }
  const codesecant = () => {
    const f = (fx, value) => parse(fx).evaluate({ x: value })
    const f1 = (x0, x) => ((f(fx, x0) - f(fx, x)) / (x0 - x))
    const e = (x, x0) => Math.abs((x - x0) / x)
    var i = 0
    var n
    while (e(x, x0) > 0.000001) {
      n = f1(x0, x)
      x0 = x
      x = x0 - (f(fx, x0) / n)
      temp.push({
        i: i,
        x: x.toFixed(6),
        y: f(fx, x).toFixed(6),
        error: e(x, x0).toFixed(6)
      });
      i++;
    }
    setx(x.toFixed(6))
    setdata(temp)
  }
  useEffect(() => {
    functionPlot({
      target: chart.current,
      width: 700,
      height: 600,
      yAxis: { domain: [-1, 9] },
      tip: {
        renderer: function () { }
      },
      grid: false,
      data: [
        {
          fn: fx

        }
      ],
    });
  });
  return (
    <Content style={{ margin: '0 16px' }}>
      <div style={{ padding: 24, background: '#F8CEA5', minHeight: 30 }}><h1>Secant Method.</h1></div>
      <Row>
        <Col span={8}>

          <div><h1>Funcion</h1>
            <Input placeholder="input function" onChange={event => setfx(event.target.value)} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div><h1>x</h1>
            <InputNumber min={0} max={10} defaultValue={0} placeholder="x" onChange={value => setx(value)} />
            <span className='input-group-text'></span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div><h1>x1</h1>
            <InputNumber min={0} max={10} defaultValue={0} placeholder="x1" onChange={value => setx0(value)} />
            <span className='input-group-text'></span>
          </div>
        </Col>
        <Col span={8}>
          <Select defaultValue="0" style={{ width: 120 }} onChange={changevalue}>
            {getafcs}
          </Select>
        </Col>
      </Row>
      <div>
        <Button onClick={codesecant} type="primary">input</Button>
        {x}
        < Table style={{ marginTop: 24 }} dataSource={data}>
          <Column title="Iterations" dataIndex="i" key="i" />
          <Column title="X New" dataIndex="x" key="x" />
          <Column title="X Old" dataIndex="y" key="y" />
          <Column title="Error" dataIndex="error" key="error" />
        </Table>
      </div>
      <div ref={chart}></div>
    </Content>
  );
}
export default Secant;