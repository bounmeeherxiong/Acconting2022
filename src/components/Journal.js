import React, { useState, useContext, useEffect } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import { LoginContext } from "../page/contexts/LoginContext";
import moment from 'moment';
import RestoreIcon from '@material-ui/icons/Restore';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
import { Spinner, Toast, Row, Col } from "react-bootstrap";
import CheckCircle from "@material-ui/icons/CheckCircleOutline";
import ErrorIcon from '@material-ui/icons/Error';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import { BrowserView, MobileView } from 'react-device-detect';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
export default function Journal() {
  const classes = useStyles();
  const {
    setShowfullscreen,onloadtransaction, OnloadResetCondition, listallaccountchildren
  } = useContext(LoginContext);

 

  const [data, setData] = useState([
    { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
    { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
    { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
    { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
    { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
    { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
  ]);

  const [clearData, setClearData] = useState([
    { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
    { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
    { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
    { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
    { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
    { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
  ])
  const [journalNo, setJournalNo] = useState("")
  const [listcurrency, setListcurrency] = useState([]);
  const [currency_id, setCurrency_id] = useState("");
  const [thb, setThb] = useState("");
  const [usd, setUsd] = useState("");
  const [array, setArray] = useState([])
  const [prentid, setPrentid] = useState("");
  const [currency, setCurrency] = useState("");
  const [defaultValue, setDefaultValue] = useState("")
  const Today = moment(new Date()).format("DD-MM-YYYY")
  const [currencystatus, setCurrencystatus] = useState([]);
  const [isLoading, setIsLoading,] = useState(false);
  const [isLoadingnew, setIsLoadingnew] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [mobile_journal, setmobile_journal] = useState(false);
  const [mobile_currency, setMobile_currency] = useState(false);
  const [something, setSomething] = useState(false);
  const [something_Mobile, setSomething_Mobile] = useState(false);
  const [onFucused, setOnFocused] = useState(false);
  const [onSaveNew, setOnSaveNew] = useState(false);
  const [errInforCurrency, setErrInforCurrency] = useState("");
  const [showcp, setShowcp] = useState(false)
  const [copy, setCopy] = useState("")
  const [netTotalDebit, setNetTotalDebit] = useState("")
  const [netTotalCrebit, setNetTotalCrebit] = useState("")
  const [active, setActive] = useState("");
  const [selectedImages, setSelectedImages] = useState([])
  const [file, setFile] = useState();
  const [errExchange, setErrExchange] = useState(false)
  const [errjournal, setErrjournal] = useState("")
  const [erragain, setErragain] = useState("")
  const addMore = () => {
    console.log('data=', [...data])
    setData([...data, {}]);
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
  const openfullscreen = () => {
    setShowfullscreen(false)
  }
  const resetlines = () => {
    let oldarray = [...data]
    oldarray.splice(data, 1)
    setData([...oldarray])
  }

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const file_attachment = Array.from(selectedFiles);
    setSelectedImages(file_attachment)
    setFile(event.target.files);

  };
  const fileRemove = (file) => {
    const updatedList = [...selectedImages];
    updatedList.splice(selectedImages.indexOf(file), 1);
    setSelectedImages(updatedList);
  }
  const onBlurCurrency = (value, key, x, y) => {
    if (key == "USD") {
      // let number = value.replaceAll(',', '')
      let number = value.toString().replaceAll(',', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      // let format_number = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
      // let rate = format_number.replaceAll('$', '')
      // let exchange = rate.replaceAll(',', '')

      // setUsd(format_number.replaceAll('$', ''))
      let exchange = number.replaceAll(',', '')
      setUsd(number)

      let convert_x = x.replaceAll(',', '')
      let TotalDebit = (parseFloat(exchange) * parseFloat(convert_x))

      let convert_y = y.replaceAll(',', '')
      let TotalCredit = (parseFloat(exchange) * parseFloat(convert_y))
      setNetTotalDebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalDebit))
      setNetTotalCrebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalCredit))
    } else {
      // let number = value.replaceAll(',', '')
      // let format_number = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
      // let rate = format_number.replaceAll('$', '')
      // let exchange = rate.replaceAll(',', '')
      let number = value.toString().replaceAll(',', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      setThb(number)
      let exchange = number.replaceAll(',', '')

      let convert_x = x.replaceAll(',', '')
      let TotalDebit = (parseFloat(exchange) * parseFloat(convert_x))
      let convert_y = y.replaceAll(',', '')
      let TotalCredit = (parseFloat(exchange) * parseFloat(convert_y))
      setNetTotalDebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalDebit))
      setNetTotalCrebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalCredit))
    }
  }
  const onChangeTextCurrency = (value, key) => {
    setErrExchange('')
    if (key == "USD" || key == "THB") {
      const ratenumber = value.toString().replaceAll(',', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      setUsd(ratenumber)
      setThb(ratenumber)
    } else {
    }
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
        const convert_usd = usd.replaceAll(',', '')
        let TotalDebit = parseFloat(convert_usd.replaceAll(',', '')) * parseFloat(agconvertdebit)
        setNetTotalDebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalDebit))
      }
      if (!thb) {
      } else {
        const convert_thb = thb.replaceAll(',', '')
        let TotalDebit = parseFloat(convert_thb.replaceAll(',', '')) * parseFloat(agconvertdebit)
        setNetTotalDebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalDebit))
      }
    } else {
      if (!usd) {
      } else {
        const convert_usd = usd.replaceAll(',', '')
        let TotalCredit = (parseFloat(convert_usd.replaceAll(',', '')) * parseFloat(agconvertcredit))
        setNetTotalCrebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalCredit))
      }
      if (!thb) {
      } else {
        const convert_thb = thb.replaceAll(',', '')
        let TotalCredit = (parseFloat(convert_thb.replaceAll(',', '')) * parseFloat(agconvertcredit))
        setNetTotalCrebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalCredit))
      }
    }
  }
  const changeText = (value, key, index) => {
    const object = { ...data[index] };

    console.log("object=", object)
    if (key == 'debit' || key == 'credit') {
      object[key] = value.toString().replaceAll(',', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      object[key] = value;
    }
    const cloneData = [...data];

    cloneData[index] = { ...object };
    setData([...cloneData]);
  };
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
  const deletechange = (index) => {
    setCurrency_id('')
    const cloneData = [...data]
    cloneData.splice(index, 1, { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' })
    setData([...cloneData])
  }
  const OnloadSelectCurrencies = (e) => {
    setCurrency(e)
    
    axios.get(`/accounting/api/chartofaccounts/currency/${e}`).then((data) => {
      // console.log("ssss=",[...data?.data?.result][0].cy_code)
      setCurrency_id([...data?.data?.result][0].cy_code)
      setCurrencystatus([...data?.data?.result][0].cy_code)
    }).catch((err) => {
      console.log(err)
    })
  }
  const countnumber = () => {
    axios.get("/accounting/api/journal-entries/selectcount").then((data) => {
      setJournalNo(data?.data.result[0].number)
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
  const onloadcurrenies = () => {
    axios.get(`accounting/api/currencies/getByCode/lak`).then((data) => {
      setCurrency([...data?.data?.result][0].cy_uid)
    }).catch((err) => {
      console.log(err)
    })
  }
  const _searchstartdate = (e) => {
    setErragain('')
    if (defaultValue == "") {
      setDefaultValue(Today)
    } else {
      setDefaultValue(moment(e).format("DD-MM-YYYY"))
    }
  }
  const onloadAutomaticGl = () => {
    axios.get("/accounting/api/report/reportAutoGL").then((data) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  }
  const defaultDate = (e) => {
    setErragain('')
    setDefaultValue(e)
  }
  const JournalNo = (e) => {
    setJournalNo(e)
    setErrjournal()
    setmobile_journal(false)
  }
  const onchanges = (e) => {
    setThb(e)
  }

  const OnLoadData = (index) => {
    let keys = ['currency_code'];
    let values = ['USD', 'THB'];
    if (data[index].currency_code == 'LAK') {
      if (userExists('USD') == true || userExists('THB') == true) {
      } else {
        setCurrency_id('')
      }
    } else {
      let filtered_data = data.filter(d => {
        for (let key of keys) {
          for (let value of values) {
            if (d[key] == value) {
              return true;
            }
          }
        }
        return false;
      });
      setCurrency_id(filtered_data[0].currency_code)
    }
    function userExists(currency_code) {
      return data.some(function (el) {
        return el.currency_code === currency_code;
      });
    }
  }
  useEffect(() => {
    countnumber()
    currencies()
    _searchstartdate()
    onloadcurrenies();
  }, [])
  const createdata = async () => {
    let images
    setErrInforCurrency('')
    setSomething('')
    const debit = sumData('debit')
    const credit = sumData('credit')
    let journaldata;
    let maincurrency;
    if (currency_id == "THB") {
      maincurrency = thb
    } else if (currency_id == "USD") {
      maincurrency = usd
    }else{
      maincurrency= 0
    }
    if (currency_id == "USD" || currency_id == "THB") {
      if (!usd || !thb) {
        setErrExchange(true)
        return;
      }
    }
    setIsLoading(true);
    if (!file) {
      images = 0
    } else {
      let formData = new FormData();
      for (const key of Object.keys(file)) {
        formData.append("file_attachment", file[key]);
      }
      formData.append("file_attachment", file);

      let profileImageReturnName = await axios.post("/accounting/api/journal-entries/upload", formData);
      images = profileImageReturnName.data;
    }
    journaldata = {
      journal_no: journalNo,
      tr_date: defaultValue,
      currency_code: currency,
      money_rate: maincurrency,
      informdata: data,
      file_attachment: images
    }
    if (debit != credit) {
      setIsLoading(false);
      setSomething(true)
    } else {
      console.log("Insert=",journaldata)
      axios.post("/accounting/api/journal-entries/create", journaldata).then((data) => {
        onloadAutomaticGl();
        onloadtransaction()
        setErragain('')
        setShowToast(true);
      }).catch((err) => {

        let statusCode = err.response?.data?.statusCode
        console.log("statusCode=", statusCode)
        if (statusCode == '405') {
          setErrInforCurrency('405')
          return;
        } else if (statusCode == '401') {
          setErrInforCurrency('401')
          return;
        } else if (statusCode == '402') {
          setErrInforCurrency('402')
          return;
        } else if (statusCode == '403') {
          setErrInforCurrency('403')
          return;
        } else if (statusCode == '407') {
          return;
        } else if (statusCode == '409') {
          setErrjournal('409')
          return;
        } else {
          setErragain('500')
          return;
        }
      }).finally(() => {
        setIsLoading(false);
      })
    }
  }

  const ClearAllLines = () => {
    setCurrency_id('')
    setThb('')
    setUsd('')
    currencies()
    setData([...clearData])
    netTotalCrebit('')
    netTotalDebit('')
  }
  const ClearAllInsert = () => {
    setData([...clearData])
  }
  const Tessting = () => {
    console.log("mmmmmmmmmm")
  }

  const createAndNew = async () => {
    let images
    setErrInforCurrency('')
    setSomething('')
    const debit = sumData('debit')
    const credit = sumData('credit')
    let journaldata;
    let maincurrency;
    if (currency_id == "THB") {
      maincurrency = thb
    } else if (currency_id == "USD") {
      maincurrency = usd
    }
    if (currency_id == "USD" || currency_id == "THB") {
      if (!usd || !thb) {
        setErrExchange(true)
        return;
      }
    }
    setIsLoadingnew(true);
    if (!file) {
      images = 0
    } else {
      let formData = new FormData();
      for (const key of Object.keys(file)) {
        formData.append("file_attachment", file[key]);
      }
      formData.append("file_attachment", file);
      let profileImageReturnName = await axios.post("/accounting/api/journal-entries/upload", formData);
      images = profileImageReturnName.data;
    }

    journaldata = {
      journal_no: journalNo,
      tr_date: defaultValue,
      currency_code: currency,
      money_rate: maincurrency,
      informdata: data,
      file_attachment: images
    }


    if (debit != credit) {
      setIsLoadingnew(false);
      setSomething(true)
    } else {
      axios.post("/accounting/api/journal-entries/create", journaldata).then((data) => {
        onloadtransaction()
        setErragain('')
        ClearAllInsert()
        setShowToast(true);
        OnloadResetCondition();

       

      }).catch((err) => {
        let statusCode = err.response?.data?.statusCode
        console.log("statusCode=", statusCode)
        if (statusCode == '405') {
          setErrInforCurrency('405')
          return;
        } else if (statusCode == '401') {
          setErrInforCurrency('401')
          return;
        } else if (statusCode == '402') {
          setErrInforCurrency('402')
          return;
        } else if (statusCode == '403') {
          setErrInforCurrency('403')
          return;
        } else if (statusCode == '407') {
          return;
        } else if (statusCode == '409') {
          setErrjournal('409')
          return;
        } else {
          setErragain('500')
          return;
        }
      }).finally(() => {
        setIsLoadingnew(false);
      })
    }
  }

  return (
    <>
      <BrowserView>
        <div style={{ marginLeft: 20, marginRight: 20 }}>
          <div style={{
            position: 'fixed',
            paddingTop: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "space-between",
            width: '100%',
            backgroundColor: "#f8f9fa"
          }}>
            <div>
              <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
                <RestoreIcon />
                <span style={{ fontSize: 20, fontWeight: 'bold' }}>Journal EntryRecent no.{journalNo}</span>
              </div>
            </div>
            <div style={{ marginRight: 40, display: 'flex', flexDirection: 'row' }}>
              <SettingsIcon style={{ fontSize: 30, marginRight: 20, cursor: 'pointer' }} />
              <HelpOutlineIcon style={{ fontSize: 30, marginRight: 20, cursor: 'pointer' }} />
              <div onClick={openfullscreen}>
                <CloseIcon style={{ fontSize: 30, cursor: 'pointer' }} />
              </div>
            </div>
          </div>
          <div style={{ height: 100 }}></div>
          <div style={{
            position: 'fixed',
            width: '80%',
            marginLeft: 250
          }}>
            <ToastShow show={showToast} setShow={setShowToast} iconNmame={<CheckCircle size={24} style={{ marginTop: 20, color: "#EC7380" }} />} />
          </div>
          {/* {JSON.stringify(data)} */}
          <div className={classes.root} style={{ position: "absolute" }}>
            {
              errInforCurrency == '405' || errInforCurrency == '401' || errInforCurrency == '402' || errInforCurrency == '403' ?
                (
                  <>
                    <Alert variant="outlined" severity="error">
                      Transactions can have only one foreign currency at a time
                    </Alert>
                  </>) : (
                  <>
                  </>)
            }
            {
              something == true ? (
                <>
                  <Alert variant="outlined" severity="error">
                    Something's not quite right,Please check balance debits and credits.
                  </Alert>
                </>
              ) : (
                <>
                </>
              )
            }

            {
              errjournal == '409' ? (
                <>
                  <Alert variant="outlined" severity="error">
                    Please check journal no!
                  </Alert>
                </>) : (
                <>
                </>)
            }
            {
              erragain == '500' ? (
                <>
                  <Alert variant="outlined" severity="error">
                    Please check your information and try again
                  </Alert>
                </>) : (
                <>
                </>)
            }
          </div>
          <div style={{ height: 100 }}>

          </div>
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
                {listcurrency &&
                  listcurrency.map((data, index) => {
                    return (
                      <option key={index} value={data?.cy_uid}>
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
                        value={usd}
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
                        onBlur={(e) => onBlurCurrency(e.target.value, currency_id, agconvertdebit, agconvertcredit)}
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
                        value={thb}
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
              <div>

              </div>
              <div className={classes.root}>
                {
                  errExchange == true ? (
                    <>
                      <Alert severity="error" style={{ position: "absolute", marginLeft: 50, fontSize: 12, width: '100%' }}>Please enter a valid exchange rate!</Alert>
                    </>
                  ) : (
                    <>
                    </>
                  )
                }

              </div>
            </div>
          </div>
          <div style={{ height: 10 }}></div>
          <div style={{
            display: 'flex',
            flexDirection: 'row'
          }}>
            <div style={{ flex: 1 }}>
              <span>Journal date</span><br />
              <input
                type="text"
                value={defaultValue}
                onChange={(e) => defaultDate(e.target.value)}
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
                  JournalNo(e.target.value);
                }}
                value={journalNo}
              />
            </div>
          </div>
          <div style={{ height: 20 }}></div>
          {/* {data && data} */}
          {/* {console.log("data:", data)} */}
          <table width={"100%"} className='table' border="1">
            <tr style={{ border: '1px solid #ccc', height: 30 }}>
              <td align="center"></td>
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
                <RowComponent
                  Tessting={Tessting}
                  listallaccountchildren={listallaccountchildren}
                  item={item}
                  key={index}
                  index={index}
                  data={data}
                  setData={setData}
                  setCurrency_id={setCurrency_id}
                  setArray={setArray}
                  array={array}
                  setPrentid={setPrentid}
                  currency={currency}
                  thb={thb}
                  usd={usd}
                  setCurrency={setCurrency}
                  addLines={addLines}
                  changeText={changeText}
                  deletechange={deletechange}
                  copyData={copyData}
                  paste={paste}
                  showcp={showcp}
                  blurHandler={blurHandler}
                  currency_id={currency_id}
                  agconvertdebit={agconvertdebit}
                  agconvertcredit={agconvertcredit}
                  setActive={setActive}
                  active={active}
                  OnLoadData={OnLoadData}
                  sumData={sumData}
                  setNetTotalDebit={setNetTotalDebit}
                  setNetTotalCrebit={setNetTotalCrebit}
                />
              );
            })}
            <tr style={{ border: '1px solid #ccc', backgroundColor: '#f2f3f5', height: 50 }}>
              <td colSpan={3} align="right" style={{ paddingRight: 25 }}>Total</td>
              <td align="right" style={{ paddingRight: 25 }}>{debit.replaceAll('$', '')}</td>
              <td align="right" style={{ paddingRight: 25 }}>{credit.replaceAll('$', '')}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {currencystatus == "THB" ? (
              <tr style={{ border: '1px solid #ccc', backgroundColor: '#f2f3f5', height: 50 }}>
                <td colSpan={3} align="right" style={{ paddingRight: 25 }}>TotalLAK</td>
                <td align="right" style={{ paddingRight: 25 }}>{netTotalDebit.replaceAll('$', '')}</td>
                <td align="right" style={{ paddingRight: 25 }}>{netTotalCrebit.replaceAll('$', '')}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ) : (
              <></>
            )
            }
            {currencystatus == "USD" ? (
              <>
                <tr style={{ border: '1px solid #ccc', backgroundColor: '#f2f3f5', height: 50 }}>
                  <td colSpan={3} align="right" style={{ paddingRight: 25 }}>TotalLAK</td>
                  <td align="right" style={{ paddingRight: 25 }}>{netTotalDebit.replaceAll('$', '')}</td>
                  <td align="right" style={{ paddingRight: 25 }}>{netTotalCrebit.replaceAll('$', '')}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </>
            ) : (
              <></>
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
          <button style={{
            border: '1px solid #ccc',
            borderRadius: 3,
            paddingLeft: 20, paddingRight: 20,
            marginLeft: 20, backgroundColor: 'white'
          }} onClick={ClearAllLines}>Clear All </button>
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
              <div>
                <div style={{
                  border: '1px solid #ccc',
                  borderRadius: 10,
                  paddingLeft: 20,
                  paddingRight: 20,
                  marginLeft: 20,
                  height: 30,
                  color: "white",
                  cursor: "pointer",
                  paddingTop: 5
                }}
                  onClick={openfullscreen}
                >Cancel</div>

              </div>
              <div>
                <button
                  onClick={createdata}
                  onMouseOver={() => setOnFocused(true)}
                  onMouseLeave={() => setOnFocused(false)}
                  style={{
                    backgroundColor: 'white',
                    border: 'none',
                    padding: '10px 30px 10px 30px',
                    opacity: onFucused ? 0.9 : 2,
                    height: 35,
                    color: "black",
                  }} >
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
                </button>
                {/* <button
                  onClick={createAndNew}
                  onMouseOver={() => setOnSaveNew(true)}
                  onMouseLeave={() => setOnSaveNew(false)}
                  style={{
                    backgroundColor: '#0d6efd',
                    border: 'none',
                    padding: '10px 30px 10px 30px',
                    opacity: onSaveNew ? 0.9 : 2,
                    height: 35,
                    color: "white"
                  }} >
                  {!isLoadingnew ? (
                    <>
                      Save and New
                    </>
                  ) : (
                    <>
                      {
                        <Spinner animation="border" variant="light" size='sm' />
                      }
                    </>)
                  }
                </button> */}
              </div>
            </div >
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
          </div>
        </div>
      </BrowserView>
    </>
  );
}
function RowComponent({ item, Tessting, listallaccountchildren, index, copyData, paste, showcp, data, blurHandler, changeText, deletechange, addLines, setCurrency_id, setArray, array, setPrentid, usd, thb, agconvertdebit, agconvertcredit, setActive, active, OnLoadData, sumData, setNetTotalCrebit, setNetTotalDebit }) {
  const {
    listaccountname,
  } = useContext(LoginContext);
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
  const handleClickFalse = () => {
    setShowBox(false)
  }
  const getarray = (el) => {
    setArray([...array, el])
  }

  const getNameList = (c_id, inputIdex = null) => {

    axios.get(`/accounting/api/chartofaccounts/all/parents/${c_id}`).then((respone) => {
      if (respone?.data?.message.length > 0) {
        getarray(respone?.data?.parent)
        setPrentid(respone?.data.message[0].c_id);
        const names = respone?.data?.message.map((item) => {
          return item.name_eng;
        });
        names.reverse();
        if ((index % 2 != 0) && index > 0 && data[index - 1]?.debit) {
          data[index]['credit'] = data[index - 1]?.debit;
          const credit = sumData('credit')
          if (!usd) {
          } else {
            let exchange = usd.replaceAll(',', '')
            let number = parseFloat(exchange) * parseFloat(credit)
            let creditnumber = Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
            let convertcredit = creditnumber.replaceAll('$', '')
            setNetTotalCrebit(convertcredit)
          }
          if (!thb) {
          } else {
            let exchange = thb.replaceAll(',', '')
            let number = parseFloat(exchange) * parseFloat(credit)
            let creditnumber = Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
            let convertcredit = creditnumber.replaceAll('$', '')
            setNetTotalCrebit(convertcredit)
          }
        } else if ((index % 2 != 0) && index > 0) {

          data[index]['debit'] = data[index - 1]?.credit
          const debit = sumData('debit')
          if (!usd) {
          } else {
            let exchange = usd.replaceAll(',', '')
            let number = parseFloat(exchange) * parseFloat(debit)
            let creditnumber = Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
            let convertdebit = creditnumber.replaceAll('$', '')
            setNetTotalDebit(convertdebit)
          }
          if (!thb) {
          } else {
            let exchange = thb.replaceAll(',', '')
            let number = parseFloat(exchange) * parseFloat(debit)
            let creditnumber = Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
            let convertdebit = creditnumber.replaceAll('$', '')
            setNetTotalDebit(convertdebit)
          }
        }
        data[index]['c_id'] = respone?.data?.message[0].c_id
        data[index]['c_uid'] = respone?.data?.message[0].c_uid
        data[index]['account_id'] = respone?.data.message[0].account_id
        data[index]['currencies_id'] = respone?.data.message[0].currencies_id
        data[index]['parents'] = respone?.data.message[0].parents
        data[index]['conditions'] = respone?.data?.conditions[0].conditions
        data[index]['name'] = names.join(":")
        data[index]['currency_code'] = respone?.data?.message[0].currency_code
        changeText(names.join(":"), "name");
        setShowBox(!showBox);
        OnLoadData(inputIdex)
      }
    });
    if (inputIdex !== null) {
      console.log(inputIdex);
    }
    axios.get(`/accounting/api/journal-entries/selectCurrencies/${c_id}`).then((data) => {
      searchcurrencies([...data?.data?.result][0].name)
    }).catch((err) => {
      console.log(err)
    })
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
  const searchcurrencies = (currency_id) => {
    if (currency_id != "LAK") {
      setCurrency_id(currency_id)
    }
  }
  return (
    <tr style={{ border: '1px solid #ccc', height: 50 }}>
      <td align="right"><AddCircleOutlineIcon onClick={() => { addLines(index + 1) }} style={{ color: "green", width: 40, height: 40, cursor: "pointer" }} /></td>
      <td style={{ width: 30 }} align="center">
        {index + 1}
      </td>
      <td >
        <input
          value={item?.name}
          onChange={(e) => {
            _onSearchList(e.target.value);
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
              height: 200,
              paddingTop: 5,
              paddingLeft: 10,
              position: 'absolute',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column'
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
                          fontWeight: active === data?.name_eng ? "bold" : "",
                        }}
                        onClick={() => { getNameList(data?.c_id) }}
                       
                        onMouseOver={() => setActive(data?.name_eng)}
                        onMouseLeave={() => setActive(null)}
                      >
                        {data?.name_eng}

                      </span>
               

                    </>
                  );
                })}
              </>
            ) : (
              <>
                {listaccountname.map((data, index1) => {
                  return (
                    <>


                      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                        <span
                          key={index1}
                          style={{
                            cursor: "pointer",
                            fontWeight: active === data?.name_eng ? "bold" : "",
                          }}
                          onClick={() => { getNameList(data?.c_id) }}
                          onMouseOver={() => setActive(data?.name_eng)}
                          onMouseLeave={() => setActive(null)}
                        >
                          {data?.name_eng}

                        </span>
                      
                      </div>





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
          value={item?.debit}
          onBlur={(e) => blurHandler(e.target.value, "debit", index, usd, thb, agconvertdebit, agconvertcredit)}
          onChange={(e) => changeText(e.target.value, "debit", index)}
          disabled={data[index]?.credit ? true : false}
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
          value={item?.credit}
          onClick={() => handleClickFalse()}
          onBlur={(e) => blurHandler(e.target.value, "credit", index, usd, thb, agconvertdebit, agconvertcredit)}
          onChange={(e) => changeText(e.target.value, "credit", index)}
          disabled={data[index]?.debit ? true : false}
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
          onClick={() => handleClickFalse()}
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
          onClick={() => handleClickFalse()}
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
          onClick={() => handleClickFalse()}
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
          deletechange(index)
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
  );
}

function RowComponentMobile({ item, index, copyData, paste, showcp, data, blurHandler, changeText, deletechange, addLines, setCurrency_id, setArray, array, setPrentid, usd, thb, agconvertdebit, agconvertcredit, setActive, active, OnLoadData, sumData, setNetTotalCrebit, setNetTotalDebit }) {
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
  const handleClickFalse = () => {
    setShowBox(false)
  }
  const getarray = (el) => {
    setArray([...array, el])
  }
  const getNameList = (c_id, inputIdex = null) => {
    console.log("GetNameList=",c_id)
    
    

    axios.get(`/accounting/api/chartofaccounts/all/parents/${c_id}`).then((respone) => {
      if (respone?.data?.message.length > 0) {
        getarray(respone?.data?.parent)
        setPrentid(respone?.data.message[0].c_id);
        const names = respone?.data?.message.map((item) => {
          return item.name_eng;
        });
        names.reverse();
        if ((index % 2 != 0) && index > 0 && data[index - 1]?.debit) {
          data[index]['credit'] = data[index - 1]?.debit;
          const credit = sumData('credit')
          if (!usd) {
          } else {
            let exchange = usd.replaceAll(',', '')
            let number = parseFloat(exchange) * parseFloat(credit)
            let creditnumber = Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
            let convertcredit = creditnumber.replaceAll('$', '')
            setNetTotalCrebit(convertcredit)
          }
          if (!thb) {
          } else {
            let exchange = thb.replaceAll(',', '')
            let number = parseFloat(exchange) * parseFloat(credit)
            let creditnumber = Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
            let convertcredit = creditnumber.replaceAll('$', '')
            setNetTotalCrebit(convertcredit)
          }
        } else if ((index % 2 != 0) && index > 0) {

          data[index]['debit'] = data[index - 1]?.credit
          const debit = sumData('debit')
          if (!usd) {
          } else {
            let exchange = usd.replaceAll(',', '')
            let number = parseFloat(exchange) * parseFloat(debit)
            let creditnumber = Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
            let convertdebit = creditnumber.replaceAll('$', '')
            setNetTotalDebit(convertdebit)
          }
          if (!thb) {
          } else {
            let exchange = thb.replaceAll(',', '')
            let number = parseFloat(exchange) * parseFloat(debit)
            let creditnumber = Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
            let convertdebit = creditnumber.replaceAll('$', '')
            setNetTotalDebit(convertdebit)
          }
        }
        data[index]['c_id'] = respone?.data?.message[0].c_id
        data[index]['c_uid'] = respone?.data?.message[0].c_uid
        data[index]['account_id'] = respone?.data.message[0].account_id
        data[index]['currencies_id'] = respone?.data.message[0].currencies_id
        data[index]['parents'] = respone?.data.message[0].parents
        data[index]['conditions'] = respone?.data?.conditions[0].conditions
        data[index]['name'] = names.join(":")
        data[index]['currency_code'] = respone?.data?.message[0].currency_code
        changeText(names.join(":"), "name");
        setShowBox(!showBox);
        // OnLoadData(inputIdex)
      }
    });
    if (inputIdex !== null) {
      console.log(inputIdex);
    }
    axios.get(`/accounting/api/journal-entries/selectCurrencies/${c_id}`).then((data) => {
      searchcurrencies([...data?.data?.result][0].name)
    }).catch((err) => {
      console.log(err)
    })
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
  const searchcurrencies = (currency_id) => {
    if (currency_id != "LAK") {
      setCurrency_id(currency_id)
    }
  }
  return (
    <tr style={{ border: '1px solid #ccc', height: 50 }}>
      <td align="right"><AddCircleOutlineIcon onClick={() => { addLines(index + 1) }} style={{ color: "green", width: 40, height: 40, cursor: "pointer" }} /></td>
      <td style={{ width: 30 }} align="center">
        {index + 1}
      </td>
      <td >
        <input
          value={item?.name}
          onChange={(e) => {
            _onSearchList(e.target.value);
          }}
          onClick={() => setShowBox(!showBox)}
          onBlur={() => onBlurClose(active)}
          style={{
            border: '1px solid #ccc',
            outline: 'none',
            paddingLeft: 10,
            borderRadius: 3,
            height: 35,
            width: 150,
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
                        onClick={() => { getNameList(data?.c_id, index) }}
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
                        onClick={() => { getNameList(data?.c_id, index) }}
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
          value={item?.debit}
          onBlur={(e) => blurHandler(e.target.value, "debit", index, usd, thb, agconvertdebit, agconvertcredit)}
          onChange={(e) => changeText(e.target.value, "debit", index)}
          disabled={data[index]?.credit ? true : false}
          style={{
            border: '1px solid #ccc',
            outline: 'none',
            paddingLeft: 10,
            borderRadius: 3,
            height: 35,
            textAlign: "right",
            width: 150,
          }}
        />
      </td>
      <td>
        <input
          value={item?.credit}
          onClick={() => handleClickFalse()}
          onBlur={(e) => blurHandler(e.target.value, "credit", index, usd, thb, agconvertdebit, agconvertcredit)}
          onChange={(e) => changeText(e.target.value, "credit", index)}
          disabled={data[index]?.debit ? true : false}
          style={{
            border: '1px solid #ccc',
            outline: 'none',
            paddingLeft: 10,
            borderRadius: 3,
            height: 35,
            textAlign: "right",
            width: 150,
          }}
        />
      </td>
      <td>
        <input
          value={item?.description}
          onClick={() => handleClickFalse()}
          onChange={(e) => changeText(e.target.value, "description", index)}
          style={{
            border: '1px solid #ccc',
            outline: 'none',
            paddingLeft: 10,
            borderRadius: 3,
            height: 35,
            width: 150,
          }}
        />
      </td>
      <td>
        <input
          value={item?.Tax}
          onClick={() => handleClickFalse()}
          onChange={(e) => changeText(e.target.value, "Tax", index)}
          style={{
            border: '1px solid #ccc',
            outline: 'none',
            paddingLeft: 10,
            borderRadius: 3,
            height: 35,
            width: 150,
          }}
        />
      </td>
      <td>
        <input
          value={item?.Employee}
          onClick={() => handleClickFalse()}
          onChange={(e) => changeText(e.target.value, "Employee", index)}
          style={{
            border: '0.1px solid #ccc',
            outline: 'none',
            paddingLeft: 10,
            borderRadius: 3,
            height: 35,
            width: 150,
          }}
        />
      </td>
      <div style={{ display: "flex", flexDirection: "row" }}>
        < DeleteIcon style={{ height: 50, cursor: "pointer", color: "green", width: 40, height: 40 }} onClick={() => {
          deletechange(index)
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
  );
}
function ToastShow({ show, setShow, iconNmame }) {
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
function ToastShowErrJournal({ show, setShow, iconNmame }) {
  return (
    <Row>
      <Col xs={12}>
        <Toast onClose={() => setShow(false)} show={show} style={{ textAlign: 'center' }} delay={3000} autohide>
          <div>
            {iconNmame}
          </div>
          <Toast.Body>Please check journal no!</Toast.Body>
        </Toast>
      </Col>
    </Row>

  );
}
function ToastShowErrCurrency({ show, setShow, iconNmame }) {
  return (
    <Row>
      <Col xs={12}>
        <Toast onClose={() => setShow(false)} show={show} style={{ textAlign: 'center' }} delay={3000} autohide>
          <div>
            {iconNmame}
          </div>
          <Toast.Body>Transactions can have only one foreign currency at a time</Toast.Body>
        </Toast>
      </Col>
    </Row>

  );
}
function ToastShowDebitAndCredit({ show, setShow, iconNmame }) {
  return (
    <Row>
      <Col xs={12}>
        <Toast onClose={() => setShow(false)} show={show} style={{ textAlign: 'center' }} delay={3000} autohide>
          <div>
            {iconNmame}
          </div>
          <Toast.Body>Something's not quite right,Please check balance debits and credits.</Toast.Body>
        </Toast>
      </Col>
    </Row>

  );
}

function ComponentCell({ Tessting, listallaccountchildren, level, id }) {
  const [active, setActive] = useState('')
  const filter = listallaccountchildren.filter((el) => el.parents == id);
  return (<>
    {
      filter.map((items, index) => {
        return (
          <>
            <span
              key={index}
              style={{
                cursor: "pointer",
                paddingLeft: level,
                fontWeight: active === items?.account_name ? "bold" : "",
              }}

              onMouseOver={() => setActive(items?.account_name)}
              onMouseLeave={() => setActive(null)}
              // onClick={() => { getNameList(items?.c_id) }}
              onClick={() => { Tessting() }}
            >
              {items?.account_name}ggggg
            </span>
            {/* <ComponentCell1
              id={items?.c_id}
              getNameList={getNameList}
              listallaccountchildren={listallaccountchildren}
            /> */}
          </>

        )
      })
    }
  </>)
}
function ComponentCell1({ listallaccountchildren, id, getNameList }) {
  const [active, setActive] = useState('')
  const filter = listallaccountchildren.filter((el) => el.parents == id);
  return (<>
    {
      filter.map((items, index) => {
        return (
          <>
            <span
              key={index}
              style={{
                cursor: "pointer",
                paddingLeft: 50,
                fontWeight: active === items?.account_name ? "bold" : "",
              }}
              onClick={() => { getNameList(items?.c_id) }}
              onMouseOver={() => setActive(items?.account_name)}
              onMouseLeave={() => setActive(null)}
            >
              {items?.account_name}
            </span>
            <ComponentCell2
              id={items?.c_id}
              getNameList1={getNameList}
              listallaccountchildren={listallaccountchildren}
            />

          </>

        )
      })
    }
  </>)
}
function ComponentCell2({ listallaccountchildren, id, getNameList }) {
  const [active, setActive] = useState('')
  const filter = listallaccountchildren.filter((el) => el.parents == id);
  return (<>
    {
      filter.map((items, index) => {
        return (
          <>
            <span
              key={index}
              style={{
                cursor: "pointer",
                paddingLeft: 70,
                fontWeight: active === items?.account_name ? "bold" : "",
              }}
              onClick={() => { getNameList(items?.c_id) }}
              onMouseOver={() => setActive(items?.account_name)}
              onMouseLeave={() => setActive(null)}
            >
              {items?.account_name}
            </span>
            <ComponentCell3
              id={items?.c_id}
              getNameList={getNameList}
              listallaccountchildren={listallaccountchildren}
            />

          </>

        )
      })
    }
  </>)
}
function ComponentCell3({ listallaccountchildren, id, getNameList }) {
  const [active, setActive] = useState('')
  const filter = listallaccountchildren.filter((el) => el.parents == id);
  return (<>
    {
      filter.map((items, index) => {
        return (
          <>
            <span
              key={index}
              style={{
                cursor: "pointer",
                paddingLeft: 90,
                fontWeight: active === items?.account_name ? "bold" : "",
              }}
              onClick={() => { getNameList(items?.c_id) }}
              onMouseOver={() => setActive(items?.account_name)}
              onMouseLeave={() => setActive(null)}
            >
              {items?.account_name}
            </span>
            <ComponentCell4
              id={items?.c_id}
              getNameList={getNameList}
              listallaccountchildren={listallaccountchildren}
            />

          </>

        )
      })
    }
  </>)
}
function ComponentCell4({ listallaccountchildren, id, getNameList }) {
  const [active, setActive] = useState('')
  const filter = listallaccountchildren.filter((el) => el.parents == id);
  return (<>
    {
      filter.map((items, index) => {
        return (
          <>
            <span
              key={index}
              style={{
                cursor: "pointer",
                paddingLeft: 105,
                fontWeight: active === items?.account_name ? "bold" : "",
              }}
              onClick={() => { getNameList(items?.c_id) }}
              onMouseOver={() => setActive(items?.account_name)}
              onMouseLeave={() => setActive(null)}
            >
              {items?.account_name}
            </span>
            <ComponentCell5
              id={items?.c_id}
              getNameList={getNameList}
              listallaccountchildren={listallaccountchildren}
            />

          </>

        )
      })
    }
  </>)
}
function ComponentCell5({ listallaccountchildren, id, getNameList }) {
  const [active, setActive] = useState('')
  const filter = listallaccountchildren.filter((el) => el.parents == id);
  return (<>
    {
      filter.map((items, index) => {
        return (
          <>
            <span
              key={index}
              style={{
                cursor: "pointer",
                paddingLeft: 120,
                fontWeight: active === items?.account_name ? "bold" : "",
              }}
              onClick={() => { getNameList(items?.c_id) }}
              onMouseOver={() => setActive(items?.account_name)}
              onMouseLeave={() => setActive(null)}
            >
              {items?.account_name}
            </span>
            <ComponentCell6
              id={items?.c_id}
              getNameList={getNameList}
              listallaccountchildren={listallaccountchildren}
            />

          </>

        )
      })
    }
  </>)
}
function ComponentCell6({ listallaccountchildren, id, getNameList }) {
  const [active, setActive] = useState('')
  const filter = listallaccountchildren.filter((el) => el.parents == id);
  return (<>
    {
      filter.map((items, index) => {
        return (
          <>
            <span
              key={index}
              style={{
                cursor: "pointer",
                paddingLeft: 120,
                fontWeight: active === items?.account_name ? "bold" : "",
              }}
              onClick={() => { getNameList(items?.c_id) }}
              onMouseOver={() => setActive(items?.account_name)}
              onMouseLeave={() => setActive(null)}
            >
              {items?.account_name}
            </span>
            <ComponentCell5
              id={items?.c_id}
              getNameList={getNameList}
              listallaccountchildren={listallaccountchildren}
            />
          </>

        )
      })
    }
  </>)
}