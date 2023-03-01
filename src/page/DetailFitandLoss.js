import React, { useState, useEffect, useContext } from "react";
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
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function DetailFitandLoss() {
  const navigate = useNavigate();
  const goback = () => {
    navigate("/Profitandloss");
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
  const date = moment(new Date).format("DD-MM-YYYY")
  const {
    EditJournal
  } = useContext(LoginContext);
  const OnEditJournal = (id) => {
    EditJournal(id)
  }
  const _onLoad = () => {
    axios.get(`/accounting/api/report/runreport/${id}`).then((data) => {
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
        >Back to Profit and loss</span><br />
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
      </div>
      <div style={{ height: 20 }}></div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 300 }}>DATE</TableCell>
              <TableCell align="left" style={{ width: 200 }}>TRANSACTION TYPE</TableCell>
              <TableCell align="left" style={{ width: 100 }}>NO</TableCell>
              <TableCell align="left" style={{ width: 200 }}>DESCRIPTION</TableCell>
              <TableCell align="left" style={{ width: 300 }}>ACCOUNT</TableCell>
              <TableCell align="left" style={{ width: 200 }}>AMOUNT</TableCell>
              <TableCell align="left">BALANCE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              first && first.map((item, index) => {

                return (
                  <>
                    <TableRow key={index}>
                      <TableCell onClick={() => { handleClick(); }} style={{ cursor: "pointer" }}> {open ? <ExpandLess /> : <ExpandMore />} {item.name_eng}
                      </TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell align="left"></TableCell>
                      {
                        open ? (
                          <TableCell align="left"></TableCell>
                        ) : (
                          <TableCell align="left">{getFormatNumber(item?.amout)} kip</TableCell>
                        )
                      }
                      <TableCell align="left"></TableCell>
                    </TableRow>
                    {
                      open ? (
                        <>
                          < SecondRowComponent
                            children={children}
                            name_eng={item?.name_eng}
                            amout={item?.amout}
                            level={30}
                            onGotoEditjournal={OnEditJournal}
                            active={active}
                            setActive={setActive}
                          />
                        </>
                      ) : (
                        <>
                        </>
                      )
                    }
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
function SecondRowComponent({ children, name_eng, level, amout, onGotoEditjournal, active, setActive }) {
  let total1 = 0;
  return (
    <>
      {
        children.map((data, index) => {
          if (data?.begining_balance != 0) {
            total1 += parseFloat(data?.amout)
          }
          return (
            <>
              <TableRow key={index} >
                <TableCell style={{ paddingLeft: level, cursor: "pointer" }}
                  onClick={() => { onGotoEditjournal(data?.tr_id) }} >{moment(data?.createdate).format("DD-MM-YYYY")}</TableCell>
                {
                  data?.begining_balance == '0' ? (
                    <TableCell align="left">Beginning Balance</TableCell>
                  ) : (
                    <TableCell align="left" style={{ cursor: "pointer" }}
                      onClick={() => { onGotoEditjournal(data?.tr_id) }}>Journal Entry</TableCell>
                  )
                }
                <TableCell align="left" style={{
                  cursor: "pointer",
                  fontWeight:
                    active === data?.tr_id ? "bold" : "",
                }}
                  onClick={() => { onGotoEditjournal(data?.tr_id) }}>{
                    data?.journal_no}</TableCell>
                <TableCell align="left" style={{ cursor: "pointer" }}
                  onClick={() => { onGotoEditjournal(data?.tr_id) }}
                  onMouseOver={() => setActive(data?.tr_id)}
                  onMouseLeave={() => setActive(null)}
                >
                  {data?.lg_desc}</TableCell>
                <TableCell align="left" style={{ cursor: "pointer" }}
                  onClick={() => { onGotoEditjournal(data?.tr_id) }}>
                  {data?.name_eng}</TableCell>
                {
                  data?.begining_balance == 0 ?
                    (<>
                      <TableCell align="left" style={{ cursor: "pointer" }}
                        onClick={() => { onGotoEditjournal(data?.tr_id) }}></TableCell>
                    </>) :
                    (<>
                      <TableCell align="left" style={{ cursor: "pointer" }}
                        onClick={() => { onGotoEditjournal(data?.tr_id) }}>
                        {getFormatNumber(data?.amout)} ₭</TableCell>

                    </>)
                }



                <TableCell align="left" style={{ cursor: "pointer" }}
                  onClick={() => { onGotoEditjournal(data?.tr_id) }}>
                  {getFormatNumber(data?.balances)} ₭</TableCell>
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
        <TableCell align="left">{getFormatNumber(total1)} ₭</TableCell>
        <TableCell align="left"></TableCell>
      </TableRow>
    </>
  )






}
