import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AccountCategory from "./page/AccountCategory";
import ChartAccounts from "./page/ChartAccounts";
import { api } from "./page/contexts/api";
import { LoginContext } from "./page/contexts/LoginContext";
import Currencies from "./page/Currencies";
import CurrencyCode from "./page/CurrencyCode";
import Setting from "./page/setting";
import Home from "./template/home";
import axios from "axios";
import Journal from "./page/Journal";
import Test from "./page/test";
import CategoryDetail from "./page/CategoryDetail";
import ReportJournal from "./page/Reportjournal";
import ReportGL from "./page/ReportGL";
import ReportTrialbalances from "./page/ReportTrialbalances";
import ReportAllGL from "./page/ReportallGL";
import History from "./page/History";
import ReportTest from "./page/ReportTest";
import BalanceSheet from "./page/BalanceSheet";
import DetailReportTrialbalances from "./page/DetailReportTrialbalances";
import Index from "./page/index";
import Cookies from 'js-cookie';
import Login from "./page/Login";

import setAuthToken from "./setAuthToken"
import UnrealisedGainsAndLosses from "./page/UnrealisedGainsAndLosses";
import Profitandloss from "./page/Profitandloss";
import DetailBalancSheet from "./page/DetailBalancSheet";
import DetailFitandLoss from "./page/DetailFitandLoss";
import DetailAutomatic from "./page/DetailAutomatic";
import Unrealisedgain_or_loss from "./page/Unrealisedgain_or_loss";
import ViewUnrealisedgain_or_loss from "./page/ViewUnrealisedgain_or_loss";
import ExchangeRate from "./page/ExchangeRate";

