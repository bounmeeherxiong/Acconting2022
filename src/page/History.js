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
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useNavigate } from "react-router-dom";
import { getFormatNumber } from "../constants/functions"
import moment from 'moment';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function History() {
    const navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();
    const [list, setList] = useState([]);
    const [currency, setCurrency] = useState([])
    const [conditions, setConditions] = useState([])
    const goback = () => {
        navigate("/ChartAccount");
    }
    const _onLoad = () => {
        axios.get(`/accounting/api/chartofaccounts/openingBalance/${id}`).then((data) => {
            setList([...data?.data?.result])
            setCurrency([...data?.data?.result][0].foreign_code)
            setConditions([...data?.data?.result][0].conditions)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        _onLoad();
    }, [])
    return (
        <>
            <div>
                <ChevronLeftIcon style={{ color: "#3f51b5", cursor: "pointer" }} />
                <span style={{ color: "#3f51b5", cursor: "pointer" }}
                    onClick={() => {
                        goback()
                    }}
                >Back to Chart of Accounts</span><br />
            </div>
            <div style={{ display: 'flex', flexDirection: "row" }} >
                <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 20 }}>Asset Account History </span>
                    <input
                        style={{
                            border: '1px solid #ccc',
                            height: 30,
                            borderRadius: 3,
                            width: 200,
                            outline: 'none'
                        }}
                    />
                </div>
                <div>
                    sss
                </div>
            </div>
            <div style={{ height: 20 }}></div>
            <TableContainer component={Paper}>
                <Table className={classes.table}  size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: 150 }}>DATE</TableCell>
                            <TableCell align="right" style={{ width: 200 }}>Type || NO</TableCell>
                            <TableCell align="right" style={{ width: 300 }}>ACCOUNT</TableCell>
                            <TableCell align="right" style={{ width: 200 }}>EXCHANGE RATE</TableCell>
                            {
                                conditions == "bank" ? (
                                    <>
                                        <TableCell align="right" style={{ width: 200 }}>Payment({currency})</TableCell>
                                        <TableCell align="right" style={{ width: 200 }}>DEPOSIT({currency})</TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell align="right" style={{ width: 200 }}>DECREASE({currency})</TableCell>
                                        <TableCell align="right" style={{ width: 200 }}>INCREASE({currency})</TableCell>

                                    </>
                                )
                            }
                            <TableCell align="right" style={{ width: 200 }}>TAX</TableCell>
                            <TableCell align="right" style={{ width: 200 }}>BALANCE ({currency})</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            list && list.map((data, index) => {
                                let balance = data?.balances
                                let usingObjectAssign = Object.assign([], balance);
                                let conditons = usingObjectAssign[0]
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="right">{moment(data?.createdate).format("DD-MM-YYYY")}</TableCell>
                                        {
                                            data?.begining_balance == '0' ? (
                                                <TableCell align="right">Beginning Balance</TableCell>
                                            ) : (
                                                <TableCell align="right">Journal Entry || {data?.journal_no}</TableCell>
                                            )
                                        }
                                        <TableCell align="right">{data?.name_eng}</TableCell>
                                        {
                                            data?.foreign_code == "LAK" ? (
                                                <>
                                                    {
                                                        data?.begining_balance == '0' ? (
                                                            <>
                                                                <TableCell align="right"></TableCell>
                                                                {
                                                                    conditons == '-' ?
                                                                        (
                                                                            <>
                                                                                <TableCell align="right">{getFormatNumber(data?.balances.replaceAll("-", ''))}</TableCell>
                                                                                <TableCell align="right"></TableCell>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <TableCell align="right"></TableCell>
                                                                                <TableCell align="right">{getFormatNumber(data?.balances)}</TableCell>
                                                                            </>)
                                                                }


                                                            </>
                                                        ) : (
                                                            <>
                                                                <TableCell align="right">
                                                                    {/* {
                                                                        data?.money_rate == null ? (
                                                                            <>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                ${getFormatNumber(data?.foreign_amount)}
                                                                                <br />
                                                                                1 {data?.foreign_code}
                                                                                = {getFormatNumber(data?.money_rate)}
                                                                            </>

                                                                        )
                                                                    } */}

                                                                </TableCell>
                                                                <TableCell align="right">

                                                                    {
                                                                        data?.credit == "0.00" ? (
                                                                            <>
                                                                                0.00
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                ₭ {getFormatNumber(data?.credit)}
                                                                            </>
                                                                        )
                                                                    }

                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {
                                                                        data?.debit == "0.00" ? (
                                                                            <>
                                                                                0.00
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                ₭ {getFormatNumber(data?.debit)}

                                                                            </>
                                                                        )
                                                                    }

                                                                </TableCell>
                                                            </>
                                                        )
                                                    }

                                                </>
                                            ) : (data?.foreign_code == "USD") ? (
                                                <>
                                                    {
                                                        data?.begining_balance == '0' ? (
                                                            <>
                                                                <TableCell align="center">
                                                                    1 $
                                                                    = {getFormatNumber(data?.money_rate)}
                                                                    <br />
                                                                    ₭ {getFormatNumber((parseFloat(data?.foreign_amount * data?.money_rate)))}

                                                                </TableCell>
                                                                <TableCell align="right"></TableCell>
                                                                <TableCell align="center"></TableCell>
                                                            </>
                                                        ) : (
                                                            <>
                                                                {
                                                                    data?.debit == "0.00" ? (
                                                                        <>
                                                                        </>
                                                                    ) : (
                                                                        <>

                                                                            <TableCell align="right">
                                                                                {
                                                                                    data?.money_rate == null ? (
                                                                                        <>

                                                                                        </>

                                                                                    ) : (
                                                                                        <>
                                                                                            ₭ {getFormatNumber(data?.debit)}
                                                                                            <br />
                                                                                            1 {data?.foreign_code}
                                                                                            = {getFormatNumber(data?.money_rate)}

                                                                                        </>

                                                                                    )
                                                                                }

                                                                            </TableCell>
                                                                        </>
                                                                    )
                                                                }
                                                                {
                                                                    data?.credit == "0.00" ? (
                                                                        <>
                                                                        </>
                                                                    ) : (
                                                                        <>

                                                                            <TableCell align="right">
                                                                                {
                                                                                    data?.money_rate == null ? (
                                                                                        <>
                                                                                        </>

                                                                                    ) : (
                                                                                        <>
                                                                                            ₭ {getFormatNumber(data?.credit)}
                                                                                            <br />
                                                                                            1 {data?.foreign_code}
                                                                                            = {getFormatNumber(data?.money_rate)}

                                                                                        </>
                                                                                    )
                                                                                }

                                                                            </TableCell>
                                                                        </>
                                                                    )
                                                                }
                                                                {
                                                                    data?.credit == "0.00" ?
                                                                        (
                                                                            <>
                                                                                <TableCell align="right">0.00</TableCell>

                                                                            </>) : (
                                                                            <>
                                                                                <TableCell align="right">${getFormatNumber(parseFloat(data?.credit) / parseFloat(data?.money_rate))}</TableCell>

                                                                            </>)
                                                                }
                                                                {
                                                                    data?.debit == "0.00" ? (
                                                                        <>
                                                                            <TableCell align="right">0.00</TableCell>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <TableCell align="right">$ {getFormatNumber(parseFloat(data?.debit) / parseFloat(data?.money_rate))}</TableCell>

                                                                        </>
                                                                    )
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </>
                                            ) : (data?.foreign_code == "THB") ? (
                                                <>
                                                    {
                                                        data?.begining_balance == '0' ? (
                                                            <>
                                                                <TableCell align="center">


                                                                    1 ฿
                                                                    = {getFormatNumber(data?.money_rate)}
                                                                    <br />
                                                                    ₭ {getFormatNumber((parseFloat(data?.foreign_amount * data?.money_rate)))}
                                                                </TableCell>
                                                                <TableCell align="right"></TableCell>
                                                                <TableCell align="center"></TableCell>
                                                            </>
                                                        ) : (
                                                            <>
                                                                {
                                                                    data?.debit == "0.00" ? (
                                                                        <>
                                                                        </>
                                                                    ) : (
                                                                        <>

                                                                            <TableCell align="right">
                                                                                {
                                                                                    data?.money_rate == null ? (
                                                                                        <>

                                                                                        </>

                                                                                    ) : (
                                                                                        <>
                                                                                            ฿ {getFormatNumber(data?.debit)}
                                                                                            <br />
                                                                                            1 {data?.currencystatus}
                                                                                            = {getFormatNumber(data?.money_rate)}

                                                                                        </>

                                                                                    )
                                                                                }

                                                                            </TableCell>
                                                                        </>
                                                                    )
                                                                }
                                                                {
                                                                    data?.credit == "0.00" ? (
                                                                        <>
                                                                        </>
                                                                    ) : (
                                                                        <>

                                                                            <TableCell align="right">
                                                                                {
                                                                                    data?.money_rate == null ? (
                                                                                        <>

                                                                                        </>

                                                                                    ) : (
                                                                                        <>
                                                                                            ฿ {getFormatNumber(data?.credit)}
                                                                                            <br />
                                                                                            1 {data?.foreign_code}
                                                                                            = {getFormatNumber(data?.money_rate)}

                                                                                        </>

                                                                                    )
                                                                                }

                                                                            </TableCell>
                                                                        </>
                                                                    )
                                                                }
                                                                <TableCell align="right">฿ {getFormatNumber(parseFloat(data?.credit) / parseFloat(data?.money_rate))}</TableCell>
                                                                <TableCell align="right">฿ {getFormatNumber(parseFloat(data?.debit) / parseFloat(data?.money_rate))}</TableCell>
                                                            </>
                                                        )
                                                    }
                                                </>
                                            ) : (
                                                <>
                                                    {
                                                        data?.debit == "0.00" ? (
                                                            <>
                                                            </>
                                                        ) : (
                                                            <>

                                                                <TableCell align="right">
                                                                    {
                                                                        data?.money_rate == '1.00' ? (
                                                                            <>

                                                                            </>

                                                                        ) : (
                                                                            <>
                                                                                ฿ {getFormatNumber(data?.debit)}
                                                                                <br />
                                                                                1 {data?.foreign_code}
                                                                                = {getFormatNumber(data?.money_rate)}

                                                                            </>
                                                                        )
                                                                    }
                                                                </TableCell>
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        data?.credit == "0.00" ? (
                                                            <>
                                                            </>
                                                        ) : (
                                                            <>

                                                                <TableCell align="right">
                                                                    {
                                                                        data?.money_rate == '1.00' ? (
                                                                            <>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                ฿ {getFormatNumber(data?.credit)}
                                                                                <br />
                                                                                1 {data?.foreign_code}
                                                                                = {getFormatNumber(data?.money_rate)}
                                                                            </>

                                                                        )
                                                                    }

                                                                </TableCell>
                                                            </>
                                                        )
                                                    }
                                                    <TableCell align="left">{getFormatNumber(data?.debit)}</TableCell>
                                                    <TableCell align="left">{getFormatNumber(data?.credit)}</TableCell>
                                                </>)
                                        }

                                        <TableCell align="right"></TableCell>
                                        {
                                            data?.foreign_code == "LAK" ?
                                                (
                                                    <>
                                                        <TableCell align="right">₭{getFormatNumber(data?.balances)}</TableCell>
                                                    </>

                                                ) : (data?.foreign_code == "USD") ? (
                                                    <>
                                                        <TableCell align="right">$ {getFormatNumber(data?.foreign_balances)}</TableCell>
                                                    </>
                                                ) : (data?.foreign_code == "THB") ? (
                                                    <>
                                                        <TableCell align="right">฿{getFormatNumber(data?.foreign_balances)}</TableCell>
                                                    </>
                                                ) : (
                                                    <></>
                                                )
                                        }
                                    </TableRow>
                                )
                            })
                        }

                    </TableBody>


                </Table>


            </TableContainer>
        </>

    )
}
