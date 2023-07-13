import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BarChartIcon from "@material-ui/icons/BarChart";
import Collapse from "@material-ui/core/Collapse";
import HomeIcon from "@material-ui/icons/Home";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import SearchIcon from '@material-ui/icons/Search';
import { Modal, Table } from "react-bootstrap";
import { LoginContext } from "../page/contexts/LoginContext";
import moment from 'moment';
import ErrorIcon from '@material-ui/icons/Error';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RestoreIcon from '@material-ui/icons/Restore';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
import { Spinner, Toast, Row, Col } from "react-bootstrap";
import CheckCircle from "@material-ui/icons/CheckCircleOutline";
import WarningIcon from '@material-ui/icons/Warning';
import { Button } from "@material-ui/core";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Journal from "../components/Journal";
import EditJournalbyReferent from "../components/EditJournalbyReferent";
import { Alert } from '@material-ui/lab';
import { getFormatNumber } from "../constants/functions"

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),

    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
export default function Home(props) {
  const Navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [listOpent, setListOpent] = useState(false);
  const [listOpentExchange, setListOpentExchange] = useState(false);
  const [show, setShow] = useState(false);
  const [exshow, setExshow] = useState(false);
  const {
    rate,
    id,
    showEditJournal,
    setShowEditJournal,
    showfullscreen,
    setShowfullscreen,
    showReferent,
    setShowReferent,
    onLoadrate,
    onloadreportGl,
    OnloadBalancesheet,
    OnloadResetCondition,
  } = useContext(LoginContext);
  const handleShow = () => {
    setShow(true)
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleExchangeShow = () => {
    setExshow(true)
  }
  const handleExchangeClose = () => {
    setExshow(false)
  }
  const CloseShoFullScrreen = () => {
    setShowEditJournal(false)
  }
  
  const ShowfullscreenJournal = () => {
    setShowfullscreen(true)
  }
  const ShowReferent = () => {
    setShowReferent(true)
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setListOpent(!listOpent);
  };
  const exchangerate = () => {
    setListOpentExchange(!listOpentExchange);
  }
  const gotoUnrealisedGainsAndLoss = () => {
    handleClose(false)
    Navigate('/UnrealisedGainsAndLosses');
  }
  return (
    <>
      {
        showfullscreen == true ? (
          <>
            <Journal />
          </>
        ) : (showEditJournal == true) ? (<>
          <EditComponentJournal
            onloadreportGl={ onloadreportGl}
            id={id}
            CloseShoFullScrreen={CloseShoFullScrreen}
          />
        </>) : (showReferent == true) ? (
          <>
            < EditJournalbyReferent />
          </>) : (
          <>
            <div className={classes.root}>
              <CssBaseline />
              <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                  [classes.appBarShift]: open,
                })}
              >
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                      [classes.hide]: open,
                    })}
                  >
                    <MenuIcon />
                  </IconButton>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                    <Typography variant="h6" noWrap>
                      Phongsavanh Group
                    </Typography>
                    <Typography variant="h6" noWrap>
                      <SearchIcon style={{ cursor: "pointer" }} onClick={() => {
                        handleShow()
                      }} />
                    </Typography>
                  </div>
                </Toolbar>
              </AppBar>
              < ComponentBoxGainsAndLosses
                handleClose={handleClose}
                show={show}
                rate={rate}
                onLoadrate={onLoadrate}
                onloadreportGl={onloadreportGl}
                OnloadBalancesheet={OnloadBalancesheet}
                OnloadResetCondition={OnloadResetCondition}      
              />
              <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
                })}
                classes={{
                  paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                  }),
                }}
              >
                <div className={classes.toolbar}>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "rtl" ? (
                      <ChevronRightIcon />
                    ) : (
                      <ChevronLeftIcon />
                    )}
                  </IconButton>
                </div>
                <Divider />
                <List>
                  <ListItem button onClick={() => Navigate("/Index")}>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    Home
                    <ListItemText />
                  </ListItem>
                </List>
                <Divider />
                <List>
                  <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    Settings
                    <ListItemText />
                  </ListItem>
                  <Collapse in={listOpent} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem button className={classes.nested} onClick={() => Navigate("/AccountCategory")}>
                        <ListItemIcon>
                        </ListItemIcon>
                        Category
                      </ListItem>
                    </List>
                  </Collapse>
                  <ListItem button onClick={exchangerate}>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    Exchange Rate
                    <ListItemText />
                  </ListItem>
                  <Collapse in={listOpentExchange} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
            
                      <ListItem button className={classes.nested} onClick={() => Navigate(`ExchangeRate/${1}`)}>
                        <ListItemIcon>
                        </ListItemIcon>
                        Exchange Rate
                      </ListItem>
                    </List>
                  </Collapse>
                  <ListItem button onClick={() => Navigate("/ChartAccount")}>
                    <ListItemIcon>
                      <BarChartIcon />
                    </ListItemIcon>
                    Chart of accounts
                    <ListItemText />
                  </ListItem>
                  <ListItem button onClick={() => ShowfullscreenJournal(true)} >
                    <ListItemIcon>
                      <BarChartIcon />
                    </ListItemIcon>
                    Journal entry
                    <ListItemText />
                  </ListItem>
                  {/* <ListItem button onClick={() => setShowReferent(true)} >
                    <ListItemIcon>
                      <BarChartIcon />
                    </ListItemIcon>
                    Referent
                    <ListItemText />
                  </ListItem> */}
                  <ListItem button onClick={() => Navigate("ReportTrialbalances")} >
                    <ListItemIcon>
                      <BarChartIcon />
                    </ListItemIcon>
                    Report Trail balance
                    <ListItemText />
                  </ListItem>
                  <ListItem button onClick={() => Navigate("ReportAllGL")} >
                    <ListItemIcon>
                      <BarChartIcon />
                    </ListItemIcon>
                    Report GL
                    <ListItemText />
                  </ListItem>
                  <ListItem button onClick={() => Navigate("BalanceSheet")} >
                    <ListItemIcon>
                      <BarChartIcon />
                    </ListItemIcon>
                    BalanceSheet
                    <ListItemText />
                  </ListItem>
                  <ListItem button onClick={() => Navigate("Profitandloss/2")} >
                    <ListItemIcon>
                      <BarChartIcon />
                    </ListItemIcon>
                    Profit and loss
                    <ListItemText />
                  </ListItem>
                 
                </List>
              </Drawer>
              <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
              </main>
            </div>
          </>)
      }

    </>
  );
}


