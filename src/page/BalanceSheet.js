import React, { useState, useEffect, useRef, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Spinner from 'react-bootstrap/Spinner';
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
import PrintIcon from '@material-ui/icons/Print';
import { getFormatNumber } from "../constants/functions"
import Button from '@material-ui/core/Button';
import ReactToPrint from "react-to-print";
import moment from 'moment';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(id, name, calories,) {
    return { id, name, calories };
}

const rows = [
    createData(1, 'Assets', 159,),
];

function createDatelist(id, name, price) {
    return { id, name, price }
}
const rows1 = [
    createDatelist(1, 'Current Assets', 3000),
    createDatelist(1, 'Long- term assets', 3000),
]
function createdate2(id, name, calories) {
    return { id, name, calories }
}
const data_row = [
    createdate2(1, 'Liabilities and shareholders equity', 200),
]
function createdatelist2(id, name, price) {
    return { id, name, price }
}
const rows2 = [
    createdatelist2(1, 'Shareholders equity:', 3000),
]
function createdatalist(id, name, calories, current_id) {
    return { id, name, calories, current_id }
}
const createrowlist = [
    createdatalist(1, "Current assets-USD", 20000, 1, 0),
    createdatalist(2, "Currents assets-LAK", 20000, 1, 0),
]
export default function BalanceSheet() {
    const navigate = useNavigate();
    let componentRef = useRef(null)
    const Gotodetailaccount = (id) => {
        navigate(`/DetailBalancSheet/${id}`);
    }
    const [getvalues, setGetvalues] = useState('')
    const [heading, setHeading] = useState([]);
    const [netTotal, setNetTotal] = useState([])
    const [netTotalLiabilities, setNetTotalLiabilities] = useState([])
    const [balancesheetandloss, setBalancesheetandloss] = useState([])
    const [defaultValue, setDefaultValue] = useState("")
    const [defaultValue1, setDefaultValue1] = useState("")
    const [loading, setLoading] = useState(false);
    const [id, setid] = useState([])
    const classes = useStyles();
    const OnloadBalancesheet = () => {
        axios.get('/accounting/api/balance-sheet/reports').then((data) => {
            console.log("databalancesheet=",{...data?.data})
            setHeading({ ...data?.data })
            setNetTotal([...data?.data?.sumAsset])
            setid([...data?.data?.Ownersequity][0].bs_id)
            setNetTotalLiabilities([...data?.data?.sumliabilitiesAndOwnerequity])
            if ([...data?.data?.sumBalanceSheet][0].balances == null) {
                setBalancesheetandloss(0)
            } else {
                setBalancesheetandloss([...data?.data?.sumBalanceSheet][0].balances)
            }
            setLoading(true)
        }).catch((err) => {
            console.log(err)
        })
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
    const Reset = () => {
        OnloadBalancesheet()
    }
    const OnRunReport = () => {
        setBalancesheetandloss('')
        if (getvalues == 'custom') {
            let data = {
                start: defaultValue,
                end: defaultValue1
            }
            axios.post('/accounting/api/balance-sheet/report/allreports', data).then((data) => {
                console.log("datasearch=",{...data?.data})
                setHeading({ ...data?.data })
                setid([...data?.data?.Ownersequity][0].bs_id)
                setNetTotal([...data?.data?.sumAsset])
                setNetTotalLiabilities([...data?.data?.sumliabilitiesAndOwnerequity])
                if ([...data?.data?.sumBalanceSheet][0].balances == null) {
                    setBalancesheetandloss(0)
                } else {
                    setBalancesheetandloss([...data?.data?.sumBalanceSheet][0].balances)
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    useEffect(() => {
        OnloadBalancesheet();
        _searchbydate();
        _searchstartdate();
    }, [])
    return (
        <>
            <div>
                <h2>Balance Sheet</h2>
                <ChevronLeftIcon style={{ color: "#3f51b5", cursor: "pointer" }} />
                <span style={{ color: "#3f51b5", cursor: "pointer" }}
                >Back to report list</span><br />
            </div>
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
                <Button variant="contained" color="primary" style={{
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
                <Button variant="contained" color="primary" style={{
                    border: "none",
                    height: 30,
                    borderRadius: 2,
                    paddingLeft: 10,
                    paddingRight: 10,
                    color: "white",
                    alignItems: "center",
                    marginLeft: 10,
                }}
                    onClick={() => { Reset() }}
                >
                    Reset
                </Button>
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
            <div style={{ height: 30 }}>
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
                                        heading?.result && heading?.result.map((data, index) => {
                                            return (
                                                <>
                                                    <GLRowComponent
                                                        key={index}           
                                                        id={data?.bs_id}
                                                        name={data?.bs_name}
                                                        subject={heading?.subject}
                                                        Totalsubject={heading?.subjecttotal}
                                                        childrenFirst={heading?.childrenFirst}
                                                        childrenSecond={heading?.childrenSecond}
                                                        TotaldrenFirstFloor={heading?.firsttotal}
                                                        TotaldrenSecondFloor={heading?.secondtotal}
                                                        TotalSumAsset={netTotal}
                                                        Gotodetailaccount={Gotodetailaccount}
                                                    />
                                                </>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                            <div style={{ border: '1px solid black' }}></div>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableBody>
                                    {
                                        heading.headingLibilities && heading.headingLibilities.map((data, index) => {
                                            return (
                                                <>
                                                    <GLRowComponent2
                                                        key={index}
                                                        id={data?.bs_id}
                                                        name={data?.bs_name}
                                                        id_Owner={id}
                                                        subject={heading?.subject}
                                                        Totalsubject={heading?.subjecttotal}
                                                        childrenFirst={heading?.childrenFirst}
                                                        childrenSecond={heading?.childrenSecond}
                                                        TotaldrenFirstFloor={heading?.firsttotal}
                                                        netTotalLiabilities={netTotalLiabilities}
                                                        balancesheetandloss={balancesheetandloss}
                                                        Gotodetailaccount={Gotodetailaccount}
                                                    />
                                                </>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                ) : (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Spinner animation="border" variant="primary" style={{ width: 100, height: 100, marginTop: 100 }} />
                        </div>
                    </>
                )
            }

        </>
    );
}
function GLRowComponent({ name, id, subject, index, Totalsubject, TotalSumAsset, childrenFirst, TotaldrenFirstFloor, childrenSecond, Gotodetailaccount }) {
    let SumAsset = 0;
    const [open, setOpen] = useState(true);
    const total = TotalSumAsset.filter((el) => el.bs_status == 1);
    if (total.length === 0) {
        SumAsset = 0
    } else {
        SumAsset = total[0].balances
    }
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <TableRow key={index}>
                <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ cursor: 'pointer' }}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                    {name}
                </TableCell>
                {open ? (<>
                    <TableCell align="right"></TableCell>
                </>) : (<>
                    <TableCell align="right">{getFormatNumber(SumAsset)}₭</TableCell>
                </>)}
            </TableRow>
            {open ? (
                <>
                    < Componentchild
                        id={id}
                        size={25}
                        subject={subject}
                        childrenFirst={childrenFirst}
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        Totalsubject={Totalsubject}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    <TableRow>
                        <TableCell component="th" scope="row"  >
                            Total {name}
                        </TableCell>
                        <TableCell align="right">{getFormatNumber(SumAsset)}₭</TableCell>
                    </TableRow>
                </>
            ) : null
            }
        </>
    )
}
function GLRowComponent2({ name, id, subject, childrenFirst, childrenSecond, netTotalLiabilities, TotaldrenFirstFloor, id_Owner, Totalsubject, balancesheetandloss, Gotodetailaccount }) {
    let totalliabTotal;
    const [open, setOpen] = useState(true);
    const total = netTotalLiabilities.filter((el) => el.bs_status == 2);

    if (total.length === 0) {
        totalliabTotal = 0
    } else {
        totalliabTotal = total[0].balance
    }
    let sumTotal = parseFloat(totalliabTotal) + parseFloat(balancesheetandloss)
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ cursor: 'pointer' }}>{open ? <ExpandLess /> : <ExpandMore />}
                    {name}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right"></TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(sumTotal)}₭</TableCell>
                    </>)
                }
            </TableRow>
            {open ? (
                <>
                    < Componentchild2
                        id={id}
                        size={30}
                        subject={subject}
                        id_Owner={id_Owner}
                        childrenFirst={childrenFirst}
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        Totalsubject={Totalsubject}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    <ComponentOwner
                        childrenFirst={childrenFirst}
                        childrenSecond={childrenSecond}
                        id_Owner={id_Owner}
                        Totalsubject={Totalsubject}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        id={id}
                        size={30}
                        balancesheetandloss={balancesheetandloss}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    <TableRow>
                        <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                            Total {name}
                        </TableCell>
                        <TableCell align="right" >{getFormatNumber(parseFloat(sumTotal))}₭</TableCell>
                    </TableRow>
                </>
            ) : (
                <></>
            )}
        </>
    )
}
function ComponentOwner({ childrenFirst, childrenSecond, id_Owner, Totalsubject, TotaldrenFirstFloor, id, size, balancesheetandloss, Gotodetailaccount }) {
    const [open, setOpen] = useState(true);
    let totalliabTotal;
    const handleClick = () => {
        setOpen(!open);
    };
    const filter = Totalsubject.filter((el) => el.bs_id == id_Owner);
    if (filter.length === 0) {
        totalliabTotal = 0
    } else {
        totalliabTotal = filter[0].amout
    }

    return (<>
        <TableRow>
            <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ paddingLeft: size, cursor: "pointer" }} >{open ? <ExpandLess /> : <ExpandMore />}
                Shareholders equity:
            </TableCell>
            {
                open ? (<>
                    <TableCell align="right"></TableCell>
                </>) : (<>
                    <TableCell align="right" style={{ fontWeight: 'bold' }}>{getFormatNumber(parseFloat(totalliabTotal) + parseFloat(balancesheetandloss))} ₭ </TableCell>
                </>)
            }
        </TableRow>
        {
            open ? (<>
                <TableRow>
                    <TableCell component="th" style={{ paddingLeft: 65 }} >
                        Net Income
                    </TableCell>
                    <TableCell align="right" style={{cursor:'pointer',color:'red'}}>{getFormatNumber(balancesheetandloss)}₭</TableCell>
                </TableRow>
                <ComponetOwner
                    childrenFirst={childrenFirst}
                    childrenSecond={childrenSecond}
                    id_Owner={id_Owner}
                    Totalsubject={Totalsubject}
                    TotaldrenFirstFloor={TotaldrenFirstFloor}
                    id={id}
                    Gotodetailaccount={Gotodetailaccount}
                />
                <TableRow>
                    <TableCell component="th" scope="row" style={{ paddingLeft: size, cursor: "pointer", fontWeight: 'bold' }}>
                        Total: Shareholders equity
                    </TableCell>
                    <TableCell align="right" >{getFormatNumber(parseFloat(totalliabTotal) + parseFloat(balancesheetandloss))}₭</TableCell>
                </TableRow>
            </>) : null
        }
    </>)
}
function ComponetOwner({ childrenFirst, id_Owner, childrenSecond, TotaldrenFirstFloor, Gotodetailaccount }) {
    if (childrenFirst === null) return <></>
    const filter = childrenFirst.filter((el) => el.bs_id == id_Owner);
    if (filter.length === 0) return <></>;
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            <ComponetOwnerFirstChild
                                key={index}
                                data={data}
                                id={data?.c_id}
                                childrenSecond={childrenSecond}
                                TotaldrenFirstFloor={TotaldrenFirstFloor}
                                Gotodetailaccount={Gotodetailaccount}
                            />
                        </>
                    )
                })
            }
            <TableRow>
                <TableCell component="th" style={{ paddingLeft: 65 }} >
                    Retained Earnings
                </TableCell>
                <TableCell align="right">0</TableCell>
            </TableRow>

        </>
    )
}
function ComponetOwnerFirstChild({ data, id, childrenSecond, TotaldrenFirstFloor, Gotodetailaccount }) {
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
            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 65, cursor: "pointer" }} >
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }
                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)}₭</TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭</TableCell>
                    </>)
                }
            </TableRow>
            {open ? (
                <>
                    < ComponetOwnerSecondChild
                        id={id}
                        childrenSecond={childrenSecond}
                        setCheckvalues={setCheckvalues}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 65, fontWeight: "bold" }} >
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
function ComponetOwnerSecondChild({ id, childrenSecond, TotaldrenFirstFloor, setCheckvalues, Gotodetailaccount }) {
    if (childrenSecond === null) return <></>
    const filter = childrenSecond.filter((el) => el.parents == id);
    if (filter.length === 0) return <></>;

    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (<>
        {
            filter && filter.map((data, index) => {
                return (<>
                    <TableCellComponentOwner
                        key={index}
                        data={data}
                        id={data?.c_id}
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                </>)
            })
        }
    </>)
}
function TableCellComponentOwner({ data, childrenSecond, id, TotaldrenFirstFloor, Gotodetailaccount }) {

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
            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 80, cursor: "pointer" }} >
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)} ₭ </TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭</TableCell>
                    </>)
                }

            </TableRow>
            {
                open ? (<>
                    <TableCellComponentOwner1
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        id={id}
                        setCheckvalues={setCheckvalues}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<>
                        </>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 80, fontWeight: "bold" }} >
                                    Total: {data?.name_eng}
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
function TableCellComponentOwner1({ childrenSecond, id, TotaldrenFirstFloor, setCheckvalues, Gotodetailaccount }) {
    if (childrenSecond === null) return <></>
    const filter = childrenSecond.filter((el) => el.parents == id);
    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (<>
        {
            filter && filter.map((data, index) => {
                return (<>
                    <TableCellComponentOwner2
                        key={index}
                        data={data}
                        id={data?.c_id}
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                </>)
            })
        }
    </>)
}
function TableCellComponentOwner2({ data, childrenSecond, id, TotaldrenFirstFloor, Gotodetailaccount }) {
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
            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 90, cursor: "pointer" }} >
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)} ₭ </TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭</TableCell>
                    </>)
                }
            </TableRow>
            {
                open ? (<>
                    <TableCellComponentOwner3
                        setCheckvalues={setCheckvalues}
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        id={id}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 90, fontWeight: "bold" }} >
                                    Total: {data?.name_eng}
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
function TableCellComponentOwner3({ childrenSecond, id, TotaldrenFirstFloor, setCheckvalues, Gotodetailaccount }) {
    if (childrenSecond === null) return <></>
    const filter = childrenSecond.filter((el) => el.parents == id);
    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (<>
        {
            filter && filter.map((data, index) => {
                return (<>
                    <TableCellComponentOwner4
                        key={index}
                        data={data}
                        id={data?.c_id}
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                </>)
            })
        }
    </>)
}
function TableCellComponentOwner4({ data, childrenSecond, id, TotaldrenFirstFloor, Gotodetailaccount }) {
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
            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 100, cursor: "pointer" }} >

                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)} ₭ </TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭</TableCell>
                    </>)
                }
            </TableRow>
            {
                open ? (<>
                    <TableCellComponentOwner5
                        setCheckvalues={setCheckvalues}
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        id={id}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 100, fontWeight: "bold" }} >
                                    Total: {data?.name_eng}
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
function TableCellComponentOwner5({ childrenSecond, id, TotaldrenFirstFloor, setCheckvalues, Gotodetailaccount }) {
    if (childrenSecond === null) return <></>
    const filter = childrenSecond.filter((el) => el.parents == id);
    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (<>
        {
            filter && filter.map((data, index) => {
                return (<>
                    <TableCellComponentOwner6
                        key={index}
                        data={data}
                        id={data?.c_id}
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                </>)
            })
        }
    </>)
}
function TableCellComponentOwner6({ data, childrenSecond, id, TotaldrenFirstFloor, Gotodetailaccount }) {
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
            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 110, cursor: "pointer" }} >

                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)} ₭ </TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭</TableCell>
                    </>)
                }
            </TableRow>
            {
                open ? (<>
                    <TableCellComponentOwner7
                        setCheckvalues={setCheckvalues}
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        id={id}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 110, fontWeight: "bold" }} >
                                    Total: {data?.name_eng}
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
function TableCellComponentOwner7({ childrenSecond, id, TotaldrenFirstFloor, setCheckvalues, Gotodetailaccount }) {
    if (childrenSecond === null) return <></>
    const filter = childrenSecond.filter((el) => el.parents == id);
    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (<>
        {
            filter && filter.map((data, index) => {
                return (<>
                    <TableCellComponentOwner8
                        key={index}
                        data={data}
                        id={data?.c_id}
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                </>)
            })
        }
    </>)
}
function TableCellComponentOwner8({ data, childrenSecond, id, TotaldrenFirstFloor, Gotodetailaccount }) {
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
            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 120, cursor: "pointer" }} >

                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)} ₭ </TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭</TableCell>
                    </>)
                }
            </TableRow>
            {
                open ? (<>
                    <TableCellComponentOwner9
                        setCheckvalues={setCheckvalues}
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        id={id}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 120, fontWeight: "bold" }} >
                                    Total: {data?.name_eng}
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
function TableCellComponentOwner9({ childrenSecond, id, TotaldrenFirstFloor, setCheckvalues, Gotodetailaccount }) {
    if (childrenSecond === null) return <></>
    const filter = childrenSecond.filter((el) => el.parents == id);
    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (<>
        {
            filter && filter.map((data, index) => {
                return (<>
                    <TableCellComponentOwner10
                        key={index}
                        data={data}
                        id={data?.c_id}
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                </>)
            })
        }
    </>)
}
function TableCellComponentOwner10({ data, childrenSecond, id, TotaldrenFirstFloor, Gotodetailaccount }) {
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
            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 130, cursor: "pointer" }} >

                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)} ₭ </TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)} ₭ </TableCell>
                    </>)
                }
            </TableRow>
            {
                open ? (<>
                    <TableCellComponentOwner11
                        setCheckvalues={setCheckvalues}
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        id={id}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 130, fontWeight: "bold" }} >
                                    Total: {data?.name_eng}
                                </TableCell>
                                <TableCell align="right" >
                                    {getFormatNumber(filter[0].balances)} ₭
                                </TableCell>
                            </TableRow>
                        </>)
                    }

                </>) : null
            }


        </>
    )
}
function TableCellComponentOwner11({ childrenSecond, id, TotaldrenSecondFloor, setCheckvalues, Gotodetailaccount }) {
    if (childrenSecond === null) return <></>
    const filter = childrenSecond.filter((el) => el.parents == id);
    if (filter.length === 0) return <></>;
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    return (<>
        {
            filter && filter.map((data, index) => {
                return (<>
                    <TableCellComponentOwner12
                        key={index}
                        data={data}
                        id={data?.c_id}
                        childrenSecond={childrenSecond}
                        TotaldrenSecondFloor={TotaldrenSecondFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                </>)
            })
        }
    </>)
}
function TableCellComponentOwner12({ data, id, childrenSecond, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [open, setOpen] = useState(true);
    const [netTotal, setNetTotal] = useState(0)
    if (childrenSecond === null) return <></>
    const filter = childrenSecond.filter((el) => el.parents === id);
    if (filter.length === 0) return <></>;
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 140, cursor: "pointer" }} >

                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)} ₭ </TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)} ₭ </TableCell>
                    </>)
                }
            </TableRow>
            {
                open ? (<>

                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 140, fontWeight: "bold" }} >
                                    Total: {data?.name_eng}
                                </TableCell>
                                <TableCell align="right"  >
                                    {getFormatNumber(filter[0].balances)} ₭
                                </TableCell>
                            </TableRow>
                        </>)
                    }

                </>) : null
            }


        </>
    )
}
function Componentchild({ id, size, subject, Totalsubject, childrenFirst, childrenSecond, TotaldrenFirstFloor, Gotodetailaccount }) {
    const filter = subject.filter((el) => el.bs_status == id);
    if (filter.length === 0) return <></>;
    return (
        <>
            {
                filter && filter.map((item, index) => {
                    return (
                        <>
                            < Component
                                item={item}
                                size={size}
                                index={index}
                                id={item?.bs_id}
                                Totalsubject={Totalsubject}
                                childrenFirst={childrenFirst}
                                childrenSecond={childrenSecond}
                                TotaldrenFirstFloor={TotaldrenFirstFloor}
                                Gotodetailaccount={Gotodetailaccount}

                            />
                        </>
                    )
                })
            }
        </>
    )
}

