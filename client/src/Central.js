import React, { useState, useEffect } from 'react';
import { Select,Button} from 'antd';
import 'antd/dist/antd.css';
import { Layout,Input, InputNumber } from 'antd';
import axios from 'axios';
import { Row, Col } from 'antd';
const { Content } = Layout;
const { parse, derivative } =require("mathjs");
const { Option } = Select;
function Central() {
  let [d, setd] = useState(2)
  let [h, seth] = useState(8)
  let [x, setx] = useState(2)
  let [fx, setfx] = useState("(4x^5)-(3x^4)+(x^3)-(6*x)+2")
  var ans
  let [e1, sete1] = useState()
  const [data, setdata] = useState()
  const runcode = () => {
    ans = codecentral(fx,d, h,x)
    console.log(ans)
    setdata(ans)
  }
  const [getafcs, setgetafcs] = useState();
  const [getFX, setgetFX] = useState();
  let [getD, setgetD] = useState()
  let [getH, setgetH] = useState()
  let [getX, setgetX] = useState()
  useEffect(() => {
    axios.get("http://192.168.99.100:8080/api/users/showcentral").then(res => {
      console.log(res.data);
      console.log(fx, d, h,x)
      const tempfx = []
      const tempfcs = []
      const tempD = []
      const tempH = []
      const tempX = []
      for (let i = 0; i < res.data.data.length; i++) {
        tempfcs.push(<Option key={i} value={i} label={res.data.data[i].fx}>D : {res.data.data[i].d} || H: {res.data.data[i].h } || X: {res.data.data[i].x } </Option>)
        tempfx.push(res.data.data[i].fx)
        tempD.push(res.data.data[i].d)
        tempH.push(res.data.data[i].h)
        tempX.push(res.data.data[i].x)
        console.log(tempfx[i])
        console.log(tempD[i])
        console.log(tempH[i])
        console.log(tempX[i])
      }
      setgetafcs(tempfcs)
      setgetFX(tempfx)
      setgetD(tempD)
      setgetH(tempH)
      setgetX(tempX)
    })
  }, [])
  function changevalue(value) {
    setfx(getFX[value])
    setd(getD[value])
    seth(getH[value])
    setx(getX[value])
    console.log('fx =', fx)
    console.log('D =', d)
    console.log('H =', h)
    console.log('X =', x)
  }
  const codecentral = (fx,d, h, x) => {
    let func = (X) => parse(fx).evaluate({ x: X });
    var ans = 0
    var e = 0
    var real = 0
    if (d === 1) {
      ans = (func(x+h) - func(x-h)) / (2*h)
      console.log(ans)
      real = funcd(x)
    } else if (d === 2) {
      ans = (func(x+h) - 2 * func(x) + func(x-h)) / (Math.pow(h, 2))
      real = funcd2(x)
    } else if (d === 3) {
      ans = (func(x+(2*h)) - 2 * func(x + h) + 2 * func(x-h) - func(x-(2*h))) / (Math.pow(h, 3)*2)
      real = funcd3(x)
    } else if (d === 4) {
      ans = (func(x+(2*h)) - 4 * func(x+h) + 6 * func(x) -4 * func(x-h)+ func(x-(2*h))) / (Math.pow(h, 4))
      real = funcd4(x)
    }
    console.log("cal :", ans)
    console.log("real :", real)
    e = Math.abs((real - ans) / real).toFixed(6)
    sete1(e)
    return ans
  }
  const funcd = (X) => {
    return derivative(fx, 'x').evaluate({ x: X });
  }
  const funcd2 = (X) => {
    return derivative(derivative(fx, 'x'), 'x').evaluate({ x: X });
  }
  const funcd3 = (X) => {
    return derivative(derivative(derivative(fx, 'x'), 'x'), 'x').evaluate({ x: X });
  }
  const funcd4 = (X) => {
    return derivative(derivative(derivative(derivative(fx, 'x'), 'x'), 'x'), 'x').evaluate({ x: X });
  }

  return (
    <Content style={{ margin: '0 16px' }}>
      <div style={{ padding: 24, background: '#F8CEA5', minHeight: 30 }}><h1>Central Divide Difference</h1></div>
      <Row>
        <Col span={8}>

          <div><h1>Funcion</h1>
            <Input placeholder="input function" onChange={event => setfx(event.target.value)} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div><h1>D</h1>
            <InputNumber min={1} max={4} defaultValue={2} placeholder="a" onChange={value => setd(value)} />
            <span className='input-group-text'></span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div><h1>H</h1>
            <InputNumber  placeholder="b" onChange={value => seth(value)} />
            <span className='input-group-text'></span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div><h1>x</h1>
            <InputNumber  placeholder="x" onChange={value => setx(value)} />
            <span className='input-group-text'></span>
          </div>
        </Col>
        <Col span={8}>
          <Select defaultValue="0" style={{ width: 250 }} onChange={changevalue}>
            {getafcs}
          </Select>
        </Col>
      </Row>
      <div>
        <Button onClick={runcode} type="primary">input</Button>
        <br></br>
        <h1>ANS :{data}</h1> 
        <br></br>
        <h1>ERROR : {e1}</h1>
      </div>
    </Content>
  );
}
export default Central;