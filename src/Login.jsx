import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const url = import.meta.env.VITE_API_URL;



export default function SignInSide() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState({
    pid: '',
    pname: '',
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${url}/login`, value)
      .then((response) => {
        console.log(response.data)
        navigate('/patient', { state: { id: response.data } });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  return (
    <section className='newsection'>
      {" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{""}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span />
      <div className="signin">
        <div className="content">
          <h2>Sign In</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="inputBox">
              <input
                type="text"
                required
                name='pid'
                value={value.pid}
                onChange={handleChange}
              />
              <i>Patient Id</i>
            </div>
            <div className="inputBox">
              <input
                type="text"
                required
                name='pname'
                value={value.pname}
                onChange={handleChange}
              />
              <i>Patient Name</i>
            </div>
            <div className="inputBox">
              <input
                type="submit"
                value="Login"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}