function EditComponentJournal({ id, CloseShoFullScrreen, onloadreportGl }) {
  const classes = useStyles();

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
  const [listImage, setListImage] = useState([])
  const [file, setFile] = useState();
  const [showpicture, setShowpicture] = useState(false)
  const [checkCurrency, setCheckCurrency] = useState('')
  const [hiddenNetTotall, setHiddenNetTotall] = useState(false)
  const [getcheckcurrency, setGetcheckcurrency] = useState("")
  const [editcurrency, setEditcurrency] = useState("")
  const [errInforCurrency, setErrInforCurrency] = useState("");

  const handleClosedel = () => {
    setShows(false);
  }
  const handleCloseShowpicture = () => {
    setShowpicture(false)
  }
  const handlImage = () => setShowpicture(true);
  const handleShow = () => setShows(true);
  const handleShowLeave = () => {
    if (checkcondition == '1') {
      setShowleave(true)
    } else {
      CloseShoFullScrreen(false)
      setCheckcondition('')
    }
  };
  const ClearAllLines = () => {
    setCurrency_id('')
    setThb('')
    setUsd('')
    currencies()
    setData([...clearData])
    netTotalCrebit('')
    netTotalDebit('')
  }

  const addLines = (index) => {
    const cloneData = [...data]
    cloneData.splice(index, 0, { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' })
    setData([...cloneData])
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
    const file_attachment = Array.from(selectedFiles);
    setSelectedImages(file_attachment)
    setFile(event.target.files);
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
      let inforData = [...data?.data?.ledger]
      const dateIn = [...data?.data?.transactions][0].tr_date
      if ([...data?.data?.files[0].attachments].length == 0) {
        setListImage(0)
      } else {

        setListImage([...data?.data?.files[0].attachments])
      }
      if ([...data?.data?.ledger].length > 0) {
        setData([...data?.data?.ledger,
        { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
        { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' },
        { name: '', debit: '', credit: '', description: '', Tax: '', Employee: '' }])
        let initialValue = 0;
        let sumdebit = [...data?.data?.ledger]?.reduce(function (previousValue, currentValue) {
          return parseFloat(previousValue) + (currentValue['debit'] != undefined && currentValue['debit'] != '' ? parseFloat(currentValue['debit'].replaceAll(',', '')) : 0)
        }, initialValue)
        let sumcredit = [...data?.data?.ledger]?.reduce(function (previousValue, currentValue) {
          return parseFloat(previousValue) + (currentValue['credit'] != undefined && currentValue['credit'] != '' ? parseFloat(currentValue['credit'].replaceAll(',', '')) : 0)
        }, initialValue)
        if ([...data?.data?.transactions][0].currency_status == 'LAK') {
          setCheckCurrency(null)
        } else {
          setCheckCurrency('')
        }
        setUid([...data?.data?.transactions][0].currency_uid)
        setGetcheckcurrency([...data?.data?.transactions][0].currency_uid)
        let money_rate = [...data?.data?.transactions][0].rate
        // let format_number = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(money_rate)
        // let rate = format_number.replaceAll('$', '')
        let rate=money_rate.toString().replaceAll(',', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        let exchange = rate.replaceAll(',', '')
        let TotalDebit = (parseFloat(exchange) * parseFloat(sumdebit))
        let TotalCredit = (parseFloat(exchange) * parseFloat(sumcredit))
        setNetTotalDebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalDebit))
        setNetTotalCrebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalCredit))
        setUsd(rate)
        setThb(rate)
        setJournalNo([...data?.data?.transactions][0].journal_no)
        setEditcurrency([...data?.data?.transactions][0].currency_status)
        setTr_id([...data?.data?.transactions][0].tr_id)
        setDefaultValue(moment(dateIn).format("DD-MM-YYYY"))
        let keys = ['currency_code'];
        let values = ['USD', 'THB'];
        let filtered_data = inforData.filter(d => {
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
  const OnloadSelectCurrencies = (e, uid) => {
    setHiddenNetTotall(!hiddenNetTotall)
    if (uid == e) {

    } else {
      setGetcheckcurrency(e)
      setCurrency(e)
    }

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
      let rate=number.toString().replaceAll(',', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      // let format_number = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
      // let rate = format_number.replaceAll('$', '')
      let exchange = rate.replaceAll(',', '')
      setUsd(rate)
      let TotalDebit = (parseFloat(exchange) * parseFloat(x.replaceAll(',','')))
      let TotalCredit = (parseFloat(exchange) * parseFloat(y.replaceAll(',','')))
      setNetTotalDebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalDebit))
      setNetTotalCrebit(Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(TotalCredit))
    } else {
      let number = value.replaceAll(',', '')
      let rate=number.toString().replaceAll(',', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      // let format_number = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
      // let rate = format_number.replaceAll('$', '')
      let exchange = rate.replaceAll(',', '')
      setThb(rate)
      let TotalDebit = (parseFloat(exchange) * parseFloat(x.replaceAll(',','')))
      let TotalCredit = (parseFloat(exchange) * parseFloat(y.replaceAll(',','')))
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
    if (key == "USD" || key == "THB") {
      const ratenumber = value.toString().replaceAll(',', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      setUsd(ratenumber)
      setThb(ratenumber)
    } else {
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
    currencies()
    _searchstartdate()
  }, [])
  const onloadAutomaticGl = () => {
    axios.get("/accounting/api/report/reportAutoGL").then((data) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  }
  const createdata = async () => {
    let cure;
    let images
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
    setIsLoading(true);
    journaldata = {
      journal_no: journalNo,
      tr_date: defaultValue,
      currency_code: getcheckcurrency,
      money_rate: maincurrency,
      informdata: data,
      tr_id: tr_id,
      file_attachment: images
    }
    if (debit != credit) {
      setIsLoading(false);
      setSomething(true)
    } else {
      axios.put("/accounting/api/journal-entries/update", journaldata).then((data) => {
 
        setDefaultValue('')
        setShowToast(true);
        onloadreportGl();
        onloadAutomaticGl();
      
      }).catch((err) => {
        console.log(err)
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
        }
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
        <Modal show={showpicture} onHide={handleCloseShowpicture} style={{ paddingTop: 50 }} size="sm">
          <Modal.Header closeButton>
            <Modal.Title>Image</Modal.Title>
          </Modal.Header>
          <Modal.Header>
            {
              listImage.length > 0 ? (
                <div style={{ width: "100%" }}>
                  {
                    listImage.map((item, index) => (
                      <div key={index}
                        style={{
                          position: "relative",
                          display: "flex",
                          marginBottom: 10,
                          padding: 15,
                          borderRadius: 20,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          backgroundColor: "#0d6efd",
                        }}>
                        <img alt="Logo" src="/assets/images/file-blank-solid-240.png" style={{ width: 60, height: 60, color: "white" }} />
                        <a href={item} style={{ justifyItems: "center", color: "white", marginTop: 15, fontSize: 20 }}><p>Download</p></a>
                      </div>
                    ))
                  }
                </div>
              ) : null
            }
          </Modal.Header>
          <Modal.Footer>
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
        <div className={classes.root}>
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
        </div>
        {/* {JSON.stringify(data)} */}
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
          ) : null
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
                OnloadSelectCurrencies(e.target.value, uid);
              }}
              value={currency}
            >
              <option value="">{editcurrency}</option>
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
                      value={thb}
                      onChange={(e) => onChangeTextCurrency(e.target.value, currency_id)}
                      onBlur={(e) => onBlurCurrency(e.target.value, currency_id, convertdebit, convertcredit)}
                    />
                    <div style={{ marginLeft: 5 }}>
                      <img alt="Logo" src="/assets/images/laos.png" style={{ width: 40, height: 20, marginTop: 5 }} />
                    </div>
                    <div style={{ marginTop: 5, paddingLeft: 10 }}>LAK</div>
                  </div>
                </>
              ) :null
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
          {
            checkCurrency != null ? (
              <>
                {currency_id == "THB" ? (
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
                ) : null
                }
                {
                  currency_id == "USD" ? (
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
                  ) : null
                }
              </>) : null
          }
          {
            hiddenNetTotall == true ? (
              <>
                {currency_id == "THB" ? (
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
                ) : null
                }
                {
                  currency_id == "USD" ? (
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
                  ) : null
                }

              </>
            ) : null
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
          <div>
            {listImage != 0 ? (<>
              <small style={{ marginLeft: 20, color: "#0d6efd", cursor: "pointer" }} onClick={() => { handlImage() }}>Show Picture</small>
            </>) : (<>
            </>)}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
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
function RowComponentEdit({ changeText, deletechange, item, index, data, blurHandler, usd, thb, agconvertdebit, agconvertcredit, setCheckcondition, setActive, active, addLines, showcp, paste, copyData, OnLoadData, sumData, setNetTotalCrebit, setNetTotalDebit }) {
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
        data[index]['lg_id'] = ''
        data[index]['c_id'] = respone?.data?.message[0].c_id
        data[index]['c_uid'] = respone?.data?.message[0].c_uid
        data[index]['account_id'] = respone?.data.message[0].account_id
        data[index]['name'] = names.join(":");
        data[index]['currencies_id'] = respone?.data.message[0].currencies_id
        data[index]['parents'] = respone?.data.message[0].parents
        data[index]['conditions'] = respone?.data?.conditions[0].conditions
        changeText(names.join(":"), "name");
        data[index]['currency_code'] = respone?.data?.message[0].currency_code
        setShowBox(!showBox);
        OnLoadData(inputIdex)
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
            value={data[index].credit}
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
function ComponentBoxGainsAndLosses({ show, handleClose, rate, onLoadrate,onloadreportGl, OnloadBalancesheet,OnloadResetCondition }) {
  const [defaultValue, setDefaultValue] = useState("")
  const [defaultValue1, setDefaultValue1] = useState("")
  const [exchange, setExchange] = useState([])
  const [currency_code, setCurrency_code] = useState("")
  const [conver_rate, setConver_rate] = useState("")
  const [isDisabled, setIsDisabled] = useState(true)
  const [isCheckRateColor, setIsCheckRateColor] = useState('green')
  const [isCheckExchangeRateColor, setIsCheckExchangeRateColor] = useState('')
  const [isCheckExchangeRate, setIsCheckExchangeRate] = useState(false)
  const [listrate, setListrate] = useState([])


  const EnterDate = (e) => {
    setIsDisabled(false)
    setDefaultValue(moment(e).format("DD-MM-YYYY"))
    // setErrdate(false)
    // axios.get(`/accounting/api/loss-gain/getdate/${moment(e).format("DD-MM-YYYY")}`).then((data) => {
    //   if (data?.data?.result == 0) {
    //     setData([...clearData])
    //   } else {
    //     setData([...data?.data?.result])
    //     setExchange([...data?.data?.result])
    //   }
    // }).catch((err) => {
    //   console.log(err)
    // })
  }
  const EnterDate1 = (e) => {

    setDefaultValue1(moment(e).format("DD-MM-YYYY"))
    // setErrdate(false)
    // axios.get(`/accounting/api/loss-gain/getdate/${moment(e).format("DD-MM-YYYY")}`).then((data) => {
    //   if (data?.data?.result == 0) {
    //     setData([...clearData])
    //   } else {
    //     setData([...data?.data?.result])
    //     setExchange([...data?.data?.result])
    //   }
    // }).catch((err) => {
    //   console.log(err)
    // })
  }
  // const onbank = (e) => {
  //   setBank_id(e)
  //   setErrbank(false)
  // }
  const OnTransactionRate = () => {
    axios.get('/accounting/api/report/selectTransactionRate').then((data) => {
      setListrate([...data?.data?.results])
    }).catch((err) => {
      console.log(err)
    })
  }
  const OnRate = () => {
    setIsCheckRateColor('green')
    setIsCheckExchangeRateColor('black')
    setIsCheckExchangeRate(false)
    setDefaultValue('')
  }
  const OnExchangeRate = () => {
    setIsCheckRateColor('black')
    setIsCheckExchangeRateColor('green')
    setIsCheckExchangeRate(true)
  }
  const onChangeTextCurrency = (value) => {
    const ratenumber = value.toString().replaceAll(',', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    setExchange(ratenumber);
    setConver_rate(ratenumber.replaceAll(',', ''))
  }
  const onBlurCurrency = (value) => {
    let number = value.replaceAll(',', '')
    let format_number = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(number)
    setExchange(format_number.replaceAll('$', ''))
  }
  const insert = () => {
    let informdata = {
      date: defaultValue,
      conver_rate: conver_rate,
      currency_code: currency_code
    }
    axios.post('/accounting/api/report/insertExchangeRate', informdata).then((data) => {
      setDefaultValue('')
      setCurrency_code('')
      setExchange('')
      onLoadrate()
      onloadreportGl()
      OnloadBalancesheet()
      setIsDisabled(true)
      OnloadResetCondition();
      // onloadAutomaticGl();

    }).catch((err) => {
      console.log(err)
    })
  }
  const OnGetvaues = (e) => {
    setCurrency_code(e)
    let dataList = {
      data: defaultValue,
      currency_code: e

    }

  }
  const Clear = () => {
    setDefaultValue('')
    setConver_rate('')
    setCurrency_code('')
    setExchange('')
    setIsDisabled(true)
  }
  useEffect(() => {
    OnTransactionRate();
  }, [])
  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ paddingTop: 50 }} size="lg" >
        <Modal.Header closeButton >
          <Modal.Title>
            Enter Exchange Rate
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button variant="outlined" style={{ color: `${isCheckRateColor}` }} onClick={() => { OnRate() }}>Rate</Button>
            <Button variant="outlined" style={{ color: `${isCheckExchangeRateColor}` }} onClick={() => { OnExchangeRate() }}>
              Exchange Rate
            </Button>
          </div>

          <div style={{ marginTop: 10 }}>
          </div>
          {
            isCheckExchangeRate === true ? (<>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <small style={{ marginTop: 5, fontWeight: 'bold', fontSize: 15 }}>Enter Date</small>
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
                      marginLeft: 5,
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
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 10, justifyContent: 'flex-start' }}>
                  <select
                    disabled={isDisabled}
                    style={{
                      border: '1px solid #ccc',
                      height: 30,
                      borderRadius: 3,
                      width: 130,
                      marginRight: 10
                    }}
                    onChange={(e) => {
                      OnGetvaues(e.target.value);
                    }}
                    value={currency_code}
                  >
                    <option>SELECT CURRENCY</option>
                    <option>USD</option>
                    <option>THB</option>
                  </select>
                  <input
                    type="text"
                    value={exchange}
                    placeholder="Exchange Rate"
                    style={{
                      border: '0.1px solid #ccc',
                      outline: 'none',
                      borderRadius: 3,
                      height: 30,
                      textAlign: 'right'
                    }}
                    onChange={(e) => onChangeTextCurrency(e.target.value)}
                    onBlur={(e) => onBlurCurrency(e.target.value)}
                  />
                  <Button variant="contained" color="primary" style={{ height: 30, marginLeft: 10 }} onClick={() => { insert() }}>Add</Button>
                  <Button variant="contained" color="primary" style={{ height: 30, marginLeft: 10 }} onClick={() => { Clear() }}>Clear</Button>
                </div>
              </div>
              {/* {JSON.stringify(data)} */}
              <div style={{ height: 20 }}></div>
              <Table striped bordered hover size="sm" style={{
                width: '100%',
                textAlign: 'left',
                overflow: 'scroll',
                borderCollapse: 'collapse',
                cursor: 'pointer'
              }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th style={{ textAlign: 'center' }}>Currency</th>
                    <th style={{ textAlign: 'center' }}>Date Exchange Rate</th>
                    <th style={{ textAlign: 'right' }}>Exchange Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    rate && rate.map((data, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1}</td>
                            {
                              data?.foreign_code === 'USD' ? (<>

                                <td align="center"><img alt="Logo" src="/assets/images/USA.png" style={{ width: 30, height: 30, marginTop: 5, borderRadius: '50%' }} /></td>
                              </>) : (<>
                                <td align="center"><img alt="Logo" src="/assets/images/thailand.png" style={{ width: 30, height: 30, marginTop: 5, borderRadius: '50%' }} /></td>
                              </>)
                            }
                            <td align="center">{moment(data?.createdate).format("DD-MM-YYYY")}</td>
      
                            <td align="right">{getFormatNumber(data?.rate_exchange)}</td>
                          </tr>
                        </>
                      )
                    })
                  }
                </tbody>
              </Table>
            </>) : (<>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <small style={{ marginTop: 5, fontWeight: 'bold', fontSize: 15 }}>Enter Date</small>
                  <input
                    type="text"
                    placeholder="dd/MM/yyyy"
                    value={defaultValue1}
                    onChange={(e) => setDefaultValue1(e.target.value)}
                    style={{
                      border: '1px solid #ccc',
                      height: 30,
                      borderRadius: 3,
                      width: 100,
                      paddingLeft: 10,
                      marginLeft: 5,
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
                    onChange={(e) => EnterDate1(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 10, justifyContent: 'flex-start' }}>
                  <input
                    type="text"
                    value={exchange}
                    placeholder="Exchange Rate"
                    style={{
                      border: '0.1px solid #ccc',
                      outline: 'none',
                      borderRadius: 3,
                      height: 30,
                      textAlign: 'right'
                    }}
                    onChange={(e) => onChangeTextCurrency(e.target.value)}
                    onBlur={(e) => onBlurCurrency(e.target.value)}
                  />
                  <Button variant="contained" color="primary" style={{ height: 30, marginLeft: 10 }} onClick={() => { insert() }}>Add</Button>
                  <Button variant="contained" color="primary" style={{ height: 30, marginLeft: 10 }} onClick={() => { Clear() }}>Clear</Button>
                </div>
              </div>
              {/* {JSON.stringify(data)} */}
              <div style={{ height: 20 }}></div>
              <Table striped bordered hover size="sm" style={{
                width: '100%',
                textAlign: 'left',
                overflow: 'scroll',
                borderCollapse: 'collapse',
                cursor: 'pointer'
              }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th style={{ textAlign: 'center' }}>Currency</th>
                    <th style={{ textAlign: 'center' }}>Journal no</th>
                    <th style={{ textAlign: 'center' }}>Date Exchange Rate</th>
                    <th style={{ textAlign: 'right' }}>Exchange Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listrate && listrate.map((data, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1}</td>
                            {
                              data?.currency_status === 'USD' ? (<>

                                <td align="center"><img alt="Logo" src="/assets/images/USA.png" style={{ width: 30, height: 30, marginTop: 5, borderRadius: '50%' }} /></td>
                              </>) : (<>
                                <td align="center"><img alt="Logo" src="/assets/images/thailand.png" style={{ width: 30, height: 30, marginTop: 5, borderRadius: '50%' }} /></td>
                              </>)
                            }
                            <td align="center">{data?.journal_no}</td>
                            <td align="center">{moment(data?.tr_date).format("DD-MM-YYYY")}</td>
                            <td align="right">{getFormatNumber(data?.money_rate)}</td>
                          </tr>
                        </>
                      )
                    })
                  }
                </tbody>
              </Table>
            </>)
          }
        </Modal.Body>
      </Modal>
    </>
  )
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
          />
        </td>
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





