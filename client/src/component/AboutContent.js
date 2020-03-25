import React,{Component} from 'react'

class AboutContent extends Component
{
    render()
    {
        return(
            <div>
                <h3>About This App</h3>
                
                <p>แอพพลิเคชั่นนี้จะสามารถทำการ check รายละเอียดของพนักงานบริษัทได้ว่าตอนนี้มีใครอยู่บ้าง
                <br/>
                นอกจากนี้จะสามารถ เพิ่มบุคลากรเข้าไปได้เมื่อมีพนักงานเข้ามาใหม่
                <br/>
                สามารถลบพนักงานได้เมื่อพนักงานลาออก
                <br/>
                และสามารถเสิร์ชข้อมูลส่วนตัวของพนักงานได้เมื่อต้องการ
                </p>
               

                <h3>Tools for App </h3>
                <ul>
                    <li>React.js</li>
                    <li>MongoDB</li>
                    <li>Node.js</li>
                    <li>AntD</li>
                </ul>
            </div>
        )
    }
}
export default AboutContent;