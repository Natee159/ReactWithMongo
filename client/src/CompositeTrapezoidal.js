import React, { useState,useEffect } from 'react';
import { Button, Table ,Select} from 'antd';
import 'antd/dist/antd.css';
import { Layout,Input, InputNumber } from 'antd';
import axios from 'axios';
import { Row, Col } from 'antd';
const {Content} = Layout;
const { create,parse, all } = require("mathjs");
const { Option } = Select;
const mathjs = create(all);
const mathInt = require('mathjs-simple-integral')
mathjs.import(mathInt)
function CompositeTrapzoidal() {
  let [a, seta] = useState(2)
  let [b, setb] = useState(8)
  let [n, setn] = useState(2)
  let [fx, setfx] = useState("(4x^5)-(3x^4)+(x^3)-(6*x)+2")
  const [getfcs, setgetafcs] = useState();
  const [getFX, setgetafx] = useState();
  let [getA, setgetA] = useState()
  let [getB, setgetB] = useState()
  let [getN, setgetN] = useState()
  const temp =[]
  var z=[]
  var zz=[]
  useEffect(() => {
    axios.get("http://192.168.99.100:8080/api/users/showtrap").then(res => {
      console.log(res.data);
      console.log(fx, a, b, n)
      const tempfx = []
      const tempfcs = []
      const tempA = []
      const tempB = []
      const tempN = []
      for (let i = 0; i < res.data.data.length; i++) {
        tempfcs.push(<Option key={i} value={i} label={res.data.data[i].fx}>A : {res.data.data[i].a} || B: {res.data.data[i].b} || N: {res.data.data[i].n}</Option>)
        tempfx.push(res.data.data[i].fx)
        tempA.push(res.data.data[i].a)
        tempB.push(res.data.data[i].b)
        tempN.push(res.data.data[i].n)
        console.log(tempfx[i])
        console.log(tempA[i])
        console.log(tempB[i])
        console.log(tempN[i])
      }
      setgetafcs(tempfcs)
      setgetafx(tempfx)
      setgetA(tempA)
      setgetB(tempB)
      setgetN(tempN)
    })
  }, [])
  function changevalue(value) {
    setfx(getFX[value])
    seta(getA[value])
    setb(getB[value])
    setn(getN[value])
    console.log('fx =', fx)
    console.log('a =', a)
    console.log('b =', b)
    console.log('N =', n)
  }
  var x=a
  const [data1,setdata1] = useState();
  const [data, setdata] = useState();
  const codetrap = () => {
    const inf = mathjs.integral(fx, 'x');
    const f2 = inf.toString()
    var real = mathjs.parse(f2).evaluate({x:b}) - mathjs.parse(f2).evaluate({x:a})
    const f = (fx, value) => parse(fx).evaluate({ x: value })
    const e = (real, ans) => Math.abs((real - ans) / real)
    var h = (b - a)/n
    var ans=0
    var i=0;
    for(i=0;i<=n;i++){
      if(i===0 || i===n){
          z[i]=x
          zz[i]=f(fx,x)
          console.log(f(fx,x))
          ans += f(fx,x)
      }
      else{
        z[i]=x
        zz[i]=f(fx,x)
        console.log(f(fx,x))
        ans +=2*f(fx,x)
      }
      temp.push = ({
        x: z[i],
        y: zz[i]
       });
    x +=h
    }
    ans *=h/2
    console.log(ans)
    console.log("REAL",real.toFixed(6))
    setdata(ans)
    console.log(e(real,ans))
    setdata1(temp)
  }
  return (
    <Content style={{ margin: '0 16px' }}>
      <div style={{ padding: 24, background : '#F8CEA5', minHeight: 30 }}><h1>CompositeTrapzoidal</h1></div>
      <Row>
        <Col span={8}>

          <div><h1>Funcion</h1>
            <Input placeholder="input function" onChange={event => setfx(event.target.value)} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div><h1>a</h1>
            <InputNumber min={1} max={10} defaultValue={2} placeholder="a" onChange={value => seta(value)} />
            <span className='input-group-text'></span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div><h1>b</h1>
            <InputNumber min={1} max={10} defaultValue={8} placeholder="b" onChange={value => setb(value)} />
            <span className='input-group-text'></span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div><h1>n</h1>
            <InputNumber min={1} max={10} defaultValue={2} placeholder="n" onChange={value => setn(value)} />
            <span className='input-group-text'></span>
          </div>
        </Col>
        <Col span={8}>
          <Select defaultValue="0" style={{ width: 150 }} onChange={changevalue}>
            {getfcs}
          </Select>
        </Col>
      </Row>
      <div>
        <Button onClick={codetrap} type="primary">input</Button>
        {data}
      </div>

    </Content>
  );
}
export default CompositeTrapzoidal;

