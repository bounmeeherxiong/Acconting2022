import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getFormatNumber } from "../constants/functions";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import moment from 'moment';
import axios from "axios";
import { LoginContext } from "./contexts/LoginContext";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
export default function ReportTrialbalances() {
    const navigate = useNavigate();
    const {
        listaccountname
    } = useContext(LoginContext);

    const [start_date, setStart_date] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [showdate, setShowdate] = useState(false)
    const [getvalues, setGetvalues] = useState([]);
    const [listTrailbalance, setListTrailbalance] = useState([])
    const today = new Date();
    const [defaultValue, setDefaultValue] = useState("")
    const [defaultValue1, setDefaultValue1] = useState("")
    const date = moment(new Date).format("DD-MM-YYYY")
    const [debit, setDebit] = useState("0")
    const [credit, setCredit] = useState("0")
    const [nameShow, setNameShow] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [showBox, setShowBox] = useState(false);
    const [open, setOpen] = useState(true);
    const [ch_id, setCh_id] = useState("");
    const [active, setActive] = useState("");
    

    const handleClick = () => {
        setOpen(!open);
    };

    const classes = useStyles();
    const goback = () => {
        // navigate("/ChartAccount");
    }
    const Gotodetailaccount = (id) => {
        navigate(`/DetailReportTrialbalances/${id}`);
      }
    const onloadreportTrailbalance = () => {
        axios.get("/accounting/api/reportbydate/reporttrailbalance").then((data) => {
            console.log("data=",[...data?.data?.result])
            setListTrailbalance([...data?.data?.result])
            setDebit([...data?.data.total][0].debit)
            setCredit([...data?.data.total][0].credit)
        })
    }
    const _onShow = (e) => {
        if (e == "custom") {
            setShowdate(true)
        } else if (e == "all") {
            onloadreportTrailbalance()
        } else if (e == "today") {
            console.log("today")
            const start = defaultValue
            const end = defaultValue1
            let data = {
                start,
                end
            }
            axios.post("/accounting/api/reportbydate/searchreport", data).then((data) => {
                setListTrailbalance([...data?.data.result])
                setDebit([...data?.data.searchtotal][0].debit)
                setCredit([...data?.data.searchtotal][0].credit)
            }).catch((err) => {
                console.log(err)
            })
        }
        setGetvalues(e)
    }
    const _searchstartdate = (e) => {
        setStart_date(e)
        if (defaultValue == "") {
            setDefaultValue(date)
        } else {
            setDefaultValue(moment(e).format("DD-MM-YYYY"))
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
    const _onSearchList = (e) => {
        setNameShow(e);
        let searchName = listaccountname.filter((el) => el.name_eng.includes(e));
        if (!e) {
            setSearchResult([]);
        } else {
            setSearchResult([...searchName]);
        }
    };
    const Search = () => {
        if (getvalues == "account") {
            const start = defaultValue
            const end = defaultValue1
            let data = {
                start,
                end,
                ch_id
            }
            axios.post("/accounting/api/report/reportbyaccount", data).then((data) => {
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
            axios.post("/accounting/api/reportjournal-entries/reportBydate", data).then((data) => {
                setListTrailbalance([...data?.data.result])
                setDebit([...data?.data.searchtotal][0].debit)
                setCredit([...data?.data.searchtotal][0].credit)
            }).catch((err) => {
                console.log(err)
            })
        }

    }
    const Onloadreset = () => {
        window.location.reload();
    }
    const getNameList = (c_id) => {
        axios.get(`/accounting/api/chartofaccounts/all/parents/${c_id}`).then((data) => {
            if (data?.data?.message.length > 0) {
                setCh_id(data?.data.message[0].c_id);
                const names = data?.data?.message.map((item) => {
                    return item.name_eng;
                });
                names.reverse();
                setNameShow(names.join(":"));
                setShowBox(!showBox);
            }
        });
    };

    useEffect(() => {
        onloadreportTrailbalance()
        _searchstartdate();
        _searchbydate();
    }, [])

    return (
        <>
            <div>
                <h2>Trial Balance Report</h2>
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
                    <option value="custom">Custom</option>
                    <option value="today">Today</option>
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
                    getvalues == "account" ? (
                        <>
                        </>
                    ) : (
                        <>

                        </>
                    )
                }
                {/* <input
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
                </div> */}
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
                                {searchResult && searchResult.length > 0 ? (
                                    <>
                                        {searchResult && searchResult.map((data, index) => {
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
                            <TableCell>Account</TableCell>
                            <TableCell align="left">Debit</TableCell>
                            <TableCell align="left">Credit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listTrailbalance && listTrailbalance.map((data, index) => {                   
                            return (
                                <>
                                    <TableRow key={index}>
                                        <TableCell onClick={()=>{Gotodetailaccount(data?.c_uid)}}  style={{cursor:"pointer"}}>{data?.name_eng}</TableCell>
                                        <TableCell onClick={()=>{Gotodetailaccount(data?.c_uid)}}  style={{cursor:"pointer"}}>
                                            {
                                                data?.debit == "0.00" ?
                                                    (
                                                        <>
                                                            0.00
                                                        </>
                                                    ) : (
                                                        <>
                                                            {getFormatNumber(data?.debit)} ₭
                                                        </>
                                                    )
                                            }

                                        </TableCell>
                                        <TableCell onClick={()=>{Gotodetailaccount(data?.c_uid)}}  style={{cursor:"pointer"}}>
                                            {
                                                data?.credit == "0.00" ? (
                                                    <>
                                                        0.00
                                                    </>) : (<>
                                                        {getFormatNumber(data?.credit)}₭
                                                    </>)
                                            }
                                        </TableCell>
                                    </TableRow>
                                </>
                            )
                        })}
                    </TableBody>
                    <TableHead>
                        <TableRow>
                            <TableCell>Total:</TableCell>
                            <TableCell align="left">{getFormatNumber(debit)} ₭ </TableCell>
                            <TableCell align="left">{getFormatNumber(credit)}₭ </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </>
    )

}

