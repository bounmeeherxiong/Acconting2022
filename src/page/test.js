import React, { useState, useEffect, useContext, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { getFormatNumber } from "../constants/functions";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { LoginContext } from "./contexts/LoginContext";
import moment from 'moment';



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});


export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [firstdata, setFirstdata] = useState([])
  const [firstdatachidren, setFirstdatachidren] = useState([])
  const [account, setAccount] = useState(false)
  const [alldates, setAlldates] = useState(false)
  const [err, setErr] = useState("0")
  const [defaultValue, setDefaultValue] = useState("")
  const [defaultValue1, setDefaultValue1] = useState("")
  const [defaultValuedate, setDefaultValuedate] = useState("")
  const [defaultValuedate2, setDefaultValuedate2] = useState("")
  const [journal, setJournal] = useState(false)
  const [getvalues, setGetvalues] = useState([]);
  const [listgl, setListgl] = useState({})
  const [start_date, setStart_date] = useState("");
  const [nameShow, setNameShow] = useState("");
  const date = moment(new Date).format("DD-MM-YYYY")
  const [searchResult, setSearchResult] = useState([]);
  const [open, setOpen] = useState(true);
  const [showBox, setShowBox] = useState(false);
  const [getjournal, setGetjournal] = useState('')
  const [loading, setLoading] = useState(false);
  const [listcondition, setListcondition] = useState([])
  const {
    listaccountname, EditJournal, 
    // listgl, setListgl, onloadreportGl
  } = useContext(LoginContext);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const _onShow = (e) => {
    if (e == "custom") {
      setAccount(false)
      setAlldates(false)
    } else if (e == "all") {
      setAlldates(true)
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
      axios.post("/accounting/api/report/reportGlbydatetwo", data).then((data) => {
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
  const onloadAutomaticGl = () => {
    axios.get("/accounting/api/report/reportAutoGL").then((data) => {
      console.log()
    }).catch((err) => {
      console.log(err)
    })
  }
  const Onloadreset1 = () => {
    axios.get('/accounting/api/report/createResetExchange_gl').then((data) => {
       onloadAutomaticGl();
      onloadreportGl()
   
    }).catch((err) => {
      console.log(err)
    })
  }
  const Search = () => {
    setLoading(false)
    if (getvalues == "all") {
      axios.get('/accounting/api/report/reportGlAlldate').then((data) => {
        setListgl({ ...data?.data })
        setLoading(true)
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
      axios.post("/accounting/api/report/reportGlbydatetwo", data).then((data) => {
        console.log("successully")
        console.log("Search=",data)
        setListgl({ ...data?.data })
        setLoading(true)
      }).catch((err) => {
        console.log(err)
      })
    }
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
  const handleClick = () => {
    setOpen(!open);
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

 
  const onloadreportGl = () => {
    axios.get("/accounting/api/report/reportGl").then((data) => {
      setListgl({ ...data?.data })

    }).catch((err) => {
      console.log(err)
    })
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


  useEffect(() => {
    onloadreportGl();


  }, [])

  return (
    <Paper className={classes.root}>
      <div>
        <h2>General Ledger Report</h2>
        <ChevronLeftIcon style={{ color: "#3f51b5", cursor: "pointer" }} />
        <span style={{ color: "#3f51b5", cursor: "pointer" }}

        >Back to report list</span><br />
      </div>
      <span>Report period</span><br />
 

      <TableContainer >
        <Table className={classes.table} aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 500, fontWeight: 'bold' }}>DATE</TableCell>
              <TableCell align="left" style={{ width: 300, fontWeight: 'bold' }}>TRANSACTION TYPE</TableCell>
              <TableCell align="left" style={{ width: 100, fontWeight: 'bold' }}>NO</TableCell>
              <TableCell align="left" style={{ width: 200, fontWeight: 'bold' }}>DESCRIPTION</TableCell>
              <TableCell align="right" style={{ width: 200, fontWeight: 'bold' }}>AMOUNT</TableCell>
              <TableCell align="right" style={{ fontWeight: 'bold' }}>BALANCE</TableCell>
              <TableCell align="right" style={{ width: 200, fontWeight: 'bold' }}>foreign_amount</TableCell>
              <TableCell align="right" style={{ width: 200, fontWeight: 'bold' }}>foreign_balances</TableCell>
              <TableCell align="right" style={{ width: 200, fontWeight: 'bold' }}>rate</TableCell>
              <TableCell align="right" style={{ width: 200, fontWeight: 'bold' }}>current balance</TableCell>
              <TableCell align="right" style={{ width: 200, fontWeight: 'bold' }}>Gain/Loss</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listgl.firstFloor && listgl.firstFloor.map((item, index) => {
              return (
                <>
                  < GLRowComponent
                    key={index}
                    name_eng={item?.name_eng}
                    id={item?.c_id}
                    second={listgl && listgl.SecondFloor}
                    childrenFirstFloor={listgl && listgl.childrenFirstFloor}
                    childrenSecondFloor={listgl && listgl.childrenSecondFloor}
                  />
                </>
              )
            })
            }
          </TableBody>
        </Table>
      </TableContainer>

    </Paper>
  );
}

function GLRowComponent({ name_eng, id, childrenFirstFloor, second, childrenSecondFloor }) {
  const [open, setOpen] = useState(true);

  let total1 = 0;
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <TableRow>
        <TableCell onClick={() => { handleClick(); }} style={{ cursor: "pointer", width: '50%' }} colspan={3}>
          {open ? <ExpandLess /> : <ExpandMore />}
          {name_eng}
        </TableCell>
        <TableCell align="left" style={{ width: 300, fontWeight: 'bold' }}></TableCell>
        <TableCell align="left" style={{ width: 100, fontWeight: 'bold' }}></TableCell>
        <TableCell align="left" style={{ width: 200, fontWeight: 'bold' }}></TableCell>
        <TableCell align="left" style={{ width: 200, fontWeight: 'bold' }}></TableCell>
        <TableCell align="left" style={{ width: 200, fontWeight: 'bold' }}></TableCell>
        <TableCell align="left" style={{ width: 200, fontWeight: 'bold' }}></TableCell>
        <TableCell align="left" style={{ width: 200, fontWeight: 'bold' }}></TableCell>
        <TableCell align="left" style={{ width: 200, fontWeight: 'bold' }}></TableCell>
      </TableRow>
      {open ? (
        <>
          < RowComponent
            id={id}
            name_eng={name_eng}
            childrenFirstFloor={childrenFirstFloor}
            total1={total1}
          />
          <SecondFloorRowComponent
            second={second}
            id={id}
            level={30}
            childrenSecondFloor={childrenSecondFloor}
          />
        </>
      ) : null
      }
    </>
  )
}
function RowComponent({ id, name_eng, childrenFirstFloor }) {
  let debittotal = 0;
  let credittoal = 0;

  if (childrenFirstFloor === undefined) return <></>
  const filter = childrenFirstFloor.filter((el) => el.ch_id == id);
  const updatedData = [...filter];
  updatedData.forEach((data, index) => {
    data.balances = parseFloat(data.amout) + (index > 0 ? updatedData[index - 1].balances : 0);
    data.foreign_balances = parseFloat(data.foreign_amount) + (index > 0 ? updatedData[index - 1].foreign_balances : 0);
  });
  var total = 0;
  if (filter.length === 0) return <></>;
  return (
    <>
      {
        updatedData && updatedData.map((data, index) => {

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
                    <TableCell>
                      <div style={{ width: '100%' }}>
                        <small style={{ fontWeight: 'bold', fontSize: 15 }}>Beginning Balance</small>
                      </div>
                    </TableCell>
                  </>) : (<>
                    <TableCell style={{ cursor: "pointer", justifyContent: 'center' }}>{moment(data?.createdate).format("DD-MM-YYYY")}</TableCell>
                  </>)
                }
                {
                  data?.begining_balance == '0' ? (
                    <TableCell align="left"></TableCell>
                  ) : (
                    <TableCell align="left" style={{ cursor: "pointer" }} >Journal Entry</TableCell>
                  )
                }
                <TableCell align="left" style={{ cursor: "pointer" }}>{data?.foreign_code}</TableCell>
                <TableCell align="left" style={{ cursor: "pointer" }}><ReadMore children={data?.lg_desc} /></TableCell>

                {
                  data?.begining_balance == '0' ? (<>
                    <TableCell align="right" style={{ cursor: "pointer" }}></TableCell></>) :
                    (<>
                      <TableCell align="right" style={{ cursor: "pointer" }}>{getFormatNumber(data?.amout)}₭</TableCell>
                    </>)
                }
                <TableCell align="right" style={{ cursor: "pointer" }}>{getFormatNumber(data?.balances)}₭</TableCell>
                {
                  data?.begining_balance == '0' ? (<>
                    <TableCell align="right" style={{ cursor: "pointer" }}></TableCell></>) :
                    (<>
                      {
                        data?.foreign_code == 'USD' || data?.foreign_code == 'THB' ? (<>
                          {
                            data?.foreign_code === 'USD' ? (
                              <>
                                <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_amount)}$</TableCell>
                              </>) : (
                              <>
                                <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_amount)}฿</TableCell>
                              </>)
                          }
                        </>) : (<>
                          <TableCell align="right" style={{ cursor: "pointer" }}></TableCell>
                        </>)
                      }

                    </>)
                }
                {
                  data?.foreign_code == 'USD' || data?.foreign_code == 'THB' ? (
                    <>
                      {
                        data?.foreign_code === 'USD' ? (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_balances)}$</TableCell>
                          </>) : (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_balances)}฿</TableCell>
                          </>)
                      }
                    </>) : (
                    <>
                      <TableCell align="right" style={{ cursor: "pointer" }}>0.00</TableCell>

                    </>)
                }
                {
                  data?.foreign_code == 'USD' || data?.foreign_code == 'THB' ? (
                    <>
                      {
                        data?.foreign_code === 'USD' ? (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.money_rate)}$</TableCell>
                          </>) : (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.money_rate)}฿</TableCell>
                          </>)
                      }
                    </>) : (
                    <>
                      <TableCell align="right" style={{ cursor: "pointer" }}>0.00</TableCell>

                    </>)
                }
                {
                  data?.foreign_code == 'USD' || data?.foreign_code == 'THB' ? (
                    <>
                      {
                        data?.foreign_code === 'USD' ? (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_balances * data?.money_rate)}$</TableCell>
                          </>) : (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_balances * data?.money_rate)}฿</TableCell>
                          </>)
                      }
                    </>) : (
                    <>
                      <TableCell align="right" style={{ cursor: "pointer" }}>0.00</TableCell>

                    </>)
                }
                {
                  data?.foreign_code == 'USD' || data?.foreign_code == 'THB' ? (
                    <>
                      {
                        data?.foreign_code === 'USD' ? (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber((data?.foreign_balances * data?.money_rate) - (data?.balances))}₭</TableCell>
                          </>) : (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber((data?.foreign_balances * data?.money_rate) - (data?.balances))}₭</TableCell>
                          </>)
                      }
                    </>) : (
                    <>
                      <TableCell align="right" style={{ cursor: "pointer" }}>0.00</TableCell>

                    </>)
                }
              </TableRow>
            </>
          )
        })}
      <TableRow>
        <TableCell style={{ fontWeight: "bold", color: "back", fontSize: 11 }} colspan={3}>Total for {name_eng}</TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="right">{getFormatNumber(total)}₭</TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>

      </TableRow>
    </>
  )

}
function SecondFloorRowComponent({ level, second, id, childrenSecondFloor }) {

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
                childrenSecondFloor={childrenSecondFloor}

              />
            </>
          )
        })
      }
    </>
  )
}
function TableCellComponent({ data, level, index, second, childrenSecondFloor }) {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <TableRow key={index}>
        <TableCell onClick={() => { handleClick(); }} style={{ cursor: "pointer", paddingLeft: level, fontSize: 14 }} colspan={3}> {open ? <ExpandLess /> : <ExpandMore />}
          {data?.name_eng}
        </TableCell>
        <TableCell align="left" style={{ width: 300, fontWeight: 'bold' }}></TableCell>
        <TableCell align="left" style={{ width: 100, fontWeight: 'bold' }}></TableCell>
        <TableCell align="left" style={{ width: 200, fontWeight: 'bold' }}></TableCell>
        <TableCell align="left" style={{ width: 200, fontWeight: 'bold' }}></TableCell>
        <TableCell align="left" style={{ width: 200, fontWeight: 'bold' }}></TableCell>
        <TableCell align="left" style={{ width: 200, fontWeight: 'bold' }}></TableCell>
        <TableCell align="left" style={{ width: 200, fontWeight: 'bold' }}></TableCell>
        <TableCell align="left" style={{ width: 200, fontWeight: 'bold' }}></TableCell>

      </TableRow>
      {open ? (
        <>
          < SecondRowComponent
            id={data?.c_id}
            name_eng={data?.name_eng}
            level={level}
            childrenSecondFloor={childrenSecondFloor}
          />
          < SecondFloorRowComponent
            level={level * 1.5}
            second={second}
            id={data.c_id}
            data={data}
            childrenSecondFloor={childrenSecondFloor}

          />
        </>
      ) : null}

    </>
  )
}
function SecondRowComponent({ id, name_eng, level, childrenSecondFloor }) {
  let debittotal = 0;
  let credittoal = 0;

  if (childrenSecondFloor === undefined) return <></>
  const filter = childrenSecondFloor.filter((el) => el.ch_id == id);
  const updatedData = [...filter];
  updatedData.forEach((data, index) => {
    data.balances = parseFloat(data.amout) + (index > 0 ? updatedData[index - 1].balances : 0);
    data.foreign_balances = parseFloat(data.foreign_amount) + (index > 0 ? updatedData[index - 1].foreign_balances : 0);

  });

  var total = 0;
  if (filter.length === 0) return <></>;
  return (
    <>
      {
        updatedData && updatedData.map((data, index) => {

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
                    <TableCell>
                      <div style={{ width: '100%' }}>
                        <small style={{ marginLeft: level, fontWeight: 'bold', fontSize: 15 }}>BeginningBalance</small>
                      </div>
                    </TableCell>
                  </>) : (<>
                    <TableCell style={{ paddingLeft: level, cursor: "pointer", justifyContent: 'center' }}>{moment(data?.createdate).format("DD-MM-YYYY")}</TableCell>
                  </>)
                }
                {
                  data?.begining_balance == '0' ? (
                    <TableCell align="left"></TableCell>
                  ) : (
                    <TableCell align="left" style={{ cursor: "pointer" }} >Journal Entry</TableCell>
                  )
                }
                <TableCell align="left" style={{ cursor: "pointer" }}>{data?.foreign_code}</TableCell>
                <TableCell align="left" style={{ cursor: "pointer" }}><ReadMore children={data?.lg_desc} /></TableCell>

                {
                  data?.begining_balance == '0' ? (<>
                    <TableCell align="right" style={{ cursor: "pointer" }}></TableCell></>) :
                    (<>
                      <TableCell align="right" style={{ cursor: "pointer" }}>{getFormatNumber(data?.amout)}₭</TableCell>
                    </>)
                }
                <TableCell align="right" style={{ cursor: "pointer" }}>{getFormatNumber(data?.balances)}₭</TableCell>
                {
                  data?.begining_balance == '0' ? (<>
                    <TableCell align="right" style={{ cursor: "pointer" }}></TableCell></>) :
                    (<>
                      {
                        data?.foreign_code == 'USD' || data?.foreign_code == 'THB' ? (<>
                          {
                            data?.foreign_code === 'USD' ? (
                              <>
                                <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_amount)}$</TableCell>
                              </>) : (
                              <>
                                <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_amount)}฿</TableCell>
                              </>)
                          }
                        </>) : (<>
                          <TableCell align="right" style={{ cursor: "pointer" }}></TableCell>
                        </>)
                      }

                    </>)
                }
                {
                  data?.foreign_code == 'USD' || data?.foreign_code == 'THB' ? (
                    <>
                      {
                        data?.foreign_code === 'USD' ? (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_balances)}$</TableCell>
                          </>) : (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_balances)}฿</TableCell>
                          </>)
                      }
                    </>) : (
                    <>
                      <TableCell align="right" style={{ cursor: "pointer" }}>0.00</TableCell>

                    </>)
                }
                {
                  data?.foreign_code == 'USD' || data?.foreign_code == 'THB' ? (
                    <>
                      {
                        data?.foreign_code === 'USD' ? (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.money_rate)}$</TableCell>
                          </>) : (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.money_rate)}฿</TableCell>
                          </>)
                      }
                    </>) : (
                    <>
                      <TableCell align="right" style={{ cursor: "pointer" }}>0.00</TableCell>

                    </>)
                }
                {
                  data?.foreign_code == 'USD' || data?.foreign_code == 'THB' ? (
                    <>
                      {
                        data?.foreign_code === 'USD' ? (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_balances * data?.money_rate)}$</TableCell>
                          </>) : (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber(data?.foreign_balances * data?.money_rate)}฿</TableCell>
                          </>)
                      }
                    </>) : (
                    <>
                      <TableCell align="right" style={{ cursor: "pointer" }}>0.00</TableCell>

                    </>)
                }
                {
                  data?.foreign_code == 'USD' || data?.foreign_code == 'THB' ? (
                    <>
                      {
                        data?.foreign_code === 'USD' ? (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber((data?.foreign_balances * data?.money_rate) - (data?.balances))}₭</TableCell>
                          </>) : (
                          <>
                            <TableCell align="right" style={{ cursor: "pointer" }} >{getFormatNumber((data?.foreign_balances * data?.money_rate) - (data?.balances))}₭</TableCell>
                          </>)
                      }
                    </>) : (
                    <>
                      <TableCell align="right" style={{ cursor: "pointer" }}>0.00</TableCell>

                    </>)
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
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>

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