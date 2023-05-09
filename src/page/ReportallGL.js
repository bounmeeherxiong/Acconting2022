import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import { getFormatNumber } from "../constants/functions"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { LoginContext } from "./contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import PrintIcon from '@material-ui/icons/Print';
import ReactToPrint from "react-to-print";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import { Modal, Spinner } from "react-bootstrap";
import { Button } from "@material-ui/core";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function ReportallGL() {
  let componentRef = useRef(null)
  const navigate = useNavigate();
  const {
    listaccountname, EditJournal, listgl, setListgl, onloadreportGl, listcondition, OnloadResetCondition
  } = useContext(LoginContext);
  const goback = () => {
    navigate("/ChartAccount");
  }
  const classes = useStyles();
  const [getvalues, setGetvalues] = useState([]);
  const [start_date, setStart_date] = useState("");
  const [showBox, setShowBox] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [active, setActive] = useState("");
  const [Leave, setLeave] = useState(0);
  const [nameShow, setNameShow] = useState("");
  const [defaultValue, setDefaultValue] = useState("")
  const [defaultValue1, setDefaultValue1] = useState("")
  const [defaultValuedate, setDefaultValuedate] = useState("")
  const [defaultValuedate2, setDefaultValuedate2] = useState("")
  const date = moment(new Date).format("DD-MM-YYYY")
  const [ch_id, setCh_id] = useState("")
  const [open, setOpen] = useState(true);
  const [account, setAccount] = useState(false)
  const [journal, setJournal] = useState(false)
  const [getjournal, setGetjournal] = useState('')
  const [errdate, setErrdate] = useState(false)
  const [err, setErr] = useState("0")
  const [showSetting, setShowSetting] = useState(false)
  const [showdebit, setShowdebit] = useState(false)
  const [showcredit, setshowcredit] = useState(false)
  const [foreigndebit, setForeignDebit] = useState(false)
  const [foreigncredit, setForeignCredit] = useState(false)
  const [foreignamount, setForeignAmount] = useState(false)
  const [foreignbalance, setforeignBalance] = useState(false)
  const [currentbalance, setCurrentbalance] = useState(false)
  const [gain_Loss, setGain_loss] = useState(false)
  const [rate, setRate] = useState(false)
  const [show, setShow] = useState(false);
  const [exchangerate, setExchangeRate] = useState(false);
  const [exchange, setExchange] = useState([])
  const [isLoading, setIsLoading,] = useState(false);
  const [loading, setLoading] = useState(false);

  const [clearData, setClearData] = useState([
    { name: 'USD', rate: '' },
    { name: 'THB', rate: '' },
  ])
  const [data, setData] = useState([
    { name: '', rate: '' },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const Setting = () => {
    setShowSetting(!showSetting)
  }
  const handleClose = () => {
    setShow(false);

  };
  const handleShow = () => {
    setShow(true)
  };
  const ReportExchange=()=>{
    axios.get('/accounting/api/report/report_Exchange').then((data)=>{
      console.log(data)      
      onloadreportGl();
      OnloadResetCondition();
    }).catch((err)=>{
      console.log(err)
    })
  }
  const EnterDate = (e) => {
    // setDefaultValue(moment(e).format("DD/MM/YYYY"))
    // setErrdate(false)
    // axios.get(`/accounting/api/loss-gain/getdate/${moment(e).format("DD-MM-YYYY")}`).then((data) => {
    //     if (data?.data?.result == 0) {
    //         setData([...clearData])
    //     } else {
    //         setData([...data?.data?.result])
    //         setExchange([...data?.data?.result])
    //     }
    // }).catch((err) => {
    //     console.log(err)
    // })
  }

  const onBlurSetting = (Leave) => {
    if (Leave === 0) {
      setShowSetting(false)
    }
  }
  const onBlurCredit = () => {
    setShowSetting(false)
  }
  const Ondebit = () => {
    setLeave(0)
    setShowdebit(!showdebit)
  }
  const Oncredit = () => {
    setLeave(0)
    setshowcredit(true)

  }
  const OnForeigndebit = () => {
    setLeave(0)
    setForeignDebit(!foreigndebit)
  }
  const Onforeigncredit = () => {
    setLeave(0)
    setForeignCredit(!foreigncredit)
  }
  const Onforeignamount = () => {
    setLeave(0)
    setForeignAmount(!foreignamount)
  }
  const OnForeignbalance = () => {
    setLeave(0)
    setforeignBalance(!foreignbalance)
  }
  const OnRate = () => {
    setLeave(0)
    setRate(!rate)
  }
  const OnExchangerate = () => {
    setLeave(0)
    setExchangeRate(!exchangerate)
  }
  const OnCurrentBalance = () => {
    setLeave(0)
    setCurrentbalance(!currentbalance)
  }
  const insert = () => {

  }
  const OnGain_loss = () => {
    setLeave(0)
    setGain_loss(!gain_Loss)
  }


  const handleClicks = () => {
    setShowBox(!showBox);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const _onShow = (e) => {
    if (e == "custom") {
      setAccount(false)
    } else if (e == "all") {
      setErr('')
      setAccount(false)
      onloadreportGl();
    } else if (e == "today") {
      setErr('')
      setAccount(false)
      const e1 = new Date()
      setAccount(false)
      const startToday = moment(e1).format("DD-MM-YYYY")
      const endToday = moment(e1).format("DD-MM-YYYY")
      setDefaultValue(moment(e1).format("DD-MM-YYYY"))
      setDefaultValue1(moment(e1).format("DD-MM-YYYY"))
      const start = defaultValue
      const end = defaultValue1
      let data;
      if (start == '' || end == '') {
        data = {
          startToday,
          endToday
        }
      } else {
        data = {
          start,
          end
        }
      }
      axios.post("/accounting/api/report/reportGlbydate", data).then((data) => {
        console.log("SearchDataList=",{...data?.data})
        setListgl({ ...data?.data })
      }).catch((err) => {
        console.log(err)
      })
    } else if (e == "account") {
      setJournal(false)
      setAccount(true)
    } else if (e == "journal_no") {
      setAccount(false)
      setJournal(true)
    } else if (e == "exchange_rate") {

    }
    setGetvalues(e)
  }
  const _searchstartdate = (e) => {
    setDefaultValuedate(e)
    setStart_date(e)
    if (defaultValue == "") {
      setDefaultValue(date)
    } else {
      setDefaultValue(moment(e).format("DD-MM-YYYY"))
    }
  }
  const OnEditJournal = (id) => {
    EditJournal(id)
  }
  const _searchbydate = (e) => {
    setDefaultValuedate2(e)
    setDefaultValue1(e)
    if (defaultValue1 == "") {
      setDefaultValue1(date)
    } else {
      setDefaultValue1(moment(e).format("DD-MM-YYYY"))
    }
  }
  const onLoadExchangeRates = () => {
    axios.get('/accounting/api/loss-gain/getrate').then((data) => {
      setData([...data?.data.result])
    }).catch((err) => {
      console.log(err)
    })
  }
  const Search = () => {
    if (getvalues == "account") {
      if (!nameShow) {
        setErr('102')
        return;
      }
      const start = defaultValue
      const end = defaultValue1
      let data = {
        start,
        end,
        ch_id
      }
      axios.post("/accounting/api/report/reportbyaccount", data).then((data) => {

        setListgl({ ...data?.data })
      }).catch((err) => {
        console.log(err)
      })
    } else if (getvalues === 'journal_no') {

      let data = {
        journal_no: getjournal
      }

      axios.post("/accounting/api/report/reportGlbyJournalno", data).then((data) => {
        setListgl({ ...data?.data })
      }).catch((err) => {
        console.log(err)
      })
    } else {
      const start = defaultValue
      const end = defaultValue1
      let data = {
        start,
        end
      }
      axios.post("/accounting/api/report/reportGlbydate", data).then((data) => {
        console.log("ssssDataList=", { ...data?.data })
        setListgl({ ...data?.data })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  const onloadAutomaticGl = () => {
    axios.get("/accounting/api/report/reportAutoGL").then((data) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  }

  // const onloadreportGl = () => {
  //   axios.get("/accounting/api/report/reportGl").then((data) => {
  //     setListgl({ ...data?.data })
  //   })
  // }

  const onGotoEditjournal = (id) => {
    const baseUrl = window.location.pathname;
    navigate(`/Journalpage/${id}`);
  }
  const OnShowAatumaticTransaction = (e) => {
    navigate(`/DetailAutomatic/${e}`)
  }
  const Onloadreset = () => {

    window.location.reload();
    // axios.get('/accounting/api/report/createResetExchange_gl').then((data) => {
    //   onloadreportGl();
    //   OnloadResetCondition();
    //   onloadAutomaticGl();
    // }).catch((err) => {
    //   console.log(err)
    // })

  }
  const Onloadreset1 = () => {
    axios.get('/accounting/api/report/createResetExchange_gl').then((data) => {
      console.log(data)
      onloadreportGl()
      OnloadResetCondition()
      onloadAutomaticGl();
      // window.location.reload();
    }).catch((err) => {
      console.log(err)
    })

  }
  const getNameList = (c_id) => {
    axios.get(`/accounting/api/chartofaccounts/all/parents/${c_id}`).then((data) => {
      if (data?.data?.message.length > 0) {
        setCh_id(data?.data.message[0].c_id);
        console.log(data?.data.message[0].c_id)
        const names = data?.data?.message.map((item) => {
          return item.name_eng;
        });
        names.reverse();
        setNameShow(names.join(":"));
        setShowBox(!showBox);
      }
    });
  };
  const _onSearchList = (e) => {
    setNameShow(e);
    let searchName = listaccountname.filter((el) => el.name_eng.toLowerCase().includes(e.toLowerCase()));
    if (!e) {
      setSearchResult([]);
    } else {
      setSearchResult([...searchName]);
    }
  };
  useEffect(() => {

    _onShow();
    onloadreportGl()
    _searchstartdate();
    _searchbydate();
    onLoadExchangeRates();


  }, [])
  // useEffect(() => {
  //   if (listcondition !== 0) {
  //     setTimeout(() => {
  //       alert("bounmeeher")
  //     }, 50000);
  //   }
  // }, [])
  return (
    <>
      <div>
        <h2>General Ledger Report</h2>
        <ChevronLeftIcon style={{ color: "#3f51b5", cursor: "pointer" }} />
        <span style={{ color: "#3f51b5", cursor: "pointer" }}
          onClick={() => { goback() }}
        >Back to report list</span><br />
      </div>
      <span>Report period</span><br />
      <div style={{ display: 'flex', flexDirection: "row", width: "100%", justifyContent: 'space-between' }} >
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
          <select
            onChange={(e) => _onShow(e.target.value)}
            value={getvalues}
            style={{
              border: '1px solid #ccc',
              height: 30,
              borderRadius: 3,
              width: 200,
              outline: 'none'
            }}
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="custom">Custom</option>
            <option value="account">Report by Account</option>
            <option value="journal_no">Report by journal no</option>
            <option value="exchange_rate">Exchange Rate</option>
          </select>
          <input
            type="text"
            defaultValue={defaultValue}
            onChange={(e) => setDefaultValue(e.target.value)}
            style={{
              border: '1px solid #ccc',
              height: 30,
              borderRadius: 3,
              width: 100,
              paddingLeft: 10,
              marginLeft: 25,
              textAlign: "right",
              borderRight: "none",
            }}
          />
          <input
            type="date"
            onChange={(e) => _searchstartdate(e.target.value)}
            style={{
              border: '1px solid #ccc',
              height: 30,
              borderRadius: 3,
              width: 30,
              paddingLeft: 10,
            }}
          />
          <span style={{ marginLeft: 10, paddingTop: 5 }}>To</span>
          <input
            type="text"
            defaultValue={defaultValue1}
            onChange={(e) => setDefaultValue1(e.target.value)}
            style={{
              border: '1px solid #ccc',
              height: 30,
              borderRadius: 3,
              width: 100,
              paddingLeft: 10,
              marginLeft: 25,
              textAlign: "right",
              borderRight: "none",
            }}
          />
          <input
            type="date"
            onChange={(e) => _searchbydate(e.target.value)}
            style={{
              border: '1px solid #ccc',
              height: 30,
              borderRadius: 3,
              width: 30,
              paddingLeft: 10,
            }}
          />
          {
            account === true ?
              (
                <>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <input
                        type="text"
                        onChange={(e) => _onSearchList(e.target.value)}
                        value={nameShow}
                        style={{
                          border: "1px solid #ccc",
                          borderTopLeftRadius: 4,
                          borderBottomLeftRadius: 4,
                          borderRight: "none",
                          height: 30,
                          outline: "none",
                          paddingLeft: 10,
                          marginLeft: 20,
                          width: 300
                        }}
                        onClick={() => setShowBox(true)}
                      />
                      <div
                        style={{
                          border: "1px solid #ccc",
                          borderLeft: "none",
                          borderTopRightRadius: 4,
                          borderBottomRightRadius: 4,
                        }}
                        onClick={() => { handleClick(); setShowBox(!showBox); }}
                      >
                        {open ? <ExpandLess /> : <ExpandMore />}
                      </div>
                    </div>
                    <div>
                      {
                        err == "102" ? (
                          <>
                            <small style={{ position: "absolute", marginLeft: 20, fontSize: 20, color: "red" }}>Please select account type</small>

                          </>) : (<></>)
                      }
                    </div>
                  </div>
                </>
              ) : null
          }
          {
            journal === true ? (
              <>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <input
                      type="text"
                      onChange={(e) => setGetjournal(e.target.value)}
                      value={getjournal}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: 4,
                        height: 30,
                        outline: "none",
                        paddingLeft: 10,
                        marginLeft: 20,
                        width: 150
                      }}
                    />
                  </div>

                </div>

              </>
            ) : null
          }
          <button
            style={{
              backgroundColor: "#3f51b5",
              border: "none",
              height: 30,
              borderRadius: 2,
              paddingLeft: 10,
              paddingRight: 10,
              color: "white",
              alignItems: "center",
              marginLeft: 10,
            }}
            onClick={() => Search()}
          >
            {/* <SearchIcon /> */}
            Run Report
          </button>
          {
            listcondition === 0 ? (
              <>
                <button
                  style={{
                    backgroundColor: "#3f51b5",
                    border: "none",
                    height: 30,
                    borderRadius: 2,
                    paddingLeft: 10,
                    paddingRight: 10,
                    color: "white",
                    alignItems: "center",
                    marginLeft: 10,
                  }}
                  onClick={() => Onloadreset()}
                >
                  Reset
                </button>

              </>
            ) : (
              <>
                <button
                  style={{
                    backgroundColor: "red",
                    border: "none",
                    height: 30,
                    borderRadius: 2,
                    paddingLeft: 10,
                    paddingRight: 10,
                    color: "white",
                    alignItems: "center",
                    marginLeft: 10,
                  }}
                  onClick={() => Onloadreset1()}
                >
                  Reset
                </button>
              </>
            )
          }

          <ReactToPrint
            trigger={() => <button
              style={{
                backgroundColor: "#3f51b5",
                border: "none",
                height: 30,
                borderRadius: 2,
                paddingLeft: 10,
                paddingRight: 10,
                color: "white",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              < PrintIcon />
            </button>}
            content={() => componentRef}
            style={{ marginRight: 10 }}
          />
          {/* {
            account !== true ? (<>
              <button
                style={{
                  backgroundColor: "#3f51b5",
                  border: "none",
                  height: 30,
                  borderRadius: 2,
                  paddingLeft: 10,
                  paddingRight: 10,
                  color: "white",
                  alignItems: "center",
                  marginLeft: 10,
                }}
                onClick={() => { handleShow() }}
              >
                <AddIcon />
                Exchange Rate
              </button>

            </>) : null
          } */}
          <button
            style={{
              backgroundColor: "#3f51b5",
              border: "none",
              height: 30,
              borderRadius: 2,
              paddingLeft: 10,
              paddingRight: 10,
              color: "white",
              alignItems: "center",
              marginLeft: 10,
            }}
            onClick={() => { ReportExchange()}}
          >
            <AddIcon />
            Report Exchange
          </button>
        </div>
        <div>
          <button
            onClick={() => { Setting() }}
            onBlur={() => { onBlurSetting() }}
            style={{
              backgroundColor: "#3f51b5",
              border: "none",
              height: 30,
              borderRadius: 2,
              paddingLeft: 10,
              paddingRight: 10,
              color: "white",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <SettingsIcon style={{ cursor: 'pointer' }}
            />
          </button>
          {showSetting ?
            (
              <>
                <div style={{
                  backgroundColor: 'white',
                  position: 'absolute',
                  right: 30,
                  border: '1px solid #ccc',
                  borderRadius: 3,
                  width: 300,
                  height: 250,
                }}>
                  <h4 style={{ marginTop: 20, marginLeft: 10 }}>Display density</h4>
                  <div style={{ height: 20 }}></div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <div style={{ marginLeft: 20, display: 'flex', flexDirection: 'row' }}>
                      <input type="checkbox"
                        onClick={() => { Ondebit() }}
                        onMouseLeave={() => { setLeave(null) }} />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Debit</small>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: 2, marginRight: 79 }}>
                      <input type="checkbox"
                        onClick={() => { Oncredit() }}
                        onMouseLeave={() => { setLeave(null) }}

                      />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Credit</small>
                    </div>
                  </div>
                  <div style={{ height: 10 }}></div>
                  <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                      <input type="checkbox"
                        onClick={() => { OnForeigndebit() }}
                        onMouseLeave={() => { setLeave(null) }}
                      />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Foreign Debit</small>
                    </div>
                    <div style={{ display: "flex", flexDirection: 'row', marginRight: 33 }}>
                      <input type="checkbox"
                        onClick={() => { Onforeigncredit() }}
                        onMouseLeave={() => { setLeave(null) }}
                      />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Foreign Credit</small>
                    </div>
                  </div>
                  <div style={{ height: 10 }}></div>
                  <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                      <input type="checkbox"
                        onClick={() => { Onforeignamount() }}
                        onMouseLeave={() => { setLeave(null) }}
                      />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Foreign Amount</small>
                    </div>
                    <div style={{ marginRight: 21, display: 'flex', flexDirection: 'row' }}>
                      <input type="checkbox"
                        onClick={() => { OnForeignbalance() }}
                        onMouseLeave={() => { setLeave(null) }}

                      />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Foreign Balance</small>
                    </div>
                  </div>
                  <div style={{ height: 10 }}></div>
                  <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                      <input type="checkbox"
                        onClick={() => { OnRate() }}
                        onMouseLeave={() => { setLeave(null) }}
                      />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Rate</small>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginRight: 26 }}>
                      <input type="checkbox"
                        onClick={() => { OnExchangerate() }}
                        onMouseLeave={() => { setLeave(null) }}

                      />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Exchange Rate</small>
                    </div>
                  </div>
                  <div style={{ height: 10 }}></div>
                  <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                      <input type="checkbox"
                        onClick={() => { OnGain_loss() }}
                        onMouseLeave={() => { setLeave(null) }}
                      />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Gain/Loss</small>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginRight: 22 }}>
                      <input type="checkbox"
                        onClick={() => { OnCurrentBalance() }}
                        onMouseLeave={() => { setLeave(null) }}
                      />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Current balance</small>
                    </div>
                  </div>
                </div>
              </>
            ) : null
          }
        </div>
      </div>
      <Modal show={show} onHide={handleClose} style={{ paddingTop: 50 }} >
        <Modal.Header closeButton >
          <Modal.Title>
            Enter Exchange Rate
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <small>Enter Date</small>
            <input
              type="text"
              placeholder="dd/MM/yyyy"
              value={defaultValue}
              onChange={(e) => setDefaultValue(e.target.value)}
              style={{
                border: '1px solid #ccc',
                height: 30,
                borderRadius: 3,
                width: 100,
                paddingLeft: 10,
                marginLeft: 25,
                textAlign: "right",
                borderRight: "none",
              }}
            />
            <input
              type="date"
              style={{
                border: '1px solid #ccc',
                height: 30,
                borderRadius: 3,
                width: 30,
                paddingLeft: 10,
              }}
              onChange={(e) => EnterDate(e.target.value)}
            />

          </div>
          <div style={{ height: 20, marginLeft: 210 }}>
            {
              errdate === true ? (
                <>
                  < small style={{ position: "absolute", fontSize: 14, color: "red" }}>Please Inter date</small>
                </>
              ) : null
            }
          </div>

          {/* {JSON.stringify(data)} */}
          <div style={{ height: 20 }}></div>
          <table width={"100%"} border="1">
            <tr style={{ border: '1px solid #ccc', height: 30 }}>
              <td style={{ paddingLeft: 55 }}>Currency</td>
              <td align="right" style={{ paddingRight: 55 }}>Exchange Rate</td>
            </tr>
            {
              exchange.length == 0 ? (
                <>
                  {
                    data && data.map((item, index) => {
                      return (
                        <ComponentRateShow
                          key={index}
                          index={index}
                          data={data}
                          setData={setData}
                          item={item}
                        />
                      )
                    })
                  }
                </>) : (<>
                  {
                    data && data.map((item, index) => {
                      return (
                        <ComponentRate
                          key={index}
                          index={index}
                          data={data}
                          setData={setData}
                          item={item}
                        />
                      )
                    })
                  }
                </>)
            }
          </table>
          <div style={{ height: 20 }}></div>
          <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
            <Button variant="contained">Skip</Button>
            <Button variant="contained" color="primary" onClick={() => { insert() }}>
              {!isLoading ? (
                <>
                  Continue
                </>
              ) : (
                <>
                  {
                    <Spinner animation="border" variant="light" size='sm' />
                  }
                </>)
              }
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {showBox && (
        <>
          <Card style={{
            overflowY: "scroll",
            width: 520,
            position: "absolute",
            height: 300,
            marginLeft: 560
          }}>
            <CardActionArea>
              <CardContent>
                {searchResult.length > 0 ? (
                  <>
                    {searchResult.map((data, index) => {
                      return (
                        <>
                          <Typography
                            variant="body2"
                            key={index}
                            style={{
                              cursor: "pointer",
                              fontWeight:
                                active === data?.name_eng ? "bold" : "",
                            }}
                            onClick={() => getNameList(data?.c_id)}
                            onMouseOver={() => setActive(data?.name_eng)}
                            onMouseLeave={() => setActive(null)}
                          >
                            {data?.name_eng}- {data?.currencies_name}
                          </Typography>
                          <br />
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {listaccountname && listaccountname.map((data, index) => {
                      return (
                        <>
                          <Typography
                            key={index}
                            variant="body2"
                            style={{
                              cursor: "pointer",
                              fontWeight:
                                active === data?.name_eng ? "bold" : "",
                            }}
                            onClick={() => getNameList(data?.c_id)}
                            onMouseOver={() => setActive(data?.name_eng)}
                            onMouseLeave={() => setActive(null)}
                          >
                            {data?.name_eng}
                          </Typography>
                          <br />
                        </>
                      );
                    })}
                  </>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        </>
      )}
      <div style={{ height: 20 }}></div>
      <TableContainer  ref={(el) => (componentRef = el)}>
        <Table className={classes.table} aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 300, fontWeight: 'bold' }}>DATE</TableCell>
              <TableCell align="left" style={{ width: 300, fontWeight: 'bold' }}>TRANSACTION TYPE</TableCell>
              <TableCell align="left" style={{ width: 100, fontWeight: 'bold' }}>NO</TableCell>
              <TableCell align="left" style={{ width: 200, fontWeight: 'bold' }}>DESCRIPTION</TableCell>
              <TableCell align="right" style={{ width: 200, fontWeight: 'bold' }}>AMOUNT</TableCell>
              <TableCell align="right" style={{ fontWeight: 'bold' }}>BALANCE</TableCell>
              {
                currentbalance === true ? (<>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>CURRENT BALANCE</TableCell>
                </>) : null
              }


              {
                showdebit === true ? (
                  <TableCell align="right" style={{ width: 200, fontWeight: 'bold' }}>Debit</TableCell>
                ) : null
              }
              {
                showcredit === true ? (
                  <TableCell align="right" style={{ width: 200, fontWeight: 'bold' }}>Credit</TableCell>
                ) : null
              }
              {
                foreigndebit === true ? (<>
                  <TableCell align="right" style={{ width: 500, fontWeight: 'bold' }}>Foreign Debit</TableCell>
                </>) : null
              }
              {
                foreigncredit === true ? (<>
                  <TableCell align="right" style={{ width: 500, fontWeight: 'bold' }}>Foreign Credit</TableCell>
                </>) : null
              }
              {
                foreignamount === true ? (<>
                  <TableCell align="right" style={{ width: 500, fontWeight: 'bold' }}>Foreign Amount</TableCell>
                </>) : null
              }
              {
                foreignbalance === true ? (<>
                  <TableCell align="right" style={{ width: 500, fontWeight: 'bold' }}>Foreign Balance</TableCell>
                </>) : null
              }
              {
                rate === true ? (<>
                  <TableCell align="right" style={{ width: 100, fontWeight: 'bold' }}>Rate</TableCell>
                </>) : null
              }
              {
                exchangerate === true ? (<>
                  <TableCell align="right" style={{ width: 500, fontWeight: 'bold' }}>Exchange Rate</TableCell>
                </>) : null
              }
              {
                gain_Loss === true ? (<>
                  <TableCell align="right" style={{ width: 500, fontWeight: 'bold' }}>Gain/Loss</TableCell>
                </>) : null
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {listgl.firstFloor && listgl.firstFloor.map((item, index) => {
              return (
                <>
                  < GLRowComponent
                    name_eng={item.name_eng}
                    id={item.c_id}
                    index={index}
                    second={listgl && listgl.SecondFloor}
                    childrenFirstFloor={listgl && listgl.childrenFirstFloor}
                    childrenSecondFloor={listgl && listgl.childrenSecondFloor}
                    onGotoEditjournal={onGotoEditjournal}
                    OnEditJournal={OnEditJournal}
                    defaultValue={defaultValue}
                    defaultValue1={defaultValue1}
                    getvalues={getvalues}
                    ch_id={ch_id}
                    showdebit={showdebit}
                    showcredit={showcredit}
                    foreigndebit={foreigndebit}
                    foreigncredit={foreigncredit}
                    foreignamount={foreignamount}
                    foreignbalance={foreignbalance}
                    rate={rate}
                    exchangerate={exchangerate}
                    gain_Loss={gain_Loss}
                    currentbalance={currentbalance}
                    OnShowAatumaticTransaction={OnShowAatumaticTransaction}
                  />
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
function GLRowComponent({ name_eng, id, second, childrenFirstFloor, childrenSecondFloor, onGotoEditjournal, OnEditJournal, defaultValue, defaultValue1, getvalues, ch_id, showcredit, showdebit, foreigndebit, foreigncredit, foreignamount, foreignbalance, rate, exchangerate, gain_Loss, currentbalance, OnShowAatumaticTransaction }) {
  const [open, setOpen] = useState(true);
  const [netTotal1, setNetTotal1] = useState([])
  let total1 = 0;
  const handleClick = () => {
    setOpen(!open);
  };
  const _onSearch = (c_id) => {
    if (getvalues == 'account') {
      let datas = {
        ch_id,
        start: defaultValue,
        end: defaultValue1
      }
      axios.post("/accounting/api/report/reportsumTotalAccountBydate", datas).then((data) => {
        setNetTotal1(data?.data?.data.balances)
      }).catch((err) => {
        console.log(err)
      })
    } else if (getvalues == 'today' || getvalues == 'custom') {
      let datas = {
        c_id,
        start: defaultValue,
        end: defaultValue1
      }
      axios.post("/accounting/api/report/reportsumTotalCustomAndTodayBydate", datas).then((data) => {
        setNetTotal1(data?.data?.data.balances)
      }).catch((err) => {
        console.log(err)
      })
    } else {
      let data = {
        c_id
      }
      axios.post("/accounting/api/report/sumdata", data).then((data) => {
        setNetTotal1([...data?.data?.result][0].balances)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  return (
    <>
      <TableRow>
        <TableCell onClick={() => { handleClick(); _onSearch(id) }} style={{ cursor: "pointer", width: '50%' }} colspan={3}>
          {open ? <ExpandLess /> : <ExpandMore />}
          {name_eng}
        </TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        {
          open ? (
            <TableCell align="left"></TableCell>
          ) : (

            <TableCell align="right" >{getFormatNumber(netTotal1)}₭</TableCell>
          )
        }
        {
          currentbalance === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          showdebit === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          showcredit === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          foreigndebit === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          foreigncredit === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          foreignamount === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          foreignbalance === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          rate === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          exchangerate === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          gain_Loss === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
      </TableRow>
      {open ? (
        <>
          < RowComponent
            OnEditJournal={OnEditJournal}
            id={id}
            name_eng={name_eng}
            childrenFirstFloor={childrenFirstFloor}
            onGotoEditjournal={onGotoEditjournal}
            total1={total1}
            showdebit={showdebit}
            showcredit={showcredit}
            foreigndebit={foreigndebit}
            foreigncredit={foreigncredit}
            foreignamount={foreignamount}
            foreignbalance={foreignbalance}
            rate={rate}
            exchangerate={exchangerate}
            gain_Loss={gain_Loss}
            currentbalance={currentbalance}
            OnShowAatumaticTransaction={OnShowAatumaticTransaction}
          />
          < SecondFloorRowComponent
            OnEditJournal={OnEditJournal}
            level={30}
            second={second}
            id={id}
            onGotoEditjournal={onGotoEditjournal}
            childrenSecondFloor={childrenSecondFloor}
            defaultValue={defaultValue}
            defaultValue1={defaultValue1}
            getvalues={getvalues}
            ch_id={ch_id}
            showdebit={showdebit}
            showcredit={showcredit}
            foreigndebit={foreigndebit}
            foreigncredit={foreigncredit}
            foreignamount={foreignamount}
            foreignbalance={foreignbalance}
            rate={rate}
            exchangerate={exchangerate}
            gain_Loss={gain_Loss}
            currentbalance={currentbalance}
            OnShowAatumaticTransaction={OnShowAatumaticTransaction}
          />
        </>
      ) : null
      }
    </>
  )
}
function RowComponent({ id, name_eng, OnEditJournal, total1, childrenFirstFloor, showcredit, showdebit, foreigndebit, foreigncredit, foreignamount, foreignbalance, rate, exchangerate, gain_Loss, currentbalance, OnShowAatumaticTransaction }) {
  let debittotal = 0;
  let credittoal = 0;
  const [active, setActive] = useState("");
  if (childrenFirstFloor === null) return <></>
  const filter = childrenFirstFloor.filter((el) => el.ch_id == id);
  if (filter.length === 0) return <></>;
  return (
    <>
      {
        filter.map((data, index) => {
          if (data?.begining_balance != 0) {
            total1 += parseFloat(data?.amout)
          }
          if (data?.debit !== '0.00') {
            debittotal += parseFloat(data?.debit)
          }
          if (data?.credit !== '0.00') {
            credittoal += parseFloat(data?.credit)
          }
          return (
            <>
              <TableRow key={index} style={{paddingLeft:45}}>
                {
                  data?.begining_balance == '0' ? (
                  <>
                  <TableCell >Beginning Balance</TableCell>
                  </>):(
                  <>
                    <TableCell
                  style={{
                    paddingLeft: 45, cursor: "pointer",
                    fontWeight:
                      active === moment(data?.createdate).format("DD-MM-YYYY") ? "bold" : "",
                  }}
                  onClick={() => { OnEditJournal(data?.tr_id) }}
                  onMouseOver={() => setActive(moment(data?.createdate).format("DD-MM-YYYY"))}
                  onMouseLeave={() => setActive(null)}
                >{moment(data?.createdate).format("DD-MM-YYYY")}</TableCell>
                  </>)
                }

                {
                  data?.begining_balance == '0' ? (
                    <TableCell align="left"></TableCell>

                  ) : (
                    <TableCell align="left" style={{
                      cursor: "pointer",

                    }} onClick={() => { OnEditJournal(data?.tr_id) }}>Journal Entry</TableCell>
                  )
                }
                <TableCell align="left" style={{ cursor: "pointer" }} onClick={() => { OnEditJournal(data?.tr_id) }}>{data?.journal_no}</TableCell>
                <TableCell align="left" style={{ cursor: "pointer" }}><ReadMore children={data?.lg_desc} /></TableCell>
                {
                  data?.begining_balance === 0 ? (<>
                    <TableCell align="right" style={{ cursor: "pointer" }} onClick={() => { OnEditJournal(data?.tr_id) }}></TableCell>
                  </>) : (<>
                    <TableCell align="right" style={{ cursor: "pointer" }} onClick={() => { OnEditJournal(data?.tr_id) }}>{getFormatNumber(data?.amout)}₭</TableCell>
                  </>)
                }
                <TableCell align="right" style={{ cursor: "pointer" }} onClick={() => { OnEditJournal(data?.tr_id) }}>{getFormatNumber(data?.balances)}₭</TableCell>
                {
                  currentbalance === true ? (
                    <>
                      {
                        data?.foreign_code === 'USD' || data?.foreign_code === 'THB' ? (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer", color: "red" }} onClick={() => { OnShowAatumaticTransaction(data?.automatic_status) }}>{getFormatNumber(data?.total_balanaces)}₭</TableCell>
                          </>
                        ) : (<>
                          <TableCell align="right" style={{ cursor: "pointer" }}></TableCell>
                        </>)

                      }

                    </>) : null
                }

                {
                  showdebit === true ? (
                    <TableCell align="right" style={{ cursor: "pointer" }} onClick={() => { OnEditJournal(data?.tr_id) }}>{getFormatNumber(data?.debit)}₭</TableCell>
                  ) : null
                }
                {
                  showcredit === true ? (
                    <TableCell align="right" style={{ cursor: "pointer" }} onClick={() => { OnEditJournal(data?.tr_id) }}>{getFormatNumber(data?.credit)}₭</TableCell>
                  ) : null
                }
                {
                  foreigndebit === true ? (
                    <>
                      {data?.foreign_code === 'USD' || data?.foreign_code === 'THB' ? (
                        <>
                          {
                            data?.foreign_code === 'USD' ? (
                              <>
                                <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.currencies_debit)}$</TableCell>
                              </>) : (
                              <>
                                <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.currencies_debit)}฿</TableCell>
                              </>)
                          }

                        </>) : (
                        <>
                          <TableCell align="right" style={{ cursor: "pointer" }} ></TableCell>
                        </>)}
                    </>
                  ) : null
                }
                {
                  foreigncredit === true ? (
                    <>
                      {data?.foreign_code === 'USD' || data?.foreign_code === 'THB' ? (
                        <>
                          {
                            data?.foreign_code === 'USD' ? (
                              <>
                                <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.currencies_credit)}$</TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.currencies_credit)}฿</TableCell>
                              </>)
                          }
                        </>
                      ) : (
                        <>
                          <TableCell align="right" style={{ cursor: "pointer" }} ></TableCell>
                        </>
                      )}
                    </>
                  ) : null
                }
                {
                  foreignamount === true ? (
                    <>
                      {
                        data?.foreign_code === 'USD' || data?.foreign_code === 'THB' ? (
                          <>
                            {
                              data?.foreign_code === 'USD' ||  data.foreign_code == 'THB' ?
                                (
                                  <>
                                    <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_amount)}$</TableCell>

                                  </>
                                ) : (
                                  <>
                                    <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_balances)}฿</TableCell>

                                  </>
                                )
                            }
                          </>
                        ) : (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} ></TableCell>
                          </>
                        )
                        
                        

                      }
                    </>
                  ) : null
                }
                {
                  foreignbalance === true ? (
                    <>
                      {
                        data?.foreign_code === 'USD' || data?.foreign_code === 'THB' ?
                          (
                            <>
                              {
                                data?.foreign_code === 'USD' ? (
                                  <>
                                    <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_balances)}$</TableCell>
                                  </>
                                ) : (
                                  <>
                                    <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_balances)}฿</TableCell>
                                  </>
                                )
                              }
                            </>
                          ) : (
                            <>
                              <TableCell align="right" style={{ cursor: "pointer" }} ></TableCell>
                            </>
                          )
                      }
                    </>) : null
                }
                {
                  rate === true ? (
                    <>
                      {
                        data?.foreign_code === 'USD' || data?.foreign_code === 'THB' ? (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer", color: '#0d6efd' }} >{getFormatNumber(data?.money_rate)}</TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} ></TableCell>
                          </>)
                      }
                    </>) : null
                }
                {
                  exchangerate === true ? (
                    <>
                      {
                        data?.foreign_code === 'USD' || data?.foreign_code === 'THB' ? (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer", color: 'green' }} >{getFormatNumber(data?.money_rate)}</TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} ></TableCell>
                          </>)
                      }
                    </>) : null
                }
                {
                  gain_Loss === true ? (
                    <>
                      {
                        data?.foreign_code === 'USD' || data?.foreign_code === 'THB' ? (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer", color: 'red' }} onClick={() => { OnShowAatumaticTransaction(data?.automatic_status) }} >{getFormatNumber(data?.gain_loss)}₭</TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} ></TableCell>
                          </>)
                      }
                    </>) : null
                }
              </TableRow>
            </>
          )
        })
      }
      <TableRow>
        <TableCell align="left" colspan={3}>Total for {name_eng}</TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="right">{getFormatNumber(total1)}₭</TableCell>
        <TableCell align="left"></TableCell>
        {
          currentbalance === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          showdebit === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          showcredit === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          foreigndebit === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          foreigncredit === true ? (
            <>
              <TableCell align="left"></TableCell>
            </>) : null
        }
        {
          foreignamount === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          foreignbalance === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          rate === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          exchangerate === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          gain_Loss === true ? (<>
            <TableCell align="left" ></TableCell>
          </>) : null
        }

      </TableRow>
    </>
  )
}
function SecondFloorRowComponent({ level, second, id, OnEditJournal, childrenSecondFloor, defaultValue, defaultValue1, getvalues, ch_id, showcredit, showdebit, foreigndebit, foreigncredit, foreignamount, foreignbalance, rate, exchangerate, gain_Loss, currentbalance, OnShowAatumaticTransaction }) {
  if (second === null) return <></>
  const filter = second.filter((el) => el.parents == id);
  return (
    <>
      {
        filter.map((data, index) => {
          return (
            <>
              < TableCellComponent
                data={data}
                level={level}
                index={index}
                second={second}
                OnEditJournal={OnEditJournal}
                childrenSecondFloor={childrenSecondFloor}
                defaultValue={defaultValue}
                defaultValue1={defaultValue1}
                getvalues={getvalues}
                ch_id={ch_id}
                showdebit={showdebit}
                showcredit={showcredit}
                foreigndebit={foreigndebit}
                foreigncredit={foreigncredit}
                foreignamount={foreignamount}
                foreignbalance={foreignbalance}
                rate={rate}
                exchangerate={exchangerate}
                gain_Loss={gain_Loss}
                currentbalance={currentbalance}
                OnShowAatumaticTransaction={OnShowAatumaticTransaction}
              />
            </>
          )
        })
      }
    </>
  )
}
function TableCellComponent({ data, level, index, second, OnEditJournal, childrenSecondFloor, ch_id, getvalues, defaultValue, defaultValue1, showcredit, showdebit, foreigndebit, foreigncredit, foreignamount, foreignbalance, rate, exchangerate, gain_Loss, currentbalance, OnShowAatumaticTransaction }) {
  const [open, setOpen] = useState(true);
  const [netTotal1, setNetTotal1] = useState([])
  const handleClick = () => {
    setOpen(!open);
  };
  const _onSearch = (c_id) => {
    if (getvalues == 'account') {
      let datas = {
        ch_id,
        start: defaultValue,
        end: defaultValue1
      }
      axios.post("/accounting/api/report/reportsumTotalAccountBydate", datas).then((data) => {
        setNetTotal1(data?.data?.data.balances)
      }).catch((err) => {
        console.log(err)
      })
    } else if (getvalues == 'today' || getvalues == 'custom') {
      let datas = {
        c_id,
        start: defaultValue,
        end: defaultValue1
      }
      axios.post("/accounting/api/report/reportsumTotalCustomAndTodayBydate", datas).then((data) => {
        setNetTotal1(data?.data?.data.balances)
      }).catch((err) => {
        console.log(err)
      })
    } else {
      let data = {
        c_id
      }

      axios.post("/accounting/api/report/sumdata", data).then((data) => {
        setNetTotal1([...data?.data?.data][0].balances)

      }).catch((err) => {
        console.log(err)
      })
    }
  }
  return (
    <>
      <TableRow key={index}>
        <TableCell onClick={() => { handleClick(); _onSearch(data?.c_id) }} style={{ cursor: "pointer", paddingLeft: level, fontSize: 14 }} colspan={3}> {open ? <ExpandLess /> : <ExpandMore />}
          {data?.name_eng}
        </TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        {
          open ? (
            <TableCell align="left"></TableCell>
          ) : (
            <>
              <TableCell align="right">{getFormatNumber(netTotal1)}₭</TableCell>
            </>
          )
        }
        {
          currentbalance === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          showdebit === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          showcredit === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          foreigndebit === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          foreigncredit === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          foreignamount === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          foreignbalance === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          rate === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          exchangerate === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
        {
          gain_Loss === true ? (<>
            <TableCell align="left"></TableCell>
          </>) : null
        }
      </TableRow>
      {open ? (
        <>
          < SecondRowComponent
            id={data?.c_id}
            name_eng={data?.name_eng}
            amout={data?.amout}
            level={level}
            OnEditJournal={OnEditJournal}
            childrenSecondFloor={childrenSecondFloor}
            showdebit={showdebit}
            showcredit={showcredit}
            foreigndebit={foreigndebit}
            foreigncredit={foreigncredit}
            foreignamount={foreignamount}
            foreignbalance={foreignbalance}
            rate={rate}
            exchangerate={exchangerate}
            gain_Loss={gain_Loss}
            currentbalance={currentbalance}
            OnShowAatumaticTransaction={OnShowAatumaticTransaction}
          />
          < SecondFloorRowComponent
            level={level * 1.5}
            second={second}
            id={data.c_id}
            data={data}
            netTotal1={netTotal1}
            _onSearch={_onSearch}
            index={index}
            OnEditJournal={OnEditJournal}
            childrenSecondFloor={childrenSecondFloor}
            showdebit={showdebit}
            showcredit={showcredit}
            foreigndebit={foreigndebit}
            foreigncredit={foreigncredit}
            foreignamount={foreignamount}
            foreignbalance={foreignbalance}
            rate={rate}
            exchangerate={exchangerate}
            gain_Loss={gain_Loss}
            currentbalance={currentbalance}
            OnShowAatumaticTransaction={OnShowAatumaticTransaction}
          />
        </>
      ) : null}
    </>
  )
}
function SecondRowComponent({ id, name_eng, level, OnEditJournal, childrenSecondFloor, showdebit, showcredit, foreigndebit, foreigncredit, foreignamount, foreignbalance, rate, exchangerate, gain_Loss, currentbalance, OnShowAatumaticTransaction }) {
  let debittotal = 0;
  let credittoal = 0;
  if (childrenSecondFloor === null) return <></>
  const filter = childrenSecondFloor.filter((el) => el.ch_id == id);
  var total = 0;
  if (filter.length === 0) return <></>;
  return (
    <>
      {
        filter.map((data, index) => {
          if (data?.begining_balance != '0') {
            total += parseFloat(data.amout)
          }
          if (data?.debit !== '0.00') {
            debittotal += parseFloat(data?.debit)
          }
          if (data?.credit !== '0.00') {
            credittoal += parseFloat(data?.credit)
          }
          return (
            <>
              <TableRow key={index} >
                {
                  data?.begining_balance == '0' ? (<>
                 <TableCell style={{marginLeft:level}}>Beginning Balance</TableCell>
                  </>):(<>
                    <TableCell style={{ paddingLeft: level, cursor: "pointer" }} onClick={() => { OnEditJournal(data?.tr_id) }}>{moment(data?.createdate).format("DD-MM-YYYY")}</TableCell>
               
                  </>)
                }
          
                {
                  data?.begining_balance == '0' ? (
                    <TableCell align="left"></TableCell>
                  ) : (
                    <TableCell align="left" onClick={() => { OnEditJournal(data?.tr_id) }} style={{ cursor: "pointer" }}>Journal Entry</TableCell>
                  )
                }
                <TableCell align="left" onClick={() => { OnEditJournal(data?.tr_id) }} style={{ cursor: "pointer" }}>{data?.journal_no}</TableCell>
                <TableCell align="left" onClick={() => { OnEditJournal(data?.tr_id) }} style={{ cursor: "pointer" }}>{data?.lg_desc}</TableCell>

                {
                  data?.begining_balance == '0' ? (<>
                    <TableCell align="right" onClick={() => { OnEditJournal(data?.tr_id) }} style={{ cursor: "pointer" }}></TableCell></>) :
                    (<>
                      <TableCell align="right" onClick={() => { OnEditJournal(data?.tr_id) }} style={{ cursor: "pointer" }}>{getFormatNumber(data?.amout)}₭</TableCell>
                    </>)
                }
                <TableCell align="right" onClick={() => { OnEditJournal(data?.tr_id) }} style={{ cursor: "pointer" }}>{getFormatNumber(data?.balances)}₭</TableCell>
                {
                  currentbalance === true ? (
                    <>
                      {
                        data?.foreign_code === 'USD' || data?.foreign_code === 'THB' ? (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer", color: "red" }} onClick={() => { OnShowAatumaticTransaction(data?.automatic_status) }}>{getFormatNumber(data?.total_balanaces)}₭</TableCell>
                          </>
                        ) : (<>
                          <TableCell align="right" style={{ cursor: "pointer" }}></TableCell>
                        </>)

                      }

                    </>) : null
                }


                {
                  showdebit === true ? (
                    <TableCell align="right" onClick={() => { OnEditJournal(data?.tr_id) }} style={{ cursor: "pointer" }}>{getFormatNumber(data?.debit)}₭</TableCell>
                  ) : null
                }
                {
                  showcredit === true ? (
                    <TableCell align="right" onClick={() => { OnEditJournal(data?.tr_id) }} style={{ cursor: "pointer" }}>{getFormatNumber(data?.credit)}₭</TableCell>
                  ) : null
                }
                {
                  foreigndebit === true ? (
                    <>
                      {data?.foreign_code === 'USD' || data?.foreign_code === 'THB' ? (
                        <>
                          {
                            data?.foreign_code === 'USD' ? (
                              <>
                                <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.currencies_debit)}$</TableCell>
                              </>) : (
                              <>
                                <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.currencies_debit)}฿</TableCell>
                              </>)
                          }

                        </>) : (
                        <>
                          <TableCell align="right" style={{ cursor: "pointer" }} ></TableCell>
                        </>)}
                    </>
                  ) : null
                }
                {
                  foreigncredit === true ? (
                    <>
                      {data?.foreign_code === 'USD' || data?.foreign_code === 'THB' ? (
                        <>
                          {
                            data?.foreign_code === 'USD' ? (
                              <>
                                <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.currencies_credit)}$</TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.currencies_credit)}฿</TableCell>
                              </>)
                          }
                        </>
                      ) : (
                        <>
                          <TableCell align="right" style={{ cursor: "pointer" }} ></TableCell>
                        </>
                      )}
                    </>
                  ) : null
                }
                {
                  foreignamount === true ? (
                    <>
                      {
                        data?.foreign_code === 'USD' || data?.foreign_code === 'THB' ? (
                          <>
                            {
                              data?.foreign_code === 'USD' ?
                                (
                                  <>
                                    <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_amount)}$</TableCell>

                                  </>
                                ) : (
                                  <>
                                    <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_balances)}฿</TableCell>

                                  </>
                                )
                            }
                          </>
                        ) : (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} ></TableCell>
                          </>
                        )
                      }
                    </>
                  ) : null
                }
                {
                  foreignbalance === true ? (
                    <>
                      {
                        data?.foreign_code === 'USD' || data?.foreign_code === 'THB' ?
                          (
                            <>
                              {
                                data?.foreign_code === 'USD' ? (
                                  <>
                                    <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_balances)}$</TableCell>
                                  </>
                                ) : (
                                  <>
                                    <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_balances)}฿</TableCell>
                                  </>
                                )
                              }
                            </>
                          ) : (
                            <>
                              <TableCell align="right" style={{ cursor: "pointer" }} ></TableCell>
                            </>
                          )
                      }
                    </>) : null
                }
                {
                  rate === true ? (
                    <>
                      {
                        data?.foreign_code === 'USD' || data?.foreign_code === 'THB' ? (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer", color: '#0d6efd' }} >{getFormatNumber(data?.money_rate)}</TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} ></TableCell>
                          </>)
                      }
                    </>) : null
                }
                {
                  exchangerate === true ? (
                    <>
                      {
                        data?.foreign_code === 'USD' || data?.foreign_code === 'THB' ? (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer", color: 'green' }} >{getFormatNumber(data?.money_rate)}</TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} ></TableCell>
                          </>)
                      }
                    </>) : null
                }
                {
                  gain_Loss === true ? (
                    <>
                      {
                        data?.foreign_code === 'USD' || data?.foreign_code === 'THB' ? (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer", color: 'red' }} onClick={() => { OnShowAatumaticTransaction(data?.automatic_status) }} >{getFormatNumber(data?.gain_loss)}₭</TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} ></TableCell>
                          </>)
                      }
                    </>) : null
                }
              </TableRow>
            </>
          )
        })}
      <TableRow>
        <TableCell style={{ fontWeight: "bold", color: "back", paddingLeft: level, fontSize: 11 }} colspan={3}>Total for {name_eng}</TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="right">{getFormatNumber(total)}₭</TableCell>
        <TableCell align="left"></TableCell>
        {
          currentbalance === true ? (<>
            <TableCell align="right"></TableCell>
          </>) : null
        }
        {
          showdebit === true ? (
            <TableCell align="right">{getFormatNumber(debittotal)}₭</TableCell>
          ) : null
        }
        {
          showcredit === true ? (
            <TableCell align="right">{getFormatNumber(credittoal)}₭</TableCell>
          ) : null
        }
        {
          foreigndebit === true ? (
            <TableCell align="right"></TableCell>
          ) : null
        }
        {
          foreigncredit === true ? (
            <TableCell align="right"></TableCell>
          ) : null
        }
        {
          foreignamount === true ? (
            <TableCell align="right"></TableCell>
          ) : null
        }
        {
          foreignbalance === true ? (
            <TableCell align="right"></TableCell>
          ) : null
        }
        {
          rate === true ? (
            <TableCell align="right"></TableCell>
          ) : null
        }
        {
          exchangerate === true ? (
            <TableCell align="right"></TableCell>
          ) : null
        }
        {
          gain_Loss === true ? (
            <TableCell align="right"></TableCell>
          ) : null
        }
      </TableRow>
    </>
  )
}
function ReadMore({ children }) {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p>
      {
        text == null ? (<></>) : (<>
          {isReadMore ? text.slice(0, 10) : text}
          <span onClick={toggleReadMore} className="read-or-hide">
            {isReadMore ? "...read more" : " show less"}
          </span>
        </>)
      }
    </p>
  );
};
function ComponentRateShow({ item, data, index, setData }) {
  const [currency, setCurrency] = useState('')
  const changeText = (value, key, index) => {
    const object = { ...data[index] };
    object[key] = value;
    const cloneData = [...data];
    cloneData[index] = { ...object };
    setData([...cloneData]);
  };
  return (
    <>
      <tr style={{ border: '1px solid #ccc', height: 50 }}>
        <td style={{ paddingLeft: 55 }}>
          <input type="hidden"
            onChange={(e) => setCurrency(e.target.value)}
            value={data?.name} />
          {item?.name}
        </td>
        <td align="right" style={{ paddingRight: 20 }}>
          <input
            type="text"
            value={item?.rate}
            onChange={(e) => changeText(e.target.value, "rate", index)}
            style={{
              border: '0.1px solid #ccc',
              outline: 'none',
              paddingLeft: 10,
              borderRadius: 3,
              height: 35,
              textAlign: "right"
            }}
          /></td>
      </tr>
    </>
  )
}
function ComponentRate({ item, data, index, setData }) {
  const [currency, setCurrency] = useState('')
  const changeText = (value, key, index) => {
    const object = { ...data[index] };
    object[key] = value;
    const cloneData = [...data];
    cloneData[index] = { ...object };
    setData([...cloneData]);
  };
  return (
    <>
      <tr style={{ border: '1px solid #ccc', height: 50 }}>
        <td style={{ paddingLeft: 55 }}>
          <input type="hidden"
            onChange={(e) => setCurrency(e.target.value)}
            value={data?.name} />
          {item?.name}
        </td>
        <td align="right" style={{ paddingRight: 20 }}>
          <input
            type="text"
            value={item?.rate}
            onChange={(e) => changeText(e.target.value, "rate", index)}
            style={{
              border: '0.1px solid #ccc',
              outline: 'none',
              paddingLeft: 10,
              borderRadius: 3,
              height: 35,
              textAlign: "right"
            }}
          /></td>
      </tr>
    </>
  )
}

