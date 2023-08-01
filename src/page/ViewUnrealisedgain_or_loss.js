import React, { useState, useEffect, useRef } from "react";
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
import ReactToPrint from "react-to-print";
import Button from '@material-ui/core/Button';
import PrintIcon from '@material-ui/icons/Print';

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import { useParams } from "react-router-dom";
import moment from 'moment';
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function ViewUnrealisedgain_or_loss() {
    let componentRef = useRef(null)
    const navigate = useNavigate();
    const { id } = useParams();
    const [list, setList] = useState({})
    const [listtotal, setListTotal] = useState([])
    const [balances, setBalances] = useState(false)
    const [currentbalances, setCurrentbalances] = useState(false)
    const [rate, setRate] = useState(false)
    const [foreignbalance, setforeignBalance] = useState(false)
    const [gain_Loss, setgain_loss] = useState(false)
    const [showSetting, setShowSetting] = useState(false)
    const [searchlist, setSeachlist] = useState([])
    const [searchtotal, setSearchtotal] = useState([])
    const OnloadListData = () => {
        axios.get('/accounting/api/listLossAndGain/getList').then((data) => {
            console.log("ListData=", data)

            setListTotal([...data?.data?.totalGainAndLoss])
            setList({ ...data?.data })
        }).catch((err) => {
            console.log(err)
        })
    }
    const OnloadSearchListData = () => {
        axios.get('/accounting/api/listLossAndGain/callLossAndgain').then((data) => {
            
            setSearchtotal([...data?.data?.totalGainAndLoss])
            setSeachlist({ ...data?.data })
        }).catch((err) => {
            console.log(err)
        })
    }
    const Setting = () => {
        setShowSetting(!showSetting)
    }
    const OnForeignbalance = () => {
        setforeignBalance(!foreignbalance)
    }
    const OnRate = () => {

        setRate(!rate)
    }
    useEffect(() => {
        OnloadListData()
        OnloadSearchListData()
    }, [])

    const goback = () => {
        navigate("/Profitandloss");
    }
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'space-between'
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p
                        style={{
                            fontSize: 20,
                            color: "black",
                            fontFamily: "Phetsarath OT",
                            cursor: 'pointer',
                            backgroundColor: "#3f51b5",
                            borderRadius: '50%'
                        }}
                        onClick={() => { goback() }}
                    >
                        <ArrowBackIcon style={{ color: "white" }} />
                    </p>
                    <h4 style={{ marginLeft: 10, color: 'black' }}> Detail Unrealised gain or loss </h4>

                </div>
                <div>
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
                                    height: 200,
                                }}>
                                    <h4 style={{ marginTop: 20, marginLeft: 10 }}>Display density</h4>
                                    <div style={{ height: 20 }}></div>
                                    <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                                            <input type="checkbox"
                                            // onClick={() => { Onforeignamount() }}
                                            // onMouseLeave={() => { setLeave(null) }}
                                            />
                                            <small style={{ marginLeft: 5, marginTop: 2 }}>Balances</small>
                                        </div>
                                        <div style={{ marginRight: 28, display: 'flex', flexDirection: 'row' }}>
                                            <input type="checkbox"
                                            // onClick={() => { OnForeignbalance() }}
                                            // onMouseLeave={() => { setLeave(null) }}

                                            />
                                            <small style={{ marginLeft: 5, marginTop: 2 }}>Current Balance</small>
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
                                            // onClick={() => { OnForeignbalance() }}
                                            // onMouseLeave={() => { setLeave(null) }}
                                            />
                                            <small style={{ marginLeft: 5, marginTop: 2 }}>Gain/Loss</small>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', marginRight: 22 }}>
                                            {/* <input type="checkbox"
                                                // onClick={() => { OnCurrentBalance() }}
                                                // onMouseLeave={() => { setLeave(null) }}
                                            /> */}
                                            {/* <small style={{ marginLeft: 5, marginTop: 2 }}>Current balance</small> */}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : null
                    }
                </div>

            </div>
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
            <div
                style={{
                    height: 10,
                }}
            ></div>
            {
                id == 1 ? (
                    <>
                        <TableContainer component={Paper} ref={(el) => (componentRef = el)}>
                            <Table aria-label="collapsible table" size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }}>Unrealised Gains & Losses</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right">gain/loss</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        list.fistList && list.fistList.map((data, index) => {
                                            return (
                                                <>
                                                    <TableCellComponent
                                                        key={index}
                                                        data={data}
                                                        gain_losses={data.p_and_l_status}
                                                        secondList={list.secondList}
                                                        balances={balances}
                                                        currentbalances={currentbalances}
                                                        rate={rate}
                                                        foreignbalance={foreignbalance}
                                                        gain_Loss={gain_Loss}
                                                    />
                                                </>
                                            )
                                        })
                                    }

                                </TableBody>
                                <TableHead>
                                    {
                                        listtotal && listtotal.map((data, index) => {
                                            return (
                                                <>
                                                    <TableRow key={index}>
                                                        <TableCell>{data?.name_eng}</TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell align="right"></TableCell>
                                                        <TableCell align="right"></TableCell>
                                                        <TableCell align="right"></TableCell>
                                                        <TableCell align="right"></TableCell>
                                                        <TableCell align="right"></TableCell>
                                                        <TableCell align="right">{getFormatNumber(data?.bs_amount)} ₭ </TableCell>
                                                    </TableRow>
                                                </>
                                            )
                                        })
                                    }
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </>) : (<>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table" size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }}>Unrealised Gains & Losses</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right">gain/loss</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        searchlist.fistList && searchlist.fistList.map((data, index) => {
                                            return (
                                                <>
                                                    <TableCellComponent
                                                        key={index}
                                                        data={data}
                                                        gain_losses={data.p_and_l_status}
                                                        secondList={searchlist.secondList}
                                                        balances={balances}
                                                        currentbalances={currentbalances}
                                                        foreignbalance={foreignbalance}
                                                        rate={rate}
                                                        gain_Loss={gain_Loss}
                                                    />
                                                </>
                                            )
                                        })
                                    }

                                </TableBody>
                                <TableHead>
                                    {
                                        searchtotal && searchtotal.map((data, index) => {
                                            return (
                                                <>
                                                    <TableRow key={index}>
                                                        <TableCell>{data?.name_eng}</TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell align="right"></TableCell>
                                                        <TableCell align="right"></TableCell>
                                                        <TableCell align="right"></TableCell>
                                                        <TableCell align="right"></TableCell>
                                                        <TableCell align="right"></TableCell>
                                                        <TableCell align="right">{getFormatNumber(data?.bs_amount)} ₭ </TableCell>
                                                    </TableRow>

                                                </>
                                            )
                                        })
                                    }

                                </TableHead>
                            </Table>
                        </TableContainer>

                    </>)
            }

        </>
    );
}
function TableCellComponent({ data, gain_losses, secondList, rate, foreignbalance }) {
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();
    const handleClick = () => {
        setOpen(!open);
    };
    const filter = secondList.filter((el) => el.p_and_l_status == gain_losses);
    return (
        <>
            <React.Fragment>
                <TableRow className={classes.root} size="small">
                    <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ cursor: 'pointer' }} >
                        {open ? <ExpandLess /> : <ExpandMore />}
                        {data?.name_eng}
                    </TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    {
                        open ? (
                            <>
                                <TableCell align="right"></TableCell>

                            </>) : (
                            <>
                                <TableCell align="right" style={{ fontWeight: 'bold' }}>
                                    {getFormatNumber(data?.gain_loss)}₭
                                </TableCell>

                            </>)
                    }

                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>

                                <Table size="small" aria-label="purchases">
                                    <TableHead >
                                        <TableRow style={{ fontWeight: 'bold' }}>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Account</TableCell>
                                            <TableCell align="right">Debit</TableCell>
                                            <TableCell align="right">Credit</TableCell>
                                            {
                                                foreignbalance == true ? (<>
                                                    <TableCell align="right">foreign_balances</TableCell>
                                                </>) : null
                                            }
                                            {
                                                rate == true ? (<>
                                                    <TableCell align="right">Exchange Rate</TableCell>
                                                </>) : null
                                            }
                                            {
                                                gain_losses === 1 ? (
                                                    <>
                                                        <TableCell align="right">Gain</TableCell>
                                                    </>
                                                ) : (<>
                                                    <TableCell align="right">Losses</TableCell>
                                                </>)
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            filter && filter.map((data, index) => {
                                                return (
                                                    <>
                                                        <TableRow key={index}>
                                                            <TableCell >
                                                                {moment(data?.created_at).format("DD-MM-YYYY")}
                                                            </TableCell>
                                                            <TableCell>{data?.name_eng}</TableCell>
                                                            {
                                                                data?.debit == '0.00' ? (
                                                                    <TableCell align="right"></TableCell>
                                                                ) : (
                                                                    <TableCell align="right">{getFormatNumber(data?.debit)}₭</TableCell>
                                                                )
                                                            }
                                                            {
                                                                data?.credit == '0.00' ? (
                                                                    <TableCell align="right"></TableCell>
                                                                ) : (
                                                                    <TableCell align="right">{getFormatNumber(data?.credit)}₭</TableCell>
                                                                )
                                                            }
                                                            {
                                                                foreignbalance == true ? (
                                                                    <>
                                                                        {
                                                                            data?.foreign_balances == null ? (
                                                                                <>
                                                                                    <TableCell align="right">

                                                                                    </TableCell>

                                                                                </>) : (<>
                                                                                    <TableCell align="right">
                                                                                        {getFormatNumber(data?.foreign_balances)}
                                                                                        {
                                                                                            data?.foreign_code == 'USD' ? (<>$</>) : (<>฿</>)
                                                                                        }
                                                                                    </TableCell>

                                                                                </>)

                                                                        }


                                                                    </>) : null
                                                            }
                                                            {
                                                                rate == true ? (
                                                                    <>
                                                                        {
                                                                            data?.money_rate == '0' ? (<>
                                                                                <TableCell align="right">
                                                                                </TableCell>

                                                                            </>) : (<>
                                                                                <TableCell align="right">
                                                                                    {getFormatNumber(data?.money_rate)}

                                                                                </TableCell>

                                                                            </>)
                                                                        }


                                                                    </>) : null
                                                            }


                                                            {
                                                                data?.statu_auto_GainAndLoss === 1 || data?.statu_auto_GainAndLoss === 2 ?
                                                                    (
                                                                        <>
                                                                            <TableCell align="right" style={{ fontWeight: 'bold' }}>{getFormatNumber(data?.amout)}₭</TableCell>
                                                                        </>
                                                                    ) :
                                                                    (
                                                                        <>
                                                                            <TableCell align="right"></TableCell>
                                                                        </>
                                                                    )
                                                            }

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