function Componentchild2({ id, size, subject, childrenFirst, childrenSecond, Totalsubject, TotaldrenFirstFloor, Gotodetailaccount }) {
    const filter = subject.filter((el) => el.bs_status == id);
    if (filter.length === 0) return <></>;
    return (
        <>
            {
                filter.map((item, index) => {
                    return (
                        <>
                            < Component2
                                item={item}
                                size={size}
                                key={index}
                                id={item?.bs_id}
                                childrenFirst={childrenFirst}
                                childrenSecond={childrenSecond}
                                Totalsubject={Totalsubject}
                                TotaldrenFirstFloor={TotaldrenFirstFloor}
                                Gotodetailaccount={Gotodetailaccount}
                            />
                        </>
                    )
                })
            }
        </>
    )
}
function Component({ item, size, index, id, Totalsubject, childrenFirst, TotaldrenFirstFloor, childrenSecond, Gotodetailaccount }) {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const TotalFilter = Totalsubject.filter((el) => el.bs_id == id);
    return (
        <>
            <TableRow key={index}>
                <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ paddingLeft: size, cursor: "pointer" }} >{open ? <ExpandLess /> : <ExpandMore />}
                    {item?.bs_name}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right"></TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(TotalFilter[0].amout)}</TableCell>
                    </>)
                }
            </TableRow>

            {open ? (
                <>
                    <Componentsub
                        id={id}
                        childrenFirst={childrenFirst}
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        Totalsubject={Totalsubject}
                        subject_name={item?.bs_name}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                </>

            ) : null

            }
        </>
    )
}

