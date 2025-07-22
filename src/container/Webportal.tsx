import {useState } from "react";
import Footer from "./Footer";
import Header from "./Header.tsx";
import Link from "next/link";
import { useRouter } from "next/router";

const Webportal = (props: any) => {
  const router = useRouter();
  const {id} =router.query
  const [done, setIsDone] = useState(true);
  const [show, setShow] = useState<boolean>(false);
  let myArr= [{name:'XXX123'}, {name:'XXX124'}, {name:'XXX125'}]


  if (!done) return <h2>Loading UI...</h2>;

const addDeviceHandler =()=>{
   router.push('/Webportal/Dashboard/ConnectDevice');
}
  return (
    <>
     <Header />
      <div
        className="main-content"
        style={{
          marginLeft: show ? 280 : 0,
          transition: "margin-left 0.3s ease",
        }}
      > <div className="container-fluid position-fixed">
            <div className="row">
              <div className={`col-lg-2 sidebar mt-5`}>
                <h6 className="mt-4">Welcome, User Name!</h6>
                    <h4 className="mt-4">Devices</h4>
                    <ul className="list-unstyled mt-4 title">
                      {myArr.map((list,i)=>(
                      <Link className="title" href={`/Webportal/Dashboard/${list.name}`}>
                      <li className={`${id===list.name? 'activeItem':''} mb-2`}>
                        <span className="me-2 text-success">●</span> Device ID - {list.name}
                      </li></Link>
                      ))}
                    </ul>
                    <Link href={'/Webportal/Dashboard/ConnectDevice'}>
                    <button className="btn btn-outline-success mt-2" onClick={addDeviceHandler}>Add another device</button></Link>
                  </div>
                    <div className="col-lg-10" style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex'
                      }}>
                  {props.children}
       
                </div>
             </div>
              <Footer />
    
      </div>
      </div>
    </>
  );
};

export default Webportal