axios.defaults.baseURL = api;
function App() {
  const [listaccount, setListaccount] = useState([]);

  const [listaccountname, setListaccountname] = useState([]);
  const [listReport, setListReport] = useState([]);
  const [id, setid] = useState("")
  const [showEditJournal, setShowEditJournal] = useState(false);
  const [listallaccount, setListallaccount] = useState([]);
  const [listallaccountchildren, setListallaccountchildren] = useState([])
  const [showfullscreen, setShowfullscreen] = useState(false);
  const [showReferent, setShowReferent] = useState(false)
  const [login, setLogin] = useState(false);
  const [list, setList] = useState([])
  const [listgandl,setListgandl]=useState([])
  const [listgain,setListgain]=useState([])
 
  const [totalgain,setTotalgain]=useState([])
  const [rate,setRate]=useState([])
  const [loading, setLoading] = useState(false);
  const [searchcondition,setSearchcondition]=useState(false)
  const [tra_balance, setTra_balance] = useState(false);
  const [isDisabled, setIsDisabled] = useState([]);
  const [listTransactions,setListTransactions]=useState([])
  const [chartofaccountslevels_one,setChartofaccountslevels_one]=useState([])
  const [chartofaccountslevels_two,setChartofaccountslevels_two]=useState([])
  const [chartofaccountslevels_three,setChartofaccountslevels_three]=useState([])
  const [chartofaccountslevels_four,setChartofaccountslevels_four]=useState([])
  const [chartofaccountslevels_five,setChartofaccountslevels_five]=useState([])
  const [chartofaccountslevels_six,setChartofaccountslevels_six]=useState([])
  const [chartofaccountslevels_seven,setChartofaccountslevels_seven]=useState([])
  const [chartofaccountslevels_eight,setChartofaccountslevels_eight]=useState([])
  const [chartofaccountslevels_nine,setChartofaccountslevels_nine]=useState([])
  const [chartofaccountslevels_ten,setChartofaccountslevels_ten]=useState([])
  
  const onloadaccount = () => {
    axios
      .get("/accounting/api/accounts")
      .then((data) => {
        setListaccount([...data?.data.result]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const EditJournal = (id) => {
    setid(id)
    setShowEditJournal(true)
  }

  const onloadallaccount = () => {
    axios.get("/accounting/api/chartofaccounts/all/accountname").then((data) => {
      setListallaccount([...data?.data?.message])
      setListallaccountchildren([...data?.data?.children])
    }).catch((err) => {
      console.log(err)
    })
  }
  const onloadreportjournalentries = () => {
    axios.get("/accounting/api/reportjournal-entries/report/90").then((data) => {
      setListReport([...data?.data.result])
    }).catch((err) => {
      console.log(err)
    })
  }

  const onloadaccountlistname = () => {
    axios.get("/accounting/api/chartofaccounts").then((data) => {
      setListaccountname([...data?.data.result])
    }).catch((err) => {
      console.log(err)
    })
  }
  const onloadtransaction = () => {
    axios.get("/accounting/api/journal-entries/selectAllTransaction").then((data) => {
      setListTransactions([...data?.data?.result])
      setList([...data?.data.result])
    }).catch((err) => {
        console.log(err)
    })
}

const OnloadgainAndLoss = () => {
  axios
    .get("/accounting/api/loss-gain/getgainAndLoss")
    .then((data) => {
      setListgandl([...data?.data?.result])
    })
    .catch((err) => {
      console.log(err);
    });
};
const OnLoadgainandlossTransaction = () => {
  axios.get('/accounting/api/loss-gain/transaction').then((data) => {
    setListgain([...data?.data?.result])
  }).catch((err) => {
    console.log(err)
  })
}
const OnLoadTotalgainAndLoss=()=>{
  axios.get('/accounting/api/loss-gain/getTotal/').then((data)=>{
    setTotalgain([...data?.data?.result][0].gain_Loss)
  })
}
const onLoadrate = () => {
  axios.get("/accounting/api/report/selectExchange").then((data) => {
    setRate([...data?.data?.results])

  }).catch((err) => {
    console.log(err)
  })
}

const onloadChecktrue_and_false=()=>{
  // axios.get('/accounting/api/balance-sheet/onloadcheck/').then((data)=>{
  //     setTra_balance([...data?.data?.onloadChecktrue_and_false][0].conditions_check)
  //     setIsDisabled([...data?.data?.onloadChecktrue_and_false][0].conditions_check)

  // }).catch((err)=>{
  //     console.log(err)
  // })
}
const onloadLevelforchartofaccount=()=>{
  axios.get('/accounting/api/chartofaccounts/getlevels').then((data)=>{
    setChartofaccountslevels_one([...data?.data?.levels_one])
    setChartofaccountslevels_two([...data?.data?.levels_two])
    setChartofaccountslevels_three([...data?.data?.levels_three])
    setChartofaccountslevels_four([...data?.data?.levels_four])
    setChartofaccountslevels_five([...data?.data?.levels_five])
    setChartofaccountslevels_six([...data?.data?.levels_six])
    setChartofaccountslevels_seven([...data?.data?.levels_seven])
    setChartofaccountslevels_eight([...data?.data?.levels_eight])
    setChartofaccountslevels_nine([...data?.data?.levels_nine])
    setChartofaccountslevels_ten([...data?.data?.levels_ten])

  }).catch((err)=>{
    console.log(err)
  })
}
  useEffect(() => {
    // let users = Cookies.get("user");
    // if(!users){
    //      window.location.assign('https://secure.phongsavanhgroup.com/');
         
    // }else{
    //   let data = JSON.parse(users)
    //   if (data.token) {
    //     setAuthToken(data.token)
    //   }
    // } 
    onloadaccount();
    onloadaccountlistname();
    onloadreportjournalentries();
    OnloadgainAndLoss();
    OnLoadgainandlossTransaction()
    OnLoadTotalgainAndLoss();
    onLoadrate();
    onloadChecktrue_and_false();
    onloadLevelforchartofaccount();
    onloadtransaction();
 
  }, []); 
  // if(!login){
  //   return <Login setLogin={setLogin}/>
  // }
  // if(login === false){
  //   return(
  //     <Login 
  //     setLogin={setLogin}
  //     />
  //   )
  // }
  return (
    <div>
      <LoginContext.Provider
        value={{
          listaccount,
          listaccountname,
          listReport,
          onloadreportjournalentries,
          onloadaccountlistname,
          EditJournal,
          showEditJournal,
          setShowEditJournal,
          id,
          setid,
          onloadallaccount,
          listallaccount,
          setListallaccount,
          listallaccountchildren,
          setListallaccountchildren,
          setShowfullscreen,
          showfullscreen,
          showReferent,
          setShowReferent,
          onloadtransaction,
          list,
          listgandl,
          OnloadgainAndLoss,
          listgain,
          OnLoadgainandlossTransaction,
          OnLoadTotalgainAndLoss,
          totalgain,
          rate,
     
          onLoadrate,
          setid,
          loading,
          setLoading,
          searchcondition,
          setSearchcondition,
          tra_balance,
          setTra_balance,
          onloadChecktrue_and_false,
          isDisabled,
          setIsDisabled,
          chartofaccountslevels_one,
          chartofaccountslevels_two,
          chartofaccountslevels_three,
          chartofaccountslevels_four,
          chartofaccountslevels_five,
          chartofaccountslevels_six,
          chartofaccountslevels_seven,
          chartofaccountslevels_eight,
          chartofaccountslevels_nine,
          chartofaccountslevels_ten,
          listTransactions,
          onloadtransaction
        }}
      >
        <Router>
          <Home>
            <Routes>
              <Route exact path="/Index" element={<Index />} />
              <Route exact path="/ChartAccount" element={<ChartAccounts />} />
              <Route exact path="/setting" element={<Setting />}></Route>
              <Route exact path="/AccountCategory" element={<AccountCategory />}></Route>
              <Route exact path="/Currencies" element={<Currencies />}></Route>
              <Route exact path="/CurrencyCode" element={<CurrencyCode />}></Route>
              <Route exact path="/Journal" element={<Journal />}></Route>
              <Route exact path="/Journalpage/:id" element={< EditJournal />}></Route>
              <Route exact path="/Test" element={<Test />}></Route>
              <Route exact path="/ReportJournal" element={< ReportJournal />}></Route>
              <Route exact path="/CategoryDetail" element={< CategoryDetail />}></Route>
              <Route exact path="/ReportGL/:id" element={< ReportGL />}></Route>
              <Route exact path="/ReportTrialbalances" element={< ReportTrialbalances />}></Route>
              <Route exact path="/ReportAllGL" element={< ReportAllGL />}></Route>
              <Route exact path="/History/:id" element={< History />}></Route>
              <Route exact path="/ReportTest" element={< ReportTest />}></Route>
              <Route exact path="/BalanceSheet" element={< BalanceSheet />}></Route>
              <Route exact path="/DetailReportTrialbalances/:id" element={< DetailReportTrialbalances />}></Route>
              <Route exact path="/UnrealisedGainsAndLosses" element={< UnrealisedGainsAndLosses/>}></Route>
              <Route exact path="/Profitandloss/:conditionsof" element={< Profitandloss/>}></Route>
              <Route exact path="/DetailBalancSheet/:id" element={< DetailBalancSheet />}></Route> 
              <Route exact path="/DetailFitandLoss/:id" element={<DetailFitandLoss />}></Route>
              <Route exact path="/DetailAutomatic/:id" element={< DetailAutomatic />} ></Route>
              <Route exact path="/DetailUnrealisedgain/:id" element={< Unrealisedgain_or_loss />} ></Route>
              <Route exact path="/ViewUnrealisedgain_or_loss/:id" element={< ViewUnrealisedgain_or_loss />} ></Route>
              <Route exact path="/ExchangeRate/:id" element={< ExchangeRate />} ></Route>
            </Routes>
          </Home>
        </Router>
      </LoginContext.Provider>
    </div>
  );
}      

export default App;
