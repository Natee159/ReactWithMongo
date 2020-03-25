import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import Bisection from './Bisection'
import FalsePosition from './False-Position';
import Onepoint from './Onepoint';
import Newton from './Newton';
import Secant from './Secant';
import GaussElimination from './GaussElimination';
import GaussJorden from './GaussJorden';
import LU from './LU';
import Cramer from './Cramer';
import NewtonDivide from './NewtonDivide';
import Lagrange from './Lagrange';
import Polynomial from './Polynomial';
import CompositeTrapezoidal from './CompositeTrapezoidal';
import CompositeSimpson from './CompositeSimpson';
import Forward from './Forward';
import Backward from './Backward';
import Central from './Central';
import Forward2 from './Forward2';
import Backward2 from './Backward2';
import Central2 from './Central2';
const { SubMenu } = Menu;
const { Header, Content,  Sider } = Layout;
function App() {
    const[page,setpage] = useState()
    const pageBisection = () => setpage(<Bisection/>)    
    const pageFalseposition = () => setpage(<FalsePosition/>)
    const pageOnePoint = () => setpage(<Onepoint/>)
    const pageNewton = () => setpage(<Newton/>)
    const pageSecant = () => setpage(<Secant/>)
    const pageCramer = () => setpage(<Cramer/>)
    const pageGaussElimination = () => setpage(<GaussElimination/>)
    const pageGaussJorden = () => setpage(<GaussJorden/>)
    const pageLU = () => setpage(<LU/>)
    const pageNewtonDivide = () => setpage(<NewtonDivide/>)
    const pageLagrange = () => setpage(<Lagrange/>)
    const pagePolynomial = () => setpage(<Polynomial/>)
    const pageCompositeTrapezoidal = () => setpage(<CompositeTrapezoidal/>)
    const pageCompositeSimpson = () => setpage(<CompositeSimpson/>)
    const pageForward = () => setpage(<Forward/>)
    const pageBackward = () => setpage(<Backward/>)
    const pageCentral = () => setpage(<Central/>)
    const pageForward2 = () => setpage(<Forward2/>)
    const pageBackward2 = () => setpage(<Backward2/>)
    const pageCentral2 = () => setpage(<Central2/>)
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Header style={{background: '#1ce',padding: 10}}>
              
              <h1>Numerical Method</h1>
            </Header>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="file" />
                  <span>Root of Equations</span>
                </span>
              }
            >
              <Menu.Item onClick={pageBisection} key="2">Bisection Method</Menu.Item> 
              <Menu.Item onClick={pageFalseposition} key="3">False-Position Method</Menu.Item>
              <Menu.Item onClick={pageOnePoint} key="4">One-Point Iteration Method</Menu.Item>
              <Menu.Item onClick={pageNewton} key="5">Newton-Raphson Method</Menu.Item>
              <Menu.Item onClick={pageSecant} key="6">Secant Medthod</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="stock" />
                  <span>Linear</span>
                </span>
              }
            >
              <Menu.Item onClick={pageCramer} key="7">Cramer's Rule Method</Menu.Item>
              <Menu.Item onClick={pageGaussElimination} key="8">Gauss Elimination Method</Menu.Item>
              <Menu.Item onClick={pageGaussJorden} key="9">Gauss-Jorden Method</Menu.Item>
              <Menu.Item onClick={pageLU} key="10">LU Decomposition Method</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="file" />
                  <span>Interpolation</span>
                </span>
              }
            >
              <Menu.Item onClick={pageNewtonDivide} key="14">Newton Divide Difference</Menu.Item>
              <Menu.Item onClick={pageLagrange} key="15">Lagrange</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="file" />
                  <span>Least Square Error</span>
                </span>
              }
            >
              <Menu.Item onClick={pagePolynomial} key="18">Polynomial Regression</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub5"
              title={
                <span>
                  <Icon type="file" />
                  <span>Integration</span>
                </span>
              }
            >
              <Menu.Item onClick={pageCompositeTrapezoidal} key="20">Composite Trapezoidal Rule</Menu.Item>
              <Menu.Item onClick={pageCompositeSimpson} key="21">Composite Simpson's Rule</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub6"
              title={
                <span>
                  <Icon type="file" />
                  <span>Ordinary Differential Equation</span>
                </span>
              }
            >
              <Menu.Item onClick={pageForward} key="22">Forward h error</Menu.Item>
              <Menu.Item onClick={pageBackward} key="23">Backward h error</Menu.Item>
              <Menu.Item onClick={pageCentral} key="24">Central h2 error</Menu.Item>
              <Menu.Item onClick={pageForward2} key="25">Forward h2 error</Menu.Item>
              <Menu.Item onClick={pageBackward2} key="26">Backward h2 error</Menu.Item>
              <Menu.Item onClick={pageCentral2} key="27">Central h4 error</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style ={{background : '#F8CEA5'}}>
          <Header style={{ background: '#F8CEA5', padding: 0 }} />
          <Content style={{ background: '#F8CEA5',margin: '0 16px' }}>
            {page}
          </Content>
        </Layout>
      </Layout>
    );
  }
export default App;
