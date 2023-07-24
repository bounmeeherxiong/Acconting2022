import React, { useState, useContext, useEffect, useRef } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import CheckCircle from "@material-ui/icons/CheckCircleOutline";
import SearchIcon from "@material-ui/icons/Search";
import { Modal, Spinner, Toast, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { LoginContext } from "./contexts/LoginContext";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useNavigate } from "react-router-dom";
import { getFormatNumber } from "../constants/functions"
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import ErrorIcon from "@material-ui/icons/Error";
import moment, { months, now } from 'moment';
import IconButton from '@material-ui/core/IconButton';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ReactPaginate from "react-paginate";
import PrintIcon from '@material-ui/icons/Print';
import ReactToPrint from "react-to-print";
import WarningIcon from '@material-ui/icons/Warning';
import { Button } from "@material-ui/core";
// import PrintChartAccounts from "../components/PrintChartAccounts";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    width: '100%',
    maxWidth: 200,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
export default function ChartAccounts() {
  let componentRef = useRef(null)
  const navigate = useNavigate();
  const Gotodetailaccount = (id) => {
    navigate(`/ReportGL/${id}`);
  }
  const Gotohistory = (id) => {
    navigate(`/History/${id}`)
  }
  const [show, setShow] = useState(false);
  const classes = useStyles();
  const handleClose = () => {
    setShow(false);
    setAc_type("");
    setShowUpdate(false);
    setName("");
    setDescription("");
    setTypedetail("");
    setPrentid("");
    setNameShow("");
    setIsDisabled(false);
    setDisblebtn(false);
    setNameShow("");
    setShowBox(false);
    setChecked("");
    setRadiocredit(false);
    setRadiodebit(false);
    setBeginningbalance(false);
    setOpen(false);
    setBalancelak('')
    setCurrencystatus('')
    setBalance('')
    setErrorcurrency('')
    setErrorparrens('')
    setAlready('')
    setErrexchangeRate('')
    setCheckdebitcredit('')
    setValuedate('')
    setExchangeRate('')
    setCheckDisabled(false)
  };
  const handleShow = () => setShow(true);
  const [ac_type, setAc_type] = useState("");
  const [errac_type, setErrac_type] = useState(false);
  const [errname, setErrname] = useState(false);
  const [errbank, setErrbank] = useState(false)
  const [errselectcurrency, setErrselectcurrency] = useState(false)
  const [typedetail, setTypedetail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [opening_status, setOpening_status] = useState("")
  const [errorcurrency, setErrorcurrency] = useState(false)
  const [errorparrens, setErrorparrens] = useState(false)
  const [already, setAlready] = useState(false)
  const [prentid, setPrentid] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [nameShow, setNameShow] = useState("");
  const [showBox, setShowBox] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [active, setActive] = useState("");
  const [disblebtn, setDisblebtn] = useState(true);
  const [listaccountid, setListaccountid] = useState([])
  const [uid, setUid] = useState([])
  const [listaccountname, setListaccountname] = useState([])
  const [open1, setOpen1] = useState(true);
  const [checked, setChecked] = useState([]);
  const [currency, setCurrency] = useState("");
  const [listcurrency, setListcurrency] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [radiodebit, setRadiodebit] = useState(false);
  const [beginningBalance, setBeginningbalance] = useState(false)
  const [radiocredit, setRadiocredit] = useState(false);
  const [balance, setBalance] = useState("0");
  const [balancelak, setBalancelak] = useState("0");
  const [currencystatus, setCurrencystatus] = useState([]);
  const [editbank_id, setEditbank_id] = useState('')
  const [editbank_name, setEditbank_name] = useState('')
  const [open, setOpen] = useState(false);
  const [exchangeRate, setExchangeRate] = useState("0")
  const [debit, setDebit] = useState("");
  const [credit, setCredit] = useState("");
  const [idaccountType, setIdaccountType] = useState([])
  const [nameaccountType, setNameaccountType] = useState([])
  const [getid, setGetid] = useState("")
  const [ledgerid, setLedgerid] = useState("")
  const [parent, setParent] = useState("")
  const [search, setSearch] = useState([])
  const [defaultValue, setDefaultValue] = useState("")
  const Today = moment(new Date()).format("DD-MM-YYYY")
  const [onFucused, setOnFocused] = useState(false);
  const [onClose, setOnClose] = useState(false);
  const [onSaveNew, setOnSaveNew] = useState(false);
  const [isLoading, setIsLoading,] = useState(false);
  const [isLoadingnew, setIsLoadingnew] = useState(false);
  const [isLoadingupdating, setIsLoadingupdating] = useState(false)
  const [showToast, setShowToast] = useState(false);
  const [secondSearch, setSecondSearch] = useState([]);
  const [errexchangeRate, setErrexchangeRate] = useState(false);
  const [checkdebitcredit, setCheckdebitcredit] = useState(false);
  const [errcheckdebitcredit, seterrcheckdebitcredit] = useState(false)
  const [errchildren, setErrchildren] = useState("")
  const [errvalidate, setErrvalidate] = useState("")
  const [errbalance, setErrbalance] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [checkDisabled, setCheckDisabled] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [bank, setBank] = useState([]);
  const [listbank, setListbank] = useState("");
  const [valuedate, setValuedate] = useState("")
  const [errvaluedate, setErrvaluedate] = useState(false)
  const [conditionsdata, setConditionsdata] = useState(false)
  const [levels_one, setLevels_one] = useState([])
  const [levels_two, setLevels_two] = useState([])
  const [levels_three, setLevels_three] = useState([])
  const [levels_four, setLevels_four] = useState([])
  const [levels_five, setLevels_five] = useState([])
  const [levels_six, setLevels_six] = useState([])
  const [levels_seven, setLevels_seven] = useState([])
  const [levels_eight, setLevels_eight] = useState([])
  const [levels_nine, setLevels_nine] = useState([])
  const [levels_ten, setLevels_ten] = useState([])
  const [firstdatachartofaccount, setFirstdatachartofaccount] = useState([])
  const [seconddatachartofaccount, setSeconddatachartofaccount] = useState([])
  const [searchlevels_zero, setSearchlevels_zero] = useState([])
  const [sublevels_one, setSublevels_one] = useState([])
  const [sublevels_two, setSublevels_two] = useState([])
  const [sublevels_three, setsublevels_three] = useState([])
  const [sublevels_four, setSublevels_four] = useState([])
  const [sublevels_five, setSublevels_five] = useState([])
  const [sublevels_six, setSublevels_six] = useState([])
  const [sublevels_senven, setSublevels_senven] = useState([])
  const [sublevels_eight, setSublevels_eight] = useState([])
  const [sublevels_nine, setSublevels_nine] = useState([])
  const [sublevels_ten, setSublevels_ten] = useState([])

  const [showleave, setShowleave] = useState(false);
  const [c_uid, setC_uid] = useState('')
  const {
    onloadallaccount,
    listallaccount,
    setListallaccount,
    listallaccountchildren,
    onloadreportGl,
    chartofaccountslevels_one,
    chartofaccountslevels_two,
    chartofaccountslevels_three,
    chartofaccountslevels_four,
    chartofaccountslevels_five,
    chartofaccountslevels_six,
    chartofaccountslevels_seven,
    chartofaccountslevels_eight,
    chartofaccountslevels_nine,
    chartofaccountslevels_ten
  } = useContext(LoginContext);

  const bulletinsPerPage = 25;
  const pagesVisited = pageNumber * bulletinsPerPage;
  const pageCount = Math.ceil(
    listallaccount.filter((listallaccount) => {
      if (searchTerm === "") {
        return listallaccount;
      } else if (
        listallaccount.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return listallaccount;
      }
      return false;
    }).length / bulletinsPerPage
  );
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const functionCheckDebit = (e) => {
    setDebit(e)
    setCheckdebitcredit(true)
    seterrcheckdebitcredit(false)
  }
  const handleLeaveClosedel = () => {
    setShowleave(false)
  }

  const handleShowDelelete = (e) => {
    setC_uid(e)
    setShowleave(true)
  };

  const functionCheckCredit = (e) => {
    setCredit(e)
    setCheckdebitcredit(true)
    seterrcheckdebitcredit(false)
  }
  const functionCheck = (e) => {
    if (e == 1) {
      setCheckDisabled(true)
      setDisblebtn(true)

    } else {
      setCheckDisabled(false)
    }

  }
  const checkedtrue = () => {
    if (nameShow.length > 0) {

    } else {
      setIsDisabled(true)
      setDisblebtn(false);
    }
  }
  const handleChange = event => {
    if (event.target.checked) {
      setDisblebtn(false);
      console.log("true")
      setPrentid(prentid)

    } else {
      setDisblebtn(true);
      console.log("false")
      setPrentid('')


    }
    setIsSubscribed(current => !current);
  };
  const Onloadbank = () => {
    axios.get('/accounting/api/bank/all').then((data) => {
      setBank([...data?.data?.result])
    }).catch((err) => {
      console.log(err)
    })
  }

  const {
    listaccountType,
    onloadaccountlistname
  } = useContext(LoginContext);
  useEffect(() => {
    SearchAccount();

    if (ac_type != null) {
      listsubaccountname(ac_type);
      _onshowcreatestatus(ac_type);
    }
    currencies();
    onloadallaccount();
    Onloadbank();
  }, [ac_type]);

  const _ongetCurrencyvalues = (e) => {
    console.log("e=", e)

    setErrselectcurrency('')
    setErrorcurrency('')
    setCurrency(e)
    axios.get(`/accounting/api/chartofaccounts/currency/${e}`).then((data) => {


      setCurrencystatus([...data?.data?.result][0].cy_code)
    }).catch((err) => {
      console.log(err)
    })
  }
  const _ongetBanckvalues = (e) => {

    setListbank(e)
    axios.get(`/accounting/api/bank/one/${e}`).then((data) => {
      console.log("ed=", data?.data?.result?.bank_name)


      setEditbank_id(data?.data?.result?.bank_id)
      setEditbank_name(data?.data?.result?.bank_name)

    }).catch((err) => {
      console.log(err)
    })
  }
  const _onshowcreatestatus = (ac_type) => {
    if (!ac_type) {
    } else {
      axios.get(`/accounting/api/chartofaccounts/accountSymbol/${ac_type}`).then((data) => {
        setChecked([...data?.data?.result][0].createstatus)
        // if([...data?.data?.result][0].createstatus == "In" || [...data?.data?.result][0].createstatus == "Ex"){
        //   setCheckDisabled(true)
        // }

      }).catch((err) => {
        console.log(err)
      })
    }
  }
  const _oneditshowcurrency = (id) => {
    // axios.get(`/accounting/api/chartofaccounts/allCurrency/${id}`).then((data) => {
    //   console.log([...data?.data?.result])
    //   // setCurrency([...data?.data?.result][0].cy_id)
    //   // setCurrencyid([...data?.data?.result][0].cy_id)
    //   setCurrencyname([...data?.data?.result[0].cy_code])
    // }).catch((err) => {
    //   console.log(err)
    // })
  }
  const listsubaccountname = (ac_type) => {
    console.log("dddd=", ac_type)
    if (!ac_type) {
    } else {
      axios.get(`/accounting/api/chartofaccounts/all/${ac_type}`).then((data) => {
        setListaccountname([...data?.data.result])
        console.log("ListAccounting=", [...data?.data?.result])
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  const changeText = (e) => {
    setErrexchangeRate('')
    // const value = e.target.value.replace(/\D/g, '');
    const value = e.toString().replaceAll(',', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    setExchangeRate(value)
  };
  const OnblurChangeText = (e) => {
    let number = e.replaceAll(',', '')
    let rate = e.toString().replaceAll(',', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    // let format_number = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
    // let rate = format_number.replaceAll('$', '')
    setExchangeRate(rate)
    let sum = parseFloat(rate.replaceAll(',', '') * parseFloat(balance.replaceAll(',', '')))
    let sumbalancelak = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(sum)
    setBalancelak(sumbalancelak.replaceAll('$', ''))
  }
  const changeTextbalance = (e) => {
    setErrbalance('')

    // const value = e.target.value.replace(/\D/g, '');
    const value = e.toString().replaceAll(',', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    setBalance(value)
  };
  const OnblurTextbalance = (e) => {
    let number = e.replaceAll(',', '')
    let rate = e.toString().replaceAll(',', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    // let format_number = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
    // let rate = format_number.replaceAll('$', '')
    // console.log("rate=", rate)
    setBalance(rate)
    let sum = parseFloat(rate.replaceAll(',', '') * parseFloat(exchangeRate.replaceAll(',', '')))
    let sumbalancelak = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(sum)
    if (!exchangeRate) {
      setBalancelak("0.00")
    } else {
      setBalancelak(sumbalancelak.replaceAll('$', ''))
    }

  }
  const currencies = () => {
    axios.get("/accounting/api/currencies").then((data) => {

      setListcurrency([...data?.data.result])
    }).catch((err) => {
      console.log(err)
    })
  }
  const SearchAccount = () => {
    axios
      .get(`/accounting/api/chartofaccounts/all/account`)
      .then((data) => {
        setListaccountid([...data?.data?.result])
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const BeginningBalance = e => {
    if (e.target.checked) {
      setConditionsdata(true)
    } else {
      setBalancelak('')
      setBalance('')
      setRadiodebit(false)
      setRadiocredit(false)
      setExchangeRate('')
      setDebit('')
      setCredit('')
      setConditionsdata(false)
    }
  }
  const editaccountype = (ac_type) => {
    axios.get(`/accounting/api/chartofaccounts/accountsType/${ac_type}`).then((data) => {
      setAc_type([...data?.data?.result][0].ac_type)
      setIdaccountType([...data?.data?.result][0].ac_type)
      setNameaccountType([...data?.data?.result][0].typename)
    }).catch((err) => {
      console.log(err)
    })
  }
  const _searchstartdate = (e) => {
    setValuedate(e)
    setErrvaluedate(false)
  }
  const OnData = (e) => {
    setDefaultValue(moment(e).format("DD-MM-YYYY"))
  }
  const Ondataupdate = (e) => {
    setValuedate(e)
  }
  const editbeginningbalanceSecond = (e) => {

    setGetid(e)
    axios.get(`/accounting/api/chartofaccounts/openingData/${e}`).then((data) => {

      functionCheck([...data?.data?.editCondition][0])
      let daIn = [...data?.data?.result][0].createdate
      setDefaultValue(moment(daIn).format("DD-MM-YYYY"))
      setLedgerid([...data?.data?.result][0].lg_id)
      setOpening_status([...data?.data?.result][0].BeginningBalance)
      if ([...data?.data?.result][0].BeginningBalance == "0") {
        setBeginningbalance(true);
        setOpen(true)
      } else {
        setOpening_status("1")
      }

      let money_rate = [...data?.data?.result][0].ExchangeRate.toString().replaceAll(',', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

      setExchangeRate(money_rate)

      if ([...data?.data?.result][0].currencystatus == "USD" || [...data?.data?.result][0].currencystatus == "THB") {
        setBalance(getFormatNumber([...data?.data?.result][0].balancescurrency.replaceAll("-", '')))
        let BalanceaLL = parseFloat([...data?.data?.result][0].ExchangeRate) * parseFloat([...data?.data?.result][0].balancescurrency)
        setBalancelak(getFormatNumber(BalanceaLL))
      } else {
        setBalance(getFormatNumber([...data?.data?.result][0].balances.replaceAll("-", '')))
      }
      if ([...data?.data?.result][0].debit_and_credit == "1") {
        setRadiodebit(true)
      } else if ([...data?.data?.result][0].debit_and_credit == "2") {
        setRadiocredit(true)
      } else {
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  const editbeginningbalancefirst = (e) => {
    setGetid(e)
    axios.get(`/accounting/api/chartofaccounts/openingData/${e}`).then((data) => {
      functionCheck([...data?.data?.editCondition][0])
      if ([...data?.data?.result].length == 0) {
      } else {
        let daIn = [...data?.data?.result][0].createdate
        setDefaultValue(moment(daIn).format("DD-MM-YYYY"))
        setLedgerid([...data?.data?.result][0].lg_id)
        setOpening_status([...data?.data?.result][0].BeginningBalance)
        if ([...data?.data?.result][0].BeginningBalance == "0") {
          setBeginningbalance(true);
          setOpen(true)
        } else {
          setOpening_status("1")
        }
        let money_rate = [...data?.data?.result][0].ExchangeRate.toString().replaceAll(',', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

        // setExchangeRate(getFormatNumber([...data?.data?.result][0].ExchangeRate))
        setExchangeRate(money_rate)
        if ([...data?.data?.result][0].currencystatus == "USD" || [...data?.data?.result][0].currencystatus == "THB") {
          setBalance(getFormatNumber([...data?.data?.result][0].balancescurrency.replaceAll("-", '')))
          setBalancelak(getFormatNumber(parseFloat([...data?.data?.result][0].ExchangeRate) * parseFloat([...data?.data?.result][0].balancescurrency)))
        } else {
          setBalance(getFormatNumber([...data?.data?.result][0].balances.replaceAll("-", '')))
        }
        if ([...data?.data?.result][0].debit_and_credit == "1") {
          setRadiodebit(true)
        } else if ([...data?.data?.result][0].debit_and_credit == "2") {
          setRadiocredit(true)
        } else {
        }
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  const TextonChange = (e) => {
    setAlready("")
    setErrname(false)
    setName(e)
  }
  // funcction Delete
  const DeletedChartAaccount = (c_id) => {
    console.log("delete=", c_id)

    axios.delete(`/accounting/api/chartofaccounts/delete/${c_id}`).then((data) => {

      onloadallaccount();
      handleLeaveClosedel()

    }).catch((err) => {
      console.log(err)
    })

  }
  // function CreateChartAccount
  const CreateChartAccount = () => {

    let createdate;

    if (!ac_type) {
      setErrac_type(true)
      return;
    }
    if (!name) {
      setErrname(true)
      return;
    }


    let data;
    let stutas;
    if (radiodebit == true) {
      stutas = '1'
    } else if (radiocredit == true) {
      stutas = '2'
    } else {
      stutas = '0'
    }
    let openingbalance;
    if (!balance) {
      openingbalance = '0'
    } else {
      openingbalance = '1'
    }
    if (checked == 'As' || checked == 'li' || checked == 'Eq') {
      if (!currency) {
        setErrselectcurrency(true)
        return;
      }
    }
    if (conditionsdata == false) {
      const currentdate = new Date();
      createdate = moment(currentdate).format('DD-MM-YYYY')
    } else {
      createdate = moment(valuedate).format("DD-MM-YYYY")
    }
    if (open == true) {
      if (currencystatus == 'USD' || currencystatus == 'THB') {
        if (!exchangeRate) {
          setErrexchangeRate(true)
          return;
        } else if (exchangeRate == '0.00') {
          setErrexchangeRate(true)
          return;
        }
        if (!valuedate) {
          setErrvaluedate(true)
          return;
        }
        if (checkdebitcredit == false || checkdebitcredit == false) {
          seterrcheckdebitcredit(true)
          return;
        }
        if (balance == '0.00') {
          setErrbalance(true)
          return;
        }
        if (!listbank) {
          setErrbank(true)
          return;
        }
      } else {
        if (balance == '0.00') {
          setErrbalance(true)
          return;
        }
        if (checkdebitcredit == false || checkdebitcredit == false) {
          seterrcheckdebitcredit(true)
          return;
        }
      }
    }
    setIsLoading(true);
    data = {
      ac_type: ac_type,
      name_eng: name.trim(),
      company: "",
      c_desc: description,
      parents: prentid,
      c_balance: balance,
      c_date: createdate,
      balance_status: stutas,
      opening_status: openingbalance,
      accountid: uid,
      currency_uid: currency,
      c_rate: exchangeRate,
      bank_id: listbank
    }
    console.log("Insert data=", data)
    axios
      .post("/accounting/api/chartofaccounts/create", data)
      .then((data) => {
        onloadallaccount();
        onloadreportGl();
        setAc_type('');
        setShowUpdate(false);
        setConditionsdata(false)
        setName('');
        setDescription('');
        setTypedetail('');
        setPrentid('');
        setNameShow('');
        setIsDisabled(false);
        setDisblebtn(true);
        onloadaccountlistname();
        setCurrency('')
        setBeginningbalance(false);
        setRadiocredit('');
        setRadiodebit('');
        setOpen('');
        setCurrencystatus('');
        setBalance('');
        setBalancelak('');
        setErrexchangeRate('')
        setCheckdebitcredit('')
        setExchangeRate('')
        setShowToast(true);
        setDebit('')
        credit('')
        setListbank('')

      }
      ).catch((err) => {
        console.log(err)
        const statusCode = err.response.data.statusCode
        if (statusCode == '400') {
          setAlready("")
          setErrorcurrency(statusCode)
        } else if (statusCode == '409') {
          setAlready(statusCode)
          setCurrency("")
        } else if (statusCode == '402') {
          setErrorparrens(statusCode)
        } else if (statusCode == '102') {

        } else if (statusCode == '407') {

        } else if (statusCode == '410') {
          setErrvalidate('410')
          return;
        }
      }).finally(() => {
        setIsLoading(false);
      })
  };

  // this functions is add close and new
  const CreateAddnewChartAccount = () => {
    let createdate;

    if (!ac_type) {
      setErrac_type(true)
      return;
    }
    if (!name) {
      setErrname(true)
      return;
    }

    let data;
    let stutas;
    if (radiodebit == true) {
      stutas = '1'
    } else if (radiocredit == true) {
      stutas = '2'
    } else {
      stutas = '0'
    }
    let openingbalance;
    if (!balance) {
      openingbalance = '0'
    } else {
      openingbalance = '1'
    }
    if (checked == 'As' || checked == 'li' || checked == 'Eq') {
      if (!currency) {
        setErrselectcurrency(true)
        return;
      }
    }
    if (conditionsdata == false) {
      const currentdate = new Date();
      createdate = moment(currentdate).format('DD-MM-YYYY')
    } else {
      createdate = moment(valuedate).format("DD-MM-YYYY")
    }
    if (open == true) {
      if (currencystatus == 'USD' || currencystatus == 'THB') {
        if (!exchangeRate) {
          setErrexchangeRate(true)
          return;
        } else if (exchangeRate == '0.00') {
          setErrexchangeRate(true)
          return;
        }
        if (!valuedate) {
          setErrvaluedate(true)
          return;
        }
        if (checkdebitcredit == false || checkdebitcredit == false) {
          seterrcheckdebitcredit(true)
          return;
        }
        if (balance == '0.00') {
          setErrbalance(true)
          return;
        }
        if (!listbank) {
          setErrbank(true)
          return;
        }
      } else {
        if (balance == '0.00') {
          setErrbalance(true)
          return;
        }
        if (checkdebitcredit == false || checkdebitcredit == false) {
          seterrcheckdebitcredit(true)
          return;
        }
      }
    }
    setIsLoadingnew(true);
    data = {
      ac_type: ac_type,
      name_eng: name.trim(),
      company: "",
      c_desc: description,
      parents: prentid,
      c_balance: balance,
      c_date: createdate,
      balance_status: stutas,
      opening_status: openingbalance,
      accountid: uid,
      currency_uid: currency,
      c_rate: exchangeRate,
      bank_id: listbank
    }
    axios
      .post("/accounting/api/chartofaccounts/create", data)
      .then((data) => {
        handleClose(false)
        onloadallaccount();
        onloadreportGl();
        setAc_type('');
        setShowUpdate(false);
        setName('');
        setDescription('');
        setTypedetail('');
        setPrentid('');
        setNameShow('');
        setIsDisabled(false);
        setDisblebtn(true);
        onloadaccountlistname();
        setCurrency('')
        setBeginningbalance(false);
        setRadiocredit('');
        setRadiodebit('');
        setOpen('');
        setCurrencystatus('');
        setBalance('');
        setBalancelak('');
        setErrexchangeRate('')
        setCheckdebitcredit('')
        setExchangeRate('')
        setShowToast(true);
        setDebit('')
        credit('')
        setListbank('')
      }
      ).catch((err) => {
        console.log(err)
        const statusCode = err.response.data.statusCode
        console.log("statusCode=", statusCode)
        if (statusCode == '400') {
          setAlready("")
          setErrorcurrency(statusCode)
        } else if (statusCode == '409') {
          setAlready(statusCode)
          setCurrency("")
        } else if (statusCode == '402') {
          setErrorparrens(statusCode)
        } else if (statusCode == '102') {

        } else if (statusCode == '407') {

        } else if (statusCode == '410') {
          setErrvalidate('410')
          return;
        }
      }).finally(() => {
        setIsLoadingnew(false);
      })



  };
  const Updatechartofaccount = () => {
    let data;
    let stutas;
    let createdate;
    if (defaultValue.length == 0) {
      if (conditionsdata == false) {
        const currentdate = new Date();
        createdate = moment(currentdate).format('DD-MM-YYYY')
      } else {
        createdate = moment(valuedate).format('DD-MM-YYYY')
      }
    } else {
      createdate = defaultValue
    }
    if (radiodebit == true) {
      stutas = '1'
    } else if (radiocredit == true) {
      stutas = '2'
    } else {
      stutas = '0'
    }
    setIsLoadingupdating(true)
    data = {
      getid: getid,
      ac_type: ac_type,
      name_eng: name,
      c_desc: description,
      accountid: uid,
      parents: prentid,
      c_balance: balance,
      c_rate: exchangeRate,
      c_date: createdate,
      balance_status: stutas,
      opening_status: opening_status,
      lg_id: ledgerid,
      currency_uid: currency,
      bank_id: listbank
    }

    axios.post("/accounting/api/chartofaccounts/update", data).then((data) => {
      handleClose(false)
      onloadallaccount();
      onloadaccountlistname();
      setDefaultValue('')
      setCheckDisabled(false)
    }).catch((err) => {
      const statusCode = err.response.data.statusCode
      if (statusCode == "408") {
        setErrchildren("408")
      } else if (statusCode == "410") {
      } else if (statusCode == '400') {
        setAlready("")
        setErrorcurrency(statusCode)
        return;
      } else if (statusCode == '409') {
        setAlready(statusCode)
        setCurrency("")
        return;
      } else if (statusCode == '402') {
        setErrorparrens(statusCode)
      } else if (statusCode == '102') {
      }
    }).finally(() => {
      setIsLoadingupdating(false)
    })
  }

  const getNameList = (c_id) => {
    axios.get(`/accounting/api/chartofaccounts/all/parents/${c_id}`).then((data) => {
      if (data?.data?.message.length > 0) {
        setPrentid(data?.data.message[0].parents)
        const names = data?.data?.message.map((item) => {
          return item.name_eng;
        });
        names.reverse();
        setNameShow(names.join(":"));
        // setShowBox(!showBox);
      }
    });
  };
  const getNameList1 = (c_id) => {
    axios.get(`/accounting/api/chartofaccounts/all/parents/${c_id}`).then((data) => {
      if (data?.data?.message.length > 0) {
        setPrentid(data?.data.message[0].c_id);
        setParent(data?.data.message[0].parents)
        const names = data?.data?.message.map((item) => {
          return item.name_eng;
        });

        names.reverse();
        setNameShow(names.join(":"));
        setShowBox(!showBox);
      }
    });
  };
  const getstutas = (c_id) => {
    setChecked('')
    axios.get(`/accounting/api/chartofaccounts/selectStatus/${c_id}`).then((data) => {
      setChecked([...data?.data?.result][0].createstatus)
    });
  }
  const _onsearchaccountid = (ac_type) => {
    setAc_type(ac_type)
    setErrac_type(false)
    let id = listaccountid.filter((el) => el.uid.includes(ac_type));
    setUid([...id][0].main_type)
    axios.get(`/accounting/api/chartofaccounts/getaccountdata/${ac_type}`).then((data) => {
      setFirstdatachartofaccount([...data?.data?.GetChartOfAaccountFirstFloor])
      setSeconddatachartofaccount([...data?.data?.GetChartOfAaccountSecondFloor])

    }).catch((err) => {
      console.log(err)
    })
    axios.get(`/accounting/api/chartofaccounts/getsublevels/${ac_type}`).then((data) => {

      setSublevels_one([...data?.data?.sub_one])
      setSublevels_two([...data?.data?.sub_two])
      setsublevels_three([...data?.data?.sub_three])
      setSublevels_four([...data?.data?.sub_four])
      setSublevels_five([...data?.data?.sub_five])
      setSublevels_six([...data?.data?.sub_six])
      setSublevels_senven([...data?.data?.sub_seven])
      setSublevels_eight([...data?.data?.sub_eight])
      setSublevels_nine([...data?.data?.sub_nine])
      setSublevels_ten([...data?.data?.sub_ten])




    }).catch((err) => {
      console.log(err)
    })
  }

  const _onBank = (e) => {
    setListbank(e)
    setErrbank(false)
  }
  const _onSearchList = (e) => {
    setNameShow(e);

    let searchName = listaccountname.filter((el) => el.name_eng.toLowerCase().includes(e.toLowerCase()));
    console.log("Search=", searchName)
    let searchName1 = firstdatachartofaccount.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));

    let sub_one = sublevels_one.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    console.log("sublevels_one=", sublevels_one)

    let sub_tow = sublevels_two.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    let sub_three = sublevels_three.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    let sub_four = sublevels_four.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    let sub_five = sublevels_five.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    let sub_six = sublevels_six.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    let sub_senven = sublevels_senven.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    let sub_eight = sublevels_eight.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    let sub_nine = sublevels_nine.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    let sub_ten = sublevels_ten.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    console.log("sub_TEn=", sub_ten)

    if (!e) {
      setSearchResult([]);
    } else {
      setSearchResult([...searchName])
      setFirstdatachartofaccount([...searchName1])
      setSublevels_one([...sub_one])
      setSublevels_two([...sub_tow])
      setsublevels_three([...sub_three])
      setSublevels_four([...sub_four])
      setSublevels_five([...sub_five])
      setSublevels_six([...sub_six])
      setSublevels_senven([...sub_senven])
      setSublevels_eight([...sub_eight])
      setSublevels_nine([...sub_nine])
      setSublevels_ten([...sub_ten])
    }
  };

  const OnblurCloseList = () => {
    setShowBox(false)
  }
  const _Onsearch = (e) => {
    setSearch(e)
    let searchName = listallaccount.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));

    let lev_one = chartofaccountslevels_one.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    let lev_two = chartofaccountslevels_two.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    let lev_three = chartofaccountslevels_three.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    let lev_four = chartofaccountslevels_four.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    let lev_five = chartofaccountslevels_five.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    let lev_six = chartofaccountslevels_six.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    let lev_seven = chartofaccountslevels_seven.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    let lev_eight = chartofaccountslevels_eight.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    let lev_nine = chartofaccountslevels_nine.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));
    let lev_ten = chartofaccountslevels_ten.filter((el) => el.account_name.toLowerCase().includes(e.toLowerCase()));

    if (!e) {
      onloadallaccount()
    } else {
      setListallaccount(searchName)

      setLevels_one(lev_one)
      setLevels_two(lev_two)
      setLevels_three(lev_three)
      setLevels_four(lev_four)
      setLevels_five(lev_five)
      setLevels_six(lev_six)
      setLevels_seven(lev_seven)
      setLevels_eight(lev_eight)
      setLevels_nine(lev_nine)
      setLevels_ten(lev_ten)
    }
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        style={{ paddingTop: 50 }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Account</Modal.Title>
        </Modal.Header>
        <div style={{
          position: 'fixed',
          width: '80%',
          marginLeft: 250

        }}>
          <ToastShow show={showToast} setShow={setShowToast} iconNmame={<CheckCircle size={24} style={{ marginTop: 20, color: "#EC7380" }} />} />
        </div>
        {
          errorcurrency == '400' ? (
            <>
              <div style={{ border: '1px solid red', width: 500, marginLeft: 100, marginTop: 10 }}
              >
                <ErrorIcon style={{ color: "red", width: 40, height: 40 }} />
                <small style={{ fontSize: 20, marginLeft: 10, color: "red" }}>Something’s not quite right</small> < br />
                <small style={{ marginLeft: 10 }}>For sub-accounts,you must select the same currency as their parent.</small></div>
            </>
          ) : null
        }
        {
          errorparrens == '402' ? (
            <>
              <div style={{ border: '1px solid red', width: 500, marginLeft: 100, marginTop: 10 }}
              >
                <ErrorIcon style={{ color: "red", width: 40, height: 40 }} />
                <small style={{ fontSize: 20, marginLeft: 10, color: "red" }}>Something’s not quite right</small> < br />
                <small style={{ marginLeft: 10 }}>For subaccounts, you must select the same account type as their parent.</small></div>
            </>
          ) : null
        }
        {
          already == '409' ? (
            <>
              <div style={{ border: '1px solid red', width: 500, marginLeft: 100, marginTop: 10 }}
              >
                <ErrorIcon style={{ color: "red", width: 40, height: 40 }} />
                <small style={{ fontSize: 20, marginLeft: 10, color: "red" }}>Something’s not quite right</small> < br />
                <small style={{ marginLeft: 10 }}>Another account is already using this name. Please use a different name.</small></div>
            </>
          ) : null
        }
        {
          errchildren == '408' ? (
            <>
              <div style={{ border: '1px solid red', width: 500, marginLeft: 100, marginTop: 10 }}
              >
                <ErrorIcon style={{ color: "red", width: 40, height: 40 }} />
                <small style={{ fontSize: 20, marginLeft: 10, color: "red" }}>Something’s not quite right</small> < br />
                <small style={{ marginLeft: 10 }}>Something’s not quite right</small></div>
            </>
          ) : null
        }
        {
          errvalidate == '410' ? (
            <>
              <div style={{ border: '1px solid red', width: 500, marginLeft: 100, marginTop: 10 }}
              >
                <ErrorIcon style={{ color: "red", width: 40, height: 40 }} />
                <small style={{ fontSize: 20, marginLeft: 10, color: "red" }}>Something’s not quite right</small> < br />
                <small style={{ marginLeft: 10 }}>Something’s not quite right</small></div>
            </>

          ) : null
        }
        <Modal.Body>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "100%" }}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontSize: 20 }}>Account Type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => _onsearchaccountid(e.target.value)}
                  value={ac_type}
                >
                  {showUpdate ? (
                    <>
                      <option value={idaccountType}>{nameaccountType}</option>
                      {listaccountType &&
                        listaccountType.map((data, index) => {
                          return (
                            <option key={index} value={data?.type_uid}>
                              {data?.type_name_eng}
                            </option>
                          );
                        })}
                    </>
                  ) : (
                    <>
                      <option>SELECT CATEGORY</option>
                      {listaccountType &&
                        listaccountType.map((data, index) => {
                          return (
                            <option key={index} value={data?.type_uid}>
                              {data?.type_name_eng}
                            </option>
                          );
                        })}
                    </>
                  )}
                </Form.Select>
                {
                  errac_type == true ? (
                    <>
                      < small style={{ position: "absolute", fontSize: 14, color: "red" }}>Please select Account Type</small>
                    </>
                  ) : null
                }
              </Form.Group>
              {
                currencystatus === "USD" || currencystatus === "THB" ? (<>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ fontSize: 20 }}>Type</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => _onBank(e.target.value)}
                      value={listbank}
                    >{
                        showUpdate ? (
                          <>
                            <option value={editbank_id}>{editbank_name}</option>
                            {bank &&
                              bank.map((data, index) => {
                                return (
                                  <option key={index} value={data?.bank_id}>
                                    {data?.bank_name}
                                  </option>
                                );
                              })}

                          </>) : (
                          <>

                          </>)
                      }
                      <option>SELECT BANK</option>
                      {bank &&
                        bank.map((data, index) => {
                          return (
                            <option key={index} value={data?.bank_id}>
                              {data?.bank_name}
                            </option>
                          );
                        })}
                    </Form.Select>
                    {
                      errbank == true ? (
                        <>
                          < small style={{ position: "absolute", fontSize: 14, color: "red" }}>Please select bank</small>
                        </>
                      ) : null
                    }
                  </Form.Group>

                </>) : null
              }

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontSize: 20 }}></Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </div>
            <div style={{ width: 15 }}></div>
            <div style={{ width: "100%" }}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontSize: 20 }}>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  autoFocus
                  onChange={(e) => TextonChange(e.target.value)}
                  value={name}
                />
                {
                  errname == true ? (
                    <>
                      <small style={{ position: "absolute", fontSize: 14, color: "red" }}>Please Enter Account name</small>
                    </>
                  ) : null
                }
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontSize: 20 }}>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  autoFocus
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </Form.Group>
              {
                checked == 'As' || checked == 'li' || checked == 'Eq' ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "row",
                      }}
                    >
                      <div>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                          style={{ width: 150 }}
                        >
                          <Form.Label style={{ fontSize: 20 }}>CURRENCY</Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            onChange={(e) => _ongetCurrencyvalues(e.target.value)}
                            value={currency}
                            disabled={checkDisabled}
                          >
                            <option>SELECT CURRENCY</option>
                            {listcurrency &&
                              listcurrency.map((data, index) => {
                                return (
                                  <option key={index} value={data?.cy_uid}>
                                    {data?.name}
                                  </option>
                                );
                              })}
                          </Form.Select>
                          {
                            errselectcurrency == true ? (
                              <>
                                <small style={{ position: "absolute", color: "red", fontSize: 15 }}>Please select currency</small>
                              </>
                            ) : null
                          }
                        </Form.Group>
                      </div>
                      {
                        open ? (
                          <>
                            <div
                              style={{ marginLeft: 10 }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  paddingTop: 35
                                }}
                              >
                                {
                                  currencystatus == "USD" ? (
                                    <>
                                      <small style={{ marginTop: 10 }}>1USD</small>
                                      <img alt="Logo" src="/assets/images/USA.png" style={{ width: 25, height: 20, marginTop: 8 }} />
                                      <small style={{ marginTop: 10 }}> =</small>
                                      <input
                                        onChange={(e) => { changeText(e.target.value) }}
                                        onBlur={(e) => { OnblurChangeText(e.target.value) }}
                                        value={exchangeRate}
                                        disabled={checkDisabled}
                                        style={{
                                          border: '1px solid #ccc',
                                          height: 37,
                                          borderRadius: 3,
                                          width: 100,
                                          paddingLeft: 10,
                                          textAlign: "right",
                                          marginLeft: 5,
                                          outline: 'none',
                                        }}
                                      />
                                      <small style={{ marginTop: 10 }}>LAK</small>
                                      <img alt="Logo" src="/assets/images/laos.png" style={{ width: 25, height: 20, marginTop: 8 }} />
                                    </>
                                  ) : null
                                }
                                {
                                  currencystatus == "THB" ? (
                                    <>

                                      <small style={{ marginTop: 10 }}>1THB</small>
                                      <img alt="Logo" src="/assets/images/thailand.png" style={{ width: 25, height: 20, marginTop: 8 }} />
                                      <small style={{ marginTop: 10 }}> =</small>
                                      <input
                                        onChange={(e) => { changeText(e.target.value) }}
                                        onBlur={(e) => { OnblurChangeText(e.target.value) }}
                                        value={exchangeRate}
                                        disabled={checkDisabled}
                                        style={{
                                          border: '1px solid #ccc',
                                          height: 37,
                                          borderRadius: 3,
                                          width: 100,
                                          paddingLeft: 10,
                                          textAlign: "right",
                                          marginLeft: 5,
                                          outline: 'none',
                                        }}
                                      />
                                      <small style={{ marginTop: 10 }}>LAK</small>
                                      <img alt="Logo" src="/assets/images/laos.png" style={{ width: 25, height: 20, marginTop: 8 }} />
                                    </>
                                  ) : null
                                }
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                          </>
                        )
                      }
                      {
                        errexchangeRate == true ? (
                          <>
                            <small style={{ position: "absolute", marginTop: 80, marginLeft: 200, color: "red", fontSize: 16 }}>Please enter changeRate</small>
                          </>
                        ) : null
                      }
                    </div>
                  </>
                ) : null
              }
              <Form.Group className="mb-3" controlId="formBasicCheckbox" >
                <Form.Check
                  type="checkbox"
                  checked={isDisabled}
                  disabled={checkDisabled}
                  value={isSubscribed}
                  onChange={handleChange}
                  id="subscribe"
                  name="subscribe"
                  label="Is sub-account"
                  onClick={() => {
                    setIsDisabled(!isDisabled);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <input
                    type="text"
                    disabled={disblebtn}
                    autoFocus
                    onChange={(e) => _onSearchList(e.target.value)}
                    value={nameShow}
                    style={{
                      border: "1px solid #ccc",
                      borderTopLeftRadius: 4,
                      borderBottomLeftRadius: 4,
                      borderRight: "none",
                      flex: 1,
                      height: 40,
                      outline: "none",
                      paddingLeft: 10,
                    }}
                    onClick={() => setShowBox(!showBox)}
                  />
                  <div
                    style={{
                      border: "1px solid #ccc",
                      backgroundColor: "white",
                      borderLeft: "none",
                      paddingTop: 5,
                      borderTopRightRadius: 4,
                      borderBottomRightRadius: 4
                    }}
                    onClick={() => { setShowBox(!showBox); handleClick1() }}
                  >
                    {open1 ? <ExpandLess /> : <ExpandMore />}
                  </div>
                </div>
              </Form.Group>
              {/* {
                showBox == true ? (
                  <>
                    <div
                      style={{
                        overflowY: "scroll",
                        height: 300,
                        paddingTop: 5,
                        paddingLeft: 10,
                        position: 'absolute',
                        backgroundColor: 'white'
                      }}

                    >
                      {
                        searchResult.length > 0 ? (
                          <>
                           


                            {
                              sublevels_one.length == 0 ? (
                                <>
                                  {
                                    sublevels_two.length == 0 ? (
                                      <>
                                        {
                                          sublevels_three.length == 0 ? (
                                            <>
                                              {
                                                sublevels_four.length == 0 ? (
                                                  <>
                                                    {
                                                      sublevels_five.length == 0 ? (<>
                                                        {
                                                          sublevels_six.length == 0 ? (<>
                                                            {
                                                              sublevels_senven.length == 0 ? (
                                                                <>
                                                                  {
                                                                    sublevels_eight.length == 0 ? (
                                                                      <>
                                                                        {
                                                                          sublevels_nine.length == 0 ? (<>
                                                                            {
                                                                              sublevels_ten.length == 0 ? (<></>) : (<>
                                                                                {
                                                                                  sublevels_ten && sublevels_ten.map((data, index) => {
                                                                                    return (
                                                                                      <>
                                                                                        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                                                                                          <span
                                                                                            key={index}
                                                                                            style={{
                                                                                              cursor: "pointer",
                                                                                              fontWeight: active === data?.account_name ? "bold" : "",
                                                                                            }}
                                                                                            onClick={() => { getNameList(data?.c_id) }}
                                                                                            onMouseOver={() => setActive(data?.account_name)}
                                                                                            onMouseLeave={() => setActive(null)}
                                                                                          >
                                                                                            {data?.account_name}

                                                                                          </span>
                                                                                          <ComponentCell
                                                                                            id={data?.c_id}
                                                                                            level={30}
                                                                                            listallaccountchildren={seconddatachartofaccount}
                                                                                            getNameList1={getNameList1}
                                                                                          />
                                                                                        </div>
                                                                                      </>
                                                                                    )
                                                                                  })
                                                                                }

                                                                              </>)
                                                                            }

                                                                          </>) : (<>
                                                                            {
                                                                              sublevels_nine && sublevels_nine.map((data, index) => {
                                                                                return (<>
                                                                                  <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                                                                                    <span
                                                                                      key={index}
                                                                                      style={{
                                                                                        cursor: "pointer",
                                                                                        fontWeight: active === data?.account_name ? "bold" : "",
                                                                                      }}
                                                                                      onClick={() => { getNameList(data?.c_id) }}
                                                                                      onMouseOver={() => setActive(data?.account_name)}
                                                                                      onMouseLeave={() => setActive(null)}
                                                                                    >
                                                                                      {data?.account_name}

                                                                                    </span>
                                                                                    <ComponentCell
                                                                                      id={data?.c_id}
                                                                                      level={30}
                                                                                      listallaccountchildren={seconddatachartofaccount}
                                                                                      getNameList1={getNameList1}
                                                                                    />
                                                                                  </div>
                                                                                </>)
                                                                              })
                                                                            }

                                                                          </>)
                                                                        }

                                                                      </>
                                                                    ) : (
                                                                      <>
                                                                        {
                                                                          sublevels_eight && sublevels_eight.map((data, index) => {
                                                                            return (
                                                                              <>
                                                                                <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                                                                                  <span
                                                                                    key={index}
                                                                                    style={{
                                                                                      cursor: "pointer",
                                                                                      fontWeight: active === data?.account_name ? "bold" : "",
                                                                                    }}
                                                                                    onClick={() => { getNameList(data?.c_id) }}
                                                                                    onMouseOver={() => setActive(data?.account_name)}
                                                                                    onMouseLeave={() => setActive(null)}
                                                                                  >
                                                                                    {data?.account_name}

                                                                                  </span>
                                                                                  <ComponentCell
                                                                                    id={data?.c_id}
                                                                                    level={30}
                                                                                    listallaccountchildren={seconddatachartofaccount}
                                                                                    getNameList1={getNameList1}
                                                                                  />
                                                                                </div>

                                                                              </>
                                                                            )
                                                                          })
                                                                        }

                                                                      </>)
                                                                  }

                                                                </>
                                                              ) : (<>
                                                                {
                                                                  sublevels_senven && sublevels_senven.map((data, index) => {
                                                                    return (<>
                                                                      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                                                                        <span
                                                                          key={index}
                                                                          style={{
                                                                            cursor: "pointer",
                                                                            fontWeight: active === data?.account_name ? "bold" : "",
                                                                          }}
                                                                          onClick={() => { getNameList(data?.c_id) }}
                                                                          onMouseOver={() => setActive(data?.account_name)}
                                                                          onMouseLeave={() => setActive(null)}
                                                                        >
                                                                          {data?.account_name}

                                                                        </span>
                                                                        <ComponentCell
                                                                          id={data?.c_id}
                                                                          level={30}
                                                                          listallaccountchildren={seconddatachartofaccount}
                                                                          getNameList1={getNameList1}
                                                                        />
                                                                      </div>

                                                                    </>)
                                                                  })
                                                                }
                                                              </>)
                                                            }


                                                          </>) : (<>
                                                            {
                                                              sublevels_six && sublevels_six.map((data, index) => {
                                                                return (
                                                                  <>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                                                                      <span
                                                                        key={index}
                                                                        style={{
                                                                          cursor: "pointer",
                                                                          fontWeight: active === data?.account_name ? "bold" : "",
                                                                        }}
                                                                        onClick={() => { getNameList(data?.c_id) }}
                                                                        onMouseOver={() => setActive(data?.account_name)}
                                                                        onMouseLeave={() => setActive(null)}
                                                                      >
                                                                        {data?.account_name}

                                                                      </span>
                                                                      <ComponentCell
                                                                        id={data?.c_id}
                                                                        level={30}
                                                                        listallaccountchildren={seconddatachartofaccount}
                                                                        getNameList1={getNameList1}
                                                                      />
                                                                    </div>
                                                                  </>
                                                                )
                                                              })
                                                            }
                                                          </>)
                                                        }

                                                      </>) : (

                                                        <>
                                                          {
                                                            sublevels_five && sublevels_five.map((data, index) => {
                                                              return (
                                                                <>
                                                                  <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                                                                    <span
                                                                      key={index}
                                                                      style={{
                                                                        cursor: "pointer",
                                                                        fontWeight: active === data?.account_name ? "bold" : "",
                                                                      }}
                                                                      onClick={() => { getNameList(data?.c_id) }}
                                                                      onMouseOver={() => setActive(data?.account_name)}
                                                                      onMouseLeave={() => setActive(null)}
                                                                    >
                                                                      {data?.account_name}

                                                                    </span>
                                                                    <ComponentCell
                                                                      id={data?.c_id}
                                                                      level={30}
                                                                      listallaccountchildren={seconddatachartofaccount}
                                                                      getNameList1={getNameList1}
                                                                    />
                                                                  </div>
                                                                </>
                                                              )
                                                            })
                                                          }



                                                        </>)
                                                    }
                                                  </>) : (
                                                  <>{
                                                    sublevels_four && sublevels_four.map((data, index) => {
                                                      return (
                                                        <>
                                                          <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                                                            <span
                                                              key={index}
                                                              style={{
                                                                cursor: "pointer",
                                                                fontWeight: active === data?.account_name ? "bold" : "",
                                                              }}
                                                              onClick={() => { getNameList(data?.c_id) }}
                                                              onMouseOver={() => setActive(data?.account_name)}
                                                              onMouseLeave={() => setActive(null)}
                                                            >
                                                              {data?.account_name}

                                                            </span>
                                                            <ComponentCell
                                                              id={data?.c_id}
                                                              level={30}
                                                              listallaccountchildren={seconddatachartofaccount}
                                                              getNameList1={getNameList1}
                                                            />
                                                          </div>

                                                        </>
                                                      )
                                                    })
                                                  }


                                                  </>)
                                              }

                                            </>
                                          ) : (
                                            <>
                                              {
                                                sublevels_three && sublevels_three.map((data, index) => {
                                                  return (
                                                    <>
                                                      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                                                        <span
                                                          key={index}
                                                          style={{
                                                            cursor: "pointer",
                                                            fontWeight: active === data?.account_name ? "bold" : "",
                                                          }}
                                                          onClick={() => { getNameList(data?.c_id) }}
                                                          onMouseOver={() => setActive(data?.account_name)}
                                                          onMouseLeave={() => setActive(null)}
                                                        >
                                                          {data?.account_name}

                                                        </span>
                                                        <ComponentCell
                                                          id={data?.c_id}
                                                          level={30}
                                                          listallaccountchildren={seconddatachartofaccount}
                                                          getNameList1={getNameList1}
                                                        />
                                                      </div>

                                                    </>
                                                  )
                                                })
                                              }

                                            </>)
                                        }

                                      </>) : (
                                      <>
                                        {
                                          sublevels_two && sublevels_two.map((data, index) => {
                                            return (
                                              <>
                                                <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                                                  <span
                                                    key={index}
                                                    style={{
                                                      cursor: "pointer",
                                                      fontWeight: active === data?.account_name ? "bold" : "",
                                                    }}
                                                    onClick={() => { getNameList(data?.c_id) }}
                                                    onMouseOver={() => setActive(data?.account_name)}
                                                    onMouseLeave={() => setActive(null)}
                                                  >
                                                    {data?.account_name}

                                                  </span>
                                                  <ComponentCell
                                                    id={data?.c_id}
                                                    level={30}
                                                    listallaccountchildren={seconddatachartofaccount}
                                                    getNameList1={getNameList1}
                                                  />
                                                </div>
                                              </>
                                            )
                                          })
                                        }

                                      </>)
                                  }

                                </>
                              ) : (
                                <>
                                  {
                                    sublevels_one && sublevels_one.map((data, index) => {
                                      return (
                                        <>
                                          <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                                            <span
                                              key={index}
                                              style={{
                                                cursor: "pointer",
                                                fontWeight: active === data?.account_name ? "bold" : "",
                                              }}
                                              onClick={() => { getNameList(data?.c_id) }}
                                              onMouseOver={() => setActive(data?.account_name)}
                                              onMouseLeave={() => setActive(null)}
                                            >
                                              {data?.account_name}

                                            </span>
                                            <ComponentCell
                                              id={data?.c_id}
                                              level={30}
                                              listallaccountchildren={seconddatachartofaccount}
                                              getNameList1={getNameList1}
                                            />

                                          </div>
                                        </>
                                      )
                                    })
                                  }

                                </>)
                            }
                          </>) : (
                          <>
                            {firstdatachartofaccount.map((data, index) => {
                              return (
                                <>
                                  <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                                    <span
                                      key={index}
                                      style={{
                                        cursor: "pointer",
                                        fontWeight: active === data?.account_name ? "bold" : "",
                                      }}
                                      onClick={() => { getNameList(data?.c_id) }}
                                      onMouseOver={() => setActive(data?.account_name)}
                                      onMouseLeave={() => setActive(null)}
                                    >
                                      {data?.account_name}

                                    </span>
                                    <ComponentCell
                                      id={data?.c_id}
                                      level={30}
                                      listallaccountchildren={seconddatachartofaccount}
                                      getNameList1={getNameList1}
                                    />

                                  </div>


                                </>
                              );
                            })}


                          </>
                        )
                      }


                    </div>





                  </>) : null
              } */}
              {showBox && (
                <>
                  <Card style={{
                    overflowY: "scroll",
                    width: 380,
                    position: "absolute",
                    height: 300,
                  }}>
                    <CardActionArea>
                      <CardContent>
                        {searchResult.length > 0 ? (
                          <>
                            {searchResult.map((data, index) => {
                              return (
                                <div key={index} style={{ width: '100%' }}>
                                  <Typography
                                    variant="body2"
                                    style={{
                                      cursor: "pointer",
                                      fontWeight:
                                        active === data?.name_eng ? "bold" : "",
                                    }}
                                    onClick={() => getNameList1(data?.c_id)}
                                    onMouseOver={() => setActive(data?.name_eng)}
                                    onMouseLeave={() => setActive(null)}
                                  >
                                    {data?.name_eng}
                                  </Typography>
                                  <br />
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <>
                            {listaccountname && listaccountname.map((data, index) => {
                              return (
                                <div style={{ width: '100%' }} key={index} >
                                  <Typography

                                    variant="body2"
                                    style={{
                                      cursor: "pointer",
                                      fontWeight:
                                        active === data?.name_eng ? "bold" : "",
                                    }}
                                    onClick={() => getNameList1(data?.c_id)}
                                    onMouseOver={() => setActive(data?.name_eng)}
                                    onMouseLeave={() => setActive(null)}
                                  >
                                    {data?.name_eng}
                                  </Typography>
                                  <br />
                                </div>
                              );
                            })}
                          </>
                        )}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </>
              )}

              {/* {showBox && (
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
                                fontWeight: active === data?.account_name ? "bold" : "",
                              }}
                              onClick={() => { getNameList1(data?.c_id) }}
                            
                              onMouseOver={() => setActive(data?.account_name)}
                              onMouseLeave={() => setActive(null)}
                            >
                              {data?.account_name}

                            </span>
                            <ComponentCell
                              id={data?.c_id}
                              level={30}
                              listallaccountchildren={listallaccountchildren}
                              getNameList1={getNameList1}
                            />

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
                                  fontWeight: active === data?.account_name ? "bold" : "",
                                }}
                                onClick={() => { getNameList1() }}
                                onMouseOver={() => setActive(data?.account_name)}
                                onMouseLeave={() => setActive(null)}
                              >
                                {data?.account_name}

                              </span>
                              <ComponentCell
                                id={data?.c_id}
                                level={30}
                                listallaccountchildren={listallaccountchildren}
                                getNameList1={getNameList1}
                              />
                            </div>





                          </>
                        );
                      })}
                    </>
                  )}
                </div>
              )} */}
              {
                checked == "In" || checked == "Ex" ? (
                  <>

                  </>) : (
                  <>
                    <Form.Group>
                      <Form.Label style={{ fontSize: 20 }}></Form.Label>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          flexDirection: "row",
                        }}
                      >
                        <Form.Check
                          style={{ cursor: "pointer" }}
                          inline
                          label="Beginning Balance"
                          checked={beginningBalance}
                          disabled={checkDisabled}
                          onChange={BeginningBalance}
                          type="checkbox"
                          onClick={() => {
                            setBeginningbalance(!beginningBalance);
                            handleClick()
                          }}
                        />
                      </div>
                    </Form.Group>

                  </>)
              }

              {
                open ? (
                  <>
                    <div style={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "row",
                    }}>
                      {
                        checked == "In" || checked == "Ex" ? (
                          <>
                            <div>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label style={{ fontSize: 20 }}>Balance - {currencystatus}</Form.Label>
                                <Form.Control
                                  type="text"
                                  disabled={checkDisabled}
                                  autoFocus
                                  onChange={changeTextbalance}
                                  value={balance}
                                  style={{ width: 150, textAlign: "right" }}
                                  onBlur={(e) => OnblurTextbalance(e.target.value)}
                                />
                              </Form.Group>
                            </div>

                          </>
                        ) : (
                          <>
                            {
                              currencystatus == "LAK" ? (
                                <>
                                  <div>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="exampleForm.ControlInput1"
                                    >
                                      <Form.Label style={{ fontSize: 20 }}>Balance - {currencystatus}</Form.Label>
                                      <Form.Control
                                        type="text"
                                        disabled={checkDisabled}
                                        autoFocus
                                        onChange={(e) => changeTextbalance(e.target.value)}
                                        onBlur={(e) => OnblurTextbalance(e.target.value)}
                                        value={balance}
                                        style={{ width: 150, textAlign: "right" }}
                                      />
                                    </Form.Group>
                                  </div>


                                </>
                              ) : (
                                <>
                                  <div>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="exampleForm.ControlInput1"
                                    >
                                      <Form.Label style={{ fontSize: 20 }}>Balance - {currencystatus}</Form.Label>
                                      <Form.Control
                                        type="text"
                                        autoFocus
                                        onChange={(e) => changeTextbalance(e.target.value)}
                                        onBlur={(e) => OnblurTextbalance(e.target.value)}
                                        value={balance}
                                        style={{ width: 150, textAlign: "right" }}
                                        disabled={checkDisabled}
                                      />
                                    </Form.Group>
                                  </div>

                                </>
                              )
                            }
                            {
                              errbalance == true ? (
                                <>
                                  <small style={{ position: "absolute", color: "red", fontSize: 14, marginTop: 80 }}>Please enter balance</small>
                                </>
                              ) : null
                            }
                          </>
                        )
                      }
                      {showUpdate ? (
                        <>
                          {
                            defaultValue.length == 0 ? (
                              <>
                                <div>
                                  <div style={{
                                    display: "flex",
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                  }}>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="exampleForm.ControlInput1"
                                    >
                                      <Form.Control
                                        type="date"
                                        autoFocus
                                        onChange={(e) => Ondataupdate(e.target.value)}
                                        value={valuedate}
                                        style={{ width: 140, marginTop: 37 }}
                                      />
                                    </Form.Group>
                                  </div>
                                </div>

                              </>) : (
                              <>
                                <div>
                                  <div style={{
                                    display: "flex",
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                  }}>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="exampleForm.ControlInput1"

                                    >
                                      <Form.Label style={{ fontSize: 20 }}>as of</Form.Label>
                                      <Form.Control
                                        type="text"
                                        autoFocus
                                        onChange={(e) => setDefaultValue(e.target.value)}
                                        value={defaultValue}
                                        style={{ width: 140, borderRight: 'none' }}
                                        disabled={checkDisabled}

                                      />
                                    </Form.Group>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="exampleForm.ControlInput1"
                                    >
                                      <Form.Control
                                        type="date"
                                        placeholder="Description"
                                        autoFocus
                                        onChange={(e) => OnData(e.target.value)}
                                        value={valuedate}
                                        style={{ width: 45, marginTop: 37 }}
                                      />
                                    </Form.Group>
                                  </div>
                                </div>


                              </>
                            )
                          }

                        </>) : (
                        <>
                          <div style={{
                            display: "flex",
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between"
                          }}>
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Control
                                type="date"
                                placeholder="Description"
                                autoFocus
                                onChange={(e) => _searchstartdate(e.target.value)}
                                value={valuedate}
                                style={{ width: 140, marginTop: 37 }}
                              />
                              {
                                errvaluedate == true ? (
                                  <>
                                    <small style={{ position: "absolute", fontSize: 14, color: "red" }}>Please Select date</small>
                                  </>
                                ) : null
                              }
                            </Form.Group>
                          </div>
                        </>)

                      }
                    </div>
                    <Form.Group>
                      <Form.Label style={{ fontSize: 20 }}>Please choose debit or credit ?</Form.Label>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          flexDirection: "row",
                        }}
                      >
                        <Form.Check
                          style={{ cursor: "pointer" }}
                          inline
                          label="debit"
                          checked={radiodebit}
                          type="radio"
                          onChange={(e) => functionCheckDebit(e.target.value)}
                          value={debit}
                          disabled={checkDisabled}
                          onClick={() => {
                            setRadiodebit(!radiodebit);
                            setRadiocredit(false);
                            setCheckdebitcredit(false);

                          }}
                        />
                        <Form.Check
                          style={{ cursor: "pointer" }}
                          checked={radiocredit}
                          inline
                          label="credit"
                          onChange={(e) => functionCheckCredit(e.target.value)}
                          value={credit}
                          type="radio"
                          disabled={checkDisabled}
                          onClick={() => {
                            setRadiocredit(!radiocredit);
                            setRadiodebit(false);
                            setCheckdebitcredit(false);

                          }}
                        />
                      </div>
                      {
                        errcheckdebitcredit == true ? (
                          <>
                            <small style={{ position: "absolute", color: "red", fontSize: 14 }}>Please choose debit or credit</small>
                          </>
                        ) : null
                      }
                    </Form.Group>
                    <div style={{ height: 15 }}></div>
                    <div style={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "row",
                    }}>
                      <div>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label style={{ fontSize: 20 }}>Balance-LAK</Form.Label>
                          <Form.Control
                            type="text"
                            autoFocus
                            onChange={(e) => setBalancelak(e.target.value)}
                            value={balancelak}
                            style={{ width: 150, textAlign: "right" }}
                            disabled={true}
                          />
                        </Form.Group>
                      </div>
                    </div>
                  </>
                ) : null
              }
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}
            onMouseOver={() => setOnClose(true)}
            onMouseLeave={() => setOnClose(false)}
            style={{
              backgroundColor: '#0d6efd',
              border: 'none',
              padding: '10px 30px 10px 30px',
              opacity: onClose ? 0.9 : 2,
              height: 35,
              color: "white"
            }}
          >
            Close
          </button>
          {showUpdate ? (
            <button onClick={Updatechartofaccount}
              onMouseOver={() => setOnFocused(true)}
              onMouseLeave={() => setOnFocused(false)}
              style={{
                backgroundColor: '#0d6efd',
                border: 'none',
                padding: '10px 30px 10px 30px',
                opacity: onFucused ? 0.9 : 2,
                height: 35,
                color: "white"
              }}
            >
              {!isLoadingupdating ? (
                <>
                  update
                </>
              ) : (
                <>
                  {
                    <Spinner animation="border" variant="light" size='sm' />
                  }
                </>)
              }
            </button>
          ) : (
            <>
              <button
                onClick={CreateChartAccount}
                onMouseOver={() => setOnFocused(true)}
                onMouseLeave={() => setOnFocused(false)}
                style={{
                  backgroundColor: '#0d6efd',
                  border: 'none',
                  padding: '10px 30px 10px 30px',
                  opacity: onFucused ? 0.9 : 2,
                  height: 35,
                  color: "white",
                }} >
                {!isLoading ? (
                  <>
                    Save
                  </>
                ) : (
                  <>
                    {
                      <Spinner animation="border" variant="light" size='sm' />
                    }
                  </>)
                }
              </button>
              <button
                onClick={CreateAddnewChartAccount}
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
                    Save and Close
                  </>
                ) : (
                  <>
                    {
                      <Spinner animation="border" variant="light" size='sm' />
                    }
                  </>)
                }
              </button>
            </>

          )}
        </Modal.Footer>
      </Modal>

      <Modal show={showleave} onHide={handleLeaveClosedel} style={{ paddingTop: 50 }} size="sm">
        <Modal.Header>
          < WarningIcon style={{ color: "red" }} />
          <span style={{ fontSize: 14, paddingTop: 10 }}>
            Do you want to Deleted Or Not ? </span>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={handleLeaveClosedel}>
            No
          </Button>
          <Button onClick={() => {
            DeletedChartAaccount(c_uid)
          }}
          >
            Yes
          </Button>
        </Modal.Footer>
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
            Chart of Account
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
            onClick={() => {
              handleShow();
              setPrentid("");
              setIsDisabled(false);
              setDisblebtn(true);
              setRadiocredit(false)
              setRadiodebit(false)
              setExchangeRate('')
              setBalance('')
              setBalancelak('')
              setCurrency('')
              setBeginningbalance(false)
              setOpen(false)
              setDebit(false)
              setCredit(false)
              setCurrencystatus("")
              setErrorcurrency("")
              setErrorparrens("")
              setAlready("")
            }}
          >
            <AddIcon />
            add new
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
      <div
        style={{
          height: 10,
        }}
      ></div>
      <div
        style={{
          display: "flex",
          height: 40,
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 5,
          width: '100%',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
          <input
            type={"text"}
            onChange={(e) => {
              _Onsearch(e.target.value);
              handlePageChange({ selected: 0 });
            }}
            value={search}
            style={{
              width: 200,
              outline: "none",
              border: "1px solid #DBDBDB",
              height: 35,
              marginLeft: 20,
              paddingLeft: 20,
              display: "flex",
              justifyContent: "center",
            }}
            placeholder="Search.."
          />
          <button
            style={{
              backgroundColor: "#3f51b5",
              border: "none",
              height: 35,
              borderRadius: 2,
              paddingLeft: 10,
              paddingRight: 10,
              color: "white",
              alignItems: "center",
            }}
          >
            <SearchIcon />
          </button>
          <ReactToPrint
            trigger={() => <button
              style={{
                backgroundColor: "#3f51b5",
                border: "none",
                height: 35,
                borderRadius: 2,
                paddingLeft: 10,
                paddingRight: 10,
                color: "white",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <PrintIcon />
            </button>
            }
            content={() => componentRef}
            style={{ marginLeft: 10 }}
          />

        </div>
        <div style={{ display: 'flex', cursor: 'pointer' }}>
          {/* <ReactToPrint
            trigger={() => <PrintIcon />}
            content={() => componentRef}
            style={{ marginRight: 10 }}
          />
          <ImportExportIcon style={{ marginRight: 10 }} />
          <SettingsIcon style={{ marginRight: 10 }} /> */}
        </div>
      </div>

      {/* ==============================================TableListPrint====================================*/}
      <div style={{ display: 'none' }}>
        <TableContainer component={Paper} ref={(el) => (componentRef = el)}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>NAME</TableCell>
                <TableCell align="left">TYPE</TableCell>
                <TableCell align="left">CURRENCY</TableCell>
                <TableCell align="left">DESCRIPTION</TableCell>
                <TableCell align="right">BANLANCE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                listallaccount && listallaccount == 0 ? (
                  <>
                    {secondSearch &&
                      secondSearch.map((item, index) => {
                        return (
                          <>

                            <TableRow key={index}>
                              <TableCell>{item.account_name}</TableCell>
                              <TableCell align="left">{item.accounttype_name}</TableCell>
                              <TableCell align="left">{item.currencesname}</TableCell>
                              <TableCell align="left">{item.c_desc}</TableCell>
                              <TableCell align="right">{getFormatNumber(item.c_balance)}</TableCell>
                            </TableRow>
                            <RowEditComponentfirst
                              Gotodetailaccount={Gotodetailaccount}
                              c_uid={item?.c_uid}
                              id={item?.c_id}
                              c_id={item?.c_id}
                              handleShow={handleShow}
                              setShowUpdate={setShowUpdate}
                              account_name={item?.account_name}
                              type_id={item?.type_id}
                              detail_type_id={item?.detail_type_id}
                              balance={item?.c_balance}
                              desc={item?.c_desc}
                              bank_id={item?.bank_id}
                              setName={setName}
                              editaccountype={editaccountype}
                              ac_ty_id={item?.ac_ty_id}
                              _onshowcreatestatus={_onshowcreatestatus}
                              _oneditshowcurrency={_oneditshowcurrency}
                              currencies_id={item?.currency_uid}
                              setDescription={setDescription}
                              editbeginningbalancefirst={editbeginningbalancefirst}
                              _ongetCurrencyvalues={_ongetCurrencyvalues}
                              getstutas={getstutas}
                              _onsearchaccountid={_onsearchaccountid}


                            />

                          </>

                        )
                      })}
                  </>
                ) : (
                  <>
                    {listallaccount.map((item, index) => {
                      return (
                        <>
                          <TableRow key={index}>
                            <TableCell>{item.account_name}</TableCell>
                            <TableCell align="left">{item.accounttype_name}</TableCell>
                            <TableCell align="left">{item.currencesname}</TableCell>
                            <TableCell align="left">{item.c_desc}</TableCell>
                            <TableCell align="right">{getFormatNumber(item.c_balance)}</TableCell>
                          </TableRow>
                          {/* level 1 */}
                          < RowComponentPrint
                            children={listallaccountchildren}
                            id={item.c_id}
                            level={20}
                            Gotodetailaccount={Gotodetailaccount}
                            Gotohistory={Gotohistory}
                            handleShow={handleShow}
                            setShowUpdate={setShowUpdate}
                            setName={setName}
                            editaccountype={editaccountype}
                            _onshowcreatestatus={_onshowcreatestatus}
                            _oneditshowcurrency={_oneditshowcurrency}
                            currencies_id={item.currency_uid}
                            setDescription={setDescription}
                            getNameList={getNameList}
                            checkedtrue={checkedtrue}
                            listsubaccountname={listsubaccountname}
                            editbeginningbalanceSecond={editbeginningbalanceSecond}
                            _ongetCurrencyvalues={_ongetCurrencyvalues}
                            getstutas={getstutas}
                            _onsearchaccountid={_onsearchaccountid}
                          />
                        </>
                      )
                    })}
                  </>
                )
              }
            </TableBody>
          </Table>
        </TableContainer>

      </div>
      {/* ==============================================TableListShow====================================*/}
      {/* {JSON.stringify(firstdatachartofaccount)} */}

      <div style={{ paddingTop: 20, paddingBottom: 50 }}>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>NAME</TableCell>
                <TableCell align="left">TYPE</TableCell>
                <TableCell align="left">CURRENCY</TableCell>
                <TableCell align="left">DESCRIPTION</TableCell>
                <TableCell align="right">BANLANCE</TableCell>
                <TableCell align="right">ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                listallaccount && listallaccount == 0 ? (
                  <>
                    {
                      levels_one.length == 0 ? (
                        <>
                          {
                            levels_two.length == 0 ? (
                              <>
                                {
                                  levels_three.length == 0 ? (
                                    <>
                                      {
                                        levels_four.length == 0 ? (
                                          <>
                                            {
                                              levels_five.length == 0 ? (
                                                <>
                                                  {
                                                    levels_six.length == 0 ? (
                                                      <>
                                                        {
                                                          levels_seven && levels_seven.map((item, index) => {
                                                            return (
                                                              <>
                                                                <TableRow key={index}>
                                                                  <TableCell>{item.account_name}</TableCell>
                                                                  <TableCell align="left">{item.accounttype_name}</TableCell>
                                                                  <TableCell align="left">{item.currencesname}</TableCell>
                                                                  <TableCell align="left">{item.c_desc}</TableCell>
                                                                  <TableCell align="right">{getFormatNumber(item.c_balance)}</TableCell>
                                                                  <TableCell align="right">
                                                                    {
                                                                      item?.createstatus == "In" || item?.createstatus == "Ex" ? (
                                                                        <>
                                                                          <span
                                                                            style={{ cursor: "pointer", color: "green" }}
                                                                            onClick={() => { Gotodetailaccount(item.c_uid) }}
                                                                          >
                                                                            (Run report)
                                                                          </span>
                                                                        </>
                                                                      ) : (
                                                                        <>
                                                                          <span
                                                                            style={{ cursor: "pointer", color: "green" }}
                                                                            onClick={() => { Gotohistory(item.c_uid) }}
                                                                          >
                                                                            (Account history)
                                                                          </span>

                                                                        </>
                                                                      )
                                                                    }
                                                                    <RowEditComponentSecond
                                                                      Gotodetailaccount={Gotodetailaccount}
                                                                      c_uid={item?.c_uid}
                                                                      c_id={item?.c_id}
                                                                      id={item?.c_id}
                                                                      bank_id={item?.bank_id}
                                                                      handleShow={handleShow}
                                                                      setShowUpdate={setShowUpdate}
                                                                      setName={setName}
                                                                      account_name={item?.account_name}
                                                                      editaccountype={editaccountype}
                                                                      ac_ty_id={item?.ac_ty_id}
                                                                      detail_type_id={item?.detail_type_id}
                                                                      _onshowcreatestatus={_onshowcreatestatus}
                                                                      _oneditshowcurrency={_oneditshowcurrency}
                                                                      currencies_id={item?.currency_uid}
                                                                      setDescription={setDescription}
                                                                      getNameList={getNameList}
                                                                      type_id={item?.type_id}
                                                                      checkedtrue={checkedtrue}
                                                                      desc={item?.c_desc}
                                                                      listsubaccountname={listsubaccountname}
                                                                      editbeginningbalanceSecond={editbeginningbalanceSecond}
                                                                      _ongetCurrencyvalues={_ongetCurrencyvalues}
                                                                      getstutas={getstutas}
                                                                      _onsearchaccountid={_onsearchaccountid}
                                                                      handleShowDelelete={handleShowDelelete}
                                                                      _ongetBanckvalues={_ongetBanckvalues}

                                                                    />

                                                                  </TableCell>
                                                                </TableRow>
                                                                < RowComponentSearch
                                                                  children={listallaccountchildren}
                                                                  id={item.c_id}
                                                                  level={40}
                                                                  Gotodetailaccount={Gotodetailaccount}
                                                                  Gotohistory={Gotohistory}
                                                                  handleShow={handleShow}
                                                                  setShowUpdate={setShowUpdate}
                                                                  setName={setName}
                                                                  editaccountype={editaccountype}
                                                                  _onshowcreatestatus={_onshowcreatestatus}
                                                                  _oneditshowcurrency={_oneditshowcurrency}
                                                                  currencies_id={item.currency_uid}
                                                                  setDescription={setDescription}
                                                                  getNameList={getNameList}
                                                                  checkedtrue={checkedtrue}
                                                                  listsubaccountname={listsubaccountname}
                                                                  editbeginningbalanceSecond={editbeginningbalanceSecond}
                                                                  _ongetCurrencyvalues={_ongetCurrencyvalues}
                                                                  getstutas={getstutas}
                                                                  _onsearchaccountid={_onsearchaccountid}
                                                                  _ongetBanckvalues={_ongetBanckvalues}
                                                                  handleShowDelelete={handleShowDelelete}
                                                                />
                                                              </>
                                                            )
                                                          })
                                                        }

                                                      </>) : (
                                                      <>
                                                        {
                                                          levels_six && levels_six.map((item, index) => {
                                                            return (
                                                              <>
                                                                <TableRow key={index}>
                                                                  <TableCell>{item.account_name}</TableCell>
                                                                  <TableCell align="left">{item.accounttype_name}</TableCell>
                                                                  <TableCell align="left">{item.currencesname}</TableCell>
                                                                  <TableCell align="left">{item.c_desc}</TableCell>
                                                                  <TableCell align="right">{getFormatNumber(item.c_balance)}</TableCell>
                                                                  <TableCell align="right">
                                                                    {
                                                                      item?.createstatus == "In" || item?.createstatus == "Ex" ? (
                                                                        <>
                                                                          <span
                                                                            style={{ cursor: "pointer", color: "green" }}
                                                                            onClick={() => { Gotodetailaccount(item.c_uid) }}
                                                                          >
                                                                            (Run report)
                                                                          </span>
                                                                        </>
                                                                      ) : (
                                                                        <>
                                                                          <span
                                                                            style={{ cursor: "pointer", color: "green" }}
                                                                            onClick={() => { Gotohistory(item.c_uid) }}
                                                                          >
                                                                            (Account history)
                                                                          </span>

                                                                        </>
                                                                      )
                                                                    }

                                                                    <RowEditComponentSecond
                                                                      Gotodetailaccount={Gotodetailaccount}
                                                                      c_uid={item?.c_uid}
                                                                      c_id={item?.c_id}
                                                                      id={item?.c_id}
                                                                      bank_id={item?.bank_id}
                                                                      handleShow={handleShow}
                                                                      setShowUpdate={setShowUpdate}
                                                                      setName={setName}
                                                                      account_name={item?.account_name}
                                                                      editaccountype={editaccountype}
                                                                      ac_ty_id={item?.ac_ty_id}
                                                                      detail_type_id={item?.detail_type_id}
                                                                      _onshowcreatestatus={_onshowcreatestatus}
                                                                      _oneditshowcurrency={_oneditshowcurrency}
                                                                      currencies_id={item?.currency_uid}
                                                                      setDescription={setDescription}
                                                                      getNameList={getNameList}
                                                                      type_id={item?.type_id}
                                                                      checkedtrue={checkedtrue}
                                                                      desc={item?.c_desc}
                                                                      listsubaccountname={listsubaccountname}
                                                                      editbeginningbalanceSecond={editbeginningbalanceSecond}
                                                                      _ongetCurrencyvalues={_ongetCurrencyvalues}
                                                                      getstutas={getstutas}
                                                                      _onsearchaccountid={_onsearchaccountid}
                                                                      handleShowDelelete={handleShowDelelete}
                                                                      _ongetBanckvalues={_ongetBanckvalues}

                                                                    />

                                                                  </TableCell>
                                                                </TableRow>
                                                                < RowComponentSearch
                                                                  children={listallaccountchildren}
                                                                  id={item.c_id}
                                                                  level={40}
                                                                  Gotodetailaccount={Gotodetailaccount}
                                                                  Gotohistory={Gotohistory}
                                                                  handleShow={handleShow}
                                                                  setShowUpdate={setShowUpdate}
                                                                  setName={setName}
                                                                  editaccountype={editaccountype}
                                                                  _onshowcreatestatus={_onshowcreatestatus}
                                                                  _oneditshowcurrency={_oneditshowcurrency}
                                                                  currencies_id={item.currency_uid}
                                                                  setDescription={setDescription}
                                                                  getNameList={getNameList}
                                                                  checkedtrue={checkedtrue}
                                                                  listsubaccountname={listsubaccountname}
                                                                  editbeginningbalanceSecond={editbeginningbalanceSecond}
                                                                  _ongetCurrencyvalues={_ongetCurrencyvalues}
                                                                  getstutas={getstutas}
                                                                  _onsearchaccountid={_onsearchaccountid}
                                                                />
                                                              </>
                                                            )
                                                          })

                                                        }

                                                      </>)

                                                  }
                                                </>) : (
                                                <>
                                                  {
                                                    levels_five && levels_five.map((item, index) => {
                                                      return (
                                                        <>
                                                          <TableRow key={index}>
                                                            <TableCell>{item.account_name}</TableCell>
                                                            <TableCell align="left">{item.accounttype_name}</TableCell>
                                                            <TableCell align="left">{item.currencesname}</TableCell>
                                                            <TableCell align="left">{item.c_desc}</TableCell>
                                                            <TableCell align="right">{getFormatNumber(item.c_balance)}</TableCell>
                                                            <TableCell align="right">
                                                              {
                                                                item?.createstatus == "In" || item?.createstatus == "Ex" ? (
                                                                  <>
                                                                    <span
                                                                      style={{ cursor: "pointer", color: "green" }}
                                                                      onClick={() => { Gotodetailaccount(item.c_uid) }}
                                                                    >
                                                                      (Run report)
                                                                    </span>
                                                                  </>
                                                                ) : (
                                                                  <>
                                                                    <span
                                                                      style={{ cursor: "pointer", color: "green" }}
                                                                      onClick={() => { Gotohistory(item.c_uid) }}
                                                                    >
                                                                      (Account history)
                                                                    </span>

                                                                  </>
                                                                )
                                                              }
                                                              <RowEditComponentSecond
                                                                Gotodetailaccount={Gotodetailaccount}
                                                                c_uid={item?.c_uid}
                                                                c_id={item?.c_id}
                                                                id={item?.c_id}
                                                                bank_id={item?.bank_id}
                                                                handleShow={handleShow}
                                                                setShowUpdate={setShowUpdate}
                                                                setName={setName}
                                                                account_name={item?.account_name}
                                                                editaccountype={editaccountype}
                                                                ac_ty_id={item?.ac_ty_id}
                                                                detail_type_id={item?.detail_type_id}
                                                                _onshowcreatestatus={_onshowcreatestatus}
                                                                _oneditshowcurrency={_oneditshowcurrency}
                                                                currencies_id={item?.currency_uid}
                                                                setDescription={setDescription}
                                                                getNameList={getNameList}
                                                                type_id={item?.type_id}
                                                                checkedtrue={checkedtrue}
                                                                desc={item?.c_desc}
                                                                listsubaccountname={listsubaccountname}
                                                                editbeginningbalanceSecond={editbeginningbalanceSecond}
                                                                _ongetCurrencyvalues={_ongetCurrencyvalues}
                                                                getstutas={getstutas}
                                                                _onsearchaccountid={_onsearchaccountid}
                                                                handleShowDelelete={handleShowDelelete}
                                                                _ongetBanckvalues={_ongetBanckvalues}

                                                              />
                                                            </TableCell>
                                                          </TableRow>
                                                          < RowComponentSearch
                                                            children={listallaccountchildren}
                                                            id={item.c_id}
                                                            level={40}
                                                            Gotodetailaccount={Gotodetailaccount}
                                                            Gotohistory={Gotohistory}
                                                            handleShow={handleShow}
                                                            setShowUpdate={setShowUpdate}
                                                            setName={setName}
                                                            editaccountype={editaccountype}
                                                            _onshowcreatestatus={_onshowcreatestatus}
                                                            _oneditshowcurrency={_oneditshowcurrency}
                                                            currencies_id={item.currency_uid}
                                                            setDescription={setDescription}
                                                            getNameList={getNameList}
                                                            checkedtrue={checkedtrue}
                                                            listsubaccountname={listsubaccountname}
                                                            editbeginningbalanceSecond={editbeginningbalanceSecond}
                                                            _ongetCurrencyvalues={_ongetCurrencyvalues}
                                                            getstutas={getstutas}
                                                            _onsearchaccountid={_onsearchaccountid}
                                                          />
                                                        </>
                                                      )
                                                    })
                                                  }

                                                </>)
                                            }

                                          </>) : (
                                          <>
                                            {
                                              levels_four && levels_four.map((item, index) => {
                                                return (
                                                  <>
                                                    <TableRow key={index}>
                                                      <TableCell>{item.account_name}</TableCell>
                                                      <TableCell align="left">{item.accounttype_name}</TableCell>
                                                      <TableCell align="left">{item.currencesname}</TableCell>
                                                      <TableCell align="left">{item.c_desc}</TableCell>
                                                      <TableCell align="right">{getFormatNumber(item.c_balance)}</TableCell>
                                                      <TableCell align="right">
                                                        {
                                                          item?.createstatus == "In" || item?.createstatus == "Ex" ? (
                                                            <>
                                                              <span
                                                                style={{ cursor: "pointer", color: "green" }}
                                                                onClick={() => { Gotodetailaccount(item.c_uid) }}
                                                              >
                                                                (Run report)
                                                              </span>
                                                            </>
                                                          ) : (
                                                            <>
                                                              <span
                                                                style={{ cursor: "pointer", color: "green" }}
                                                                onClick={() => { Gotohistory(item.c_uid) }}
                                                              >
                                                                (Account history)
                                                              </span>

                                                            </>
                                                          )
                                                        }

                                                        <RowEditComponentSecond
                                                          Gotodetailaccount={Gotodetailaccount}
                                                          c_uid={item?.c_uid}
                                                          c_id={item?.c_id}
                                                          id={item?.c_id}
                                                          bank_id={item?.bank_id}
                                                          handleShow={handleShow}
                                                          setShowUpdate={setShowUpdate}
                                                          setName={setName}
                                                          account_name={item?.account_name}
                                                          editaccountype={editaccountype}
                                                          ac_ty_id={item?.ac_ty_id}
                                                          detail_type_id={item?.detail_type_id}
                                                          _onshowcreatestatus={_onshowcreatestatus}
                                                          _oneditshowcurrency={_oneditshowcurrency}
                                                          currencies_id={item?.currency_uid}
                                                          setDescription={setDescription}
                                                          getNameList={getNameList}
                                                          type_id={item?.type_id}
                                                          checkedtrue={checkedtrue}
                                                          desc={item?.c_desc}
                                                          listsubaccountname={listsubaccountname}
                                                          editbeginningbalanceSecond={editbeginningbalanceSecond}
                                                          _ongetCurrencyvalues={_ongetCurrencyvalues}
                                                          getstutas={getstutas}
                                                          _onsearchaccountid={_onsearchaccountid}
                                                          handleShowDelelete={handleShowDelelete}
                                                          _ongetBanckvalues={_ongetBanckvalues}

                                                        />

                                                      </TableCell>
                                                    </TableRow>
                                                    < RowComponentSearch
                                                      children={listallaccountchildren}
                                                      id={item.c_id}
                                                      level={40}
                                                      Gotodetailaccount={Gotodetailaccount}
                                                      Gotohistory={Gotohistory}
                                                      handleShow={handleShow}
                                                      setShowUpdate={setShowUpdate}
                                                      setName={setName}
                                                      editaccountype={editaccountype}
                                                      _onshowcreatestatus={_onshowcreatestatus}
                                                      _oneditshowcurrency={_oneditshowcurrency}
                                                      currencies_id={item.currency_uid}
                                                      setDescription={setDescription}
                                                      getNameList={getNameList}
                                                      checkedtrue={checkedtrue}
                                                      listsubaccountname={listsubaccountname}
                                                      editbeginningbalanceSecond={editbeginningbalanceSecond}
                                                      _ongetCurrencyvalues={_ongetCurrencyvalues}
                                                      getstutas={getstutas}
                                                      _onsearchaccountid={_onsearchaccountid}
                                                    />
                                                  </>
                                                )
                                              })
                                            }

                                          </>)

                                      }


                                    </>) : (
                                    <>
                                      {
                                        levels_three && levels_three.map((item, index) => {
                                          return (
                                            <>
                                              <TableRow key={index}>
                                                <TableCell>{item.account_name}</TableCell>
                                                <TableCell align="left">{item.accounttype_name}</TableCell>
                                                <TableCell align="left">{item.currencesname}</TableCell>
                                                <TableCell align="left">{item.c_desc}</TableCell>
                                                <TableCell align="right">{getFormatNumber(item.c_balance)}</TableCell>
                                                <TableCell align="right">
                                                  {
                                                    item?.createstatus == "In" || item?.createstatus == "Ex" ? (
                                                      <>
                                                        <span
                                                          style={{ cursor: "pointer", color: "green" }}
                                                          onClick={() => { Gotodetailaccount(item.c_uid) }}
                                                        >
                                                          (Run report)
                                                        </span>
                                                      </>
                                                    ) : (
                                                      <>
                                                        <span
                                                          style={{ cursor: "pointer", color: "green" }}
                                                          onClick={() => { Gotohistory(item.c_uid) }}
                                                        >
                                                          (Account history)
                                                        </span>

                                                      </>
                                                    )
                                                  }

                                                  <RowEditComponentSecond
                                                    Gotodetailaccount={Gotodetailaccount}
                                                    c_uid={item?.c_uid}
                                                    c_id={item?.c_id}
                                                    id={item?.c_id}
                                                    bank_id={item?.bank_id}
                                                    handleShow={handleShow}
                                                    setShowUpdate={setShowUpdate}
                                                    setName={setName}
                                                    account_name={item?.account_name}
                                                    editaccountype={editaccountype}
                                                    ac_ty_id={item?.ac_ty_id}
                                                    detail_type_id={item?.detail_type_id}
                                                    _onshowcreatestatus={_onshowcreatestatus}
                                                    _oneditshowcurrency={_oneditshowcurrency}
                                                    currencies_id={item?.currency_uid}
                                                    setDescription={setDescription}
                                                    getNameList={getNameList}
                                                    type_id={item?.type_id}
                                                    checkedtrue={checkedtrue}
                                                    desc={item?.c_desc}
                                                    listsubaccountname={listsubaccountname}
                                                    editbeginningbalanceSecond={editbeginningbalanceSecond}
                                                    _ongetCurrencyvalues={_ongetCurrencyvalues}
                                                    getstutas={getstutas}
                                                    _onsearchaccountid={_onsearchaccountid}
                                                    handleShowDelelete={handleShowDelelete}
                                                    _ongetBanckvalues={_ongetBanckvalues}

                                                  />

                                                </TableCell>
                                              </TableRow>
                                              < RowComponentSearch
                                                children={listallaccountchildren}
                                                id={item.c_id}
                                                level={40}
                                                Gotodetailaccount={Gotodetailaccount}
                                                Gotohistory={Gotohistory}
                                                handleShow={handleShow}
                                                setShowUpdate={setShowUpdate}
                                                setName={setName}
                                                editaccountype={editaccountype}
                                                _onshowcreatestatus={_onshowcreatestatus}
                                                _oneditshowcurrency={_oneditshowcurrency}
                                                currencies_id={item.currency_uid}
                                                setDescription={setDescription}
                                                getNameList={getNameList}
                                                checkedtrue={checkedtrue}
                                                listsubaccountname={listsubaccountname}
                                                editbeginningbalanceSecond={editbeginningbalanceSecond}
                                                _ongetCurrencyvalues={_ongetCurrencyvalues}
                                                getstutas={getstutas}
                                                _onsearchaccountid={_onsearchaccountid}
                                              />
                                            </>
                                          )
                                        })
                                      }
                                    </>
                                  )

                                }

                              </>) : (<>
                                {
                                  levels_two && levels_two.map((item, index) => {
                                    return (
                                      <>
                                        <TableRow key={index}>
                                          <TableCell>{item.account_name}</TableCell>
                                          <TableCell align="left">{item.accounttype_name}</TableCell>
                                          <TableCell align="left">{item.currencesname}</TableCell>
                                          <TableCell align="left">{item.c_desc}</TableCell>
                                          <TableCell align="right">{getFormatNumber(item.c_balance)}</TableCell>
                                          <TableCell align="right">
                                            {
                                              item?.createstatus == "In" || item?.createstatus == "Ex" ? (
                                                <>
                                                  <span
                                                    style={{ cursor: "pointer", color: "green" }}
                                                    onClick={() => { Gotodetailaccount(item.c_uid) }}
                                                  >
                                                    (Run report)
                                                  </span>
                                                </>
                                              ) : (
                                                <>
                                                  <span
                                                    style={{ cursor: "pointer", color: "green" }}
                                                    onClick={() => { Gotohistory(item.c_uid) }}
                                                  >
                                                    (Account history)
                                                  </span>

                                                </>
                                              )
                                            }

                                            <RowEditComponentSecond
                                              Gotodetailaccount={Gotodetailaccount}
                                              c_uid={item?.c_uid}
                                              c_id={item?.c_id}
                                              id={item?.c_id}
                                              bank_id={item?.bank_id}
                                              handleShow={handleShow}
                                              setShowUpdate={setShowUpdate}
                                              setName={setName}
                                              account_name={item?.account_name}
                                              editaccountype={editaccountype}
                                              ac_ty_id={item?.ac_ty_id}
                                              detail_type_id={item?.detail_type_id}
                                              _onshowcreatestatus={_onshowcreatestatus}
                                              _oneditshowcurrency={_oneditshowcurrency}
                                              currencies_id={item?.currency_uid}
                                              setDescription={setDescription}
                                              getNameList={getNameList}
                                              type_id={item?.type_id}
                                              checkedtrue={checkedtrue}
                                              desc={item?.c_desc}
                                              listsubaccountname={listsubaccountname}
                                              editbeginningbalanceSecond={editbeginningbalanceSecond}
                                              _ongetCurrencyvalues={_ongetCurrencyvalues}
                                              getstutas={getstutas}
                                              _onsearchaccountid={_onsearchaccountid}
                                              handleShowDelelete={handleShowDelelete}
                                              _ongetBanckvalues={_ongetBanckvalues}

                                            />

                                          </TableCell>
                                        </TableRow>
                                        < RowComponentSearch
                                          children={listallaccountchildren}
                                          id={item.c_id}
                                          level={40}
                                          Gotodetailaccount={Gotodetailaccount}
                                          Gotohistory={Gotohistory}
                                          handleShow={handleShow}
                                          setShowUpdate={setShowUpdate}
                                          setName={setName}
                                          editaccountype={editaccountype}
                                          _onshowcreatestatus={_onshowcreatestatus}
                                          _oneditshowcurrency={_oneditshowcurrency}
                                          currencies_id={item.currency_uid}
                                          setDescription={setDescription}
                                          getNameList={getNameList}
                                          checkedtrue={checkedtrue}
                                          listsubaccountname={listsubaccountname}
                                          editbeginningbalanceSecond={editbeginningbalanceSecond}
                                          _ongetCurrencyvalues={_ongetCurrencyvalues}
                                          getstutas={getstutas}
                                          _onsearchaccountid={_onsearchaccountid}
                                          handleShowDelelete={handleShowDelelete}
                                        />
                                      </>
                                    )
                                  })
                                }

                              </>)

                          }

                        </>) : (
                        <>
                          {
                            levels_one && levels_one.map((item, index) => {
                              return (
                                <>
                                  <TableRow key={index}>
                                    <TableCell>{item.account_name}</TableCell>
                                    <TableCell align="left">{item.accounttype_name}</TableCell>
                                    <TableCell align="left">{item.currencesname}</TableCell>
                                    <TableCell align="left">{item.c_desc}</TableCell>
                                    <TableCell align="right">{getFormatNumber(item.c_balance)}</TableCell>
                                    <TableCell align="right">
                                      {
                                        item?.createstatus == "In" || item?.createstatus == "Ex" ? (
                                          <>
                                            <span
                                              style={{ cursor: "pointer", color: "green" }}
                                              onClick={() => { Gotodetailaccount(item.c_uid) }}
                                            >
                                              (Run report)
                                            </span>
                                          </>
                                        ) : (
                                          <>
                                            <span
                                              style={{ cursor: "pointer", color: "green" }}
                                              onClick={() => { Gotohistory(item.c_uid) }}
                                            >
                                              (Account history)
                                            </span>

                                          </>
                                        )
                                      }


                                      <RowEditComponentSecond
                                        Gotodetailaccount={Gotodetailaccount}
                                        c_uid={item?.c_uid}
                                        c_id={item?.c_id}
                                        id={item?.c_id}
                                        bank_id={item?.bank_id}
                                        handleShow={handleShow}
                                        setShowUpdate={setShowUpdate}
                                        setName={setName}
                                        account_name={item?.account_name}
                                        editaccountype={editaccountype}
                                        ac_ty_id={item?.ac_ty_id}
                                        detail_type_id={item?.detail_type_id}
                                        _onshowcreatestatus={_onshowcreatestatus}
                                        _oneditshowcurrency={_oneditshowcurrency}
                                        currencies_id={item?.currency_uid}
                                        setDescription={setDescription}
                                        getNameList={getNameList}
                                        type_id={item?.type_id}
                                        checkedtrue={checkedtrue}
                                        desc={item?.c_desc}
                                        listsubaccountname={listsubaccountname}
                                        editbeginningbalanceSecond={editbeginningbalanceSecond}
                                        _ongetCurrencyvalues={_ongetCurrencyvalues}
                                        getstutas={getstutas}
                                        _onsearchaccountid={_onsearchaccountid}
                                        handleShowDelelete={handleShowDelelete}
                                        _ongetBanckvalues={_ongetBanckvalues}

                                      />

                                    </TableCell>
                                  </TableRow>
                                  < RowComponentSearch
                                    children={listallaccountchildren}
                                    id={item?.c_id}
                                    level={40}
                                    Gotodetailaccount={Gotodetailaccount}
                                    Gotohistory={Gotohistory}
                                    handleShow={handleShow}
                                    setShowUpdate={setShowUpdate}
                                    setName={setName}
                                    editaccountype={editaccountype}
                                    _onshowcreatestatus={_onshowcreatestatus}
                                    _oneditshowcurrency={_oneditshowcurrency}
                                    currencies_id={item?.currency_uid}
                                    setDescription={setDescription}
                                    getNameList={getNameList}
                                    checkedtrue={checkedtrue}
                                    listsubaccountname={listsubaccountname}
                                    editbeginningbalanceSecond={editbeginningbalanceSecond}
                                    _ongetCurrencyvalues={_ongetCurrencyvalues}
                                    getstutas={getstutas}
                                    _onsearchaccountid={_onsearchaccountid}
                                    handleShowDelelete={handleShowDelelete}
                                    _ongetBanckvalues={_ongetBanckvalues}

                                  />
                                </>
                              )
                            })
                          }

                        </>)


                    }
                  </>
                ) : (
                  <>
                    {(bulletinsPerPage > 0
                      ? listallaccount.slice(pagesVisited, pagesVisited + bulletinsPerPage)
                      : listallaccount
                    ).map((item, index) => {
                      return (
                        <>
                          <TableRow key={index}>
                            <TableCell>{item.account_name}</TableCell>
                            <TableCell align="left">{item.accounttype_name}</TableCell>
                            <TableCell align="left">{item.currencesname}</TableCell>
                            <TableCell align="left">{item.c_desc}</TableCell>
                            <TableCell align="right">{getFormatNumber(item.c_balance)}</TableCell>
                            <TableCell align="right">
                              {
                                item?.createstatus == "In" || item?.createstatus == "Ex" ? (
                                  <>
                                    <span
                                      style={{ cursor: "pointer", color: "green" }}
                                      onClick={() => { Gotodetailaccount(item.c_uid) }}
                                    >
                                      (Run report)
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span
                                      style={{ cursor: "pointer", color: "green" }}
                                      onClick={() => { Gotohistory(item.c_uid) }}
                                    >
                                      (Account history)
                                    </span>

                                  </>
                                )
                              }
                              <RowEditComponentfirst
                                Gotodetailaccount={Gotodetailaccount}
                                c_uid={item?.c_uid}
                                id={item?.c_id}
                                c_id={item?.c_id}
                                bank_id={item?.bank_id}
                                handleShow={handleShow}
                                setShowUpdate={setShowUpdate}
                                account_name={item?.account_name}
                                type_id={item?.type_id}
                                detail_type_id={item?.detail_type_id}
                                balance={item?.c_balance}
                                desc={item?.c_desc}
                                setName={setName}
                                editaccountype={editaccountype}
                                ac_ty_id={item?.ac_ty_id}
                                _onshowcreatestatus={_onshowcreatestatus}
                                _oneditshowcurrency={_oneditshowcurrency}
                                currencies_id={item?.currency_uid}
                                setDescription={setDescription}
                                editbeginningbalancefirst={editbeginningbalancefirst}
                                _ongetCurrencyvalues={_ongetCurrencyvalues}
                                getstutas={getstutas}
                                _onsearchaccountid={_onsearchaccountid}
                                handleShowDelelete={handleShowDelelete}
                                _ongetBanckvalues={_ongetBanckvalues}
                              />
                            </TableCell>
                          </TableRow>
                          {/* level 1 */}
                          < RowComponent
                            children={listallaccountchildren}
                            id={item?.c_id}
                            level={40}
                            Gotodetailaccount={Gotodetailaccount}
                            Gotohistory={Gotohistory}
                            handleShow={handleShow}
                            setShowUpdate={setShowUpdate}
                            setName={setName}
                            editaccountype={editaccountype}
                            _onshowcreatestatus={_onshowcreatestatus}
                            _oneditshowcurrency={_oneditshowcurrency}
                            currencies_id={item.currency_uid}
                            setDescription={setDescription}
                            getNameList={getNameList}
                            checkedtrue={checkedtrue}
                            listsubaccountname={listsubaccountname}
                            editbeginningbalanceSecond={editbeginningbalanceSecond}
                            _ongetCurrencyvalues={_ongetCurrencyvalues}
                            getstutas={getstutas}
                            _onsearchaccountid={_onsearchaccountid}
                            handleShowDelelete={handleShowDelelete}
                            _ongetBanckvalues={_ongetBanckvalues}

                          />
                        </>
                      )
                    })}
                  </>
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", width: "100%" }}>
          <Row>
            <Col className="bulletinPagination" md={12}>
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={handlePageChange}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            </Col>
          </Row>
          <div></div>

        </div>

      </div>
    </>
  );
}
// Level 1
function RowComponent({ children, id, _ongetBanckvalues, level, handleShowDelelete, Gotodetailaccount, Gotohistory, handleShow, setShowUpdate, getstutas, _onsearchaccountid, setName, editaccountype, _onshowcreatestatus, _oneditshowcurrency, setDescription, getNameList, checkedtrue, listsubaccountname, editbeginningbalanceSecond, _ongetCurrencyvalues }) {
  const filter = children.filter((el) => el.parents == id);
  if (filter.length === 0) return <></>;
  return (
    <>
      {filter.map((data, index) => {
        return (
          <>
            <TableRow key={index}>
              <TableCell style={{
                paddingLeft: level,
              }}>
                {data?.account_name}
              </TableCell>
              <TableCell align="left">{data?.accounttype_name}Second</TableCell>
              <TableCell align="left">{data?.currencesname}</TableCell>
              <TableCell align="left">{data?.c_desc}</TableCell>
              <TableCell align="right">{getFormatNumber(data.c_balance)}</TableCell>
              <TableCell align="right">
                {
                  data?.createstatus == "In" || data?.createstatus == "Ex" ? (
                    <>
                      <span
                        style={{ cursor: "pointer", color: "green" }}
                        onClick={() => { Gotodetailaccount(data.c_uid) }}
                      >
                        (Run report)
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        style={{ cursor: "pointer", color: "green" }}
                        onClick={() => { Gotohistory(data.c_uid) }}
                      >
                        (Account history)
                      </span>

                    </>
                  )
                }
                <RowEditComponentSecond
                  Gotodetailaccount={Gotodetailaccount}
                  c_uid={data?.c_uid}
                  c_id={data?.c_id}
                  id={data?.c_id}
                  bank_id={data?.bank_id}
                  handleShow={handleShow}
                  setShowUpdate={setShowUpdate}
                  setName={setName}
                  account_name={data?.account_name}
                  editaccountype={editaccountype}
                  ac_ty_id={data?.ac_ty_id}
                  detail_type_id={data?.detail_type_id}
                  _onshowcreatestatus={_onshowcreatestatus}
                  _oneditshowcurrency={_oneditshowcurrency}
                  currencies_id={data?.currency_uid}
                  setDescription={setDescription}
                  getNameList={getNameList}
                  type_id={data?.type_id}
                  checkedtrue={checkedtrue}
                  desc={data?.c_desc}
                  listsubaccountname={listsubaccountname}
                  editbeginningbalanceSecond={editbeginningbalanceSecond}
                  _ongetCurrencyvalues={_ongetCurrencyvalues}
                  getstutas={getstutas}
                  _onsearchaccountid={_onsearchaccountid}
                  handleShowDelelete={handleShowDelelete}
                  _ongetBanckvalues={_ongetBanckvalues}

                />
              </TableCell>
            </TableRow>
            <RowComponent
              children={children}
              id={data?.c_id}
              c_id={data?.c_id}
              level={level * 2 - 30}
              bank_id={data?.bank_id}
              c_uid={data?.c_uid}
              Gotodetailaccount={Gotodetailaccount}
              Gotohistory={Gotohistory}
              handleShow={handleShow}
              setShowUpdate={setShowUpdate}
              setName={setName}
              account_name={data?.account_name}
              editaccountype={editaccountype}
              ac_ty_id={data?.ac_ty_id}
              detail_type_id={data?.detail_type_id}
              _onshowcreatestatus={_onshowcreatestatus}
              _oneditshowcurrency={_oneditshowcurrency}
              currencies_id={data?.currency_uid}
              setDescription={setDescription}
              type_id={data?.type_id}
              checkedtrue={checkedtrue}
              getNameList={getNameList}
              listsubaccountname={listsubaccountname}
              desc={data?.c_desc}
              editbeginningbalanceSecond={editbeginningbalanceSecond}
              _ongetCurrencyvalues={_ongetCurrencyvalues}
              getstutas={getstutas}
              _onsearchaccountid={_onsearchaccountid}
              handleShowDelelete={handleShowDelelete}
              _ongetBanckvalues={_ongetBanckvalues}
            />
          </>
        );
      })}
    </>
  );
}
// search componentSearch
function RowComponentSearch({ children, id, level, handleShowDelelete, _ongetBanckvalues, Gotodetailaccount, Gotohistory, handleShow, setShowUpdate, getstutas, _onsearchaccountid, setName, editaccountype, _onshowcreatestatus, _oneditshowcurrency, setDescription, getNameList, checkedtrue, listsubaccountname, editbeginningbalanceSecond, _ongetCurrencyvalues }) {
  const filter = children.filter((el) => el.parents == id);
  if (filter.length === 0) return <></>;
  return (
    <>
      {filter.map((data, index) => {
        return (
          <>
            <TableRow key={index}>
              <TableCell style={{
                paddingLeft: level,
              }}>
                {data?.account_name}
              </TableCell>
              <TableCell align="left">{data?.accounttype_name}</TableCell>
              <TableCell align="left">{data?.currencesname}</TableCell>
              <TableCell align="left">{data?.c_desc}</TableCell>
              <TableCell align="right">{getFormatNumber(data.c_balance)}</TableCell>
              <TableCell align="right">
                {
                  data?.createstatus == "In" || data?.createstatus == "Ex" ? (
                    <>
                      <span
                        style={{ cursor: "pointer", color: "green" }}
                        onClick={() => { Gotodetailaccount(data.c_uid) }}
                      >
                        (Run report)
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        style={{ cursor: "pointer", color: "green" }}
                        onClick={() => { Gotohistory(data.c_uid) }}
                      >
                        (Account history)
                      </span>

                    </>
                  )
                }
                <RowEditComponentSecond
                  Gotodetailaccount={Gotodetailaccount}
                  c_uid={data?.c_uid}
                  c_id={data?.c_id}
                  id={data?.c_id}
                  bank_id={data?.bank_id}
                  handleShow={handleShow}
                  setShowUpdate={setShowUpdate}
                  setName={setName}
                  account_name={data?.account_name}
                  editaccountype={editaccountype}
                  ac_ty_id={data?.ac_ty_id}
                  detail_type_id={data?.detail_type_id}
                  _onshowcreatestatus={_onshowcreatestatus}
                  _oneditshowcurrency={_oneditshowcurrency}
                  currencies_id={data?.currency_uid}
                  setDescription={setDescription}
                  getNameList={getNameList}
                  type_id={data?.type_id}
                  checkedtrue={checkedtrue}
                  desc={data?.c_desc}
                  listsubaccountname={listsubaccountname}
                  editbeginningbalanceSecond={editbeginningbalanceSecond}
                  _ongetCurrencyvalues={_ongetCurrencyvalues}
                  getstutas={getstutas}
                  _onsearchaccountid={_onsearchaccountid}
                  _ongetBanckvalues={_ongetBanckvalues}
                  handleShowDelelete={handleShowDelelete}

                />
              </TableCell>
            </TableRow>
            <RowComponentSearch
              children={children}
              id={data?.c_id}
              c_id={data?.c_id}
              level={level * 2 - 30}
              Gotodetailaccount={Gotodetailaccount}
              Gotohistory={Gotohistory}
              handleShow={handleShow}
              setShowUpdate={setShowUpdate}
              setName={setName}
              account_name={data?.account_name}
              editaccountype={editaccountype}
              ac_ty_id={data?.ac_ty_id}
              detail_type_id={data?.detail_type_id}
              _onshowcreatestatus={_onshowcreatestatus}
              _oneditshowcurrency={_oneditshowcurrency}
              currencies_id={data?.currency_uid}
              setDescription={setDescription}
              type_id={data?.type_id}
              checkedtrue={checkedtrue}
              getNameList={getNameList}
              listsubaccountname={listsubaccountname}
              desc={data?.c_desc}
              editbeginningbalanceSecond={editbeginningbalanceSecond}
              _ongetCurrencyvalues={_ongetCurrencyvalues}
              getstutas={getstutas}
              _onsearchaccountid={_onsearchaccountid}
              _ongetBanckvalues={_ongetBanckvalues}
              handleShowDelelete={handleShowDelelete}
            />
          </>
        );
      })}
    </>
  );
}
//ComponentPrint
function RowComponentPrint({ children, id, level, Gotodetailaccount, Gotohistory, handleShow, setShowUpdate, getstutas, _onsearchaccountid, setName, editaccountype, _onshowcreatestatus, _oneditshowcurrency, currencies_id, setDescription, getNameList, checkedtrue, listsubaccountname, editbeginningbalanceSecond, _ongetCurrencyvalues }) {
  const filter = children.filter((el) => el.parents == id);
  if (filter.length === 0) return <></>;
  return (
    <>
      {filter.map((data, index) => {
        return (
          <>
            <TableRow key={index}>
              <TableCell style={{
                paddingLeft: level,
              }}>
                {data?.account_name}
              </TableCell>
              <TableCell align="left">{data?.accounttype_name}</TableCell>
              <TableCell align="left">{data?.currencesname}</TableCell>
              <TableCell align="left">{data?.c_desc}</TableCell>
              <TableCell align="right">{getFormatNumber(data.c_balance)}</TableCell>
            </TableRow>
            <RowComponentPrint
              children={children}
              id={data?.c_id}
              c_id={data?.c_id}
              level={level * 2}
              Gotodetailaccount={Gotodetailaccount}
              Gotohistory={Gotohistory}
              handleShow={handleShow}
              setShowUpdate={setShowUpdate}
              setName={setName}
              account_name={data?.account_name}
              editaccountype={editaccountype}
              ac_ty_id={data?.ac_ty_id}
              detail_type_id={data?.detail_type_id}
              _onshowcreatestatus={_onshowcreatestatus}
              _oneditshowcurrency={_oneditshowcurrency}
              currencies_id={data?.currency_uid}
              setDescription={setDescription}
              type_id={data?.type_id}
              checkedtrue={checkedtrue}
              getNameList={getNameList}
              listsubaccountname={listsubaccountname}
              desc={data?.c_desc}
              editbeginningbalanceSecond={editbeginningbalanceSecond}
              _ongetCurrencyvalues={_ongetCurrencyvalues}
              getstutas={getstutas}
              _onsearchaccountid={_onsearchaccountid}
            />
          </>
        );
      })}
    </>
  );
}
function RowEditComponentSecond({
  Gotodetailaccount,
  c_uid,
  handleShow,
  setShowUpdate,
  c_id,
  bank_id,
  _ongetCurrencyvalues,
  getstutas,
  _onsearchaccountid,
  account_name,
  type_id,
  currencies_id,
  desc,
  setName,
  editaccountype,
  _onshowcreatestatus,
  _oneditshowcurrency,
  setDescription,
  getNameList,
  id,
  checkedtrue,
  listsubaccountname,
  editbeginningbalanceSecond,
  handleShowDelelete,
  _ongetBanckvalues


}) {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("");
  const handleClick = () => {
    setActive(null)
    setOpen(!open);
  };
  const onBlurClose = () => {
    if (active == null) {
      setOpen(true)
    }
  }
  return (
    <>
      <button
        style={{
          border: "1px solid #ccc",
          border: "none",
          borderRadius: 5,
        }}
        onClick={() => { handleClick(active) }}
        onBlur={() => { onBlurClose() }}>
        {open == false ? (
          <>
            <ExpandLess onClick={() => { handleClick() }} />
          </>
        ) : (
          <>
            <ExpandMore onClick={() => { handleClick() }} />
          </>
        )}
      </button>
      {
        open ? (
          <>
          </>
        ) : (
          <>
            <div style={{ position: "fixed", backgroundColor: "#CBC7C7", height: 50, }}>
            </div>
            <div style={{
              borderRadius: 5,
              backgroundColor: '#CBC7C7',
              position: "absolute",
              marginLeft: 20,
            }}
              onMouseOver={() => setActive(1)}
              onMouseLeave={() => setActive(null)}
            >
              <ListItem button style={{ color: "" }}
                onClick={() => {
                  handleShow();
                  handleClick();
                  setShowUpdate(true);
                  _ongetCurrencyvalues(currencies_id);
                  getstutas(c_id);
                  _onsearchaccountid(type_id);
                  setName(account_name);
                  editaccountype(type_id);
                  _onshowcreatestatus(type_id);
                  _oneditshowcurrency(currencies_id);
                  setDescription(desc);
                  getNameList(id);
                  checkedtrue();
                  listsubaccountname(type_id);
                  editbeginningbalanceSecond(c_id);
                  _ongetBanckvalues(bank_id)
                }}
              >
                Edit
              </ListItem>
              <ListItem button style={{ color: "" }}
                onClick={() => { Gotodetailaccount(c_uid) }}
              >
                Run report
              </ListItem>
              <ListItem button>
                Make inactive
              </ListItem>
              <ListItem button
                onClick={() => { handleShowDelelete(c_uid) }}
              >
                Deleted
              </ListItem>
            </div>
          </>
        )
      }
    </>
  );
}
function RowEditComponentfirst(

  {
    Gotodetailaccount,
    c_id,
    c_uid,
    handleShow,
    setShowUpdate,
    id,
    bank_id,
    editbeginningbalancefirst,
    _ongetCurrencyvalues,
    _ongetBanckvalues,
    getstutas,
    _onsearchaccountid,
    account_name,
    type_id,
    currencies_id,
    desc, setName,
    editaccountype,
    _onshowcreatestatus,
    _oneditshowcurrency,
    setDescription,
    // listsubaccountname,
    handleShowDelelete
  }) {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("");

  const handleClick = () => {
    setActive(null)
    setOpen(!open);
  };
  const onBlurClose = (active) => {

    if (active == null) {
      setOpen(true)
    }
  }
  return (
    <>
      <button
        style={{
          border: "1px solid #ccc",
          border: "none",
          borderRadius: 5
        }}
        onClick={() => { handleClick() }}
        onBlur={() => { onBlurClose(active) }}>
        {open == false ? (
          <>
            <ExpandLess onClick={() => { handleClick() }} />
          </>
        ) : (
          <>
            <ExpandMore onClick={() => { handleClick() }} />
          </>
        )}
      </button>
      {
        open == false ? (
          <>
            <div
              style={{
                borderRadius: 5,
                backgroundColor: '#CBC7C7',
                position: "absolute", marginLeft: 20
              }}
              onMouseOver={() => setActive(1)}
              onMouseLeave={() => setActive(null)}

            >
              <ListItem button style={{ color: "" }}
                onClick={() => {
                  handleShow();
                  handleClick();
                  setShowUpdate(true);
                  editbeginningbalancefirst(id);
                  _ongetCurrencyvalues(currencies_id);
                  getstutas(c_id);
                  _onsearchaccountid(type_id);
                  setName(account_name);
                  editaccountype(type_id);
                  _onshowcreatestatus(type_id);
                  _oneditshowcurrency(currencies_id);
                  setDescription(desc);
                  // listsubaccountname(type_id)
                  _ongetBanckvalues(bank_id)


                }}>
                Edit
              </ListItem>
              <ListItem button style={{ color: "" }}
                onClick={() => { Gotodetailaccount(c_uid) }}
              >
                Run report
              </ListItem>
              <ListItem button>
                Make inactive
              </ListItem>
              <ListItem button
                onClick={() => { handleShowDelelete(c_uid) }}

              >
                Deleted
              </ListItem>

            </div>
          </>
        ) : (
          <>
          </>
        )
      }

    </>
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

function ComponentCell({ listallaccountchildren, level, id, getNameList1 }) {
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
              onClick={() => { getNameList1(items?.c_id) }}
              onMouseOver={() => setActive(items?.account_name)}
              onMouseLeave={() => setActive(null)}
            >
              {items?.account_name}
            </span>
            <ComponentCell1
              id={items?.c_id}
              getNameList1={getNameList1}
              listallaccountchildren={listallaccountchildren}
            />
          </>

        )
      })
    }
  </>)
}
function ComponentCell1({ listallaccountchildren, id, getNameList1 }) {
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
              onClick={() => { getNameList1(items?.c_id) }}
              onMouseOver={() => setActive(items?.account_name)}
              onMouseLeave={() => setActive(null)}
            >
              {items?.account_name}
            </span>
            <ComponentCell2
              id={items?.c_id}
              getNameList1={getNameList1}
              listallaccountchildren={listallaccountchildren}
            />

          </>

        )
      })
    }
  </>)
}
function ComponentCell2({ listallaccountchildren, id, getNameList1 }) {
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
              onClick={() => { getNameList1(items?.c_id) }}
              onMouseOver={() => setActive(items?.account_name)}
              onMouseLeave={() => setActive(null)}
            >
              {items?.account_name}
            </span>
            <ComponentCell3
              id={items?.c_id}
              getNameList1={getNameList1}
              listallaccountchildren={listallaccountchildren}
            />

          </>

        )
      })
    }
  </>)
}
function ComponentCell3({ listallaccountchildren, id, getNameList1 }) {
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
              onClick={() => { getNameList1(items?.c_id) }}
              onMouseOver={() => setActive(items?.account_name)}
              onMouseLeave={() => setActive(null)}
            >
              {items?.account_name}
            </span>
            <ComponentCell4
              id={items?.c_id}
              getNameList1={getNameList1}
              listallaccountchildren={listallaccountchildren}
            />

          </>

        )
      })
    }
  </>)
}
function ComponentCell4({ listallaccountchildren, id, getNameList1 }) {
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
              onClick={() => { getNameList1(items?.c_id) }}
              onMouseOver={() => setActive(items?.account_name)}
              onMouseLeave={() => setActive(null)}
            >
              {items?.account_name}
            </span>
            <ComponentCell5
              id={items?.c_id}
              getNameList1={getNameList1}
              listallaccountchildren={listallaccountchildren}
            />

          </>

        )
      })
    }
  </>)
}
function ComponentCell5({ listallaccountchildren, id, getNameList1 }) {
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
              onClick={() => { getNameList1(items?.c_id) }}
              onMouseOver={() => setActive(items?.account_name)}
              onMouseLeave={() => setActive(null)}
            >
              {items?.account_name}
            </span>
            <ComponentCell6
              id={items?.c_id}
              getNameList1={getNameList1}
              listallaccountchildren={listallaccountchildren}
            />

          </>

        )
      })
    }
  </>)
}
function ComponentCell6({ listallaccountchildren, id, getNameList1 }) {
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
              onClick={() => { getNameList1(items?.c_id) }}
              onMouseOver={() => setActive(items?.account_name)}
              onMouseLeave={() => setActive(null)}
            >
              {items?.account_name}
            </span>
            <ComponentCell5
              id={items?.c_id}
              getNameList1={getNameList1}
              listallaccountchildren={listallaccountchildren}
            />
          </>

        )
      })
    }
  </>)
}
function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}


function PrintChartAccount({ ref }) {
  const componentRef = useRef(); // 2.
  return (
    <>

      <div style={{ display: 'none' }}>
        <table ref={(el) => (componentRef = el)}>
          <th>dssdfsafsa</th>


        </table>

      </div>
    </>
  )


}







