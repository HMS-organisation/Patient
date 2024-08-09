import { useLayoutEffect, useEffect, useState, useRef } from "react";
import "./sass/style.css";
import Doctor from "./assets/Doctor.jpg";
import Amb from './assets/Amb.png';
import { gsap } from "gsap";
import { FaInstagram } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { CiFacebook } from "react-icons/ci";
import { RiMapPin2Line } from "react-icons/ri";
import axios from "axios";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import D3 from './assets/D3.jpg';
import d2 from './assets/2.jpg';
import family from './assets/family.png';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Swal from "sweetalert2";
import Anime from "./Anime";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_API_URL;
gsap.registerPlugin(ScrollTrigger);

export default function Dashboard() {
    const navigate =useNavigate()
  const el = useRef();
  const tl = useRef();

  useLayoutEffect(() => {
    gsap.to(".logo", {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".nav",
        start: "top 520px",
        end: "bottom 460px",
      }
    });

    gsap.to(".menu", {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".nav",
        start: "top 520px",
        end: "bottom 460px",
      }
    });

    gsap.to("#card", {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: "#card",
        start: "top 520px",
        end: "bottom 460px",
        scrub: true
      }
    });

    gsap.to(".tl-init", {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".for2",
        start: "top 200px",
        end: "bottom 1200px"
      }
    });

    gsap.to(".relogio", {
      x: 700,
      opacity: 1,
      duration: 10,
      yoyo: false,
      repeat: 3,
      scrollTrigger: {
        trigger: ".items",
        start: "top 500px",
        end: "bottom 0px",
        scrub: true,
      }
    });

    return () => {
      gsap.killTweensOf(".relogio");
    };
  }, []);

  const [values, setValues] = useState({
    pname: '',
    gender: '',
    mobile: '',
    age: '',
    symtoms: '',
    city: '',
  });

 
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      Swal.fire('Called')
      const res = await axios.post(`${url}/api/Appointmentpost`, values);
      console.log(res)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className="container">
      <header>
        <nav className="nav">
          <a href="#" className="logo">HMS</a>
          <ul className="menu">
            <li><a href="#home">HOME</a></li>
            <li onClick={()=>{navigate('/login')}}><a href="#app" >PATIENT</a></li>
            <li><a href="#app">APPOINTMENT</a></li>
            <li><a href="#doc">DOCTOR</a></li>
            <li><a href="#dep">DEPARTMENT</a></li>
            <li><a href="#con">CONTACT</a></li>
          </ul>
        </nav>
      </header>
      <div className="first-content">
        <section id="first-item">
          <div className="for1 text1">
            <h2 id="home">Why HMS?</h2>
            <p>At HMS we are dedicated to providing the highest quality healthcare to our community. Our mission is to offer compassionate, patient-centered care, supported by advanced medical technology and a team of skilled professionals.</p>
          </div>
          <div className="button-content">
            <div id="button">
              <button className="btn">Read More</button>
            </div>
          </div>
          <div className="for1">
            <div id="card">
              <section className="card-item">
                <h5>Up to</h5>
                <span>2 K</span>
                <h5>Doctors</h5>
              </section>
              <section className="card-item">
                <h5>Up to</h5>
                <span>5 k</span>
                <h5>Staff</h5>
              </section>
              <section className="card-item">
                <h5>Up to</h5>
                <span>2 M</span>
                <h5>Views</h5>
              </section>
            </div>
          </div>
        </section>

        <div className="for2">
          <img src={Doctor} className="tl-init" alt="Doctor" />
        </div>
      </div>

      <section className="items">
        <div className="items-content" style={{ display: 'flex', justifyContent: 'end' }}>
          <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
            <img className="relogio" src={Amb} alt="Ambulance" />
          </div>
        </div>
      </section>

      <section className="models-container" id="doc">
        <h1 className="new">Doctors</h1>
        <div className="models-content" ref={el}>
          <div className="models-item" id="model-1">
            <img src={d2} alt="Doctor X" />
            <span className="models-tag">Dr. X</span>
          </div>
          <div className="models-item" id="model-2">
            <img src={D3} alt="Doctor M" />
            <span className="models-tag">Dr. M</span>
          </div>
          <div className="models-item" id="model-3">
            <img src={d2} alt="Doctor Y" />
            <span className="models-tag">Dr. Y</span>
          </div>
        </div>
      </section>

      <h1 className="new" id="app" style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>Appointment</h1>
      <section style={{ backgroundColor: '#ebebeb', height: '100vh', borderRadius: '10px', boxShadow: '0 8px 8px rgba(0,0,0,0.2)', display: 'flex' }}>
        <div className="models-item" id="model-3" style={{ width: '20vh' }}>
          <img src={d2} alt="Doctor Appointment" />
        </div>
        <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', width: '100vh' }}>
          <form className="login-form" onSubmit={handleSubmit}>
         
            <div className="input-group">
              <label htmlFor="pname">Name</label>
              <input type="text" id="pname" name="pname" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="mobile">Mobile No</label>
              <input type="text" id="mobile" name="mobile" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="age">Age</label>
              <input type="text" id="age" name="age" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender" required onChange={handleChange} style={{ display: 'block', width: '100%', height: '5vh', outline: 'none' }}>
                <option value="">Select gender</option>
                <option value="male">
                  male</option>
                <option value="female">female</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="symtoms">Symtoms</label>
              <input type="text" id="symtoms" name="symtoms" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" required onChange={handleChange} />
            </div>
            <button type="submit">Appointment Call</button>
          </form>
        </div>
      </section>


      <h1 className="new"  style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', marginTop: '10vh' }}>Our Patients. Their Stories!</h1>
      <section style={{ height: '80vh', borderRadius: '10px', boxShadow: '0 8px 8px rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '120vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h3 className="new" style={{ paddingLeft: "20px" }}>“Oncology staff, infusion staff, pharmacy staff, and radiation staff. I took my last treatments, Thursday, and was so overcome emotionally, not by stopping one of my treatments, but by the true caring and dedication of the cancer treatment staff. You all make the not fun and scary treatments into a tolerable, your okay treatment. I could feel our Lord's healing, guiding your hearts and your actions. You all are life-changing and saving on a level you may not realize.....”</h3>
        </div>
        <div id="model-3" style={{ width: '100vh', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
          <img src={family} alt="Family" />
        </div>
      </section>
      <div id='dep'>
        <Anime />
      </div>

      <br />
      <div id="con" style={{ height: "10vh", backgroundColor: "white", display: 'flex', justifyContent: 'space-around' }}>
        <IoMdCall size={40} onClick={() => alert('8936033768')} />
        <FaInstagram size={40} />
      
        <CiFacebook size={40} />
        <RiMapPin2Line size={40} />

      </div>
      <div style={{ position: 'fixed', width: '40px', bottom: '100px', left: '55px', display: 'grid', justifyContent: 'center' }}>
       <button> <a href="#app">Appointment</a></button>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
          <ReportProblemIcon size={50} color="red" />
        </div>
      </div>
    </div>
    </>
  );
}
