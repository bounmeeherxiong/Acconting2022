import React, { useState, useEffect, useContext, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { getFormatNumber } from "../constants/functions";
import { LoginContext } from "../page/contexts/LoginContext";
import Button from '@material-ui/core/Button';
import ReactToPrint from "react-to-print";
import moment from 'moment';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PrintIcon from '@material-ui/icons/Print';
import Spinner from 'react-bootstrap/Spinner';
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
function createData(id, name_eng, balance,) {
    return { id, name_eng, balance };
}
const rows = [
    createData(10, 'Tax', 0.00,),
];
export default function Profitandloss() {
    let componentRef = useRef(null)
    const navigate = useNavigate();
    const Gotodetailaccount = (id) => {
        navigate(`/DetailFitandLoss/${id}`);
    }
    const {
        totalgain,OnloadResetCondition,listcondition
    } = useContext(LoginContext);

    const [getvalues, setGetvalues] = useState('')
    const [defaultValue, setDefaultValue] = useState("")
    const [defaultValue1, setDefaultValue1] = useState("")
    const classes = useStyles();
    const [headingprofi, setHeadingprofi] = useState({})
    const [profitandloss, setProfitandloss] = useState([])
    const [incomeandcost, setIncomeandcost] = useState([])
    // const [show, setShow] = useState(false)
    const [showSetting, setShowSetting] = useState(false)
    const [loading, setLoading] = useState(false);
    const [gain, setGain] = useState(false);
    const [condition,setCondition]=useState(1)
    const OnloadHeading = () => {
        axios.get('/accounting/api/profit-loss/heading').then((data) => {
            console.log("dataList=",{...data?.data})
            setHeadingprofi({ ...data?.data })
            setProfitandloss([...data?.data?.sumBalanceSheet][0].balances)
            setIncomeandcost([...data?.data?.sumBalanceIncomeAndCostofsale][0].balances)
            // let keys = ['amout'];
            // let values = ['Other Expense'];
            // let filtered_data = [...data?.data?.headingExpenses].filter(d => {
            //     for (let key of keys) {
            //         for (let value of values) {
            //             if (d[key] == value) {
            //                 return true;
            //             }
            //         }
            //     }
            //     return false;
            // });
            // if (filtered_data.length === 0) {
            //     setShow(true)
            // } else {
            //     setShow(false)
            // }
            setLoading(true)
        }).catch((err) => {
            console.log(err)
        })
    }
    const Setting = () => {
        setShowSetting(!showSetting)
    }
    const OnGain = () => {
        setGain(!gain)
    }
    const OnLosses = () => {
     
    }
    const GoExchanage=(e)=>{
        navigate(`/ExchangeRate/${e}`)
    }
    const _searchbydate = (e) => {
        setDefaultValue1(moment(e).format("DD-MM-YYYY"))
    }
    const _searchstartdate = (e) => {
        setDefaultValue(moment(e).format("DD-MM-YYYY"))
    }
    const _onShow = (e) => {
        setGetvalues(e)
    }
    // const onloadAutomaticGl = () => {
    //     axios.get("/accounting/api/report/reportAutoGL").then((data) => {
    //       console.log("automatic=",{...data?.data})
    //     }).catch((err) => {
    //       console.log(err)
    //     })
    //   }
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
          OnloadHeading()
          OnloadResetCondition()
        //   onloadAutomaticGl();
          _searchbydate()
          _searchstartdate()
          setGetvalues('')
          // window.location.reload();
        }).catch((err) => {
          console.log(err)
        })
    
      }
    const Reset = () => {
        OnloadHeading()
        window.location.reload();
        _searchbydate()
        _searchstartdate()
        setGetvalues('')
    }
    const ViewUnrealised = (e) => {
        navigate(`/ViewUnrealisedgain_or_loss/${e}`);
    }
    const onloadAutomaticGl = () => {
        axios.get("/accounting/api/report/reportAutoGL").then((data) => {
          console.log(data)
        }).catch((err) => {
          console.log(err)
        })
      }
    const OnRunReport = () => {
        setLoading(false)
        setCondition(2)
        if (getvalues == 'custom') {
            let data = {
                start: defaultValue,
                end: defaultValue1
            }
            axios.post('/accounting/api/profit-loss/report/allreports', data).then((data) => {
                console.log("Search=",{...data?.data})
                setHeadingprofi({ ...data?.data })
                setProfitandloss([...data?.data?.sumBalanceSheet][0].balances)
                setIncomeandcost([...data?.data?.sumBalanceIncomeAndCostofsale][0].balances)
                // let keys = ['amout'];
                // let values = ['Other Expense'];
                // let filtered_data = [...data?.data?.headingExpenses].filter(d => {
                //     for (let key of keys) {
                //         for (let value of values) {
                //             if (d[key] == value) {
                //                 return true;
                //             }
                //         }
                //     }
                //     return false;
                // });
                // if (filtered_data.length === 0) {
                //     setShow(true)
                // } else {
                //     setShow(false)
                // }
                setLoading(true)
                onloadAutomaticGl();
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    const ReportExchange=()=>{
        axios.get('/accounting/api/report/report_Exchange').then((data)=>{
          console.log(data)      
          OnloadResetCondition();
          OnloadHeading();
        }).catch((err)=>{
          console.log(err)
        })
      }

    useEffect(() => {
        // onloadAutomaticGl();
        OnloadHeading()
        _searchbydate()
        _searchstartdate()
     
    }, [])
    return (
        <>
            <div>
                <h2>Profit and Loss Report</h2>
                <ChevronLeftIcon style={{ color: "#3f51b5", cursor: "pointer" }} />
                <span style={{ color: "#3f51b5", cursor: "pointer" }}
                >Back to report list</span><br />
            </div>
            <div style={{ display: 'flex', flexDirection: "row", width: "100%", justifyContent: 'space-between' }} >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                    <Button variant="contained" color="primary"
                        style={{

                            border: "none",
                            height: 30,
                            borderRadius: 2,
                            paddingLeft: 10,
                            paddingRight: 10,
                            color: "white",
                            alignItems: "center",
                            marginLeft: 10,
                        }}
                        onClick={() => { OnRunReport() }}
                    >
                        Run report
                    </Button>
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
                  RESET
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
                  RESET
                </button>
              </>
            )
          }
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
                        onClick={()=>{GoExchanage(2)}}
                    >
                        <AddIcon />
                         RATE
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
                        onClick={()=>{ReportExchange()}}
                    >
                   
                       RUN EXCHANGE
                    </button>

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
                                    width: 200,
                                    height: 150,
                                }}>
                                    <h5 style={{ marginTop: 20, marginLeft: 10 }}>Display density</h5>
                                    <div style={{ height: 10 }}></div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', cursor: 'pointer' }}>
                                        <div style={{ marginLeft: 20, display: 'flex', flexDirection: 'row' }}>
                                            <input type="checkbox"
                                                onClick={() => { OnGain() }}
                                            // onMouseLeave={() => { setLeave(null) }} 
                                            />
                                            <small style={{ marginLeft: 5, marginTop: 2 }}>Gain</small>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 2, marginRight: 5 }}>
                                            <input type="checkbox"
                                            // onClick={() => { Oncredit() }}
                                            // onMouseLeave={() => { setLeave(null) }}

                                            />
                                            <small style={{ marginLeft: 5, marginTop: 2 }}>Losses</small>
                                        </div>
                                    </div>


                                </div>
                            </>
                        ) : null
                    }
                </div>
            </div>
            {
                loading ? (
                    <>
                        <TableContainer component={Paper} ref={(el) => (componentRef = el)}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell align="right">TOTAL</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        headingprofi?.headingIncomeandCost == 0 ? (<>
                                            <ComponentHeadingIncomeShow />
                                        </>) : (<>
                                            {
                                                headingprofi?.headingIncomeandCost
                                                && headingprofi?.headingIncomeandCost
                                                    .map((data, index) => {
                                                        return (
                                                            <>
                                                                <ComponentHeadingIn
                                                                    data={data}
                                                                    key={index}
                                                                    childrenFirstFloor={headingprofi?.childrenFirst}
                                                                    childrenSecondFloor={headingprofi?.childrenSecond}
                                                                    TotaldrenFirstFloor={headingprofi?.firsttotal}
                                                                    Gotodetailaccount={Gotodetailaccount}
                                                                />
                                                            </>
                                                        )
                                                    })
                                            }
                                        </>)
                                    }
                                    <TableRow>
                                        <TableCell component="th" scope="row" style={{ cursor: 'pointer', paddingLeft: 30, fontWeight: 'bold' }}>
                                            GROSS PROFIT
                                        </TableCell>
                                        <TableCell align="right">{getFormatNumber(incomeandcost)}₭</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer component={Paper} ref={(el) => (componentRef = el)}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableBody>
                                    {
                                        headingprofi?.headingExpenses == 0 ? (
                                            <>
                                                <ComponentHeadingExShow
                                                    totalgain={totalgain}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                {
                                                    headingprofi?.headingExpenses && headingprofi?.headingExpenses.map((data, index) => {
                                                        return (
                                                            <>
                                                                <ComponentHeading
                                                                    data={data}
                                                                    key={index}
                                                                    childrenFirstFloor={headingprofi?.childrenFirst}
                                                                    childrenSecondFloor={headingprofi?.childrenSecond}
                                                                    TotaldrenFirstFloor={headingprofi?.firsttotal}
                                                                    totalgain={totalgain}
                                                                    exchangegainloss={headingprofi?.ExchangeTotalGainAndLosses}
                                                                    Gotodetailaccount={Gotodetailaccount}
                                                                    ViewUnrealised={ViewUnrealised}
                                                                    gain={gain}
                                                                    e={condition}
                                                                />
                                                            </>
                                                        )
                                                    })
                                                }
                                            </>
                                        )
                                    }
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }}>
                                            NET EARNINGS
                                        </TableCell>
                                        <TableCell align="right" style={{ fontWeight: 'bold' }}>{getFormatNumber(parseFloat(profitandloss))}₭</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>) : (<>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Spinner animation="border" variant="primary" style={{ width: 100, height: 100, marginTop: 100 }} />
                        </div>
                    </>)
            }



        </>

    )
}
function ComponentHeadingExShow({ totalgain }) {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" style={{ cursor: 'pointer' }}>
                    Expenses
                </TableCell>
                <TableCell align="right" style={{ fontWeight: 'bold' }}>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => {
                    handleClick()
                }} style={{ cursor: 'pointer' }}>{open ? <ExpandLess /> : <ExpandMore />}
                    Other Expenses  
                </TableCell>
                <TableCell align="right" style={{ fontWeight: 'bold' }}>
                </TableCell>
            </TableRow>
            {/* {
                open ? (<>
                    <TableRow>
                        <TableCell component="th" scope="row" style={{ cursor: 'pointer', paddingLeft: 30 }}>
                            Unrealised Gain or Loss
                        </TableCell>
                        {
                            totalgain === null ? (<>
                                <TableCell align="right" style={{ fontWeight: 'bold' }}></TableCell>
                            </>) : (<>
                                <TableCell align="right" style={{ fontWeight: 'bold' }}>{getFormatNumber(-1 * parseFloat(totalgain))}₭</TableCell>
                            </>)
                        }
                    </TableRow>
                </>) : null
            } */}
        </>
    )
}
function ComponentHeadingIncomeShow() {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ cursor: 'pointer' }}>
                    Income
                </TableCell>
                <TableCell align="right" style={{ fontWeight: 'bold' }}>

                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ cursor: 'pointer' }}>
                    Total: Income
                </TableCell>
                <TableCell align="right" style={{ fontWeight: 'bold' }}></TableCell>

            </TableRow>
        </>
    )
}
function ComponentHeadingIn({ data, childrenFirstFloor, childrenSecondFloor, TotaldrenFirstFloor, Gotodetailaccount }) {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ cursor: 'pointer' }}>{open ? <ExpandLess /> : <ExpandMore />}
                    {data?.bs_name}
                </TableCell>
                <TableCell align="right" >
                    {
                        open ? (<></>) : (<>
                            {getFormatNumber(data?.balance)}₭
                        </>)
                    }
                </TableCell>
            </TableRow>
            {
                open ? (<>
                    <ComponentIncomeFirst
                        id={data?.bs_id}
                        childrenFirstFloor={childrenFirstFloor}
                        childrenSecondFloor={childrenSecondFloor}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    <TableRow>
                        <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                            Total: {data?.bs_name}
                        </TableCell>
                        <TableCell align="right">{getFormatNumber(data?.balance)}₭</TableCell>

                    </TableRow>


                </>) : null
            }

        </>
    )

}
function ComponentIncomeFirst({ id, childrenFirstFloor, childrenSecondFloor, TotaldrenFirstFloor, Gotodetailaccount }) {
    if (childrenFirstFloor === null) return <></>
    const filter = childrenFirstFloor.filter((el) => el.bs_status == id);

    if (filter.length === 0) return <></>;
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            <TableCellComponentIncome
                                data={data}
                                key={index}
                                childrenSecondFloor={childrenSecondFloor}
                                TotaldrenFirstFloor={TotaldrenFirstFloor}
                                id={data?.c_id}
                                Gotodetailaccount={Gotodetailaccount}

                            />
                        </>
                    )
                })
            }
        </>
    )
}
function TableCellComponentIncome({ data, childrenSecondFloor, TotaldrenFirstFloor, id, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [open, setOpen] = useState(true);
    const [netTotal, setNetTotal] = useState(0)
    if (TotaldrenFirstFloor === null) return <></>
    const filter = TotaldrenFirstFloor.filter((el) => el.id === id);
    if (filter.length === 0) return <></>;
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
          
            setNetTotal([...data?.data?.data][0].balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <TableRow>
                <TableCell onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ cursor: 'pointer', paddingLeft: 30 }}>
                    {
                        checkvalues === 0 ? (<></>) : (<>{open ? <ExpandLess /> : <ExpandMore />}</>)
                    }
                    {data?.name_eng}
                </TableCell>
                {
                    open ? (
                        <>
                            <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)}₭</TableCell>
                        </>) : (<>
                            <TableCell align="right">{getFormatNumber(netTotal)}₭</TableCell>
                        </>)
                }
            </TableRow>
            {open ? (
                <>
                    <TableCellComponentIncome1
                        id={data?.c_id}
                        childrenSecondFloor={childrenSecondFloor}
                        setCheckvalues={setCheckvalues}
                        TotaldrenSecondFloor={TotaldrenFirstFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ cursor: 'pointer', fontWeight: 'bold', paddingLeft: 30 }}>
                                    Total: {data?.name_eng}
                                </TableCell>
                                <TableCell align="right" >
                                    {getFormatNumber(filter[0].balances)}₭
                                </TableCell>

                            </TableRow>
                        </>)
                    }

                </>



            ) : null
            }
        </>
    )

}
function TableCellComponentIncome1({ childrenSecondFloor, setCheckvalues, id, TotaldrenSecondFloor, Gotodetailaccount }) {

    if (childrenSecondFloor === null) return <></>
    const filter = childrenSecondFloor.filter((el) => el.parents == id);
    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            <TableCellComponentIncome2
                                data={data}
                                key={index}
                                childrenSecondFloor={childrenSecondFloor}
                                TotaldrenSecondFloor={TotaldrenSecondFloor}
                                id={data?.c_id}
                                Gotodetailaccount={Gotodetailaccount}

                            />
                        </>
                    )
                })
            }


        </>
    )

}
function TableCellComponentIncome2({ data, childrenSecondFloor, TotaldrenSecondFloor, id, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal([...data?.data?.data][0].balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    if (TotaldrenSecondFloor === null) return <></>
    const filter = TotaldrenSecondFloor.filter((el) => el.id === id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ cursor: 'pointer', paddingLeft: 40 }}>
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }
                    {data?.name_eng}
                </TableCell >
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}> {getFormatNumber(data?.balances)}₭</TableCell>

                    </>) : (<>

                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}> {getFormatNumber(netTotal)}₭</TableCell>
                    </>)
                }
            </TableRow>
            {
                open ? (<>
                    <TableCellComponentIncome3
                        childrenSecondFloor={childrenSecondFloor}
                        setCheckvalues={setCheckvalues}
                        id={data?.c_id}
                        TotaldrenSecondFloor={TotaldrenSecondFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 40, fontWeight: "bold" }} >
                                    Total:  {data?.name_eng}
                                </TableCell>
                                <TableCell align="right">
                                    {getFormatNumber(filter[0].balances)}₭
                                </TableCell>
                            </TableRow>
                        </>)
                    }
                </>) : null
            }

        </>
    )

}
function TableCellComponentIncome3({ childrenSecondFloor, setCheckvalues, id, TotaldrenSecondFloor, Gotodetailaccount }) {
    if (childrenSecondFloor === null) return <></>
    const filter = childrenSecondFloor.filter((el) => el.parents == id);
    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            <TableCellComponentIncome4
                                data={data}
                                key={index}
                                childrenSecondFloor={childrenSecondFloor}
                                TotaldrenSecondFloor={TotaldrenSecondFloor}
                                id={data?.c_id}
                                Gotodetailaccount={Gotodetailaccount}

                            />
                        </>
                    )
                })
            }
        </>
    )

}
function TableCellComponentIncome4({ data, childrenSecondFloor, TotaldrenSecondFloor, id, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal([...data?.data?.data][0].balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    if (TotaldrenSecondFloor === null) return <></>
    const filter = TotaldrenSecondFloor.filter((el) => el.id === id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ cursor: 'pointer', paddingLeft: 50 }}>
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell >
                <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>
                    {
                        open ? (<>
                            {getFormatNumber(data?.balances)}₭
                        </>) : (<>
                            {getFormatNumber(netTotal)}₭
                        </>)
                    }
                </TableCell>


            </TableRow>
            {
                open ? (<>
                    <TableCellComponentIncome5
                        childrenSecondFloor={childrenSecondFloor}
                        setCheckvalues={setCheckvalues}
                        id={data?.c_id}
                        TotaldrenSecondFloor={TotaldrenSecondFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 50, fontWeight: "bold" }} >
                                    Total:  {data?.name_eng}
                                </TableCell>
                                <TableCell align="right">
                                    {getFormatNumber(filter[0].balances)}₭
                                </TableCell>
                            </TableRow>
                        </>)
                    }
                </>) : null
            }

        </>
    )

}
function TableCellComponentIncome5({ childrenSecondFloor, setCheckvalues, id, TotaldrenSecondFloor, Gotodetailaccount }) {
    if (childrenSecondFloor === null) return <></>
    const filter = childrenSecondFloor.filter((el) => el.parents == id);
    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            <TableCellComponentIncome6
                                data={data}
                                key={index}
                                childrenSecondFloor={childrenSecondFloor}
                                TotaldrenSecondFloor={TotaldrenSecondFloor}
                                id={data?.c_id}
                                Gotodetailaccount={Gotodetailaccount}

                            />
                        </>
                    )
                })
            }
        </>
    )

}
function TableCellComponentIncome6({ data, childrenSecondFloor, TotaldrenSecondFloor, id, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal([...data?.data?.data][0].balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    if (TotaldrenSecondFloor === null) return <></>
    const filter = TotaldrenSecondFloor.filter((el) => el.id === id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ cursor: 'pointer', paddingLeft: 60 }}>
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell >
                <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>
                    {
                        open ? (<>
                            {getFormatNumber(data?.balances)}₭
                        </>) : (<>
                            {getFormatNumber(netTotal)}₭
                        </>)
                    }
                </TableCell>


            </TableRow>
            {
                open ? (<>
                    <TableCellComponentIncome7
                        childrenSecondFloor={childrenSecondFloor}
                        setCheckvalues={setCheckvalues}
                        id={data?.c_id}
                        TotaldrenSecondFloor={TotaldrenSecondFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 60, fontWeight: "bold" }} >
                                    Total:  {data?.name_eng}
                                </TableCell>
                                <TableCell align="right" >
                                    {getFormatNumber(filter[0].balances)}₭
                                </TableCell>
                            </TableRow>
                        </>)
                    }
                </>) : null
            }

        </>
    )

}
function TableCellComponentIncome7({ childrenSecondFloor, setCheckvalues, id, TotaldrenSecondFloor, Gotodetailaccount }) {
    if (childrenSecondFloor === null) return <></>
    const filter = childrenSecondFloor.filter((el) => el.parents == id);
    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            <TableCellComponentIncome8
                                data={data}
                                key={index}
                                childrenSecondFloor={childrenSecondFloor}
                                TotaldrenSecondFloor={TotaldrenSecondFloor}
                                id={data?.c_id}
                                Gotodetailaccount={Gotodetailaccount}
                            />
                        </>
                    )
                })
            }
        </>
    )

}
function TableCellComponentIncome8({ data, childrenSecondFloor, TotaldrenSecondFloor, id, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal([...data?.data?.data][0].balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    if (TotaldrenSecondFloor === null) return <></>
    const filter = TotaldrenSecondFloor.filter((el) => el.id === id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ cursor: 'pointer', paddingLeft: 70 }}>
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell >
                <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>
                    {
                        open ? (<>
                            {getFormatNumber(data?.balances)}₭
                        </>) : (<>
                            {getFormatNumber(netTotal)}₭
                        </>)
                    }
                </TableCell>


            </TableRow>
            {
                open ? (<>
                    <TableCellComponentIncome9
                        childrenSecondFloor={childrenSecondFloor}
                        setCheckvalues={setCheckvalues}
                        id={data?.c_id}
                        TotaldrenSecondFloor={TotaldrenSecondFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 70, fontWeight: "bold" }} >
                                    Total:  {data?.name_eng}
                                </TableCell>
                                <TableCell align="right" >
                                    {getFormatNumber(filter[0].balances)}₭
                                </TableCell>
                            </TableRow>
                        </>)
                    }
                </>) : null
            }

        </>
    )

}
function TableCellComponentIncome9({ childrenSecondFloor, setCheckvalues, id, TotaldrenSecondFloor, Gotodetailaccount }) {
    if (childrenSecondFloor === null) return <></>
    const filter = childrenSecondFloor.filter((el) => el.parents == id);
    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            <TableCellComponentIncome10
                                data={data}
                                key={index}
                                childrenSecondFloor={childrenSecondFloor}
                                TotaldrenSecondFloor={TotaldrenSecondFloor}
                                id={data?.c_id}
                                Gotodetailaccount={Gotodetailaccount}

                            />
                        </>
                    )
                })
            }


        </>
    )

}
function TableCellComponentIncome10({ data, childrenSecondFloor, TotaldrenSecondFloor, id, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal([...data?.data?.data][0].balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    if (TotaldrenSecondFloor === null) return <></>
    const filter = TotaldrenSecondFloor.filter((el) => el.id === id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ cursor: 'pointer', paddingLeft: 80 }}>
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell >
                <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>
                    {
                        open ? (<>
                            {getFormatNumber(data?.balances)}₭
                        </>) : (<>
                            {getFormatNumber(netTotal)}₭
                        </>)
                    }
                </TableCell>
            </TableRow>
            {
                open ? (<>
                    <TableCellComponentIncome11
                        childrenSecondFloor={childrenSecondFloor}
                        setCheckvalues={setCheckvalues}
                        id={data?.c_id}
                        TotaldrenSecondFloor={TotaldrenSecondFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 80, fontWeight: "bold" }} >
                                    Total:  {data?.name_eng}
                                </TableCell>
                                <TableCell align="right" >
                                    {getFormatNumber(filter[0].balances)}₭
                                </TableCell>
                            </TableRow>
                        </>)
                    }
                </>) : null
            }
        </>
    )

}
function TableCellComponentIncome11({ childrenSecondFloor, setCheckvalues, id, TotaldrenSecondFloor, Gotodetailaccount }) {
    if (childrenSecondFloor === null) return <></>
    const filter = childrenSecondFloor.filter((el) => el.parents == id);
    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            <TableCellComponentIncome12
                                data={data}
                                key={index}
                                childrenSecondFloor={childrenSecondFloor}
                                TotaldrenSecondFloor={TotaldrenSecondFloor}
                                id={data?.c_id}
                                Gotodetailaccount={Gotodetailaccount}

                            />
                        </>
                    )
                })
            }


        </>
    )

}
function TableCellComponentIncome12({ data, childrenSecondFloor, TotaldrenSecondFloor, id, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal([...data?.data?.data][0].balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    if (TotaldrenSecondFloor === null) return <></>
    const filter = TotaldrenSecondFloor.filter((el) => el.id === id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ cursor: 'pointer', paddingLeft: 90 }}>
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell >
                <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>
                    {
                        open ? (<>
                            {getFormatNumber(data?.balances)}
                        </>) : (<>
                            {getFormatNumber(netTotal)}
                        </>)
                    }
                </TableCell>
            </TableRow>

        </>
    )
}
function ComponentHeading({ data, childrenFirstFloor, childrenSecondFloor, TotaldrenFirstFloor, totalgain, Gotodetailaccount, ViewUnrealised, gain, exchangegainloss ,e}) {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    if (exchangegainloss === null) return <></>
    const datafilter = exchangegainloss.filter((el) => el.bs_id === data?.bs_id);
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ cursor: 'pointer' }}>{open ? <ExpandLess /> : <ExpandMore />}
                    {data?.bs_name}
                </TableCell>

                <TableCell align="right">
                    {
                        open ? (<></>) : (<>
                            {getFormatNumber(data?.balance)}₭
                        </>)
                    }
                </TableCell>
            </TableRow>

            {
                open ? (<>

                    <ComponentExpenseFirst
                        
                        id={data?.bs_id}
                        childrenFirstFloor={childrenFirstFloor}
                        childrenSecondFloor={childrenSecondFloor}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        totalgain={totalgain}
                        Gotodetailaccount={Gotodetailaccount}
                        ViewUnrealised={ViewUnrealised}
                        gain={gain}
                        e={e}
                    />

                    <TableRow>
                        <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                            Total: {data?.bs_name}
                        </TableCell>
                        {
                            gain === true ? (<>
                                <TableCell align="right" >{getFormatNumber(data?.balance)}₭</TableCell>
                            </>) : (
                                <>
                                    {
                                        datafilter.length === 0 ? (<>
                                            <TableCell align="right" >{getFormatNumber(data?.balance)}₭</TableCell>
                                        </>) : (<>
                                            <TableCell align="right" >{getFormatNumber(data?.balance - datafilter[0].balance)}₭</TableCell>
                                        </>)
                                    }

                                </>)
                        }
                    </TableRow>
                </>) : null
            }
            {/* {
                show == true ? (<>
                    <TableRow>
                        <TableCell component="th" scope="row" style={{ cursor: 'pointer' }}>{open ? <ExpandLess /> : <ExpandMore />}
                            Other Expenses
                        </TableCell>

                        <TableCell align="right" style={{ fontWeight: 'bold', fontSize: 20 }}>
                        </TableCell>

                    </TableRow>
                    {
                        open ? (<>
                            <UnrealisedGainorLoss
                                totalgain={totalgain}
                            />
                        </>) : null

                    }


                </>) : null
            } */}

        </>
    )
}
function UnrealisedGainorLoss({ totalgain }) {

    return (<>
        <TableRow>
            <TableCell component="th" scope="row" style={{ cursor: 'pointer', paddingLeft: 30 }}>
                Unrealised Gain or Loss
            </TableCell>
            {
                totalgain === null ? (<>
                    <TableCell align="right">0.00</TableCell>
                </>) : (<>
                    <TableCell align="right">0.00</TableCell>
                </>)
            }

        </TableRow>
    </>)
}
function ComponentExpenseFirst({ id, childrenFirstFloor, childrenSecondFloor, TotaldrenFirstFloor, rows, Gotodetailaccount, ViewUnrealised, gain,e }) {
    if (childrenFirstFloor === null) return <></>
    const filter = childrenFirstFloor.filter((el) => el.bs_id === id);
    

    // const datafilter = rows.filter((el) => el.id === id);
    // let tax;
    // if (datafilter.length === 0) {

    //     tax = ''
    // } else {

    //     tax = datafilter[0].name_eng

    // }
    return (
        <>
            {/* {
                gain === '' ? (<>
                </>) : (<>
                    <TableRow>
                        <TableCell style={{ cursor: 'pointer', paddingLeft: 30 }}>
                            {
                                gain
                            }
                        </TableCell>
                        {
                            totalgain === null ? (<>
                                <TableCell align="right">0.00 </TableCell>
                            </>) : (<>
                                <TableCell align="right">{getFormatNumber(-1 * parseFloat(totalgain))}</TableCell>
                            </>)
                        }

                    </TableRow>

                </>)
            } */}
            {/* {
                tax === '' ? (<>
                </>) : (<>
                    <TableRow>
                        <TableCell style={{ cursor: 'pointer', paddingLeft: 30 }}>
                            {
                                tax
                            }
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => { ViewUnrealised() }} >10%</TableCell>

                    </TableRow>

                </>)   
            } */}
            {
                filter && filter.map((data, index) => {
                  
                    return (
                        <>
                            <TableCellComponentExpense
                                data={data}
                                key={index}
                                childrenSecondFloor={childrenSecondFloor}
                                TotaldrenFirstFloor={TotaldrenFirstFloor}
                                id={data?.c_id}
                                ViewUnrealised={ViewUnrealised}
                                Gotodetailaccount={Gotodetailaccount}
                                gain={gain}
                                e={e}
                            />
                        </>
                    )
                })
            }
        </>
    )
}
function TableCellComponentExpense({ data, childrenSecondFloor, TotaldrenFirstFloor, id, Gotodetailaccount, ViewUnrealised, gain,e }) {
    
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal1, setNetTotal1] = useState(0)
    const [open, setOpen] = useState(true);
    if (TotaldrenFirstFloor === null) return <></>
    const filter = TotaldrenFirstFloor.filter((el) => el.id === id);


    
    if (filter.length === 0) return <></>;
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            
            setNetTotal1([...data?.data?.data][0].balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <TableRow>
                {
                    data?.statu_auto_GainAndLoss == 1 || data?.statu_auto_GainAndLoss == 2 ? (<>
                        {
                            gain == true ? (<>
                                <TableCell onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ cursor: 'pointer', paddingLeft: 30 }}>
                                    {
                                        checkvalues === 0 ? (<></>) : (<>
                                            {open ? <ExpandLess /> : <ExpandMore />}
                                        </>)
                                    }
                                    {data?.name_eng}
                                </TableCell>

                            </>) : null
                        }
                    </>) : (<>
                        <TableCell onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ cursor: 'pointer', paddingLeft: 30 }}>
                            {
                                checkvalues === 0 ? (<></>) : (<>
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </>)
                            }
                            {data?.name_eng}
                        </TableCell>
                    </>)
                }
                {
                    data?.p_and_l == 3 || data?.p_and_l == 4 ? (
                        <>
                            <TableCell align="right" style={{ cursor: 'pointer', color: 'red' }} onClick={() => { ViewUnrealised(e) }}>
                                {
                                    open ? (
                                        <>
                                            {getFormatNumber(data?.bs_amount)}₭

                                        </>
                                    ) : (<>
                                        {getFormatNumber(netTotal1)}₭
                                    </>)
                                }
                            </TableCell>


                        </>) : (
                        <>
                            {
                                data?.statu_auto_GainAndLoss == 1 || data?.statu_auto_GainAndLoss == 2 ? (
                                    <>
                                        {
                                            gain == true ? (<>
                                                <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>
                                                    {
                                                        open ? (
                                                            <>
                                                                {getFormatNumber(data?.balances)}₭

                                                            </>
                                                        ) : (<>
                                                            {getFormatNumber(netTotal1)}₭
                                                        </>)
                                                    }
                                                </TableCell>
                                            </>) : null
                                        }

                                    </>
                                ) : (<>
                                    <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>
                                        {
                                            open ? (
                                                <>
                                                    {getFormatNumber(data?.balances)}₭

                                                </>
                                            ) : (<>
                                                {getFormatNumber(netTotal1)}₭
                                            </>)
                                        }
                                    </TableCell>


                                </>)
                            }
                        </>)
                }

            </TableRow>
            {open ? (
                <>
                    <TableCellComponentExpense1
                        id={data?.c_id}
                        childrenSecondFloor={childrenSecondFloor}
                        setCheckvalues={setCheckvalues}
                        TotaldrenSecondFloor={TotaldrenFirstFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                        {
                            data?.statu_auto_GainAndLoss  == 3 || data?.statu_auto_GainAndLoss  == 4 ? (<>
                           
                            </>):(<>
                                <TableRow>
                                <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ cursor: 'pointer', fontWeight: 'bold', paddingLeft: 30 }}>
                                    Total: {data?.name_eng}
                                </TableCell>
                                <TableCell align="right"  >
                                    {getFormatNumber(filter[0].balances)}₭
                                </TableCell>
                            </TableRow>
                            
                            </>)
                        }
                            
                        </>)
                    }

                </>
            ) : null
            }
        </>
    )

}
function TableCellComponentExpense1({ childrenSecondFloor, setCheckvalues, id, TotaldrenSecondFloor, Gotodetailaccount }) {
    if (childrenSecondFloor === null) return <></>
    const filter = childrenSecondFloor.filter((el) => el.parents == id);

    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            <TableCellComponentExpense2
                                data={data}
                                key={index}
                                childrenSecondFloor={childrenSecondFloor}
                                TotaldrenSecondFloor={TotaldrenSecondFloor}
                                id={data?.c_id}
                                Gotodetailaccount={Gotodetailaccount}

                            />
                        </>
                    )
                })
            }


        </>
    )

}
function TableCellComponentExpense2({ data, childrenSecondFloor, TotaldrenSecondFloor, id, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal([...data?.data?.data][0].balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    if (TotaldrenSecondFloor === null) return <></>
    const filter = TotaldrenSecondFloor.filter((el) => el.id === id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ cursor: 'pointer', paddingLeft: 40 }}>
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell >
                <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>
                    {
                        open ? (<>
                            {getFormatNumber(data?.balances)}₭
                        </>) : (<>
                            {getFormatNumber(netTotal)}₭
                        </>)
                    }
                </TableCell>


            </TableRow>
            {
                open ? (<>
                    <TableCellComponentExpense3
                        childrenSecondFloor={childrenSecondFloor}
                        setCheckvalues={setCheckvalues}
                        id={data?.c_id}
                        TotaldrenSecondFloor={TotaldrenSecondFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 40, fontWeight: "bold" }} >
                                    Total:  {data?.name_eng}
                                </TableCell>
                                <TableCell align="right"  >
                                    {getFormatNumber(filter[0].balances)}₭
                                </TableCell>
                            </TableRow>
                        </>)
                    }
                </>) : null
            }

        </>
    )

}
function TableCellComponentExpense3({ childrenSecondFloor, setCheckvalues, id, TotaldrenSecondFloor, Gotodetailaccount }) {

    if (childrenSecondFloor === null) return <></>
    const filter = childrenSecondFloor.filter((el) => el.parents == id);


    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (
        <>
            {
                filter && filter.map((data, index) => {

                    return (
                        <>
                            <TableCellComponentExpense4
                                data={data}
                                key={index}
                                childrenSecondFloor={childrenSecondFloor}
                                TotaldrenSecondFloor={TotaldrenSecondFloor}
                                id={data?.c_id}
                                Gotodetailaccount={Gotodetailaccount}

                            />
                        </>
                    )
                })
            }


        </>
    )

}
function TableCellComponentExpense4({ data, childrenSecondFloor, TotaldrenSecondFloor, id, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal([...data?.data?.data][0].balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    if (TotaldrenSecondFloor === null) return <></>
    const filter = TotaldrenSecondFloor.filter((el) => el.id === id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ cursor: 'pointer', paddingLeft: 50 }}>

                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell>
                <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>
                    {
                        open ? (<>
                            {getFormatNumber(data?.balances)}₭
                        </>) : (<>
                            {getFormatNumber(netTotal)}₭
                        </>)
                    }₭</TableCell>
            </TableRow>
            {
                open ? (<>
                    <TableCellComponentExpense5
                        childrenSecondFloor={childrenSecondFloor}
                        setCheckvalues={setCheckvalues}
                        id={data?.c_id}
                        TotaldrenSecondFloor={TotaldrenSecondFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 50, fontWeight: "bold" }} >
                                    Total:  {data?.name_eng}
                                </TableCell>
                                <TableCell align="right"  >
                                    {getFormatNumber(filter[0].balances)}₭
                                </TableCell>
                            </TableRow>
                        </>)
                    }
                </>) : null
            }

        </>
    )

}
function TableCellComponentExpense5({ childrenSecondFloor, setCheckvalues, id, TotaldrenSecondFloor, Gotodetailaccount }) {
    if (childrenSecondFloor === null) return <></>
    const filter = childrenSecondFloor.filter((el) => el.parents == id);
    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            <TableCellComponentExpense6
                                data={data}
                                key={index}
                                childrenSecondFloor={childrenSecondFloor}
                                TotaldrenSecondFloor={TotaldrenSecondFloor}
                                id={data?.c_id}
                                Gotodetailaccount={Gotodetailaccount}

                            />
                        </>
                    )
                })
            }


        </>
    )

}
function TableCellComponentExpense6({ data, childrenSecondFloor, TotaldrenSecondFloor, id, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal([...data?.data?.data][0].balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    if (TotaldrenSecondFloor === null) return <></>
    const filter = TotaldrenSecondFloor.filter((el) => el.id === id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ cursor: 'pointer', paddingLeft: 70 }}>

                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell>
                <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>
                    {
                        open ? (<>
                            {getFormatNumber(data?.balances)}₭
                        </>) : (<>
                            {getFormatNumber(netTotal)}₭
                        </>)
                    }₭</TableCell>
            </TableRow>
            {
                open ? (<>
                    <TableCellComponentExpense7
                        childrenSecondFloor={childrenSecondFloor}
                        setCheckvalues={setCheckvalues}
                        id={data?.c_id}
                        TotaldrenSecondFloor={TotaldrenSecondFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 70, fontWeight: "bold" }} >
                                    Total:  {data?.name_eng}
                                </TableCell>
                                <TableCell align="right"  >
                                    {getFormatNumber(filter[0].balances)}₭
                                </TableCell>
                            </TableRow>
                        </>)
                    }
                </>) : null
            }

        </>
    )

}
function TableCellComponentExpense7({ childrenSecondFloor, setCheckvalues, id, TotaldrenSecondFloor, Gotodetailaccount }) {
    if (childrenSecondFloor === null) return <></>
    const filter = childrenSecondFloor.filter((el) => el.parents == id);

    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            <TableCellComponentExpense8
                                data={data}
                                key={index}
                                childrenSecondFloor={childrenSecondFloor}
                                TotaldrenSecondFloor={TotaldrenSecondFloor}
                                id={data?.c_id}
                                Gotodetailaccount={Gotodetailaccount}

                            />
                        </>
                    )
                })
            }


        </>
    )

}
function TableCellComponentExpense8({ data, childrenSecondFloor, TotaldrenSecondFloor, id, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal([...data?.data?.data][0].balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    if (TotaldrenSecondFloor === null) return <></>
    const filter = TotaldrenSecondFloor.filter((el) => el.id === id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ cursor: 'pointer', paddingLeft: 80 }}>

                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell>
                <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => Gotodetailaccount(data?.c_uid)}>
                    {
                        open ? (<>
                            {getFormatNumber(data?.balances)}
                        </>) : (<>
                            {getFormatNumber(netTotal)}
                        </>)
                    }₭</TableCell>
            </TableRow>
            {
                open ? (<>
                    <TableCellComponentExpense9
                        childrenSecondFloor={childrenSecondFloor}
                        setCheckvalues={setCheckvalues}
                        id={data?.c_id}
                        TotaldrenSecondFloor={TotaldrenSecondFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 80, fontWeight: "bold" }} >
                                    Total:  {data?.name_eng}
                                </TableCell>
                                <TableCell align="right" >
                                    {getFormatNumber(filter[0].balances)}₭
                                </TableCell>
                            </TableRow>
                        </>)
                    }
                </>) : null
            }

        </>
    )

}
function TableCellComponentExpense9({ childrenSecondFloor, setCheckvalues, id, TotaldrenSecondFloor, Gotodetailaccount }) {
    if (childrenSecondFloor === null) return <></>
    const filter = childrenSecondFloor.filter((el) => el.parents == id);

    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            <TableCellComponentExpense10
                                data={data}
                                key={index}
                                childrenSecondFloor={childrenSecondFloor}
                                TotaldrenSecondFloor={TotaldrenSecondFloor}
                                id={data?.c_id}
                                Gotodetailaccount={Gotodetailaccount}

                            />
                        </>
                    )
                })
            }


        </>
    )

}
function TableCellComponentExpense10({ data, childrenSecondFloor, TotaldrenSecondFloor, id, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal([...data?.data?.data][0].balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    if (TotaldrenSecondFloor === null) return <></>
    const filter = TotaldrenSecondFloor.filter((el) => el.id === id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ cursor: 'pointer', paddingLeft: 90 }}>

                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell>
                <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>
                    {
                        open ? (<>
                            {getFormatNumber(data?.balances)}₭
                        </>) : (<>
                            {getFormatNumber(netTotal)}₭
                        </>)
                    }

                    ₭</TableCell>
            </TableRow>
            {
                open ? (<>
                    <TableCellComponentExpense11
                        childrenSecondFloor={childrenSecondFloor}
                        setCheckvalues={setCheckvalues}
                        id={data?.c_id}
                        TotaldrenSecondFloor={TotaldrenSecondFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 90, fontWeight: "bold" }} >
                                    Total:  {data?.name_eng}
                                </TableCell>
                                <TableCell align="right"  >
                                    {getFormatNumber(filter[0].balances)}₭
                                </TableCell>
                            </TableRow>
                        </>)
                    }
                </>) : null
            }

        </>
    )

}
function TableCellComponentExpense11({ childrenSecondFloor, setCheckvalues, id, TotaldrenSecondFloor, Gotodetailaccount }) {
    if (childrenSecondFloor === null) return <></>
    const filter = childrenSecondFloor.filter((el) => el.parents == id);
    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            <TableCellComponentExpense12
                                data={data}
                                key={index}
                                childrenSecondFloor={childrenSecondFloor}
                                TotaldrenSecondFloor={TotaldrenSecondFloor}
                                id={data?.c_id}
                                Gotodetailaccount={Gotodetailaccount}

                            />
                        </>
                    )
                })
            }


        </>
    )

}
function TableCellComponentExpense12({ data, childrenSecondFloor, TotaldrenSecondFloor, id, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal([...data?.data?.data][0].balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    if (TotaldrenSecondFloor === null) return <></>
    const filter = TotaldrenSecondFloor.filter((el) => el.id === id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ cursor: 'pointer', paddingLeft: 100 }}>

                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell>
                <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>
                    {
                        open ? (<>
                            {getFormatNumber(data?.balances)}₭
                        </>) : (<>
                            {getFormatNumber(netTotal)}₭
                        </>)
                    }₭</TableCell>
            </TableRow>
            {
                open ? (<>
                    <TableCellComponentExpense13
                        childrenSecondFloor={childrenSecondFloor}
                        setCheckvalues={setCheckvalues}
                        id={data?.c_id}
                        TotaldrenSecondFloor={TotaldrenSecondFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 100, fontWeight: "bold" }} >
                                    Total:  {data?.name_eng}
                                </TableCell>
                                <TableCell align="right"  >
                                    {getFormatNumber(filter[0].balances)}₭
                                </TableCell>
                            </TableRow>
                        </>)
                    }
                </>) : null
            }

        </>
    )

}
function TableCellComponentExpense13({ childrenSecondFloor, setCheckvalues, id, TotaldrenSecondFloor, Gotodetailaccount }) {
    if (childrenSecondFloor === null) return <></>
    const filter = childrenSecondFloor.filter((el) => el.parents == id);

    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            <TableCellComponentExpense14
                                data={data}
                                key={index}
                                childrenSecondFloor={childrenSecondFloor}
                                TotaldrenSecondFloor={TotaldrenSecondFloor}
                                id={data?.c_id}
                                Gotodetailaccount={Gotodetailaccount}

                            />
                        </>
                    )
                })
            }


        </>
    )

}
function TableCellComponentExpense14({ data, childrenSecondFloor, TotaldrenSecondFloor, id, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal([...data?.data?.data][0].balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    if (TotaldrenSecondFloor === null) return <></>
    const filter = TotaldrenSecondFloor.filter((el) => el.id === id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ cursor: 'pointer', paddingLeft: 110 }}>

                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell>
                <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => Gotodetailaccount(data?.c_uid)}>
                    {
                        open ? (<>
                            {getFormatNumber(data?.balances)}₭
                        </>) : (<>
                            {getFormatNumber(netTotal)}₭
                        </>)
                    }₭</TableCell>
            </TableRow>
            {
                open ? (<>
                    <TableCellComponentExpense11
                        childrenSecondFloor={childrenSecondFloor}
                        setCheckvalues={setCheckvalues}
                        id={data?.c_id}
                        TotaldrenSecondFloor={TotaldrenSecondFloor}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 110, fontWeight: "bold" }} >
                                    Total:  {data?.name_eng}
                                </TableCell>
                                <TableCell align="right"  >
                                    {getFormatNumber(filter[0].balances)}₭
                                </TableCell>
                            </TableRow>
                        </>)
                    }
                </>) : null
            }

        </>
    )

}
