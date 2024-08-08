import { gsap } from "gsap";
import { FaInstagram } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { CiFacebook } from "react-icons/ci";
import { RiMapPin2Line } from "react-icons/ri";
import axios from "axios";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Popover from '@mui/material/Popover';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Pill from "./pills/pill";
import './report/report.css'
const url = import.meta.env.VITE_API_URL;
gsap.registerPlugin(ScrollTrigger);


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}

    >
      {value === index && <Box sx={{ p: 3 }} >{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,

  };
}
export default function Patient() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;
  const Doc = id.patient.emp_image
  const pid = id.patient.pid
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  const [anchorE2, setAnchorE2] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorE2(null);
  };
  const open1 = Boolean(anchorE2);


  const [anchorE3, setAnchorE3] = useState(null);
  const handlePopoverOpen3 = (event) => {
    setAnchorE3(event.currentTarget);
  };
  const handlePopoverClose3 = () => {
    setAnchorE3(null);
  };
  const open3 = Boolean(anchorE3);

  const [Slip, SetSlip] = useState([]);

  async function PaymentGet(pid) {
    try {
      const response = await axios.get(`${url}/Paymentget?pid=${pid}`);

      SetSlip(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    PaymentGet(pid);
  }, [])
  const [data, setData] = useState([]);

  async function PresPatient(pid) {


    try {
      const response = await axios.get(`${url}/api/PresPatient?pid=${pid}`);

      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    PresPatient(pid);
  }, [])

  const [Invoice, setInvoice] = useState([]);

  async function ViewInvoice(pid) {
    try {
      const response = await axios.get(`${url}/Invoice?pid=${pid}`);

      setInvoice(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function GetPay(m, n) {
    try {
      const response = await axios.get(`${url}/Paymentget?pid=${m}`);

      const amount = await response.data[0].pay

      if (amount) {
        checkoutHandler(amount, m, n);
      } else {
        console.error('Amount not found in the response');
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    ViewInvoice(pid);
  }, [])
  const checkoutHandler = async (amount, pid, empid) => {

    try {
      const { data: { key } } = await axios.get(`${url}/api/getKey`);
      const { data: { order } } = await axios.post(`${url}/checkout?amount=${amount}`);
      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "Ravi Kumar",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        callback_url: `${url}/paymentVerification`,
        prefill: {
          name: "Ravi Kumar",
          email: "ravi123khg@gmail.com",
          contact: "8936033768"
        },
        notes: {
          address: "bhopal"
        },
        theme: {
          color: "#3399cc"
        },
        handler: async function (response) {
          try {
            await axios.post(`${url}/paymentVerification`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              pid: pid,
              empid: empid,
              amount: amount
            });
            window.location.href = `/payment-success?order_id=${response.razorpay_order_id}`;
          } catch (error) {
            console.error('Error sending payment details:', error);
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Payment dismissed");
          }
        }
      };


      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error('Error in checkoutHandler:', error);
    }
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      <div>
        <React.Fragment>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', backgroundColor: '#27293b', color: 'white', justifyContent: 'space-between', height: '8vh' }}>
            <Typography sx={{ minWidth: 100 }}>HMS</Typography>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 50, height: 50, border: '2px solid red', backgroundColor: 'white', color: 'black' }}>M</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem >
              <Typography
                aria-owns={open1 ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                My Account
                <Popover
                  id="mouse-over-popover"
                  sx={{ pointerEvents: 'none' }}
                  open={open1}
                  anchorEl={anchorE2}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h3>Id:</h3>
                      <p>{id.patient.pid}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h3>Name:</h3>
                      <p>{id.patient.pname}</p>
                    </div>
                    <Divider />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h3>Age:</h3>
                      <p>{id.patient.age}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h3>Gender:</h3>
                      <p>{id.patient.gender}</p>
                    </div>


                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h3>Symptom:</h3>
                      <p>{id.patient.symtoms}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h3>City:</h3>
                      <p>{id.patient.city}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h3>Mobile:</h3>
                      <p>{id.patient.mobile}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h3>Appointment:</h3>
                      <p>{new Date(id.patient.appoint).toLocaleDateString()}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h3>Treatment:</h3>
                      <p>{new Date(id.patient.admit).toLocaleDateString()}</p>
                    </div>

                  </Typography>
                </Popover>
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem >
              <Typography
                aria-owns={open3 ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen3}
                onMouseLeave={handlePopoverClose3}
              >
                My Doctor
                <Popover
                  id="mouse-over-popover"
                  sx={{ pointerEvents: 'none' }}
                  open={open3}
                  anchorEl={anchorE3}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  onClose={handlePopoverClose3}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 1 }}>

                    <div style={{ display: 'flex', alignItems: 'center', height: '200px', width: '200px' }}>
                      <img src={id.patient.emp_image} alt="" />

                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h3>Doctor Id:</h3>
                      <p>{id.patient.empid}</p>

                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h3>Doctor Name:</h3>
                      <p>{id.patient.empname}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h3>Mobile:</h3>
                      <p>{id.patient.emp_mobile}</p>
                    </div>
                  </Typography>
                </Popover>
              </Typography>
            </MenuItem>

            <MenuItem onClick={() => { navigate('/') }}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>


        <Box sx={{ width: '100%', height: '83vh', background: 'linear-gradient(to right, #bde7f6, #a891c9, pink)', borderRadius: '0px 0px 50px 50px' }} >
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'center',
              background: 'linear-gradient(to right, #bde7f6, #a891c9, pink)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            <hr />
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
              <Tab label="My Doctor" {...a11yProps(0)} />

              <Tab label="Prescription " {...a11yProps(1)} />

              <Tab label="Reports" {...a11yProps(2)} />

              <Tab label="Test & Payments " {...a11yProps(3)} />

            </Tabs>
            <hr />
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '50vh' }}>
                <h1 className="new " style={{ display: 'flex', justifyContent: 'center' }}>My Doctor</h1>
                <div style={{ width: '50vh' }}>

                  <br />
                  <div style={{ justifyContent: 'center', display: 'grid' }}>
                    <img src={Doc} alt="" style={{ borderRadius: '10px', height: '300px' }} />
                    <br />
                    <br />
                    <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center' }} >
                      <span style={{ display: 'flex' }} className="new ">
                        <h3>Doctor Name:</h3>
                        <h3>{id.patient.empname}</h3>
                      </span>
                      <br />
                      <span style={{ display: 'flex' }} className="new ">
                        <h3>Doctor Id:</h3>
                        <h3>{id.patient.empid}</h3>
                      </span>
                      <br />

                      <span style={{ display: 'flex' }} className="new ">
                        <h3>Mobile :</h3>
                        <h3>{id.patient.emp_mobile}</h3>
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>

            <h1 className="new " style={{ display: 'flex', justifyContent: 'center' }}>Prescription</h1>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>

              <div style={{
                width: '40%', height: '45vh', display: 'flex', justifyContent: 'center',

                background: '#fff0',
                alignItems: 'center'
              }}>
                <Pill />
              </div>



              <div style={{ width: '60%', padding: '5px' }}>
                <table id="customers" >
                  <thead  >
                    <tr>
                      <th >Medicine</th>
                      <th >Dose</th>
                      <th >Frequency</th>
                    </tr>
                  </thead>
                  <tbody >
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.medicine}</td>
                        <td>{item.dose}</td>
                        <td>{item.frequency}</td>


                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>


          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', alignItems: 'center', alignContent: 'center' }}>
              <div style={{
                display: 'grid',
                gap: '1.5rem',
                padding: '2rem',
                borderRadius: '12px',

                maxWidth: '750px',
                margin: 'auto',
                width: '80vh',
                height: '50vh',
              }}>
                <div class="canvas">
                  <div class="notepad">
                    <div class="cover" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                      <h1 style={{paddingTop:'40px',color:'pink'}}>Report</h1>
                    </div>
                    <div class="page one">
                      <p>
                        <span >{id.patient.pname}</span>
                        <br />
                        <span style={{ color: 'red' }}>  {id.patient.summary}</span>
                        ...
                      </p>
                    </div>

                  </div>
                  <div class="pencil">
                    <div class="edge"></div>
                  </div>
                </div>
              </div>
              <div style={{
                display: 'grid',
                gap: '1.5rem',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',

                maxWidth: '750px',
                margin: 'auto',
                border: '1px solid #e0e0e0',
                width: '80vh',
                height: '50vh',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '2px solid #e0e0e0',
                  paddingBottom: '1rem'
                }}>
                  <h2 style={{ margin: '0', fontSize: '1.2rem', color: '#333', fontWeight: '600' }}>Report Id:</h2>
                  <p style={{ margin: '0', fontSize: '1.2rem', fontWeight: '500', color: '#121366' }}>{id.patient.report_id}</p>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '2px solid #e0e0e0',
                  paddingBottom: '1rem'
                }}>
                  <h2 style={{ margin: '0', fontSize: '1.2rem', color: '#333', fontWeight: '600' }}>Report Date:</h2>
                  <p style={{ margin: '0', fontSize: '1.2rem', fontWeight: '500', color: '#121366' }}>{new Date(id.patient.report_date).toLocaleDateString()}</p>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '2px solid #e0e0e0',
                  paddingBottom: '1rem'
                }}>
                  <h2 style={{ margin: '0', fontSize: '1.2rem', color: '#333', fontWeight: '600' }}>Report Type:</h2>
                  <p style={{ margin: '0', fontSize: '1.2rem', fontWeight: '500', color: '#121366' }}>{id.patient.report_type}</p>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <h2 style={{ margin: '0', fontSize: '1.2rem', color: '#333', fontWeight: '600' }}>Summary:</h2>
                  <p style={{ margin: '0', fontSize: '1.2rem', fontWeight: '500', color: '#121366' }}>{id.patient.summary}</p>
                </div>
              </div>

            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100vh' }}>
                <h1 className="new " style={{ display: 'flex', justifyContent: 'center' }}>Test</h1>
                <br />
                <div style={{ boxShadow: '0 8px 8px rgba(0,0,0,0.2)', backgroundColor: 'white' }}>
                  <div>
                    <table id="customers">
                      <thead>
                        <tr>
                          <th>List</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Invoice?.invoiceDetails?.map((item, index) => (
                          <tr key={index}>
                            <td>{item.test_name}</td>
                            <td>{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ display: 'grid', boxShadow: '0 8px 8px rgba(0,0,0,0.2)', height: '5vh' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <h3>Total Cost with Gst 5%:</h3>
                      {Slip.map((item, index) => (
                        <h3 key={index}>{item.pay}</h3>
                      ))}
                    </div>

                  </div>
                  <button style={{ width: '100%' }} onClick={() => GetPay(id.patient.pid, id.patient.empid)} >Pay</button>
                </div>

              </div>
            </div>
          </CustomTabPanel>
        </Box>
        <br />
        <div style={{  backgroundColor: "white", display: 'flex', justifyContent: 'space-around' }}>
          <IoMdCall size={40} onClick={() => alert('8936033768')} />
          <FaInstagram size={40} />
          <CiFacebook size={40} />
          <RiMapPin2Line size={40} />
        </div>
      </div >

    </>
  );
}
