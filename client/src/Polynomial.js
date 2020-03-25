// import React, { useState } from 'react';
// import { Button, Table } from 'antd';
// import 'antd/dist/antd.css';
// import { Layout, Menu, Breadcrumb, Icon, TimePicker, Input, InputNumber } from 'antd';
// import axios from 'axios';
// import { Row, Col } from 'antd';
// const { Content } = Layout;
// const { parse } = require("mathjs");
// const { Column } = Table;
// function Polynomial() {
//   let [n, setn] = useState(0)
//   let [x, setx] = useState(0)
//   const [size, setsize] = useState(0)
//   const [data, setdata] = useState()
//   const [data1, setdata1] = useState()
//   var temp, inx = [], iny = []
//   var [ch, setch] = useState({ inx: [], iny: [] })

//   const runcode = () => {
//     console.log(inx)
//     console.log(iny)
//     setdata1(x)
//     x = codeLagrange(x, m, inx, iny)
//     console.log(x)
//     setdata(x)
//   }
//   const [getafcs, setgetafcs] = useState();
//   const [getA, setgetA] = useState();
//   let [getB, setgetB] = useState()
//   let [getX, setgetX] = useState()
//   let [getN, setgetN] = useState()
//   let [getM, setgetM] = useState()
//   useEffect(() => {
//     axios.get("http://localhost:3001/api/users/showpolynomial").then(res => {
//       console.log(res.data);
//       console.log(inx, iny, x, n, m)
//       const tempA = []
//       const tempfcs = []
//       const tempB = []
//       const tempX = []
//       const tempN = []
//       const tempM = []
//       for (let i = 0; i < res.data.data.length; i++) {
//         tempfcs.push(<Option key={i} value={i} label={res.data.data[i].n}>A : {res.data.data[i].inx} || B: {res.data.data[i].iny} || X: {res.data.data[i].x} || N: {res.data.data[i].n} || M: {res.data.data[i].m} </Option>)
//         tempA.push(res.data.data[i].inx)
//         tempB.push(res.data.data[i].iny)
//         tempX.push(res.data.data[i].x)
//         tempN.push(res.data.data[i].n)
//         tempM.push(res.data.data[i].m)
//       }
//       setgetafcs(tempfcs)
//       setgetA(tempA)
//       setgetB(tempB)
//       setgetX(tempX)
//       setgetN(tempN)
//     })
//   }, [])
//   function changevalue(value) {
//     inx = getA[value]
//     iny = getB[value]
//     x = getX[value]
//     n = getN[value]
//     m = getM[value]
//     console.log('Matrix A =', inx)
//     console.log('Matrix B =', iny)
//     console.log('x =', x)
//     console.log('n =', n)
//     console.log('m =', m)
//   }
//   const create = () => {
//     setch({ inx: Array.from(n).fill(0), iny: Array.from(n).fill(0) })
//     setsize(n)
//   }

//   const createInput = () => {
//     temp = Array(size).fill(0)
//     inx = ch.inx
//     iny = ch.iny
//     return (
//       <div>
//         <tr>
//           X:
//           {createinx()}
//         </tr>
//         <tr>
//           F(x):
//           {createiny()}
//         </tr>
//       </div>
//     );
//   }
//   const createinx = () => {
//     return temp.map((x, j) => (
//       <td>
//         <InputNumber size="small" onChange={value => inx[j] = value} />
//       </td>
//     ));
//   }


//   const createiny = () => {
//     return temp.map((x, j) => (
//       <td>
//         <InputNumber size="small" onChange={value => iny[j] = value} />
//       </td>
//     ));
//   }
//   const codeLagrange = (xn, x, y) => {
//     const L = (xn, x, i) => {
//       var l = 1
//       for (j = 0; j < x.length; j++) {
//         if (j !== i) {
//           l *= (x[j] - xn) / (x[j] - x[i])
//         }
//       }
//       return l
//     }
//     var i, j
//     var ans = 0
//     for (i = 0; i < x.length; i++) {
//       ans += (y[i] * L(xn, x, i))
//       console.log(ans.toFixed(6))
//     }

//     return ans.toFixed(6)
//   }
//   return (
//     <Content style={{ margin: '0 16px' }}>
//       <Row>
//         <Col span={8}>
//           <div><h1>Input 'n' matrix</h1>
//             <InputNumber placeholder="input function" defaultValue={n} min={0} max={10} onChange={value => setn(value)} />
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col span={8}>
//           <div>
//             <Button onClick={create} type="primary">Create</Button>
//           </div>
//         </Col>
//       </Row>
//       {createInput(size)}
//       <Row>
//         <Col span={8}>
//           <div><h1>X :</h1><InputNumber  min={1} onChange={value => setx(value)} />
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col span={8}>
//           <div><h1>M :</h1><InputNumber  min={1} onChange={value => setm(value)} />
//           </div>
//         </Col>
//         <Col span={8}>
//           <Select defaultValue="0" style={{ width: 250 }} onChange={changevalue}>
//             {getafcs}
//           </Select>
//         </Col>
//       </Row>
//       <Row>
//         <Col span={8}>
//           <div>
//             <Button onClick={runcode} type="primary">Enter</Button>
//           </div>
//         </Col>
//       </Row>
//       <h1>f({data1})={data}</h1>
//     </Content>
//   );
// }
// export default Polynomial;

