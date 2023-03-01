import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Button } from "@material-ui/core";
import moment from 'moment';
import axios from "axios";
import { LoginContext } from "../page/contexts/LoginContext";
import { getFormatNumber } from "../constants/functions";
import { useParams,useNavigate } from "react-router-dom";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(1, 159, 6.0, 24, 4.0),
  createData(2, 237, 9.0, 37, 4.3),
  createData(3, 262, 16.0, 24, 6.0),
  createData(4, 305, 3.7, 67, 4.3),
  createData(5, 356, 16.0, 49, 3.9),
];
export default function ExchangeRate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const [isCheckRateColor, setIsCheckRateColor] = useState('green')
  const [isCheckExchangeRateColor, setIsCheckExchangeRateColor] = useState('')
  const [isCheckExchangeRate, setIsCheckExchangeRate] = useState(false)
  const [defaultValue, setDefaultValue] = useState("")
  const [rate, setRate] = useState([])
  const [listrate, setListrate] = useState([])
  const [exchange, setExchange] = useState([])
  const [currency_code, setCurrency_code] = useState("")
  const [conver_rate, setConver_rate] = useState("")
  const [isDisabled, setIsDisabled] = useState(true)
  const {
    OnloadResetCondition
  } = useContext(LoginContext);

  const OnRate = () => {
    setIsCheckRateColor('green')
    setIsCheckExchangeRateColor('black')
    setIsCheckExchangeRate(false)
    setDefaultValue('')
  }
  const OnExchangeRate = () => {
    setIsCheckRateColor('black')
    setIsCheckExchangeRateColor('green')
    setIsCheckExchangeRate(true)
  }
  const onLoadrate = () => {
    axios.get("/accounting/api/report/selectExchange").then((data) => {
      console.log("Listdata=", [...data?.data?.results])
      setRate([...data?.data?.results])
    }).catch((err) => {
      console.log(err)
    })
  }
  const OnTransactionRate = () => {
    axios.get('/accounting/api/report/selectTransactionRate').then((data) => {
      console.log("data=", [...data?.data?.results])
      setListrate([...data?.data?.results])
    }).catch((err) => {
      console.log(err)
    })
  }
  const goback =()=>{
    navigate('/Profitandloss')
  }

  const EnterDate = (e) => {
    setIsDisabled(false)
    setDefaultValue(moment(e).format("DD-MM-YYYY"))
    // setErrdate(false)
    // axios.get(`/accounting/api/loss-gain/getdate/${moment(e).format("DD-MM-YYYY")}`).then((data) => {
    //   if (data?.data?.result == 0) {
    //     setData([...clearData])
    //   } else {
    //     setData([...data?.data?.result])
    //     setExchange([...data?.data?.result])
    //   }
    // }).catch((err) => {
    //   console.log(err)
    // })
  }
  const OnGetvaues = (e) => {
    setCurrency_code(e)
    let dataList = {
      data: defaultValue,
      currency_code: e

    }

  }
  const onChangeTextCurrency = (value) => {
    const ratenumber = value.toString().replaceAll(',', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    setExchange(ratenumber);
    setConver_rate(ratenumber.replaceAll(',', ''))
  }
  const onBlurCurrency = (value) => {
    let number = value.replaceAll(',', '')
    let format_number = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
    setExchange(format_number.replaceAll('$', ''))
  }
  const insert = () => {
    let informdata = {
      date: defaultValue,
      conver_rate: conver_rate,
      currency_code: currency_code
    }
    axios.post('/accounting/api/report/insertExchangeRate', informdata).then((data) => {
      setDefaultValue('')
      setCurrency_code('')
      setExchange('')
      onLoadrate()
      // onloadreportGl()
      // OnloadBalancesheet()
      setIsDisabled(true)
      OnloadResetCondition();
      // onloadAutomaticGl();
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    onLoadrate()
    OnTransactionRate()
  }, [])
  return (
    <>
      <div>
        <Breadcrumbs aria-label="breadcrumb">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: 'space-between'
            }}
          >
            {
              id == 2 ? (<>
                <p
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontFamily: "Phetsarath OT",
                    cursor: 'pointer',
                    backgroundColor: "#3f51b5",
                    borderRadius: '50%'
                  }}
                onClick={() => { goback() }}
                >
                  <ArrowBackIcon style={{ color: "white" }} />
                </p>

              </>) : null
            }
            <h4 style={{ marginLeft: 10, color: 'black' }}>Exchange Rate</h4>
          </div>
        </Breadcrumbs>
        <div
          style={{
            height: 10,
          }}
        ></div>
        <div
          style={{
            height: 5,
            backgroundColor: "#3f51b5",
          }}
        ></div>
        <div
          style={{
            height: 10,
          }}
        ></div>

      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Button variant="outlined" style={{ color: `${isCheckRateColor}` }} onClick={() => { OnRate() }}>Rate</Button>
        <Button variant="outlined" style={{ color: `${isCheckExchangeRateColor}` }} onClick={() => { OnExchangeRate() }}>
          Exchange Rate
        </Button>
        {
          isCheckExchangeRate !== true ? (<>

          </>) : (<>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <input
                type="text"
                placeholder="dd/MM/yyyy"
                value={defaultValue}
                onChange={(e) => setDefaultValue(e.target.value)}
                style={{
                  border: '1px solid #ccc',
                  height: 36,
                  borderRadius: 3,
                  width: 100,
                  paddingLeft: 10,
                  marginLeft: 5,
                  textAlign: "right",
                  borderRight: "none",
                }}
              />
              <input
                type="date"
                style={{
                  border: '1px solid #ccc',
                  height: 36,
                  borderRadius: 3,
                  width: 30,
                  paddingLeft: 10,
                }}
                onChange={(e) => EnterDate(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 10, justifyContent: 'flex-start' }}>
              <select
                disabled={isDisabled}
                style={{
                  border: '1px solid #ccc',
                  height: 36,
                  borderRadius: 3,
                  width: 130,
                  marginRight: 10
                }}
                onChange={(e) => {
                  OnGetvaues(e.target.value);
                }}
                value={currency_code}
              >
                <option>SELECT CURRENCY</option>
                <option>USD</option>
                <option>THB</option>
              </select>
              <input
                type="text"
                value={exchange}
                placeholder="Exchange Rate"
                style={{
                  border: '0.1px solid #ccc',
                  outline: 'none',
                  borderRadius: 3,
                  height: 36,
                  textAlign: 'right'
                }}
                onChange={(e) => onChangeTextCurrency(e.target.value)}
                onBlur={(e) => onBlurCurrency(e.target.value)}
              />
              <Button variant="contained" color="primary" style={{ height: 36, marginLeft: 10 }} onClick={() => { insert() }} >Add</Button>
              <Button variant="contained" color="primary" style={{ height: 36, marginLeft: 10 }} >Clear</Button>
            </div>
          </>)
        }
      </div>
      {
        isCheckExchangeRate === true ? (
          <>
            <TableContainer component={Paper}>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Date Exchange Rate</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="right">Currency</TableCell>
                    <TableCell align="right">Exchange Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    rate && rate.map((item, index) => {
                      return (
                        <>
                          <TableRow key={index}>
                            <TableCell align="left" >{moment(item?.createdate).format("DD-MM-YYYY")}</TableCell>
                            <TableCell align="left" >Exchange Rate</TableCell>
                            {
                              item?.foreign_code === 'USD' ? (
                                <>
                                  <TableCell align="right" ><img alt="Logo" src="/assets/images/USA.png" style={{ width: 30, height: 30, marginTop: 5, borderRadius: '50%' }} /></TableCell>
                                </>
                              ) : (
                                <>
                                  <TableCell align="right" ><img alt="Logo" src="/assets/images/thailand.png" style={{ width: 30, height: 30, marginTop: 5, borderRadius: '50%' }} /></TableCell>
                                </>
                              )
                            }
                            <TableCell align="right" >{getFormatNumber(item?.rate_exchange)}</TableCell>

                          </TableRow>
                        </>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </>) : (
          <>
            <TableContainer component={Paper}>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>

                    <TableCell align="left" >Date Exchange Rate</TableCell>
                    <TableCell align="left">Journal no</TableCell>
                    <TableCell align="right">Currency</TableCell>
                    <TableCell align="right">Exchange Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    listrate && listrate.map((data, index) => {
                      return (
                        <>
                          <TableRow key={index}>

                            <TableCell align="left" >{moment(data?.tr_date).format("DD-MM-YYYY")}</TableCell>
                            <TableCell align="left">{data?.journal_no}</TableCell>
                            {
                              data?.currency_status === 'USD' ? (
                                <>
                                  <TableCell align="right">  <img alt="Logo" src="/assets/images/USA.png" style={{ width: 30, height: 30, marginTop: 5, borderRadius: '50%' }} /></TableCell>

                                </>
                              ) : (
                                <>
                                  <TableCell align="right"> <img alt="Logo" src="/assets/images/thailand.png" style={{ width: 30, height: 30, marginTop: 5, borderRadius: '50%' }} /></TableCell>

                                </>
                              )
                            }
                            <TableCell align="right">{getFormatNumber(data?.money_rate)}</TableCell>
                          </TableRow>
                        </>
                      )
                    })
                  }


                </TableBody>
              </Table>
            </TableContainer>


          </>
        )
      }

    </>

  );
}
