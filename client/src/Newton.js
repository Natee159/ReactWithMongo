import React, { useState, useEffect,useRef } from 'react';
import 'antd/dist/antd.css';
import { Button, Table } from 'antd';
import { Layout, Input, InputNumber } from 'antd';
import { Select, Row, Col } from 'antd';
import axios from 'axios';
import d3 from "d3";
window.d3 = d3;
const functionPlot = require("function-plot");
const { Content } = Layout;
const { parse,derivative } = require("mathjs");
const { Column } = Table;
const { Option } = Select;
function Newton() {
  let [x0, setx0] = useState(2)
  const [fx, setfx] = useState('(x^2)-7')
  let [x, setx] = useState(0)
  const temp = []
  const [data, setdata] = useState();
  const [getafcs, setgetafcs] = useState();
  const [getafx, setgetafx] = useState();
  let [getaX0, setgetaX0] = useState()
  const chart = useRef(null);
  useEffect (() => {
    axios.get("http://192.168.99.100:8080/api/users/shownewton").then(res => {
      console.log(res.data);
      console.log(fx,x0)
      const tempfx = []
      const tempfcs = []
      const tempX0 = []
      for (let i = 0; i < res.data.data.length; i++) {
        tempfcs.push(<Option key={i} value={i} label={res.data.data[i].fx}>x0 : {res.data.data[i].x0}  </Option>)
        tempfx.push(res.data.data[i].fx)
        tempX0.push(res.data.data[i].x0)
        console.log(tempfx[i])
        console.log(tempX0[i])
      }
      setgetafcs(tempfcs)
      setgetafx(tempfx)
      setgetaX0(tempX0)
    })
  },[])
  function changevalue(value) {
    setfx(getafx[value])
    setx0(getaX0[value])
    console.log('fx =', fx)
    console.log('X0 =', x0)
  }
  const codenewton = () => {
    const f = (fx, value) => parse(fx).evaluate({ x: value })
    const f1 =(fx,value)=> derivative(fx,'x').evaluate({x:value})
    const e = (x, x0) => Math.abs((x - x0) / x)
    var i = 0
    while (i < 1 || e(x, x0) > 0.000001) {
      if (i > 0) {
        x0 = x
      }
      x = x0 - (f(fx,x0) / f1(fx,x0))
      temp.push({
        i: i,
        x: x.toFixed(6),
        y: x0.toFixed(6),
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
      width: 700 ,
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
      <div style={{ padding: 24, background : '#F8CEA5', minHeight: 30 }}><h1>Newton Raphson.</h1></div>
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
            <InputNumber min={0} max={10} defaultValue={0} placeholder="xl" onChange={value => setx0(value)} /> 
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
        <Button onClick={codenewton} type="primary">input</Button>
        {x}
        < Table style={{ marginTop: 24 }} dataSource={data}>
          <Column title="Iterations" dataIndex="i" key="i" />
          <Column title="X New" dataIndex="x" key="x" />
          <Column title="X Old" dataIndex="y" key="y" />
          <Column title="Error" dataIndex="error" key="error" />
        </Table>    
      </div>
      <div ref={chart}></div>
    </Content >
  );
}
export default Newton;