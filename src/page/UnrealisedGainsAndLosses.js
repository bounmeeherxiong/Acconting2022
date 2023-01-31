import React, { useState, useContext, useEffect } from "react";
import { LoginContext } from "../page/contexts/LoginContext";
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
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import { getFormatNumber } from "../constants/functions"
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { Button } from "@material-ui/core";
import { Modal, Spinner } from "react-bootstrap";

import moment from 'moment';
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

export default function UnrealisedGainsAndLosses() {
    const {
        listgandl, listgain, OnloadgainAndLoss,
        OnLoadgainandlossTransaction,
    } = useContext(LoginContext);
    console.log("listgain=",listgain)
    const [show, setShow] = useState(false);
    const [defaultValue, setDefaultValue] = useState("")
    const [exchange, setExchange] = useState([])
    const [bank_id, setBank_id] = useState("")
    const [errdate, setErrdate] = useState(false)
    const [errbank, setErrbank] = useState(false)
    const [isLoading, setIsLoading,] = useState(false);
    const [autosave, setAutosave] = useState(false);
    const [listbank, setListbank] = useState([])
    const [clearData, setClearData] = useState([
        { name: 'USD', rate: '' },
        { name: 'THB', rate: '' },
    ])
    const [data, setData] = useState([
        { name: '', rate: '' },
    ]);
    const handleClose = () => {
        setShow(false);

    };
    const handleShow = () => {
        setShow(true)
    };
    const onloadbank = () => {
        axios.get("/accounting/api/bank/all").then((data) => {
            setListbank([...data?.data?.result])

        }).catch((err) => {
            console.log(err)
        })
    }
    const onLoadExchangeRates = () => {
        axios.get('/accounting/api/loss-gain/getrate').then((data) => {
            setData([...data?.data.result])
        }).catch((err) => {
            console.log(err)
        })
    }
    const EnterDate = (e) => {
        setDefaultValue(moment(e).format("DD/MM/YYYY"))
        setErrdate(false)
        axios.get(`/accounting/api/loss-gain/getdate/${moment(e).format("DD-MM-YYYY")}`).then((data) => {
            if (data?.data?.result == 0) {
                setData([...clearData])
            } else {
                setData([...data?.data?.result])
                setExchange([...data?.data?.result])
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    const autotransaction = () => {
        setAutosave(true);
        axios.get('accounting/api/loss-gain/autoTransection').then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setAutosave(false);
        })
    }
    const onbank = (e) => {
        setBank_id(e)
        setErrbank(false)
    }
    const insert = () => {
        if (!defaultValue) {
            setErrdate(true)
            return;
        }
        if (!bank_id) {
            setErrbank(true)
            return;
        }
        setIsLoading(true);
        let informdata = {
            data,
            defaultValue,
            bank_id
        }
        axios.post('/accounting/api/loss-gain/createNewlossandgain', informdata).then((data) => {
            OnloadgainAndLoss()
            OnLoadgainandlossTransaction()
            handleClose(false)
            setBank_id('');
            setData([...clearData])
            setDefaultValue('')
           
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setIsLoading(false);
        })
    }
    useEffect(() => {
        onloadbank();
        onLoadExchangeRates();
    }, [])
    return (
        <>
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
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <small style={{ marginLeft: 100 }}>SELECT BANK</small>
                        <select
                            style={{
                                border: '1px solid #ccc',
                                height: 30,
                                borderRadius: 3,
                                width: 130,
                                marginRight: 125
                            }}
                            onChange={(e) => {
                                onbank(e.target.value);
                            }}
                            value={bank_id}
                        >
                            <option>SELECT BANK</option>
                            {listbank &&
                                listbank.map((data, index) => {
                                    return (
                                        <option key={index} value={data?.bank_id}>
                                            {data?.bank_name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div style={{ marginLeft: 210 }}>
                        {
                            errbank === true ? (
                                <>
                                    < small style={{ position: "absolute", fontSize: 14, color: "red" }}>Please select bank</small>
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
            <Breadcrumbs aria-label="breadcrumb">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <p
                        style={{
                            fontSize: 20,
                            color: "black",
                            fontFamily: "Phetsarath OT",
                            alignItems: "center",
                            paddingTop: 10,
                        }}
                    >
                        <ArrowBackIcon style={{ color: "#3f51b5" }} />
                        Unrealised Gains & Losses
                    </p>
                    <button
                        style={{
                            backgroundColor: "#3f51b5",
                            border: "none",
                            height: 35,
                            borderRadius: 2,
                            flexDirection: "row",
                            marginLeft: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                            color: "white",
                            fontFamily: "Phetsarath OT",
                        }}
                        onClick={() => { handleShow() }}

                    >
                        <AddIcon />
                        Exchange Rate
                    </button>
                    <button
                        style={{
                            backgroundColor: "#3f51b5",
                            border: "none",
                            height: 35,
                            borderRadius: 2,
                            flexDirection: "row",
                            marginLeft: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                            color: "white",
                            fontFamily: "Phetsarath OT",
                        }}
                        onClick={() => { autotransaction() }}
                    >
                        {!autosave ? (
                                <>
                                         Save Exhange 
                                </>
                            ) : (
                                <>
                                    {
                                        <Spinner animation="border" variant="light" size='sm' />
                                    }
                                </>)
                            }
                    </button>
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
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table" size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Unrealised Gains & Losses</TableCell>
                            <TableCell />
                            <TableCell></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">gain/loss</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            listgandl && listgandl.map((data, index) => {
                                return (
                                    <TableCellComponent
                                        data={data}
                                        key={index}
                                        listdata={listgain}
                                        id={data?.c_id}
                                    />
                                )
                            })
                        }
                    </TableBody>
                    <TableHead>
                        <TableRow>

                            <TableCell></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>

        </>

    );
    function TableCellComponent({ data, listdata, id }) {


        let total = 0
        const [open, setOpen] = useState(false);
        const classes = useRowStyles();
        const handleClick = () => {
            setOpen(!open);
        };
        const filtertotal = listdata.filter((el) => el.c_id == id);

        filtertotal && filtertotal.map((data) => {
            total += parseFloat(data?.loss_gain
            )
        })

        const filter = listdata.filter((el) => el.c_id == id);
        return (
            <>
                <React.Fragment>
                    <TableRow className={classes.root} size="small">
                        <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ cursor: 'pointer' }} >
                            {open ? <ExpandLess /> : <ExpandMore />}
                            {data?.account_name}
                        </TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>

                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box margin={1}>

                                    <Table size="small" aria-label="purchases">
                                        <TableHead >
                                            <TableRow style={{ fontWeight: 'bold' }}>
                                                <TableCell style={{ width: '20%', fontWeight: 'bold' }}>Date</TableCell>
                                                <TableCell style={{ width: '35%', fontWeight: 'bold' }}>Account</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }}>CURRENCY</TableCell>
                                                <TableCell style={{ fontWeight: 'bold', width: '25%' }} align="left">FOREIGN BALANCE</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }} align="right">RATE</TableCell>
                                                <TableCell style={{ fontWeight: 'bold', width: '35%' }} align="right">ADJUSTED BALANCE</TableCell>
                                                <TableCell style={{ fontWeight: 'bold', width: '25%' }} align="right">current BALANCE</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }} align="right">Amout</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }} align="right">GAIN/LOSS </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                filter && filter.map((data, index) => {
                                                    return (
                                                        <>
                                                            <TableRow key={index}>
                                                                <TableCell >
                                                                    {moment(data?.createdates).format("DD-MM-YYYY")}
                                                                </TableCell>
                                                                <TableCell>{data?.account_name}</TableCell>
                                                                <TableCell>{data?.currency_code}</TableCell>
                                                                <TableCell align="right">{getFormatNumber(data?.foreigin_balance)}</TableCell>
                                                                <TableCell align="right">{getFormatNumber(data?.new_rate)}</TableCell>
                                                                <TableCell align="right">{getFormatNumber(data?.new_balnce)}</TableCell>
                                                                <TableCell align="right">{getFormatNumber(data?.current_balance)}</TableCell>
                                                                <TableCell align="right">{getFormatNumber(data?.loss_gain)}</TableCell>
                                                                <TableCell align="right">{getFormatNumber(data?.totalbalance)}</TableCell>
                                                            </TableRow>
                                                        </>
                                                    )
                                                })
                                            }

                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                  
                </React.Fragment>

            </>
        )
    }
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
