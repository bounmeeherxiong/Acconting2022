import React, { useState, useEffect, useContext } from "react";
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function ReportallGL() {
  const navigate = useNavigate();
  const {
    listaccountname, EditJournal
  } = useContext(LoginContext);
  const goback = () => {
    navigate("/ChartAccount");
  }
  const [listgl, setListgl] = useState({})
  const [firstFloor, setFirstFloor] = useState([])
  const classes = useStyles();
  const [getvalues, setGetvalues] = useState([]);
  const [start_date, setStart_date] = useState("");
  const [showBox, setShowBox] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [active, setActive] = useState("");
  const [nameShow, setNameShow] = useState("");
  const [defaultValue, setDefaultValue] = useState("")
  const [defaultValue1, setDefaultValue1] = useState("")
  const [defaultValuedate, setDefaultValuedate] = useState("")
  const [defaultValuedate2, setDefaultValuedate2] = useState("")
  const date = moment(new Date).format("DD-MM-YYYY")
  const [ch_id, setCh_id] = useState("")
  const [open, setOpen] = useState(true);
  const [account, setAccount] = useState(false)
  const [err, setErr] = useState("0")
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
        setListgl({ ...data?.data })
      }).catch((err) => {
        console.log(err)
      })
    } else if (e == "account") {
      setAccount(true)
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
      console.log("dataid=",data)
      axios.post("/accounting/api/report/reportbyaccount", data).then((data) => {
    
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
        console.log("data", { ...data?.data })
        setListgl({ ...data?.data })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  const onloadreportGl = () => {
    axios.get("/accounting/api/report/reportGl").then((data) => {
      console.log("dataGL=",{...data?.data})
      setListgl({ ...data?.data })
    })
  }
  const onGotoEditjournal = (id) => {
    const baseUrl = window.location.pathname;
    navigate(`/Journalpage/${id}`);
  }
  const Onloadreset = () => {
    window.location.reload();
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
  }, [])
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
          <option value="today">Today</option>
          <option value="custom">Custom</option>
          <option value="account">Report by Account</option>
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
          account == true ?
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
                        width: 500
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
            )
            : (
              <>
              </>
            )
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
      </div>
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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 300 }}>DATE</TableCell>
              <TableCell align="left" style={{ width: 200 }}>TRANSACTION TYPE</TableCell>
              <TableCell align="left" style={{ width: 100 }}>NO</TableCell>
              <TableCell align="left" style={{ width: 200 }}>DESCRIPTION</TableCell>
              <TableCell align="left" style={{ width: 300 }}>ACCOUNT</TableCell>
              <TableCell align="right" style={{ width: 200 }}>AMOUNT</TableCell>
              <TableCell align="right">BALANCE</TableCell>
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
                  />
                </>
              )
            })
            }
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={firstFloor.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </>
  )
}
function GLRowComponent({ name_eng, id, second, childrenFirstFloor, childrenSecondFloor, onGotoEditjournal, OnEditJournal, defaultValue, defaultValue1, getvalues, ch_id }) {
  const [open, setOpen] = useState(true);
  const [netTotal1, setNetTotal1] = useState("0")
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
        setNetTotal1(data?.data?.result[0].balances)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  return (
    <>
      <TableRow>
        <TableCell onClick={() => { handleClick(); _onSearch(id) }} style={{ cursor: "pointer" }}> {open ? <ExpandLess /> : <ExpandMore />} {name_eng}
        </TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="right"></TableCell>
        {
          open ? (
            <TableCell align="left"></TableCell>
          ) : (

            <TableCell align="right">{getFormatNumber(netTotal1)} ₭</TableCell>
          )
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
          />
        </>
      ) : (
        <>
        </>
      )}

    </>
  )
}
function RowComponent({ id, name_eng, OnEditJournal, total1, childrenFirstFloor }) {
  const [active, setActive] = useState("");
  if (childrenFirstFloor === null) return <></>
  const filter = childrenFirstFloor.filter((el) => el.ch_id == id);
  if (filter.length === 0) return <></>;
  return (
    <>
      {
        filter.map((data, index) => {
          total1 += parseFloat(data.amout)
          return (
            <>
              <TableRow key={index} >
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
                {
                  data?.begining_balance == '0' ? (
                    <TableCell align="left">Beginning Balance</TableCell>

                  ) : (
                    <TableCell align="left" style={{
                      cursor: "pointer",

                    }} onClick={() => { OnEditJournal(data?.tr_id) }}>Journal Entry</TableCell>
                  )
                }
                <TableCell align="left" style={{ cursor: "pointer" }} onClick={() => { OnEditJournal(data?.tr_id) }}>{data.journal_no}</TableCell>
                <TableCell align="left" style={{ cursor: "pointer" }} onClick={() => { OnEditJournal(data?.tr_id) }}>{data.lg_desc}</TableCell>
                <TableCell align="left" style={{ cursor: "pointer" }} onClick={() => { OnEditJournal(data?.tr_id) }}>{data.name_eng}</TableCell>
                <TableCell align="right" style={{ cursor: "pointer" }} onClick={() => { OnEditJournal(data?.tr_id) }}>{getFormatNumber(data.amout)}₭</TableCell>
                <TableCell align="right" style={{ cursor: "pointer" }} onClick={() => { OnEditJournal(data?.tr_id) }}>{getFormatNumber(data.balances)}₭</TableCell>
              </TableRow>
            </>
          )
        })
      }
      <TableRow>
        <TableCell style={{ fontWeight: "bold", color: "back", paddingLeft: 45, fontSize: 11 }}>Total for {name_eng}</TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="right">{getFormatNumber(total1)} ₭</TableCell>
        <TableCell align="left"></TableCell>
      </TableRow>

    </>
  )
}
function SecondFloorRowComponent({ level, second, id, OnEditJournal, childrenSecondFloor, defaultValue, defaultValue1, getvalues, ch_id }) {
  const [netTotal1, setNetTotal1] = useState("0")
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
        setNetTotal1(data?.data?.result[0].balances)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  if (second === null) return <></>
  const filter = second.filter((el) => el.parents == id);
  return (
    <>
      {
        filter.map((data, index) => {
          return (
            <>
              < TableCellComponent
                netTotal1={netTotal1}
                _onSearch={_onSearch}
                data={data}
                level={level}
                index={index}
                second={second}
                OnEditJournal={OnEditJournal}
                childrenSecondFloor={childrenSecondFloor}
              />
            </>
          )
        })
      }
    </>
  )
}
function TableCellComponent({ data, level, index, netTotal1, _onSearch, second, conditions, OnEditJournal, childrenSecondFloor }) {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <TableRow key={index}>
        <TableCell onClick={() => { handleClick(); _onSearch(data?.c_id) }} style={{ cursor: "pointer", paddingLeft: level, fontSize: 11 }}> {open ? <ExpandLess /> : <ExpandMore />} {data?.name_eng}
        </TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        {
          open ? (
            <TableCell align="left"></TableCell>
          ) : (
            <>
              <TableCell align="right">{getFormatNumber(netTotal1)} ₭</TableCell>
            </>
          )
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
          />
          < SecondFloorRowComponent
            level={level * 1.5}
            second={second}
            id={data.c_id}
            conditions={conditions}
            data={data}
            netTotal1={netTotal1}
            _onSearch={_onSearch}
            index={index}
            OnEditJournal={OnEditJournal}
            childrenSecondFloor={childrenSecondFloor}
          />
        </>
      ) : (
        <>
        </>
      )}
    </>
  )
}
function SecondRowComponent({ id, name_eng, level, OnEditJournal, childrenSecondFloor }) {
  if (childrenSecondFloor === null) return <></>
  const filter = childrenSecondFloor.filter((el) => el.ch_id == id);
  var total = 0;
  if (filter.length === 0) return <></>;
  return (
    <>
      {
        filter.map((data, index) => {
          total += parseFloat(data.amout)
          return (
            <>
              <TableRow key={index} >
                <TableCell style={{ paddingLeft: level, cursor: "pointer" }} onClick={() => { OnEditJournal(data?.tr_id) }}>{moment(data?.createdate).format("DD-MM-YYYY")}</TableCell>
                {
                  data?.begining_balance == '0' ? (
                    <TableCell align="left">Beginning Balance</TableCell>
                  ) : (
                    <TableCell align="left" onClick={() => { OnEditJournal(data?.tr_id) }} style={{ cursor: "pointer" }}>Journal Entry</TableCell>
                  )
                }
                <TableCell align="left" onClick={() => { OnEditJournal(data?.tr_id) }} style={{ cursor: "pointer" }}>{data?.journal_no}</TableCell>
                <TableCell align="left" onClick={() => { OnEditJournal(data?.tr_id) }} style={{ cursor: "pointer" }}>{data?.lg_desc}</TableCell>
                <TableCell align="left" onClick={() => { OnEditJournal(data?.tr_id) }} style={{ cursor: "pointer" }}>{data?.name_eng}</TableCell>
                <TableCell align="right" onClick={() => { OnEditJournal(data?.tr_id) }} style={{ cursor: "pointer" }}>{getFormatNumber(data?.amout)} ₭</TableCell>
                <TableCell align="right" onClick={() => { OnEditJournal(data?.tr_id) }} style={{ cursor: "pointer" }}>{getFormatNumber(data?.balances)} ₭</TableCell>
              </TableRow>
            </>
          )
        })
      }
      <TableRow>
        <TableCell style={{ fontWeight: "bold", color: "back", paddingLeft: level, fontSize: 11 }}>Total for {name_eng}</TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="right">{getFormatNumber(total)} ₭</TableCell>
        <TableCell align="left"></TableCell>
      </TableRow>
    </>
  )

}