function Componentsub({ id, childrenFirst, TotaldrenFirstFloor, childrenSecond, Totalsubject, subject_name, Gotodetailaccount }) {
  
    if (childrenFirst === null) return <></>
    const filter = childrenFirst.filter((el) => el.bs_id == id);


    const TotalFilter = Totalsubject.filter((el) => el.bs_id == id);

    if (filter.length === 0) return <></>;
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    
                    return (<>
                        <Componetfirst
                            data={data}
                            key={index}
                            id={data?.c_id}
                            childrenSecond={childrenSecond}
                            TotaldrenFirstFloor={TotaldrenFirstFloor}
                            Gotodetailaccount={Gotodetailaccount}
                        />
                    </>)
                })
            }
            <TableRow>
                <TableCell component="th" scope="row" style={{ paddingLeft: 25, fontWeight: "bold" }} >
                    Total: {subject_name}
                </TableCell>
                <TableCell align="right"> {getFormatNumber(TotalFilter[0].amout)}₭</TableCell>
            </TableRow>
        </>
    )
}
function Componetfirst({ data, id, childrenSecond, TotaldrenFirstFloor, Gotodetailaccount }) {
    


    const [checkvalues, setCheckvalues] = useState('')
    const [open, setOpen] = useState(true);
    const [netTotal, setNetTotal] = useState(0)
    if (TotaldrenFirstFloor === null) return <></>
    const filter = TotaldrenFirstFloor.filter((el) => el.id === data?.c_id);
    if (filter.length === 0) return <></>;
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 39, cursor: "pointer" }} >
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
            {
                open ? (<>
                    < Componetsecond
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        id={id}
                        setCheckvalues={setCheckvalues}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (
                            <>
                            </>) : (
                            <>
                                <TableRow>
                                    <TableCell component="th" scope="row" style={{ paddingLeft: 35, fontWeight: "bold" }} >
                                        Total:{data?.name_eng}
                                    </TableCell>
                                    <TableCell align="right">
                                        {getFormatNumber(filter[0].balances)} ₭
                                    </TableCell>

                                </TableRow>
                            </>)
                    }
                </>) : null
            }
        </>)
}
function Componetsecond({ childrenSecond, id, setCheckvalues, TotaldrenFirstFloor, Gotodetailaccount }) {
    if (childrenSecond === null) return <></>
    const filter = childrenSecond.filter((el) => el.parents == id);
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    if (filter.length === 0) return <></>;
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            < TableCellComponent
                                data={data}
                                id={data?.c_id}
                                key={index}
                                childrenSecond={childrenSecond}
                                TotaldrenFirstFloor={TotaldrenFirstFloor}
                                Gotodetailaccount={Gotodetailaccount}

                            />
                        </>
                    )
                })
            }
        </>
    )
}
function TableCellComponent({ data, childrenSecond, id, TotaldrenFirstFloor, Gotodetailaccount }) {
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

            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    if (TotaldrenFirstFloor === null) return <></>
    const filter = TotaldrenFirstFloor.filter((el) => el.id === id);


    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 50, cursor: "pointer" }} >
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }
                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)}₭</TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭ </TableCell>
                    </>)
                }
            </TableRow>
            {
                open ? (<>
                    <TableCellComponent1
                        childrenSecond={childrenSecond}
                        id={data?.c_id}
                        setCheckvalues={setCheckvalues}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        Gotodetailaccount={Gotodetailaccount}

                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 50, fontWeight: "bold" }} >
                                    Total:  {data?.name_eng}
                                </TableCell>
                                <TableCell align="right">
                                    {getFormatNumber(filter[0].balances)} ₭
                                </TableCell>
                            </TableRow>
                        </>)
                    }
                </>) : null
            }
        </>
    )
}
function TableCellComponent1({ id, childrenSecond, setCheckvalues, TotaldrenFirstFloor, Gotodetailaccount }) {


    const filter = childrenSecond.filter((el) => el.parents == id);

    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    if (filter.length === 0) return <></>;
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            < TableCellComponent2
                                key={index}
                                data={data}
                                id={data?.c_id}
                                childrenSecond={childrenSecond}
                                TotaldrenFirstFloor={TotaldrenFirstFloor}
                                Gotodetailaccount={Gotodetailaccount}
                            />
                        </>
                    )
                })
            }
        </>
    )
}
function TableCellComponent2({ id, childrenSecond, data, TotaldrenFirstFloor, Gotodetailaccount }) {
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
            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    const filter = TotaldrenFirstFloor.filter((el) => el.id === id);
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row"
                    onClick={() => { handleClick(); OnSumTotal(data?.c_id) }}
                    style={{
                        paddingLeft: 70, cursor: "pointer"
                    }} >
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }
                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)}₭</TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭</TableCell>
                    </>)
                }

            </TableRow>
            {
                open ? (<>
                    < TableCellComponent3
                        id={id}
                        childrenSecond={childrenSecond}
                        setCheckvalues={setCheckvalues}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 70, fontWeight: "bold" }} >
                                    Total:  {data?.name_eng}
                                </TableCell>
                                <TableCell align="right" >
                                    {getFormatNumber(filter[0].balances)} ₭
                                </TableCell>
                            </TableRow>

                        </>)
                    }
                </>) : null
            }
        </>
    )
}
function TableCellComponent3({ id, childrenSecond, setCheckvalues, TotaldrenFirstFloor, Gotodetailaccount }) {
    const filter = childrenSecond.filter((el) => el.parents == id);

    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    if (filter.length === 0) return <></>;
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            <TableCellComponent4
                                key={index}
                                data={data}
                                id={data?.c_id}
                                childrenSecond={childrenSecond}
                                TotaldrenFirstFloor={TotaldrenFirstFloor}
                                Gotodetailaccount={Gotodetailaccount}
                            />
                        </>
                    )
                })
            }
        </>
    )
}
function TableCellComponent4({ data, childrenSecond, id, TotaldrenFirstFloor, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [open, setOpen] = useState(true);
    const [netTotal, setNetTotal] = useState(0)
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    const filter = TotaldrenFirstFloor.filter((el) => el.id == id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 80, cursor: "pointer" }} >
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }
                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)}₭</TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭</TableCell>
                    </>)
                }

            </TableRow>
            {
                open ? (<>
                    <TableCellComponent5
                        id={data?.c_id}
                        childrenSecond={childrenSecond}
                        setCheckvalues={setCheckvalues}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 80, fontWeight: "bold" }} >
                                    Total:  {data?.name_eng}
                                </TableCell>
                                <TableCell align="right">
                                    {getFormatNumber(filter[0].balances)} ₭
                                </TableCell>
                            </TableRow>

                        </>)
                    }
                </>) : null
            }
        </>
    )
}
function TableCellComponent5({ id, childrenSecond, setCheckvalues, TotaldrenFirstFloor, Gotodetailaccount }) {
    const filter = childrenSecond.filter((el) => el.parents == id);
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    if (filter.length === 0) return <></>;
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            <TableCellComponent6
                                data={data}
                                key={index}
                                childrenSecond={childrenSecond}
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
function TableCellComponent6({ data, childrenSecond, TotaldrenFirstFloor, id, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [open, setOpen] = useState(true);
    const [netTotal, setNetTotal] = useState(0)
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    const filter = TotaldrenFirstFloor.filter((el) => el.id == id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 90, cursor: "pointer" }} >
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }
                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)}₭</TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭</TableCell>
                    </>)
                }
            </TableRow>
            {
                open ? (<>
                    <TableCellComponent7
                        id={data?.c_id}
                        childrenSecond={childrenSecond}
                        setCheckvalues={setCheckvalues}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 90, fontWeight: "bold" }} >
                                    Total:  {data?.name_eng}
                                </TableCell>
                                <TableCell align="right" >
                                    {getFormatNumber(filter[0].balances)} ₭
                                </TableCell>
                            </TableRow>

                        </>)
                    }
                </>) : null
            }
        </>
    )
}
function TableCellComponent7({ id, childrenSecond, setCheckvalues, TotaldrenFirstFloor, Gotodetailaccount }) {
    const filter = childrenSecond.filter((el) => el.parents == id);
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    if (filter.length === 0) return <></>;
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            < TableCellComponent8
                                key={index}
                                data={data}
                                childrenSecond={childrenSecond}
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
function TableCellComponent8({ data, childrenSecond, TotaldrenFirstFloor, id, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [open, setOpen] = useState(true);
    const [netTotal, setNetTotal] = useState(0)
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    const filter = TotaldrenFirstFloor.filter((el) => el.id == id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 110, cursor: "pointer" }} >
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }
                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)}₭</TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭</TableCell>
                    </>)
                }
            </TableRow>
            {
                open ? (<>
                    <TableCellComponent9
                        id={data?.c_id}
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        setCheckvalues={setCheckvalues}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 110, fontWeight: "bold" }} >
                                    Total:  {data?.name_eng}
                                </TableCell>
                                <TableCell align="right">
                                    {getFormatNumber(filter[0].balances)} ₭
                                </TableCell>
                            </TableRow>

                        </>)
                    }
                </>) : null
            }
        </>
    )
}
function TableCellComponent9({ id, childrenSecond, setCheckvalues, TotaldrenFirstFloor, Gotodetailaccount }) {
    const filter = childrenSecond.filter((el) => el.parents == id);
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    if (filter.length === 0) return <></>;
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (
                        <>
                            <TableCellComponent10
                                data={data}
                                key={index}
                                id={data?.c_id}
                                childrenSecond={childrenSecond}
                                TotaldrenFirstFloor={TotaldrenFirstFloor}
                                Gotodetailaccount={Gotodetailaccount}
                            />
                        </>
                    )
                })
            }
        </>
    )
}
function TableCellComponent10({ data, childrenSecond, TotaldrenFirstFloor, id, Gotodetailaccount }) {
    const [checkvalues, setCheckvalues] = useState(0)
    const [open, setOpen] = useState(true);
    const [netTotal, setNetTotal] = useState(0)
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    const filter = TotaldrenFirstFloor.filter((el) => el.id == id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 105, cursor: "pointer" }} >
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }
                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)}₭</TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭</TableCell>
                    </>)
                }
            </TableRow>

            {
                open ? (<>
                    <TableCellComponent11
                        id={data?.c_id}
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        setCheckvalues={setCheckvalues}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 110, fontWeight: "bold" }} >
                                    Total:  {data?.name_eng}
                                </TableCell>
                                <TableCell align="right" >
                                    {getFormatNumber(filter[0].balances)} ₭
                                </TableCell>
                            </TableRow>

                        </>)
                    }
                </>) : null
            }

        </>
    )
}
function TableCellComponent11({ id, childrenSecond, TotaldrenFirstFloor, setCheckvalues, Gotodetailaccount }) {
    const filter = childrenSecond.filter((el) => el.parents == id);
    if (filter.length === 0) {
        setCheckvalues(0)
    } else {
        setCheckvalues('')
    }
    if (filter.length === 0) return <></>;
    return (
        <>
            {
                filter && filter.map((data, index) => {
                    return (<>

                        <TableCellComponent12
                            data={data}
                            key={index}
                            id={data?.c_id}
                            TotaldrenFirstFloor={TotaldrenFirstFloor}
                            Gotodetailaccount={Gotodetailaccount}

                        />
                    </>)
                })
            }
        </>
    )
}
function TableCellComponent12({ data }) {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ paddingLeft: 115, cursor: "pointer" }} >{open ? <ExpandLess /> : <ExpandMore />}
                    {data?.name_eng}
                </TableCell>
                <TableCell align="right">{getFormatNumber(data?.balances)}₭</TableCell>
            </TableRow>
        </>
    )
}
function Component2({ item, size, id, childrenFirst, childrenSecond, Totalsubject, TotaldrenFirstFloor, Gotodetailaccount }) {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };

    const filter = Totalsubject.filter((el) => el.bs_id == id);

    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ paddingLeft: size, cursor: "pointer" }} >{open ? <ExpandLess /> : <ExpandMore />}
                    {item?.bs_name}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right"></TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(filter[0].amout)}</TableCell>
                    </>)
                }
            </TableRow>

            {open ? (
                <>
                    <ComponetfirstLiability
                        id={id}
                        childrenFirst={childrenFirst}
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />

                    <TableRow>
                        <TableCell component="th" scope="row" style={{ paddingLeft: size, fontWeight: "bold" }} >
                            Total:{item?.bs_name}
                        </TableCell>
                        <TableCell align="right"> {getFormatNumber(filter[0].amout)}₭</TableCell>
                    </TableRow>
                </>

            ) : null

            }


        </>
    )


}
function ComponetfirstLiability({ id, childrenFirst, childrenSecond, TotaldrenFirstFloor, Gotodetailaccount }) {


    if (childrenFirst === null) return <></>
    const filter = childrenFirst.filter((el) => el.bs_status == id);
    if (filter.length === 0) return <></>;
    return (<>
        {
            filter && filter.map((data, index) => {
                return (<>
                    <TableCellComponentFirstLiability
                        key={index}
                        data={data}
                        id={data?.c_id}
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        Gotodetailaccount={Gotodetailaccount}

                    />


                </>)
            })
        }
    </>)
}
function TableCellComponentFirstLiability({ data, childrenSecond, TotaldrenFirstFloor, id, Gotodetailaccount }) {
    const [open, setOpen] = useState(true);
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }

    const filter = TotaldrenFirstFloor.filter((el) => el.id == id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 45, cursor: "pointer" }} >
                    {
                        checkvalues === 0 ? (<>

                        </>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }
                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)}₭</TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭</TableCell>
                    </>)
                }

            </TableRow>
            {
                open ? (<>
                    < ComponetSecondLiability
                        id={data?.c_id}
                        childrenSecond={childrenSecond}
                        setCheckvalues={setCheckvalues}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<>
                        </>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 45, fontWeight: "bold" }} >
                                    Total:{data?.name_eng}
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
function ComponetSecondLiability({ id, childrenSecond, setCheckvalues, TotaldrenFirstFloor, Gotodetailaccount }) {
    if (childrenSecond === null) return <></>
    const filter = childrenSecond.filter((el) => el.parents == id);
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
                        <TableCellComponentLiability
                            key={index}
                            data={data}
                            id={data?.c_id}
                            childrenSecond={childrenSecond}
                            TotaldrenFirstFloor={TotaldrenFirstFloor}
                            Gotodetailaccount={Gotodetailaccount}
                        />
                    )
                })
            }
        </>
    )
}
function TableCellComponentLiability({ data, childrenSecond, id, TotaldrenFirstFloor, Gotodetailaccount }) {
    const [open, setOpen] = useState(true);
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }

        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }

    const filter = TotaldrenFirstFloor.filter((el) => el.id == id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 60, cursor: "pointer" }} >
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }
                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)}₭</TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭</TableCell>
                    </>)
                }
            </TableRow>
            {
                open ? (<>
                    <TableCellComponentLiability1
                        childrenSecond={childrenSecond}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        setCheckvalues={setCheckvalues}
                        id={id}
                        Gotodetailaccount={Gotodetailaccount}

                    />
                    {
                        checkvalues === 0 ? (<>

                        </>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 60, fontWeight: "bold" }} >
                                    Total:{data?.name_eng}
                                </TableCell>
                                <TableCell align="right" >
                                    {getFormatNumber(filter[0].balances)} ₭
                                </TableCell>
                            </TableRow>
                        </>)
                    }

                </>) : null
            }


        </>
    )


}
function TableCellComponentLiability1({ childrenSecond, id, TotaldrenFirstFloor, setCheckvalues, Gotodetailaccount }) {
    if (childrenSecond === null) return <></>
    const filter = childrenSecond.filter((el) => el.parents == id);
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

                    return (<>
                        <TableCellComponentLiability2
                            data={data}
                            index={index}
                            id={data?.c_id}
                            childrenSecond={childrenSecond}
                            TotaldrenFirstFloor={TotaldrenFirstFloor}
                            Gotodetailaccount={Gotodetailaccount}
                        />
                    </>)
                })
            }
        </>
    )
}
function TableCellComponentLiability2({ data, childrenSecond, id, TotaldrenFirstFloor, Gotodetailaccount }) {
    const [open, setOpen] = useState(true);
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }

        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    const filter = TotaldrenFirstFloor.filter((el) => el.id == id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 70, cursor: "pointer" }} >
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }
                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)}₭</TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭</TableCell>
                    </>)
                }
            </TableRow>
            {
                open ? (<>
                    <TableCellComponentLiability3
                        childrenSecond={childrenSecond}
                        id={id}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        setCheckvalues={setCheckvalues}
                        Gotodetailaccount={Gotodetailaccount}
                    />

                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 70, fontWeight: "bold" }} >
                                    Total:{data?.name_eng}
                                </TableCell>
                                <TableCell align="right"  >
                                    {getFormatNumber(filter[0].balances)} ₭
                                </TableCell>
                            </TableRow>
                        </>)
                    }

                </>) : null
            }

        </>
    )
}
function TableCellComponentLiability3({ childrenSecond, id, TotaldrenFirstFloor, setCheckvalues, Gotodetailaccount }) {
    if (childrenSecond === null) return <></>
    const filter = childrenSecond.filter((el) => el.parents == id);
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
                    return (<>
                        < TableCellComponentLiability4
                            data={data}
                            key={index}
                            TotaldrenFirstFloor={TotaldrenFirstFloor}
                            childrenSecond={childrenSecond}
                            id={data?.c_id}
                            Gotodetailaccount={Gotodetailaccount}

                        />
                    </>)
                })
            }
        </>
    )
}
function TableCellComponentLiability4({ data, childrenSecond, id, TotaldrenFirstFloor, Gotodetailaccount }) {
    const [open, setOpen] = useState(true);
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }

        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {


            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    const filter = TotaldrenFirstFloor.filter((el) => el.id == id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 75, cursor: "pointer" }} >
                    {
                        checkvalues === 0 ? (<>
                        </>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)}₭</TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭ </TableCell>
                    </>)
                }
            </TableRow>

            {
                open ? (<>
                    < TableCellComponentLiability5
                        childrenSecond={childrenSecond}
                        id={id}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        setCheckvalues={setCheckvalues}
                        Gotodetailaccount={Gotodetailaccount}


                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 70, fontWeight: "bold" }} >
                                    Total:{data?.name_eng}
                                </TableCell>
                                <TableCell align="right"  >
                                    {getFormatNumber(filter[0].balances)} ₭
                                </TableCell>
                            </TableRow>
                        </>)
                    }

                </>) : null
            }

        </>
    )
}
function TableCellComponentLiability5({ childrenSecond, id, TotaldrenFirstFloor, setCheckvalues, Gotodetailaccount }) {
    if (childrenSecond === null) return <></>
    const filter = childrenSecond.filter((el) => el.parents == id);
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
                            <TableCellComponentLiability6
                                data={data}
                                key={index}
                                childrenSecond={childrenSecond}
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
function TableCellComponentLiability6({ data, childrenSecond, id, TotaldrenFirstFloor, Gotodetailaccount }) {
    const [open, setOpen] = useState(true);
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }
        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {
            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    const filter = TotaldrenFirstFloor.filter((el) => el.id == id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 75, cursor: "pointer" }} >
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)}₭</TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭ </TableCell>
                    </>)
                }
            </TableRow>

            {
                open ? (<>
                    <TableCellComponentLiability7
                        childrenSecond={childrenSecond}
                        id={id}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        setCheckvalues={setCheckvalues}
                        Gotodetailaccount={Gotodetailaccount}
                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 70, fontWeight: "bold" }} >
                                    Total:{data?.name_eng}
                                </TableCell>
                                <TableCell align="right"  >
                                    {getFormatNumber(filter[0].balances)} ₭
                                </TableCell>
                            </TableRow></>)
                    }

                </>) : null
            }


        </>
    )
}
function TableCellComponentLiability7({ childrenSecond, id, TotaldrenFirstFloor, setCheckvalues, Gotodetailaccount }) {
    if (childrenSecond === null) return <></>
    const filter = childrenSecond.filter((el) => el.parents == id);
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
                            <TableCellComponentLiability8
                                data={data}
                                key={index}
                                childrenSecond={childrenSecond}
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
function TableCellComponentLiability8({ data, childrenSecond, id, TotaldrenFirstFloor, Gotodetailaccount }) {
    const [open, setOpen] = useState(true);
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }

        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {


            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    const filter = TotaldrenFirstFloor.filter((el) => el.id == id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 75, cursor: "pointer" }} >
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)}₭</TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭ </TableCell>
                    </>)
                }
            </TableRow>


            {
                open ? (<>
                    <TableCellComponentLiability9
                        childrenSecond={childrenSecond}
                        id={id}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        setCheckvalues={setCheckvalues}
                        Gotodetailaccount={Gotodetailaccount}

                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 70, fontWeight: "bold" }} >
                                    Total:{data?.name_eng}
                                </TableCell>
                                <TableCell align="right"  >
                                    {getFormatNumber(filter[0].balances)} ₭
                                </TableCell>
                            </TableRow>

                        </>)
                    }
                </>) : null
            }


        </>
    )
}
function TableCellComponentLiability9({ childrenSecond, id, TotaldrenFirstFloor, setCheckvalues, Gotodetailaccount }) {
    if (childrenSecond === null) return <></>
    const filter = childrenSecond.filter((el) => el.parents == id);
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
                            <TableCellComponentLiability10
                                data={data}
                                key={index}
                                childrenSecond={childrenSecond}
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
function TableCellComponentLiability10({ data, childrenSecond, id, TotaldrenFirstFloor, Gotodetailaccount }) {
    const [open, setOpen] = useState(true);
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }

        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {


            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    const filter = TotaldrenFirstFloor.filter((el) => el.id == id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 75, cursor: "pointer" }} >
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>)
                    }

                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)}₭</TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭ </TableCell>
                    </>)
                }
            </TableRow>

            {
                open ? (<>
                    <TableCellComponentLiability11
                        childrenSecond={childrenSecond}
                        id={id}
                        TotaldrenFirstFloor={TotaldrenFirstFloor}
                        setCheckvalues={setCheckvalues}
                        Gotodetailaccount={Gotodetailaccount}

                    />
                    {
                        checkvalues === 0 ? (<></>) : (<>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ paddingLeft: 70, fontWeight: "bold" }} >
                                    Total:{data?.name_eng}
                                </TableCell>
                                <TableCell align="right" >
                                    {getFormatNumber(filter[0].balances)} ₭
                                </TableCell>
                            </TableRow>

                        </>)
                    }
                </>) : null
            }


        </>
    )
}
function TableCellComponentLiability11({ childrenSecond, id, TotaldrenFirstFloor, setCheckvalues, Gotodetailaccount }) {
    if (childrenSecond === null) return <></>
    const filter = childrenSecond.filter((el) => el.parents == id);
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
                            <TableCellComponentLiability12
                                data={data}
                                key={index}
                                childrenSecond={childrenSecond}
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
function TableCellComponentLiability12({ data, childrenSecond, id, TotaldrenFirstFloor, Gotodetailaccount }) {
    const [open, setOpen] = useState(true);
    const [checkvalues, setCheckvalues] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const handleClick = () => {
        setOpen(!open);
    };
    const OnSumTotal = (e) => {
        let data = {
            c_id: e
        }

        axios.post("/accounting/api/balance-sheet/sumtotal", data).then((data) => {


            setNetTotal(data?.data?.data?.balances)
        }).catch((err) => {
            console.log(err)
        })
    }
    const filter = TotaldrenFirstFloor.filter((el) => el.id == id);
    if (filter.length === 0) return <></>;
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick(); OnSumTotal(data?.c_id) }} style={{ paddingLeft: 75, cursor: "pointer" }} >
                    {
                        checkvalues === 0 ? (<>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </>) : (<></>)
                    }

                    {data?.name_eng}
                </TableCell>
                {
                    open ? (<>
                        <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => { Gotodetailaccount(data?.c_uid) }}>{getFormatNumber(data?.balances)}₭</TableCell>
                    </>) : (<>
                        <TableCell align="right">{getFormatNumber(netTotal)}₭ </TableCell>
                    </>)
                }
            </TableRow>
            <TableCellComponentLiability11
                childrenSecond={childrenSecond}
                id={id}
                TotaldrenFirstFloor={TotaldrenFirstFloor}
                setCheckvalues={setCheckvalues}
            />
            {
                checkvalues === 0 ? (<></>) : (<>
                    <TableRow>
                        <TableCell component="th" scope="row" style={{ paddingLeft: 70, fontWeight: "bold" }} >
                            Total:{data?.name_eng}
                        </TableCell>
                        <TableCell align="right"  >
                            {getFormatNumber(filter[0].balances)} ₭
                        </TableCell>
                    </TableRow>
                </>)
            }

        </>
    )
}





