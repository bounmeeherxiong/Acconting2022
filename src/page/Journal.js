import React, { useState, useContext, useEffect } from "react";
import { LoginContext } from "./contexts/LoginContext";
import { Spinner, Toast, Row, Col } from "react-bootstrap";
import CheckCircle from "@material-ui/icons/CheckCircleOutline";
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import axios from "axios";
import ErrorIcon from "@material-ui/icons/Error";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
const Journal = () => {
  const [data, setData] = useState([
    { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
    { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
    { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
    { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
  ]);
  const [journalNo, setJournalNo] = useState("")
  let [loading, setLoading] = useState(false);
  const [listcurrency, setListcurrency] = useState([]);
  const [currency_id, setCurrency_id] = useState("");
  const [thb, setThb] = useState("");
  const [usd, setUsd] = useState("");
  const [dataparrents, setDataparrents] = useState({})
  const [firstc_id, setfirstc_id] = useState("")
  const [array, setArray] = useState([])
  const [prentid, setPrentid] = useState("");
  const [currency, setCurrency] = useState("");
  const [defaultValue, setDefaultValue] = useState("")
  const Today = moment(new Date()).format("DD-MM-YYYY")
  const [currencystatus, setCurrencystatus] = useState([]);
  const [isLoading, setIsLoading,] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [something, setSomething] = useState(false);
  const [isLoadingnew, setIsLoadingnew] = useState(false);
  const [onFucused, setOnFocused] = useState(false);
  const [onSaveNew, setOnSaveNew] = useState(false);
  const [errInforCurrency, setErrInforCurrency] = useState("");
  const [showcp, setShowcp] = useState(false)
  const [copy, setCopy] = useState("")
  const [netTotalDebit, setNetTotalDebit] = useState("")
  const [netTotalCrebit, setNetTotalCrebit] = useState("")
  const addMore = () => {
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
  

  const resetlines = () => {
    let oldarray = [...data]
    oldarray.splice(data, 1)
    setData([...oldarray])
  }
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
  const onChangeTextCurrency = (value, key) => {
    if (key == "USD" || key == "THB") {
      setUsd(value)
      setThb(value)
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
      object[key] = value != '' ? Intl.NumberFormat().format(parseInt(value.replaceAll(',', ''))) : '';
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
    const cloneData = [...data]
    cloneData.splice(index, 1, { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' })
    setData([...cloneData])
  }
  const OnloadSelectCurrencies = (e) => {
    setCurrency(e)
    axios.get(`/accounting/api/chartofaccounts/currency/${e}`).then((data) => {
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
    if (defaultValue == "") {
      setDefaultValue(Today)
    } else {
      setDefaultValue(moment(e).format("DD-MM-YYYY"))
    }
  }
  const onchanges = (e) => {
    setThb(e)
  }
  useEffect(() => {
    countnumber()
    currencies()
    _searchstartdate()
    onloadcurrenies();
  }, [])
  const createdata = () => {
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
    setIsLoading(true);
    journaldata = {
      journal_no: journalNo,
      tr_date: defaultValue,
      currency_code: currency,
      money_rate: maincurrency,
      informdata: data,
    }

    if (debit != credit) {
      setIsLoading(false);
      setSomething(true)
    } else {
      axios.post("/accounting/api/journal-entries/create", journaldata).then((data) => {
        countnumber();
        setThb('')
        setUsd('')
        setDefaultValue('')
        setShowToast(true);
      }).catch((err) => {
        let statusCode = err.response?.data?.statusCode
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
        }
      }).finally(() => {
        setIsLoading(false);

      })
    }
  }

  return (
    <>
      <div>
        <div style={{
          position: 'fixed',
          width: '80%',
          marginLeft: 250

        }}>
          <ToastShow show={showToast} setShow={setShowToast} iconNmame={<CheckCircle size={24} style={{ marginTop: 20, color: "#EC7380" }} />} />
        </div>

        {/* {JSON.stringify(data)} */}
        {/* {JSON.stringify(currency)} */}
        {
          errInforCurrency == '405' || errInforCurrency == '401' || errInforCurrency == '402' || errInforCurrency == '403' ?
            (<>
              <div style={{ border: '1px solid red', width: 500, marginLeft: 200, marginTop: 58, position: "absolute" }}
              >
                <ErrorIcon style={{ color: "red", width: 40, height: 40 }} />
                <small style={{ fontSize: 20, marginLeft: 10, color: "red" }}>
                  Something's not quite right</small> < br />
                <small style={{ marginLeft: 10 }}>Transactions can have only one foreign currency at a time</small></div>

            </>) : (
              <>

              </>)
        }
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
            {currency_id == "LAK" ?

              (
                <>
                  {/* <div style={{
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
                  </div> */}
                </>
              ) : (
                <>
                </>
              )
            }
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
                item={item}
                key={index}
                index={index}
                data={data}
                setData={setData}
                setCurrency_id={setCurrency_id}
                setDataparrents={setDataparrents}
                setfirstc_id={setfirstc_id}
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
          {currencystatus == "THB" ? (
            <tr style={{ border: '1px solid #ccc', backgroundColor: '#f2f3f5', height: 50 }}>
              <td colSpan={2} align="right" style={{ paddingRight: 25 }}>TotalLAK</td>
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
                <td colSpan={2} align="right" style={{ paddingRight: 25 }}>TotalLAK</td>
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
        }} onClick={resetlines}>Clear All </button>

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
              <button style={{
                border: '1px solid #ccc',
                borderRadius: 3,
                paddingLeft: 20,
                paddingRight: 20,
                marginLeft: 250,
                backgroundColor: 'white',
                height: 30
              }} >Cancel</button>

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

              <button

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
              </button>

            </div>


          </div >
        </div>
      </div>
    </>

  );
};

function RowComponent({ item, index, copyData, paste, showcp, data, blurHandler, changeText, deletechange, addLines, setCurrency_id, setDataparrents, setArray, array, setPrentid, usd, thb, agconvertdebit, agconvertcredit }) {
  const { listaccountname } = useContext(LoginContext);
  const [searchResult, setSearchResult] = useState([]);
  const [active, setActive] = useState("");
  const [showBox, setShowBox] = useState(false);
  const handleClick = () => {
    setShowBox(!showBox);
  };
  const getarray = (el) => {
    setArray([...array, el])
  }
  const getNameList = (c_id, inputIdex = null) => {
    axios.get(`/accounting/api/chartofaccounts/all/parents/${c_id}`).then((respone) => {
      console.log(respone?.data?.conditions[0].conditions)
      if (respone?.data?.message.length > 0) {
        setDataparrents(respone?.data?.parent)
        getarray(respone?.data?.parent)
        setPrentid(respone?.data.message[0].c_id);
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
        data[index]['currencies_id'] = respone?.data.message[0].currencies_id
        data[index]['parents'] = respone?.data.message[0].parents
        data[index]['conditions'] = respone?.data?.conditions[0].conditions
        data[index]['name'] = names.join(":")
        changeText(names.join(":"), "name");
        setShowBox(!showBox);
      }
    });

    if (inputIdex !== null) {
      console.log(inputIdex);
    }
    axios.get(`/accounting/api/journal-entries/selectCurrencies/${c_id}`).then((data) => {
      searchcurrencies([...data?.data.result][0].name)
      console.log("currency=",[...data?.data.result][0].name)
    }).catch((err) => {
      console.log(err)
    })
  };
  const _onSearchList = (e) => {
    data[index]['name'] = e
    let searchName = listaccountname.filter((el) => el.name_eng.includes(e));
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
            textAlign: "right"
          }}
        />
      </td>
      <td>
        <input
          value={item?.credit}
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


export default Journal;


