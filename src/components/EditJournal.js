import React, { useState, useContext, useEffect } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import { LoginContext } from "../page/contexts/LoginContext";
import moment from 'moment';
import ErrorIcon from '@material-ui/icons/Error';
import RestoreIcon from '@material-ui/icons/Restore';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
import { Spinner, Toast, Row, Col } from "react-bootstrap";
import CheckCircle from "@material-ui/icons/CheckCircleOutline";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
export default function Journal() {
    const { id, setShowEditJournal,OnloadBalancesheet,onloadreportGl
    } = useContext(LoginContext);
    const [data, setData] = useState([
        { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
        { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
        { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
        { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
    ]);
    const [journalNo, setJournalNo] = useState("")
    const today = new Date();
    const date = today.setDate(today.getDate());
    const [currency, setCurrency] = useState("");
    const [currencystatus, setCurrencystatus] = useState([]);
    const [listcurrency, setListcurrency] = useState([]);
    const [defaultValue, setDefaultValue] = useState("")
    const Today = moment(new Date()).format("DD-MM-YYYY")
    const [isLoading, setIsLoading,] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [something, setSomething] = useState(false);
    const [currency_id, setCurrency_id] = useState("");
    const [thb, setThb] = useState("");
    const [usd, setUsd] = useState("");
    const [more, setMore] = useState(false)
    const [tr_id, setTr_id] = useState("")
    const [showBoxEdit, setShowBoxEdit] = useState(false)
    const [netTotalDebit, setNetTotalDebit] = useState("")
    const [netTotalCrebit, setNetTotalCrebit] = useState("")
    const [uid, setUid] = useState([])
    const [checkcondition, setCheckcondition] = useState("")
    const [shows, setShows] = useState(false);
    const [showleave, setShowleave] = useState(false);
    const [active, setActive] = useState("");
    const [copy, setCopy] = useState("")
    const [showcp, setShowcp] = useState(false)
    const [selectedImages, setSelectedImages] = useState([])
    const handleClosedel = () => {
        setShows(false);
    }
    const CloseShoFullScrreen = () => {
        setShowEditJournal(false)
    }
    const handleShow = () => setShows(true);
    const handleShowLeave = () => {
        if (checkcondition == '1') {
            setShowleave(true)
        } else {
            CloseShoFullScrreen(false)
            setCheckcondition('')
        }
    };
    const addLines = (index) => {
        const cloneData = [...data]
        cloneData.splice(index, 0, { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' })
        setData([...cloneData])
    }
    const copyData = (index) => {
        setShowcp(true)
        const cloneData = [...data][index]
        setCopy(cloneData)
    }
    const paste = (index) => {
        setShowcp(false)
        const cloneData = [...data]
        cloneData.splice(index, 1, copy)
        setData([...cloneData])
    }
    const fileRemove = (file) => {
        const updatedList = [...selectedImages];
        updatedList.splice(selectedImages.indexOf(file), 1);
        setSelectedImages(updatedList);

    }
    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        setSelectedImages(selectedFilesArray)
  
    };
    const handleLeaveClosedel = () => {
        setShowleave(false)
    }
    const Closeleave = () => {
        CloseShoFullScrreen(false)
    }
    const sumData = (key) => {
        let initialValue = 0
        let sum = data?.reduce(function (previousValue, currentValue) {
            return parseFloat(previousValue) + (currentValue[key] != undefined && currentValue[key] != '' ? parseFloat(currentValue[key].replaceAll(',', '')) : 0)
        }, initialValue)
        return sum;
    }
    let debit = Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(sumData('debit'))
    let credit = Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(sumData('credit'))
    let convertdebit = debit.replaceAll('$', '')
    let convertcredit = credit.replaceAll('$', '')
    let agconvertdebit = convertdebit.replaceAll(',', '')
    let agconvertcredit = convertcredit.replaceAll(',', '')
    const _onLoad = () => {
        axios.get(`/accounting/api/journal-entries/selectledger/${id}`).then((data) => {
            if ([...data?.data?.ledger].length > 0) {
                setData([...data?.data?.ledger, {}, {}, {}])
                let initialValue = 0;
                let sumdebit = [...data?.data?.ledger]?.reduce(function (previousValue, currentValue) {
                    return parseFloat(previousValue) + (currentValue['debit'] != undefined && currentValue['debit'] != '' ? parseFloat(currentValue['debit'].replaceAll(',', '')) : 0)
                }, initialValue)
                let sumcredit = [...data?.data?.ledger]?.reduce(function (previousValue, currentValue) {
                    return parseFloat(previousValue) + (currentValue['credit'] != undefined && currentValue['credit'] != '' ? parseFloat(currentValue['credit'].replaceAll(',', '')) : 0)
                }, initialValue)
                setCurrency_id([...data?.data?.transactions][0].currency_status)
                setUid([...data?.data?.transactions][0].currency_uid)
                let money_rate = [...data?.data?.transactions][0].rate
                let format_number = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(money_rate)
                let rate = format_number.replaceAll('$', '')
                let exchange = rate.replaceAll(',', '')
                let TotalDebit = (parseFloat(exchange) * parseFloat(sumdebit))
                let TotalCredit = (parseFloat(exchange) * parseFloat(sumcredit))
                setNetTotalDebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalDebit))
                setNetTotalCrebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalCredit))
                setUsd(rate)
                setThb(rate)
                setCurrency([...data?.data?.transactions][0].currency_status)
                setTr_id([...data?.data?.transactions][0].tr_id)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    const deleteTransaction = (e) => {
        const transitionID = e
        let data = {
            tr_id: transitionID
        }
        axios.put("/accounting/api/journal-entries/delete", data).then((data) => {
            CloseShoFullScrreen(false)
        }).catch((err) => {
            console.log(err)
        })
    }
    const currencies = () => {
        axios.get("/accounting/api/currencies").then((data) => {
            setListcurrency([...data?.data?.result])
        }).catch((err) => {
            console.log(err)
        })
    }
    const OnloadSelectCurrencies = (e) => {
        setCurrency(e)
        axios.get(`/accounting/api/chartofaccounts/currency/${e}`).then((data) => {
            setCurrencystatus([...data?.data?.result][0].cy_code)
        }).catch((err) => {
            console.log(err)
        })
    }
    const deletechange = (index) => {
        const cloneData = [...data]
        cloneData.splice(index, 1, { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' })
        setData([...cloneData])
    }
    const blurHandler = (value, key, index, usd, thb, agconvertdebit, agconvertcredit) => {
        const object = { ...data[index] };
        if (key == 'debit' || key == 'credit') {
            let number = value.replaceAll(',', '')
            let format_number = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
            object[key] = value != '' ? format_number.replaceAll('$', '') : ''
        } else {
            object[key] = value;
        }
        const cloneData = [...data];
        cloneData[index] = { ...object };
        setData([...cloneData]);
        if (key == 'debit') {
            if (!usd) {
            } else {
                let TotalDebit = parseFloat(usd.replaceAll(',', '')) * parseFloat(agconvertdebit)
                setNetTotalDebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalDebit))
            }
            if (!thb) {
            } else {
                let TotalDebit = parseFloat(thb.replaceAll(',', '')) * parseFloat(agconvertdebit)
                setNetTotalDebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalDebit))
            }
        } else {
            if (!usd) {
            } else {
                let TotalCredit = (parseFloat(usd.replaceAll(',', '')) * parseFloat(agconvertcredit))
                setNetTotalCrebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalCredit))
            }
            if (!thb) {
            } else {
                let TotalCredit = (parseFloat(thb.replaceAll(',', '')) * parseFloat(agconvertcredit))
                setNetTotalCrebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalCredit))
            }
        }
    }
    const changeText = (value, key, index) => {
        const object = { ...data[index] };
        if (key == 'debit' || key == 'credit') {
            // object[key] = value != '' ? Intl.NumberFormat().format(parseInt(value.replaceAll(',', ''))) : '';

            object[key] = value.toString().replaceAll(',', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        } else {
            object[key] = value;
        }
        const cloneData = [...data];
        cloneData[index] = { ...object };
        setData([...cloneData]);
    };
    const onBlurCurrency = (value, key, x, y) => {
        if (key == "USD") {
            let number = value.replaceAll(',', '')
            let format_number = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
            let rate = format_number.replaceAll('$', '')
            let exchange = rate.replaceAll(',', '')
            setUsd(format_number.replaceAll('$', ''))
            let TotalDebit = (parseFloat(exchange) * parseFloat(x))
            let TotalCredit = (parseFloat(exchange) * parseFloat(y))
            setNetTotalDebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalDebit))
            setNetTotalCrebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalCredit))
        } else {
            let number = value.replaceAll(',', '')
            let format_number = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
            let rate = format_number.replaceAll('$', '')
            let exchange = rate.replaceAll(',', '')
            setThb(format_number.replaceAll('$', ''))
            let TotalDebit = (parseFloat(exchange) * parseFloat(x))
            let TotalCredit = (parseFloat(exchange) * parseFloat(y))
            setNetTotalDebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalDebit))
            setNetTotalCrebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalCredit))
        }
    }
    const _searchstartdate = (e) => {
        if (defaultValue == "") {
            setDefaultValue(Today)
        } else {
            setDefaultValue(moment(e).format("DD-MM-YYYY"))
        }
    }
    const onChangeTextCurrency = (value, key) => {
        if (key == "USD") {
            setUsd(value)
        } else {
            setThb(value)
        }
    }
    const onchanges = (e) => {
        setThb(e)
    }
    const addMore = () => {
        setData([...data, {}]);
    };
    const resetlines = () => {
        setData([])
    }
    function refreshPage() {
        window.location.reload();
    }
    const countnumber = () => {
        axios.get("/accounting/api/journal-entries/selectcount").then((data) => {
            setJournalNo(data?.data.result[0].number)
        }).catch((err) => {
            console.log(err)
        })
    }
    const changeOpent = () => {
        setShowBoxEdit(!showBoxEdit);
    }
    useEffect(() => {
        _onLoad()
        countnumber()
        currencies()
        _searchstartdate()
        OnTransactionRate()
    }, [])
    const createdata = () => {
        const debit = sumData('debit')
        const credit = sumData('credit')
        setSomething('')
        let journaldata;
        let maincurrency;
        if (currency_id == "THB") {
            maincurrency = thb
        } else if (currency_id == "USD") {
            maincurrency = usd
        } else {
            maincurrency = '1'
        }
        setIsLoading(true);
        journaldata = {
            journal_no: journalNo,
            tr_date: defaultValue,
            currency_code: uid,
            money_rate: maincurrency,
            informdata: data,
            tr_id: tr_id,
        }
        if (debit != credit) {
            setIsLoading(false);
            setSomething(true)
        } else {
            axios.put("/accounting/api/journal-entries/update", journaldata).then((data) => {
                console.log(data)
                countnumber();
                OnloadBalancesheet();
                onloadreportGl();
                setThb('')
                setUsd('')
                setDefaultValue('')
                setShowToast(true);

            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setIsLoading(false);
            })
        }
    }
    return (
        <>
            <div style={{ marginLeft: 20, marginRight: 20 }}>
                <div
                    style={{
                        position: 'fixed',
                        paddingTop: 20,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        width: '100%',
                        backgroundColor: "#f8f9fa"
                    }}
                >
                    <div>
                        <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
                            <RestoreIcon />
                            <span style={{ fontSize: 20, fontWeight: 'bold' }}>Journal EntryRecent no.{journalNo}</span>
                        </div>
                    </div>
                    <div style={{ marginRight: 40, display: 'flex', flexDirection: 'row' }}>
                        <SettingsIcon style={{ fontSize: 30, marginRight: 20, cursor: 'pointer' }} />
                        <HelpOutlineIcon style={{ fontSize: 30, marginRight: 20, cursor: 'pointer' }} />
                        <div onClick={() => { handleShowLeave() }}>
                            <CloseIcon style={{ fontSize: 30, cursor: 'pointer' }} />
                        </div>
                    </div>
                </div>
                <Modal show={shows} onHide={handleClosedel} style={{ paddingTop: 50 }} size="sm">
                    <Modal.Header>
                        < WarningIcon style={{ color: "red" }} />
                        <span style={{ fontSize: 14, paddingTop: 10 }}>
                            Are you sure you want to delete this? </span>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button onClick={handleClosedel}>
                            No
                        </Button>
                        <Button onClick={() => { deleteTransaction(tr_id) }}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showleave} onHide={handleLeaveClosedel} style={{ paddingTop: 50 }} size="sm">
                    <Modal.Header>
                        < WarningIcon style={{ color: "red" }} />
                        <span style={{ fontSize: 14, paddingTop: 10 }}>
                            Do you want to leave without saving? </span>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button onClick={handleLeaveClosedel}>
                            No
                        </Button>
                        <Button onClick={Closeleave}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div style={{ height: 100 }}></div>
                <div style={{
                    position: 'fixed',
                    width: '80%',
                    marginLeft: 250
                }}>
                    <ToastShow1 show={showToast} setShow={setShowToast} iconNmame={<CheckCircle size={24} style={{ marginTop: 20, color: "#EC7380" }} />} />
                </div>
                {JSON.stringify(data)}
                {/* {JSON.stringify(netTotalCrebit)} */}
                {
                    something == true ? (
                        <>
                            <div style={{ border: '1px solid red', width: 500, marginLeft: 200, marginTop: 58, position: "absolute" }}
                            >
                                <ErrorIcon style={{ color: "red", width: 40, height: 40 }} />
                                <small style={{ fontSize: 20, marginLeft: 10, color: "red" }}>Something's not quite right</small> < br />
                                <small style={{ marginLeft: 10 }}>Please check balance debits and credits.</small></div>
                        </>
                    ) : (
                        <>
                        </>
                    )
                }
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: "100%"
                }}>
                    <div>
                        <span>Currency</span><br />
                        <select
                            style={{
                                border: '1px solid #ccc',
                                height: 30,
                                borderRadius: 3,
                                width: 235,
                                paddingLeft: 10,
                                outline: 'none'
                            }}
                            onChange={(e) => {
                                OnloadSelectCurrencies(e.target.value);
                            }}
                            value={currency}
                        >
                            <option value="">{currency}</option>
                            {listcurrency &&
                                listcurrency.map((data, index) => {
                                    return (
                                        <option value={data?.cy_uid} key={index}>
                                            {data?.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div style={{ paddingTop: 20, }}>
                        {currency_id == "USD" ?
                            (
                                <>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}>
                                        <div style={{ marginTop: 5, paddingLeft: 10 }}>1 USD</div>
                                        <div style={{ marginLeft: 5 }}>
                                            <img alt="Logo" src="/assets/images/USA.png" style={{ width: 40, height: 20, marginTop: 5 }} />
                                        </div>
                                        <div style={{ marginTop: 5 }}>=</div>
                                        <input
                                            style={{
                                                border: '1px solid #ccc',
                                                height: 30,
                                                borderRadius: 3,
                                                width: 150,
                                                paddingLeft: 10,
                                                outline: 'none',
                                                textAlign: "right"
                                            }}
                                            onChange={(e) => onChangeTextCurrency(e.target.value, currency_id)}
                                            onBlur={(e) => onBlurCurrency(e.target.value, currency_id, convertdebit, convertcredit)}
                                            value={usd}
                                        />
                                        <div style={{ marginLeft: 5 }}>
                                            <img alt="Logo" src="/assets/images/laos.png" style={{ width: 40, height: 20, marginTop: 5 }} />
                                        </div>
                                        <div style={{ marginTop: 5, paddingLeft: 10 }}>LAK</div>
                                    </div>
                                </>
                            ) : (
                                <>
                                </>
                            )
                        }
                        {currency_id == "THB" ?
                            (
                                <>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}
                                    >
                                        <div style={{ marginTop: 5, paddingLeft: 10 }}>1 THB</div>
                                        <div style={{ marginLeft: 5 }}>
                                            <img alt="Logo" src="/assets/images/thailand.png" style={{ width: 40, height: 20, marginTop: 5 }} />
                                        </div>
                                        <div style={{ marginTop: 5 }}>=</div>
                                        <input
                                            style={{
                                                border: '1px solid #ccc',
                                                height: 30,
                                                borderRadius: 3,
                                                width: 150,
                                                paddingLeft: 10,
                                                outline: 'none',
                                                textAlign: "right"
                                            }}
                                            onChange={(e) => {
                                                onchanges(e.target.value);
                                            }}
                                            value={thb}
                                        />
                                        <div style={{ marginLeft: 5 }}>
                                            <img alt="Logo" src="/assets/images/laos.png" style={{ width: 40, height: 20, marginTop: 5 }} />
                                        </div>
                                        <div style={{ marginTop: 5, paddingLeft: 10 }}>LAK</div>
                                    </div>
                                </>
                            ) : (
                                <>
                                </>
                            )
                        }
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <div style={{ flex: 1 }}>
                        <span>Journal date</span><br />
                        <input
                            type="text"
                            value={defaultValue}
                            onChange={(e) => setDefaultValue(e.target.value)}
                            style={{
                                border: '1px solid #ccc',
                                height: 30,
                                borderRadius: 3,
                                width: 100,
                                paddingLeft: 10,
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
                    </div>
                    <div>
                        <span>Journal no</span><br />
                        <input
                            style={{
                                border: '1px solid #ccc',
                                height: 30,
                                borderRadius: 3,
                                width: 400,
                                paddingLeft: 10,
                                outline: 'none'
                            }}
                            onChange={(e) => {
                                setJournalNo(e.target.value);
                            }}
                            value={journalNo}
                        />
                    </div>
                </div>
                <div style={{ height: 20 }}></div>
                <table width={"100%"} className='table' border="1">
                    <tr style={{ border: '1px solid #ccc', height: 30 }}>
                        <td></td>
                        <td align="center">#</td>
                        <td>Account</td>
                        <td>DEBITS</td>
                        <td>CREDIT</td>
                        <td>DESCRIPTION</td>
                        <td>TAX</td>
                        <td>EMPLOYEE</td>
                    </tr>
                    {data.map((item, index) => {
                        return (
                            <RowComponentEdit
                                item={item}
                                key={index}
                                index={index}
                                data={data}
                                setData={setData}
                                date={date}
                                refreshPage={refreshPage}
                                currency={currency}
                                deletechange={deletechange}
                                changeText={changeText}
                                blurHandler={blurHandler}
                                usd={usd}
                                thb={thb}
                                agconvertdebit={agconvertdebit}
                                agconvertcredit={agconvertcredit}
                                setCheckcondition={setCheckcondition}
                                setActive={setActive}
                                active={active}
                                addLines={addLines}
                                copyData={copyData}
                                paste={paste}
                                showcp={showcp}
                            />
                        );
                    })}
                    <tr style={{ border: '1px solid #ccc', backgroundColor: '#f2f3f5', height: 50 }}>
                        <td colSpan={2} align="right" style={{ paddingRight: 25 }}>Total</td>
                        <td align="right" style={{ paddingRight: 25 }}>{debit.replaceAll('$', '')}</td>
                        <td align="right" style={{ paddingRight: 25 }}>{credit.replaceAll('$', '')}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    {currency_id == "THB" ? (
                        <>
                            <tr style={{ border: '1px solid #ccc', backgroundColor: '#f2f3f5', height: 50 }}>
                                <td colSpan={2} align="right" style={{ paddingRight: 25 }}>TotalLAK</td>
                                <td align="right" style={{ paddingRight: 25 }}>{netTotalDebit.replaceAll('$', '')}</td>
                                <td align="right" style={{ paddingRight: 25 }}>{netTotalCrebit.replaceAll('$', '')}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </>
                    ) : (
                        <>
                        </>
                    )
                    }
                    {
                        currency_id == "USD" ? (
                            <>
                                <tr style={{ border: '1px solid #ccc', backgroundColor: '#f2f3f5', height: 50 }}>
                                    <td colSpan={2} align="right" style={{ paddingRight: 25 }}>TotalLAK</td>
                                    <td align="right" style={{ paddingRight: 25 }}>{netTotalDebit.replaceAll('$', '')}</td>
                                    <td align="right" style={{ paddingRight: 25 }}>{netTotalCrebit.replaceAll('$', '')}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </>
                        ) : (
                            <>
                            </>
                        )
                    }
                </table>
                <button style={{
                    border: '1px solid #ccc',
                    borderRadius: 3,
                    paddingLeft: 20, paddingRight: 20,
                    backgroundColor: 'white'
                }} onClick={addMore}>Add lines</button>
                <button style={{
                    border: '1px solid #ccc',
                    borderRadius: 3,
                    paddingLeft: 20, paddingRight: 20,
                    marginLeft: 20, backgroundColor: 'white'
                }} onClick={resetlines}>Clear lines </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <label style={{ cursor: "pointer" }}>
                        <AttachFileIcon />
                        <small style={{ fontSize: 15, fontWeight: "bold" }}>Attachments</small>
                        <input
                            type="file"
                            name="images"
                            onChange={onSelectFile}
                            multiple
                            style={{ display: "none" }}
                        />
                    </label>
                    <div style={{ marginLeft: 20 }}>
                        Maximum size:20MB
                    </div>
                </div>
                <div style={{
                    border: '1px solid #ccc',
                    borderRadius: 3,
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginLeft: 20,
                    height: 30,
                    cursor: "pointer",
                    paddingTop: 5,
                    width: "40%",
                    height: 200,
                    marginBottom: 200,
                    textAlign: "right"
                }} >
                    {selectedImages &&
                        selectedImages.map((data, index) => {
                            let sizes = parseFloat(data?.size / 1024).toFixed(2)
                            return (
                                <div key={index}>
                                    <small style={{ fontSize: 15 }}>{data?.name} ({sizes}) kb</small>
                                    <span
                                        style={{
                                            color: "red",
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow: 12,
                                            cursor: "pointer",
                                            marginLeft: 30,
                                        }} onClick={() => fileRemove(data)}>
                                        x
                                    </span>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div>
                <div style={{
                    display: 'block',
                    padding: '20px',
                    height: '60px',
                    width: '100%',
                }}>
                    <div style={{
                        backgroundColor: "#3f51b5",
                        borderTop: "1px solid #E7E7E7",
                        textAlign: "center",
                        padding: "20px",
                        position: "fixed",
                        left: "0",
                        bottom: "0",
                        height: "60px",
                        width: "100%",
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: "space-between"

                    }}>
                        <div style={{ marginLeft: 10 }}>
                            <div style={{
                                border: '1px solid #ccc',
                                borderRadius: 3,
                                paddingLeft: 20,
                                paddingRight: 20,
                                marginLeft: 20,
                                height: 30,
                                color: "white",
                                cursor: "pointer",
                                paddingTop: 5
                            }}

                                onClick={() => { handleShowLeave() }}
                            >Cancel</div>

                        </div>
                        <div style={{ marginLeft: 10 }}>
                            <div
                                style={{
                                    border: '1px solid #ccc',
                                    position: "absolute",
                                    height: 30,
                                    marginTop: -10
                                }}
                            >
                            </div>
                            <small style={{
                                cursor: "pointer",
                                fontSize: 16,
                                color: "white",
                                opacity: more ? 0.9 : 2,
                                marginLeft: 10
                            }}
                                onClick={() => { changeOpent() }}
                                onMouseOver={() => setMore(true)}
                                onMouseLeave={() => setMore(false)}
                            >More</small>
                            {
                                showBoxEdit == true ?
                                    (
                                        <>
                                            <div style={{
                                                border: '1px solid #ccc',
                                                position: "absolute",
                                                borderRadius: 3,
                                                paddingLeft: 10,
                                                height: 100,
                                                width: 200,
                                                marginTop: -150,
                                                backgroundColor: '#CBC7C7'
                                            }} >
                                                <div style={{ display: "flex", flexDirection: "column" }} onClick={() => { handleShow() }}>
                                                    <small style={{ paddingTop: 20, fontSize: 16, cursor: "pointer", textAlign: "start" }}
                                                    >Delete</small>
                                                    <small style={{ paddingTop: 10, fontSize: 16, cursor: "pointer", textAlign: "start" }}>Transaction journal</small>
                                                </div>
                                            </div>

                                        </>
                                    ) : (
                                        <>
                                        </>)
                            }
                        </div>
                        <div style={{ marginLeft: 50 }}>
                            <div style={{
                                border: '1px solid #ccc',
                                borderRadius: 3,
                                paddingLeft: 20,
                                paddingRight: 20,
                                marginLeft: 20,
                                height: 30,
                                color: "white",
                                cursor: "pointer",
                                paddingTop: 5
                            }}
                                onClick={createdata}
                            >
                                {!isLoading ? (
                                    <>
                                        Save
                                    </>
                                ) : (
                                    <>
                                        {
                                            <Spinner animation="border" variant="primary" size='sm' />
                                        }
                                    </>)
                                }
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        </>
    )

}
function RowComponentEdit({ changeText, deletechange, item, index, data, blurHandler, usd, thb, agconvertdebit, agconvertcredit, setCheckcondition, setActive, active, addLines, showcp, paste, copyData }) {
    const { listaccountname } = useContext(LoginContext);
    const [searchResult, setSearchResult] = useState([]);
    const [showBox, setShowBox] = useState(false);
    const handleClick = () => {
        setActive(null)
        setShowBox(!showBox);
    };
    const onBlurClose = (active) => {
        if (active == null) {
            setShowBox(false);
        } else {

        }
    }
    const getNameList = (c_id, inputIdex = null) => {
        axios.get(`accounting/api/chartofaccounts/all/parents/${c_id}`).then((respone) => {

            if (respone?.data?.message.length > 0) {
                const names = respone?.data?.message.map((item) => {
                    return item.name_eng;
                });
                names.reverse();
                if ((index % 2 != 0) && index > 0 && data[index - 1]?.debit) {
                    data[index]['credit'] = data[index - 1]?.debit;
                } else if ((index % 2 != 0) && index > 0) {
                    data[index]['debit'] = data[index - 1]?.credit
                }
                data[index]['c_id'] = respone?.data?.message[0].c_id
                data[index]['c_uid'] = respone?.data?.message[0].c_uid
                data[index]['account_id'] = respone?.data.message[0].account_id
                data[index]['name'] = names.join(":");
                changeText(names.join(":"), "name");
                setShowBox(!showBox);
            }
        });
        if (inputIdex !== null) {
            console.log(inputIdex);
        }
    };
    const _onSearchList = (e) => {
        data[index]['name'] = e
        let searchName = listaccountname.filter((el) => el.name_eng.toLowerCase().includes(e.toLowerCase()));
        if (!e) {
            setSearchResult([]);
        } else {
            setSearchResult([...searchName]);
        }
    };
    return (
        <>
            <tr style={{ border: '1px solid #ccc', height: 50 }}>
                <td align="right"><AddCircleOutlineIcon onClick={() => { addLines(index + 1) }} style={{ color: "green", width: 40, height: 40, cursor: "pointer" }} /></td>
                <td style={{ width: 30 }} align="center">
                    {index + 1}
                </td>
                <td >
                    <input
                        value={item?.name}
                        onChange={(e) => {
                            _onSearchList(e.target.value, index);
                        }}
                        onClick={() => handleClick(true)}
                        onBlur={() => onBlurClose(active)}
                        style={{
                            border: '1px solid #ccc',
                            outline: 'none',
                            paddingLeft: 10,
                            borderRadius: 3,
                            height: 35
                        }}
                    />
                    {showBox && (
                        <div
                            style={{
                                overflowY: "scroll",
                                height: 100,
                                paddingTop: 5,
                                paddingLeft: 10,
                                position: 'absolute',
                                backgroundColor: 'white'
                            }}
                        >
                            {searchResult.length > 0 ? (
                                <>
                                    {searchResult.map((data, index1) => {
                                        return (
                                            <>
                                                <span
                                                    key={index1}
                                                    style={{
                                                        cursor: "pointer",
                                                        fontWeight: active === data?.label ? "bold" : "",
                                                    }}
                                                    onClick={() => getNameList(data?.c_id, index)}
                                                    onMouseOver={() => setActive(data?.name_eng)}
                                                    onMouseLeave={() => setActive(null)}
                                                >
                                                    {data?.name_eng}
                                                </span>
                                                <br />
                                            </>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    {listaccountname.map((data, index1) => {
                                        return (
                                            <>
                                                <span
                                                    key={index1}
                                                    style={{
                                                        cursor: "pointer",
                                                        fontWeight: active === data?.name_eng ? "bold" : "",
                                                    }}
                                                    onClick={() => getNameList(data?.c_id, index)}
                                                    onMouseOver={() => setActive(data?.name_eng)}
                                                    onMouseLeave={() => setActive(null)}
                                                >
                                                    {data?.name_eng}
                                                </span>
                                                <br />
                                            </>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    )}
                </td>
                <td>
                    <input
                        value={data[index].debit}
                        onBlur={(e) => blurHandler(e.target.value, "debit", index, usd, thb, agconvertdebit, agconvertcredit)}
                        onChange={(e) => changeText(e.target.value, "debit", index)}
                        style={{
                            border: '1px solid #ccc',
                            outline: 'none',
                            paddingLeft: 10,
                            borderRadius: 3,
                            height: 35,
                            textAlign: "right"
                        }}
                    />
                </td>
                <td>
                    <input
                        value={data[index].credit}
                        onBlur={(e) => blurHandler(e.target.value, "credit", index, usd, thb, agconvertdebit, agconvertcredit)}
                        onChange={(e) => changeText(e.target.value, "credit", index)}
                        style={{
                            border: '1px solid #ccc',
                            outline: 'none',
                            paddingLeft: 10,
                            borderRadius: 3,
                            height: 35,
                            textAlign: "right"
                        }}
                    />
                </td>
                <td>
                    <input
                        value={item?.description}
                        onChange={(e) => changeText(e.target.value, "description", index)}
                        style={{
                            border: '1px solid #ccc',
                            outline: 'none',
                            paddingLeft: 10,
                            borderRadius: 3,
                            height: 35
                        }}
                    />
                </td>
                <td>
                    <input
                        value={item?.Tax}
                        onChange={(e) => changeText(e.target.value, "Tax", index)}
                        style={{
                            border: '1px solid #ccc',
                            outline: 'none',
                            paddingLeft: 10,
                            borderRadius: 3,
                            height: 35
                        }}
                    />
                </td>
                <td>
                    <input
                        value={item?.Employee}
                        onChange={(e) => changeText(e.target.value, "Employee", index)}
                        style={{
                            border: '0.1px solid #ccc',
                            outline: 'none',
                            paddingLeft: 10,
                            borderRadius: 3,
                            height: 35
                        }}
                    />
                </td>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    < DeleteIcon style={{ height: 50, cursor: "pointer", color: "green", width: 40, height: 40 }} onClick={() => {
                        deletechange(index); setCheckcondition('1')
                    }} />
                    {
                        showcp == true ?
                            (
                                <>
                                    <div style={{ cursor: 'pointer', border: '1px solid #ccc', borderRadius: 3, marginTop: 4, paddingLeft: 5, paddingRight: 5 }} onClick={() => { paste(index) }}>paste</div>
                                </>) : (
                                <>
                                    <div style={{ cursor: 'pointer', border: '1px solid #ccc', borderRadius: 3, marginTop: 4, paddingLeft: 5, paddingRight: 5 }} onClick={() => { copyData(index) }}>Copy</div>
                                </>
                            )
                    }
                </div>
            </tr>
        </>

    );
}
function ToastShow1({ show, setShow, iconNmame }) {
    return (
        <Row>
            <Col xs={12}>
                <Toast onClose={() => setShow(false)} show={show} style={{ textAlign: 'center' }} delay={3000} autohide>
                    <div>
                        {iconNmame}
                    </div>
                    <Toast.Body>Saved successfully</Toast.Body>
                </Toast>
            </Col>
        </Row>

    );
}
