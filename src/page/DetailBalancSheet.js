import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { LoginContext } from "./contexts/LoginContext";
import PrintIcon from '@material-ui/icons/Print';
import ReactToPrint from "react-to-print";
import Button from '@material-ui/core/Button';
import SettingsIcon from "@material-ui/icons/Settings";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function DetailBalancSheet() {
  const navigate = useNavigate();
  let componentRef = useRef(null)
  const goback = () => {
    navigate("/BalanceSheet");
  }
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const { id } = useParams();
  const [first, setFirst] = useState([]);
  const [children, setChildren] = useState([]);
  const [getvalues, setGetvalues] = useState([]);
  const [defaultValue, setDefaultValue] = useState("")
  const [defaultValue1, setDefaultValue1] = useState("")
  const [active, setActive] = useState("")
  const [showSetting, setShowSetting] = useState(false)
  const [showdebit, setShowdebit] = useState(false)
  const [showcredit, setshowcredit] = useState(false)
  const [foreigndebit, setForeignDebit] = useState(false)
  const [foreigncredit, setForeignCredit] = useState(false)
  const [foreignamount, setForeignAmount] = useState(false)
  const [foreignbalance, setforeignBalance] = useState(false)
  const [currentbalance, setCurrentbalance] = useState(false)
  const [gain_Loss, setGain_loss] = useState(false)
  const [exchangerate, setExchangeRate] = useState(false);
  const [rate, setRate] = useState(false)
  const date = moment(new Date).format("DD-MM-YYYY")
  const {
    EditJournal
  } = useContext(LoginContext);
  const OnEditJournal = (id) => {
    EditJournal(id)
  }
  const _onLoad = () => {
    axios.get(`/accounting/api/report/runreport/${id}`).then((data) => {
      console.log("data=", data)
      setFirst([...data?.data?.firstFloor])

      setChildren([...data?.data?.children])
    }).catch((err) => {
      console.log(err)
    })
  }
  const _searchstartdate = (e) => {
    if (defaultValue == "") {
      setDefaultValue(date)
    } else {
      setDefaultValue(moment(e).format("DD-MM-YYYY"))
    }
  }
  const handleClick = () => {
    setOpen(!open);
  };
  const Onloadreset = () => {
    window.location.reload();
  }
  const _onShow = (e) => {

    if (e == "today") {

      const e1 = new Date()
      const startToday = moment(e1).format("DD-MM-YYYY")
      const endToday = moment(e1).format("DD-MM-YYYY")
      setDefaultValue(moment(e1).format("DD-MM-YYYY"))
      setDefaultValue1(moment(e1).format("DD-MM-YYYY"))
      const start = defaultValue
      const end = defaultValue1
      let data;
      if (start == '' || end == '') {
        data = {
          c_id: id,
          startToday,
          endToday
        }
      } else {
        data = {
          c_id: id,
          start,
          end
        }
      }
      axios.post("/accounting/api/report/runreportSeachBydate", data).then((data) => {
        setFirst([...data?.data?.firstFloor])
        setChildren([...data?.data?.children])
      }).catch((err) => {
        console.log(err)
      })

    } else if (e == "all") {
      _onLoad();

    }

    setGetvalues(e)
  }
  const Search = () => {
    if (getvalues == "custom") {
      let data = {
        c_id: id,
        start: defaultValue,
        end: defaultValue1
      }
      axios.post(`/accounting/api/report/runreportSeachBydate`, data).then((data) => {
        setFirst([...data?.data?.firstFloor])
        setChildren([...data?.data?.children])
      }).catch((err) => {
        console.log(err)
      })

    } else {

    }
  }
  const _searchbydate = (e) => {
    setDefaultValue1(e)
    if (defaultValue1 == "") {
      setDefaultValue1(date)
    } else {
      setDefaultValue1(moment(e).format("DD-MM-YYYY"))
    }
  }
  const Setting = () => {
    setShowSetting(!showSetting)
  }
  const Ondebit = () => {

    setShowdebit(!showdebit)
  }
  const Oncredit = () => {

    setshowcredit(true)

  }
  const OnForeigndebit = () => {

    setForeignDebit(!foreigndebit)
  }
  const Onforeigncredit = () => {

    setForeignCredit(!foreigncredit)
  }
  const Onforeignamount = () => {

    setForeignAmount(!foreignamount)
  }
  const OnForeignbalance = () => {

    setforeignBalance(!foreignbalance)
  }
  const OnRate = () => {

    setRate(!rate)
  }
  const OnExchangerate = () => {

    setExchangeRate(!exchangerate)
  }
  const OnCurrentBalance = () => {

    setCurrentbalance(!currentbalance)
  }
  const insert = () => {
  }
  const OnGain_loss = () => {

    setGain_loss(!gain_Loss)
  }
  useEffect(() => {
    _onLoad();
    _onShow();
    _searchstartdate();
    _searchbydate();
  }, [])
  return (
    <>
      <div>
        <ChevronLeftIcon style={{ color: "#3f51b5", cursor: "pointer" }} />
        <span style={{ color: "#3f51b5", cursor: "pointer" }}
          onClick={() => { goback() }}
        >Back to Chart of Accounts</span><br />
      </div>
      <span>Report period</span><br />
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: "row", width: "100%" }} >
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
            <option value="custom">Custom</option>
            <option value="today">Today</option>

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
            <SearchIcon />
          </button>
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
          <ReactToPrint
            trigger={() =>
              <Button variant="contained" color="primary" style={{
                border: "none",
                height: 30,
                borderRadius: 2,
                paddingLeft: 5,
                paddingRight: 5,
                color: "white",
                alignItems: "center",
                marginLeft: 10,
              }}>
                <PrintIcon />
              </Button>
            }
            content={() => componentRef}
            style={{ marginLeft: 10 }}
          />
        </div>
        <div>
          <button
            onClick={() => { Setting() }}
            // onBlur={() => { onBlurSetting() }}
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
                      // onMouseLeave={() => { setLeave(null) }}
                      />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Debit</small>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: 2, marginRight: 79 }}>
                      <input type="checkbox"
                      onClick={() => { Oncredit() }}
                      // onMouseLeave={() => { setLeave(null) }}

                      />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Credit</small>
                    </div>
                  </div>
                  <div style={{ height: 10 }}></div>
                  <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                      <input type="checkbox"
                      onClick={() => { OnForeigndebit() }}
                      // onMouseLeave={() => { setLeave(null) }}
                      />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Foreign Debit</small>
                    </div>
                    <div style={{ display: "flex", flexDirection: 'row', marginRight: 33 }}>
                      <input type="checkbox"
                      onClick={() => { Onforeigncredit() }}
                      // onMouseLeave={() => { setLeave(null) }}
                      />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Foreign Credit</small>
                    </div>
                  </div>
                  <div style={{ height: 10 }}></div>
                  <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                      <input type="checkbox"
                      onClick={() => { Onforeignamount() }}
                      // onMouseLeave={() => { setLeave(null) }}
                      />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Foreign Amount</small>
                    </div>
                    <div style={{ marginRight: 21, display: 'flex', flexDirection: 'row' }}>
                      <input type="checkbox"
                      onClick={() => { OnForeignbalance() }}
                      // onMouseLeave={() => { setLeave(null) }}

                      />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Foreign Balance</small>
                    </div>
                  </div>
                  <div style={{ height: 10 }}></div>
                  <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                      <input type="checkbox"
                      onClick={() => { OnRate() }}
                      // onMouseLeave={() => { setLeave(null) }}
                      />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Rate</small>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginRight: 26 }}>
                      <input type="checkbox"
                      onClick={() => { OnExchangerate() }}
                      // onMouseLeave={() => { setLeave(null) }}

                      />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Exchange Rate</small>
                    </div>
                  </div>
                  <div style={{ height: 10 }}></div>
                  <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                      <input type="checkbox"
                      onClick={() => { OnGain_loss() }}
                      // onMouseLeave={() => { setLeave(null) }}
                      />
                      <small style={{ marginLeft: 5, marginTop: 2 }}>Gain/Loss</small>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginRight: 22 }}>
                      <input type="checkbox"
                      onClick={() => { OnCurrentBalance() }}
                      // onMouseLeave={() => { setLeave(null) }}
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
      {/* style={{
              overflowY: "scroll",
              height: 100,
              paddingTop: 5,
              paddingLeft: 10,
              position: 'absolute',
              backgroundColor: 'white'
            }} */}

      <div style={{ height: 20 }}></div>
      <div style={{
        overflowX: 'scroll'

      }}>
        <TableContainer ref={(el) => (componentRef = el)}>
          <Table className={classes.table} aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 500, fontWeight: 'bold' }}>DATE</TableCell>
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
              {first && first.map((item, index) => {
                return (
                  <>
                    < GLRowComponent
                      key={index}
                      item={item}
                      children={children}
                      OnEditJournal={OnEditJournal}

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

                    />
                  </>
                )
              })
              }
            </TableBody>
          </Table>
        </TableContainer>

      </div>


    </>
  )
}
function GLRowComponent({
  item,
  children,
  showcredit,
  showdebit,
  foreigndebit,
  OnEditJournal,
  foreigncredit,
  foreignamount,
  foreignbalance,
  rate,
  exchangerate,
  gain_Loss,
  currentbalance,
}) {
  const [open, setOpen] = useState(true);
  let total1 = 0;

  return (
    <>
      <TableRow>
        <TableCell style={{ cursor: "pointer", width: '50%' }} colspan={3}>
          {open ? <ExpandLess /> : <ExpandMore />}
          {item?.name_eng}
        </TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        {
          open ? (
            <TableCell align="left"></TableCell>
          ) : (

            <TableCell align="right" >{getFormatNumber(item?.amout)}₭</TableCell>
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
            children={children}
            showdebit={showdebit}
            showcredit={showcredit}
            OnEditJournal={OnEditJournal}
            foreigndebit={foreigndebit}
            foreigncredit={foreigncredit}
            foreignamount={foreignamount}
            foreignbalance={foreignbalance}
            rate={rate}
            exchangerate={exchangerate}
            gain_Loss={gain_Loss}
            currentbalance={currentbalance}
            total1={total1}
            name_eng={item?.name_eng}
          />

        </>
      ) : null
      }
    </>
  )
}
function RowComponent({
  children,
  showcredit,
  showdebit,
  OnEditJournal,
  foreigndebit,
  foreigncredit,
  foreignamount,
  foreignbalance,
  rate,
  exchangerate,
  gain_Loss,
  currentbalance,
  total1,
  name_eng
}) {



  return (
    <>
      {
        children && children.map((data, index) => {
          if (data?.begining_balance != 0) {
            total1 += parseFloat(data?.amout)
          }
          return (
            <>
              <TableRow key={index} style={{ paddingLeft: 45 }}>
                {
                  data?.begining_balance == '0' ? (
                    <>
                      <TableCell ><small style={{ fontWeight: 'bold', fontSize: 15 }}>Beginning Balance</small></TableCell>
                    </>) : (
                    <>
                      <TableCell
                        style={{
                          paddingLeft: 45, cursor: "pointer",
                        }}

                      >{moment(data?.createdate).format("DD-MM-YYYY")}</TableCell>
                    </>)
                }

                {
                  data?.begining_balance == '0' ? (
                    <TableCell align="left"></TableCell>

                  ) : (
                    <TableCell align="left" style={{
                      cursor: "pointer",

                    }}>Journal Entry</TableCell>
                  )
                }
                <TableCell align="left" style={{ cursor: "pointer" }} onClick={()=>{OnEditJournal(data?.tr_id)}}>{data?.journal_no}</TableCell>
                <TableCell align="left" style={{ cursor: "pointer" }}><ReadMore children={data?.lg_desc} /></TableCell>
                {
                  data?.begining_balance === 0 ? (<>
                    <TableCell align="right" style={{ cursor: "pointer" }} ></TableCell>
                  </>) : (<>
                    <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.amout)}₭</TableCell>
                  </>)
                }
                <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.balances)}₭</TableCell>
                {
                  currentbalance === true ? (
                    <>
                      {
                        data?.foreign_code === 'USD' || data?.foreign_code === 'THB' ? (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer", color: "red" }} >{getFormatNumber(data?.total_balanaces)}₭</TableCell>
                          </>
                        ) : (<>
                          <TableCell align="right" style={{ cursor: "pointer" }}></TableCell>
                        </>)

                      }

                    </>) : null
                }

                {
                  showdebit === true ? (
                    <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.debit)}₭</TableCell>
                  ) : null
                }
                {
                  showcredit === true ? (
                    <TableCell align="right" style={{ cursor: "pointer" }}>{getFormatNumber(data?.credit)}₭</TableCell>
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
                              data?.foreign_code === 'USD' || data.foreign_code == 'THB' ?
                                (
                                  <>
                                    <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_amount)}$</TableCell>

                                  </>
                                ) : (
                                  <>
                                    <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_amount)}fff฿</TableCell>

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
                                    <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.current_balance)}$</TableCell>
                                  </>
                                ) : (
                                  <>
                                    <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.current_balance)}฿</TableCell>
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
                            <TableCell align="right" style={{ cursor: "pointer", color: '#0d6efd' }} >
                              {
                                data?.money_rate
                              }
                            </TableCell>
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
                            <TableCell align="right" style={{ cursor: "pointer", color: 'green' }} >
                              {
                                data?.money_rate
                              }


                            </TableCell>
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
                            <TableCell align="right" style={{ cursor: "pointer", color: 'red' }} >{getFormatNumber(data?.gain_loss)}₭</TableCell>
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
          <span onClick={toggleReadMore} className="read-or-hide" style={{ color: "green" }}>
            {isReadMore ? "...read more" : " show less"}
          </span>
        </>)
      }
    </p>
  );
};