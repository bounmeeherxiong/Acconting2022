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
axios.defaults.baseURL = api;
function App() {
  const [listaccount, setListaccount] = useState([]);
  const [listaccountType, setListaccountType] = useState([]);
  const [listaccountdetailType, setListaccountdetailType] = useState([]);
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
  const [listgl, setListgl] = useState({})
  const [totalgain,setTotalgain]=useState([])
  const [listbank,setListbank]=useState([])
  const [data, setData] = useState([
    { name:'',rate:''},
  ]);
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
  const onloadaccountType = () => {
    axios
      .get("/accounting/api/accounts-type")
      .then((data) => {
        setListaccountType([...data?.data.result]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onloadaccountdetailType = () => {
    axios
      .get("/accounting/api/detail-type")
      .then((data) => {
        setListaccountdetailType([...data?.data.result]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
      setList([...data?.data.result])
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
const onloadbank = () => {
  axios.get("/accounting/api/bank/all").then((data) => {
    setListbank([...data?.data?.result])

  }).catch((err) => {
    console.log(err)
  })
}
const onloadreportGl = () => {
  axios.get("/accounting/api/report/reportGl").then((data) => {
    setListgl({ ...data?.data })
  })
}
  useEffect(() => {
    let users = Cookies.get("user");
    // if(!users){
    //      window.location.assign('https://secure.phongsavanhgroup.com/');
    // }else{
    //   let data = JSON.parse(users)
    //   if (data.token) {
    //     setAuthToken(data.token)
    //   }
    // } 
    onloadaccount();
    onloadaccountType();
    onloadaccountdetailType();
    onloadaccountlistname();
    onloadreportjournalentries();
    onloadtransaction();
    onLoadExchangeRates();
    OnloadgainAndLoss();
    OnLoadgainandlossTransaction()
    OnLoadTotalgainAndLoss();
    onloadbank();
    onloadreportGl();

  }, []); 
  return (
    <div>
      <LoginContext.Provider
        value={{
          listaccount,
          listaccountType,
          onloadaccountType,
          listaccountdetailType,
          onloadaccountdetailType,
          listaccountname,
          listReport,
          onloadreportjournalentries,
          onloadaccountlistname,
          EditJournal,
          showEditJournal,
          setShowEditJournal,
          id,
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
          data,
          setData,
          listgandl,
          OnloadgainAndLoss,
          listgain,
          OnLoadgainandlossTransaction,
          OnLoadTotalgainAndLoss,
          totalgain,
          listbank,
          listgl,
          setListgl,
          onloadreportGl
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
              <Route exact path="/Profitandloss" element={< Profitandloss/>}></Route>
              <Route exact path="/DetailBalancSheet/:id" element={< DetailBalancSheet / >}></Route>
              <Route exact path="/DetailFitandLoss/:id" element={<DetailFitandLoss />}></Route>
            </Routes>
          </Home>
        </Router>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
