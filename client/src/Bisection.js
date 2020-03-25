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
const { parse } = require("mathjs");
const { Column } = Table;
const { Option } = Select;
function Bisection() {
  let [xl, setxl] = useState(1.5)
  let [xr, setxr] = useState(2.0)
  const [fx, setfx] = useState("x^4-13")
  const [data, setdata] = useState();
  const temp = []
  const [x, setx] = useState(0)
  const [getafcs, setgetafcs] = useState();
  const [getafx, setgetafx] = useState();
  let [getaXL, setgetaXL] = useState()
  let [getaXR, setgetaXR] = useState()
  const chart = useRef(null);
  useEffect(() => {
    axios.get("http://192.168.99.100:8080/api/users/showbisection").then(res => {
      console.log(res.data);
      console.log(fx, xl, xr)
      const tempfx = []
      const tempfcs = []
      const tempXL = []
      const tempXR = []
      for (let i = 0; i < res.data.data.length; i++) {
        tempfcs.push(<Option key={i} value={i} label={res.data.data[i].fx}>xl : {res.data.data[i].xl} || xr: {res.data.data[i].xr} </Option>)
        tempfx.push(res.data.data[i].fx)
        tempXL.push(res.data.data[i].xl)
        tempXR.push(res.data.data[i].xr)
        console.log(tempfx[i])
        console.log(tempXL[i])
        console.log(tempXR[i])
      }
      setgetafcs(tempfcs)
      setgetafx(tempfx)
      setgetaXL(tempXL)
      setgetaXR(tempXR)
    })
  }, [])
  function changevalue(value) {
    setfx(getafx[value])
    setxl(getaXL[value])
    setxr(getaXR[value])
    console.log('fx =', fx)
    console.log('XL =', xl)
    console.log('XR =', xr)
  }
  const codebisection = () => {
    const f = (fx, value) => parse(fx).evaluate({ x: value })
    const e = (xm, xm0) => Math.abs((xm - xm0) / xm)
    const fxm = (xl, xr) => (xl + xr) / 2
    var xm
    var xm0
    var i = 0
    while (i <= 1 || e(xm, xm0) > 0.000001) {
      xm0 = xm
      xm = fxm(xl, xr)
      if (f(fx, xm) * f(fx, xl) > 0) {
        xl = xm
      }
      else {
        xr = xm
      }
      temp.push({
        i: i,
        x: xm.toFixed(6),
        y: f(fx, xm).toFixed(6),
        error: e(xm, xm0).toFixed(6)
      });
      i++;
    }
    setx(xm.toFixed(6))
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
      <div style={{ padding: 24, background: '#F8CEA5', minHeight: 30 }}><h1>Bisection.</h1></div>

      <Row>
        <Col span={8}>

          <div><h1>Funcion</h1>
            <Input placeholder="input function" onChange={event => setfx(event.target.value)} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div><h1>xl</h1>
            <InputNumber min={1} max={10} defaultValue={1} placeholder="xl" onChange={value => setxl(value)} />
            <span className='input-group-text'></span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div><h1>xr</h1>
            <InputNumber min={1} max={10} defaultValue={3} placeholder="xr" onChange={value => setxr(value)} />
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
        <Button onClick={codebisection} type="primary">input</Button>
        {x}
        <Table style={{ marginTop: 24 }} dataSource={data}>
          <Column title="Iterations" dataIndex="i" key="i" />
          <Column title="X" dataIndex="x" key="x" />
          <Column title="Y" dataIndex="y" key="y" />
          <Column title="Error" dataIndex="error" key="error" />
        </Table>
      </div>
      <div ref={chart}></div>
    </Content>
  );
}

export default Bisection;
