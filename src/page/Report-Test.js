import React, { useState, useEffect } from "react";
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
import DateTimePicker from 'react-datetime-picker';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ReportGL() {
  const navigate = useNavigate();
  const goback = () => {
    navigate("/ChartAccount");
  }
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [open1, setOpen1] = useState(true);
  const [checkOpent, setCheckOpent] = useState(true)
  const { id } = useParams();

  const [second, setSecond] = useState([]);
  const [first, setFirst] = useState([]);
  const [children, setChildren] = useState([]);
  const [getvalues, setGetvalues] = useState([]);
  const [start_date, on_startdate] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [showdate, setShowdate] = useState(false);
  const [getid, setGetid] = useState([])
  const [netTotal1, setNetTotal1] = useState("0")

  const _onLoad = () => {
    axios.get(`/accounting/api/runreport/getdata/${id}`).then((data) => {
      setFirst([...data?.data?.first])
      setSecond([...data?.data?.second])
      setChildren([...data?.data?.children])
      setGetid([...data?.data?.byId][0].c_id)

      // setListm([...data?.data.message][0].name_eng)
      // setTotal([...data?.data.total][0].balances)


    }).catch((err) => {
      console.log(err)
    })
  }
  const handleClick = () => {

    setOpen(!open);
  };
  const _onSearch = (c_id) => {
    let data = {
      c_id
    } 
    axios.post("/accounting/api/runreport/sumdata/", data).then((data) => {
      setNetTotal1(data?.data?.result[0].balances)

    }).catch((err) => {
      console.log(err)
    })
  }

  const _onShow = (e) => {
    if (e == "custom") {
      setShowdate(true)
    } else if (e == "all") {
      _onLoad();
      setShowdate(false)
    }
    setGetvalues(e)
  }
  const _searchbydate = (e) => {
    setEnd(e)

    const start = moment(start_date).format("YYYY-MM-DD")
    const end = moment(e).format("YYYY-MM-DD")
    let data = {
      id,
      start,
      end
    }
    axios.post("/accounting/api/reportbydate/date", data).then((data) => {

    }).catch((err) => {
      console.log(err)
    })
  }
  const handle = () => {
    if (open == false) {
      setCheckOpent(true)
    }
    if (open1 == true) {
      setCheckOpent(false)
    }
  }
  useEffect(() => {
    _onLoad();
    _onShow();
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
      <div style={{ display: 'flex', flexDirection: "row" }} >
        <div style={{ flex: 1 }}>
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
          </select>
          <DateTimePicker onChange={on_startdate} value={start_date}
            style={{
              border: '1px solid #ccc',
              height: 30,
              borderRadius: 3,
              width: 100,
              paddingLeft: 10,
              outline: 'none',
            }}
          />
          {showdate ? (
            <input
              type="date"
              onChange={(e) => _searchbydate(e.target.value)}
              value={end}
              style={{
                border: '1px solid #ccc',
                height: 30,
                borderRadius: 3,
                width: 200,
                paddingLeft: 10,
                outline: 'none',
                marginLeft: 20
              }}
            />
          ) : (
            <></>
          )}
        </div>
        <div>
          sss
        </div>
      </div>
      <div style={{ height: 20 }}></div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
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
            {/* <p onClick={() => { handleClick() }} style={{ paddingLeft: 10, paddingTop: 10, cursor: "pointer" }}>all {open ? <ExpandLess /> : <ExpandMore />}</p> */}
            {
              first && first.map((item, index) => {
             
                return (
                  <>
                    <TableRow>
                      <TableCell onClick={() => { handleClick(); _onSearch(item?.c_id) }} style={{ cursor: "pointer" }}> {open ? <ExpandLess /> : <ExpandMore />} {item.name_eng}
                      </TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell align="left"></TableCell>
                      {
                        open ? (
                          <TableCell align="left"></TableCell>
                        ) : (
                          <TableCell align="left">{getFormatNumber(netTotal1)} kip</TableCell>
                        )
                      }
                      <TableCell align="left"></TableCell>
                    </TableRow>
                    {
                      open ? (
                        <>
                          < SecondRowComponent
                            children={children}
                            id={item?.c_id}
                            name_eng={item?.name_eng}
                            amout={item?.amout}
                            level={30}
                          />
                          <SecondFloorRowComponent
                            second={second}
                            id={item?.c_id}
                            level={30}
                            key={index}
                            children={children}
                            handleClick1={handle}
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
function SecondFloorRowComponent({ level, second, id, children }) {
  const [open, setOpen] = useState(true);
  const [netTotal1, setNetTotal1] = useState("0")
  const handleClick = () => {
    setOpen(!open);
  };
  const _onSearch = (c_id) => {
    let data = {
      c_id
    }
    axios.post("/accounting/api/runreport/sumdata/", data).then((data) => {
      setNetTotal1(data?.data?.result[0].balances)
    }).catch((err) => {
      console.log(err)
    })
  }
  const filter = second.filter((el) => el.parents == id);
  return (
    <>
      {
        filter.map((data, index) => {
   
          return (
            <>
              <TableRow key={index}>
                <TableCell onClick={() => { handleClick(); _onSearch(data?.c_id) }} style={{ cursor: "pointer", paddingLeft: level, fontSize: 11 }}> {open ? <ExpandLess /> : <ExpandMore />} {data?.name_eng}
                </TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                {
                  open ? (
                    <TableCell align="left"></TableCell>
                  ) : (
                    <TableCell align="left">{getFormatNumber(netTotal1)} kip</TableCell>
                  )
                }
                <TableCell align="left">
                </TableCell>
              </TableRow>
              {open ? (
                <>
                  < SecondRowComponent
                    children={children}
                    id={data?.c_id}
                    name_eng={data?.name_eng}
                    amout={data?.amout}
                    level={level * 1.5}
                  />
                  < SecondFloorRowComponent1
                    level={level * 1.5}
                    second={second}
                    id={data.c_id}
                    children={children}
                  />
                </>
              ) : (
                <>
                </>
              )}
            </>
          )
        })
      }
    </>
  )
}
function SecondFloorRowComponent1({ level, second, id, children }) {
  const [open, setOpen] = useState(true);
  const [netTotal1, setNetTotal1] = useState("0")
  const handleClick = () => {
    setOpen(!open);
  };
  const _onSearch = (c_id) => {
    let data = {
      c_id
    }
    axios.post("/accounting/api/runreport/sumdata/", data).then((data) => {
      setNetTotal1(data?.data?.result[0].balances)
    }).catch((err) => {
      console.log(err)
    })
  }

  const filter = second.filter((el) => el.parents == id);
  return (
    <>
      {
        filter.map((data, index) => {
          return (
            <>
              <TableRow key={index}>
                <TableCell onClick={() => { handleClick(); _onSearch(data?.c_id) }} style={{ cursor: "pointer", paddingLeft: level, fontSize: 11 }}> {open ? <ExpandLess /> : <ExpandMore />} {data?.name_eng}
                </TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                {
                  open ? (
                    <TableCell align="left"></TableCell>
                  ) : (
                    <TableCell align="left">{getFormatNumber(netTotal1)} kip</TableCell>
                  )
                }
                <TableCell align="left">
                </TableCell>
              </TableRow>
              {open ? (
                <>
                  < SecondRowComponent
                    children={children}
                    id={data?.c_id}
                    name_eng={data?.name_eng}
                    amout={data?.amout}
                    level={level * 1.5}
                  />
                  < SecondFloorRowComponent2
                    level={level * 1.5}
                    second={second}
                    id={data.c_id}
                    children={children}
                  />
                </>
              ) : (
                <>
                </>
              )}
            </>
          )
        })
      }
    </>
  )
}
function SecondFloorRowComponent2({ level, second, id, children }) {
  const [open, setOpen] = useState(true);
  const [netTotal1, setNetTotal1] = useState("0")
  const handleClick = () => {
    setOpen(!open);
  };
  const _onSearch = (c_id) => {
    let data = {
      c_id
    }
    axios.post("/accounting/api/runreport/sumdata/", data).then((data) => {
      setNetTotal1(data?.data?.result?.balances)
    }).catch((err) => {
      console.log(err)
    })
  }
  const filter = second.filter((el) => el.parents == id);

  return (
    <>
      {
        filter.map((data, index) => {
          return (
            <>
              <TableRow key={index}>
                <TableCell onClick={() => { handleClick(); _onSearch(data?.c_id) }} style={{ cursor: "pointer", paddingLeft: level, fontSize: 11 }}> {open ? <ExpandLess /> : <ExpandMore />} {data?.name_eng}
                </TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                {
                  open ? (
                    <TableCell align="left"></TableCell>
                  ) : (
                    <TableCell align="left">{getFormatNumber(netTotal1)} kip</TableCell>
                  )
                }
                <TableCell align="left">
                </TableCell>
              </TableRow>
              {open ? (
                <>
                  < SecondRowComponent
                    children={children}
                    id={data?.c_id}
                    name_eng={data?.name_eng}
                    amout={data?.amout}
                    level={level * 1.5}
                  />

                  < SecondFloorRowComponent3
                    level={level * 1.5}
                    second={second}
                    id={data.c_id}
                    children={children}

                  />


                </>
              ) : (
                <>
                </>
              )}
            </>
          )
        })
      }
    </>
  )
}
function SecondFloorRowComponent3({ level, second, id, children }) {
  const [netTotal1, setNetTotal1] = useState("0")
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const filter = second.filter((el) => el.parents == id);
  const _onSearch = (c_id) => {
    let data = {
      c_id
    }
    axios.post("/accounting/api/runreport/sumdata/", data).then((data) => {
      setNetTotal1(data?.data?.result[0].balances)
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <>
      {
        filter.map((data, index) => {
          return (
            <>
              <TableRow key={index}>
                <TableCell onClick={() => { handleClick(); _onSearch(data?.c_id) }} style={{ cursor: "pointer", paddingLeft: level, fontSize: 11 }}> {open ? <ExpandLess /> : <ExpandMore />} {data?.name_eng}
                </TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                {
                  open ? (
                    <TableCell align="left"></TableCell>
                  ) : (
                    <TableCell align="left">{getFormatNumber(netTotal1)} kip</TableCell>
                  )
                }
                <TableCell align="left">
                </TableCell>
              </TableRow>
              {open ? (
                <>
                  < SecondRowComponent
                    children={children}
                    id={data?.c_id}
                    name_eng={data?.name_eng}
                    amout={data?.amout}
                    level={level * 1.5}
                  />
                  < SecondFloorRowComponent4
                    level={level * 1.5}
                    second={second}
                    id={data.c_id}
                    children={children}

                  />

                </>
              ) : (
                <>
                </>
              )}
            </>
          )
        })
      }
    </>
  )
}
function SecondFloorRowComponent4({ level, second, id, children }) {
  const [open, setOpen] = useState(true);
  const [netTotal1, setNetTotal1] = useState("0")
  const handleClick = () => {
    setOpen(!open);
  };
  const filter = second.filter((el) => el.parents == id);
  const _onSearch = (c_id) => {
    let data = {
      c_id
    }
    axios.post("/accounting/api/runreport/sumdata/", data).then((data) => {
      setNetTotal1(data?.data?.result[0].balances)
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <>
      {
        filter.map((data, index) => {
          return (
            <>
              <TableRow key={index}>
                <TableCell onClick={() => { handleClick(); _onSearch(data?.c_id) }} style={{ cursor: "pointer", paddingLeft: level, fontSize: 11 }}> {open ? <ExpandLess /> : <ExpandMore />} {data?.name_eng}
                </TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                {
                  open ? (
                    <TableCell align="left"></TableCell>
                  ) : (
                    <TableCell align="left">{getFormatNumber(netTotal1)} kip</TableCell>
                  )
                }
                <TableCell align="left">
                </TableCell>
              </TableRow>
              {open ? (
                <>
                  < SecondRowComponent
                    children={children}
                    id={data?.c_id}
                    name_eng={data?.name_eng}
                    amout={data?.amout}
                    level={level * 1.5}
                  />
                  < SecondFloorRowComponent5
                    level={level * 1.5}
                    second={second}
                    id={data.c_id}
                    children={children}
                  />
                </>
              ) : (
                <>
                </>
              )}
            </>
          )
        })
      }
    </>
  )
}
function SecondFloorRowComponent5({ level, second, id, children }) {
  const [open, setOpen] = useState(true);
  const [netTotal1, setNetTotal1] = useState("0")
  const handleClick = () => {
    setOpen(!open);
  };
  const _onSearch = (c_id) => {
    let data = {
      c_id
    }
    axios.post("/accounting/api/runreport/sumdata/", data).then((data) => {
      setNetTotal1(data?.data?.result[0].balances)
    }).catch((err) => {
      console.log(err)
    })
  }
  const filter = second.filter((el) => el.parents == id);
  return (
    <>
      {
        filter.map((data, index) => {
          return (
            <>
              <TableRow key={index}>
                <TableCell onClick={() => { handleClick(); _onSearch(data?.c_id) }} style={{ cursor: "pointer", paddingLeft: level, fontSize: 11 }}> {open ? <ExpandLess /> : <ExpandMore />} {data?.name_eng}
                </TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                {
                  open ? (
                    <TableCell align="left"></TableCell>
                  ) : (
                    <TableCell align="left">{getFormatNumber(netTotal1)} kip</TableCell>
                  )
                }
                <TableCell align="left">
                </TableCell>
              </TableRow>
              {open ? (
                <>
                  < SecondRowComponent
                    children={children}
                    id={data?.c_id}
                    name_eng={data?.name_eng}
                    amout={data?.amout}
                    level={level * 1.5}
                  />

                  < SecondFloorRowComponent6
                    level={level * 1.5}
                    second={second}
                    id={data.c_id}
                    children={children}

                  />

                </>
              ) : (
                <>
                </>
              )}
            </>
          )
        })
      }
    </>
  )
}
function SecondFloorRowComponent6({ level, second, id, children }) {
  const [open, setOpen] = useState(true);
  const [netTotal1, setNetTotal1] = useState("0")
  const handleClick = () => {
    setOpen(!open);
  };
  const _onSearch = (c_id) => {
    let data = {
      c_id
    }
    axios.post("/accounting/api/runreport/sumdata/", data).then((data) => {
      setNetTotal1(data?.data?.result[0].balances)
    }).catch((err) => {
      console.log(err)
    })
  }
  const filter = second.filter((el) => el.parents == id);
  return (
    <>
      {
        filter.map((data, index) => {
          return (
            <>
              <TableRow key={index}>
                <TableCell onClick={() => { handleClick(); _onSearch(data?.c_id) }} style={{ cursor: "pointer", paddingLeft: level, fontSize: 11 }}> {open ? <ExpandLess /> : <ExpandMore />} {data?.name_eng}
                </TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                {
                  open ? (
                    <TableCell align="left"></TableCell>
                  ) : (
                    <TableCell align="left">{getFormatNumber(netTotal1)} kip</TableCell>
                  )
                }
                <TableCell align="left">
                </TableCell>
              </TableRow>
              {open ? (
                <>
                  < SecondRowComponent
                    children={children}
                    id={data?.c_id}
                    name_eng={data?.name_eng}
                    amout={data?.amout}
                    level={level * 1.5}
                  />
                  < SecondFloorRowComponent7
                    level={level * 1.5}
                    second={second}
                    id={data.c_id}
                    children={children}
                  />
                </>
              ) : (
                <>
                </>
              )}
            </>
          )
        })
      }
    </>
  )
}
function SecondFloorRowComponent7({ level, second, id, children }) {
  const [open, setOpen] = useState(true);
  const [netTotal1, setNetTotal1] = useState("0")
  const handleClick = () => {
    setOpen(!open);
  };
  const _onSearch = (c_id) => {
    let data = {
      c_id
    }
    axios.post("/accounting/api/runreport/sumdata/", data).then((data) => {
      setNetTotal1(data?.data?.result[0].balances)
    }).catch((err) => {
      console.log(err)
    })
  }
  const filter = second.filter((el) => el.parents == id);
  return (
    <>
      {
        filter.map((data, index) => {
          return (
            <>
              <TableRow key={index}>
                <TableCell onClick={() => { handleClick(); _onSearch(data?.c_id) }} style={{ cursor: "pointer", paddingLeft: level, fontSize: 11 }}> {open ? <ExpandLess /> : <ExpandMore />} {data?.name_eng}
                </TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                {
                  open ? (
                    <TableCell align="left"></TableCell>
                  ) : (
                    <TableCell align="left">{getFormatNumber(netTotal1)} kip</TableCell>
                  )
                }
                <TableCell align="left">
                </TableCell>
              </TableRow>
              {open ? (
                <>
                  < SecondRowComponent
                    children={children}
                    id={data?.c_id}
                    name_eng={data?.name_eng}
                    amout={data?.amout}
                    level={level * 1.5}
                  />

                  < SecondFloorRowComponent8
                    level={level * 1.5}
                    second={second}
                    id={data.c_id}
                    children={children}

                  />

                </>
              ) : (
                <>
                </>
              )}
            </>
          )
        })
      }
    </>
  )
}
function SecondFloorRowComponent8({ level, second, id, children }) {
  const [open, setOpen] = useState(true);
  const [netTotal1, setNetTotal1] = useState("0")
  const handleClick = () => {
    setOpen(!open);
  };
  const _onSearch = (c_id) => {
    let data = {
      c_id
    }
    axios.post("/accounting/api/runreport/sumdata/", data).then((data) => {
      setNetTotal1(data?.data?.result?.balances)
    }).catch((err) => {
      console.log(err)
    })
  }
  const filter = second.filter((el) => el.parents == id);
  return (
    <>
      {
        filter.map((data, index) => {
          return (
            <>
              <TableRow key={index}>
                <TableCell onClick={() => { handleClick(); _onSearch(data?.c_id) }} style={{ cursor: "pointer", paddingLeft: level, fontSize: 11 }}> {open ? <ExpandLess /> : <ExpandMore />} {data?.name_eng}
                </TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                {
                  open ? (
                    <TableCell align="left"></TableCell>
                  ) : (
                    <TableCell align="left">{getFormatNumber(netTotal1)} kip</TableCell>
                  )
                }
                <TableCell align="left">
                </TableCell>
              </TableRow>
              {open ? (
                <>
                  < SecondRowComponent
                    children={children}
                    id={data?.c_id}
                    name_eng={data?.name_eng}
                    amout={data?.amout}
                    level={level * 1.5}
                  />

                  < SecondFloorRowComponent9
                    level={level * 1.5}
                    second={second}
                    id={data.c_id}
                    children={children}
                  />
                </>
              ) : (
                <>
                </>
              )}
            </>
          )
        })
      }
    </>
  )
}
function SecondFloorRowComponent9({ level, second, id, children }) {
  const [open, setOpen] = useState(true);
  const [netTotal1, setNetTotal1] = useState("0")
  const handleClick = () => {
    setOpen(!open);
  };
  const _onSearch = (c_id) => {
    let data = {
      c_id
    }
    axios.post("/accounting/api/runreport/sumdata/", data).then((data) => {
      setNetTotal1(data?.data?.result[0].balances)
    }).catch((err) => {
      console.log(err)
    })
  }
  const filter = second.filter((el) => el.parents == id);
  return (
    <>
      {
        filter.map((data, index) => {
          return (
            <>
              <TableRow key={index}>
                <TableCell onClick={() => { handleClick(); _onSearch(data?.c_id) }} style={{ cursor: "pointer", paddingLeft: level, fontSize: 11 }}> {open ? <ExpandLess /> : <ExpandMore />} {data?.name_eng}
                </TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                {
                  open ? (
                    <TableCell align="left"></TableCell>
                  ) : (
                    <TableCell align="left">{getFormatNumber(netTotal1)} kip</TableCell>
                  )
                }
                <TableCell align="left">
                </TableCell>
              </TableRow>
              {open ? (
                <>
                  < SecondRowComponent
                    children={children}
                    id={data?.c_id}
                    name_eng={data?.name_eng}
                    amout={data?.amout}
                    level={level * 1.5}
                  />

                  < SecondFloorRowComponent10
                    level={level * 1.5}
                    second={second}
                    id={data?.c_id}
                    children={children}
                  />

                </>
              ) : (
                <>
                </>
              )}
            </>
          )
        })
      }
    </>
  )
}
function SecondFloorRowComponent10({ level, second, id }) {
  const [open, setOpen] = useState(true);
  const [netTotal1, setNetTotal1] = useState("0")
  const handleClick = () => {
    setOpen(!open);
  };
  const _onSearch = (c_id) => {
    let data = {
      c_id
    }
    axios.post("/accounting/api/runreport/sumdata/", data).then((data) => {
      setNetTotal1(data?.data?.result[0].balances)
    }).catch((err) => {
      console.log(err)
    })
  }
  const filter = second.filter((el) => el.parents == id);
  return (
    <>
      {
        filter.map((data, index) => {
          return (
            <>
              <TableRow key={index}>
                <TableCell onClick={() => { handleClick(); _onSearch(data?.c_id) }} style={{ cursor: "pointer", paddingLeft: level, fontSize: 11 }}> {open ? <ExpandLess /> : <ExpandMore />} {data?.name_eng}
                </TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                {
                  open ? (
                    <TableCell align="left"></TableCell>
                  ) : (
                    <TableCell align="left">{getFormatNumber(netTotal1)} kip</TableCell>
                  )
                }
                <TableCell align="left">
                </TableCell>
              </TableRow>
              {open ? (
                <>

                </>
              ) : (
                <>
                </>
              )}
            </>
          )
        })
      }
    </>
  )
}
function SecondRowComponent({ children, id, name_eng, level }) {
  if (children != undefined) {
    const filter = children.filter((el) => el.ch_id == id);

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
                  <TableCell style={{ paddingLeft: level }}>{moment(data?.createdate).format("DD-MM-YYYY")}</TableCell>
                  {
                    data?.begining_balance == '0' ? (
                      <TableCell align="left">Beginning Balance</TableCell>
                    ) : (
                      <TableCell align="left">Journal Entry</TableCell>
                    )
                  }

                  <TableCell align="left">{data?.journal_no}</TableCell>
                  <TableCell align="left">{data?.lg_desc}</TableCell>
                  <TableCell align="left">{data?.name_eng}</TableCell>
                  <TableCell align="left">{getFormatNumber(data?.amout)} kip</TableCell>
                  <TableCell align="left">{getFormatNumber(data?.balances)} kip</TableCell>
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
          <TableCell align="left">{getFormatNumber(total)} kip</TableCell>
          <TableCell align="left"></TableCell>
        </TableRow>
      </>
    )

  }




}
