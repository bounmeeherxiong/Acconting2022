import React, { useState, useContext, useEffect } from "react";

import { Table, Form, FloatingLabel } from "react-bootstrap";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { LoginContext } from "./contexts/LoginContext";
import moment from "moment";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DeleteIcon from "@material-ui/icons/Delete";



export default function ChartAccounts() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setType('');
    setShowUpdate(false);
    setCheck(false);
    setName('');
    setDescription('')
    setTypedetail('')
    setPrentid('')
    setNameShow('')
  };
  const handleShow = () => setShow(true);
  const [type, setType] = useState("");
  const [typedetail, setTypedetail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prentid, setPrentid] = useState("");
  const [check, setCheck] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [checked, setChecked] = useState(false);

  const data4 = [
    { id: 1, c_id: 1, amount: 900000, balance: 0, },
    { id: 2, c_id: 1, amount: 1100000, balance: 0,},
    { id: 3, c_id: 1, amount: 180000, balance: 0,  },
    { id: 4, c_id: 1, amount: 210000, balance: 0,  },
    { id: 5, c_id: 2, amount: 50000, balance: 0, },
    { id: 6, c_id: 2, amount: 425000, balance: 0,  },
  ];

  const [detailCategoryFilter, setDetailCategoryFilter] = useState([]);
  const {
    listCategory,
    listAccount,
    Onloadaccounts,
    nameList,
    OnloadAccountName,
  } = useContext(LoginContext);

  useEffect(() => {
    // console.log(type)
    // const filter = detailCategory.filter((el) => el.Category_id === type);
    // console.log("filter=",filter)
    // setDetailCategoryFilter([...filter]);
    Search(type);
  }, [type]);

  const onCheckboxClick = () => {
    setIsDisabled(!checked);
  };
  const Search = (type) => {
    axios
      .get(`/showdetailCategory/${type}`)
      .then((data) => {
        setDetailCategoryFilter([...data?.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CreateChartAccount = () => {
    if (!type || !typedetail || !name) {
      alert('ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ');
      return
    }
    let data = {
      Category_id: type,
      DetailCategory_id: typedetail,
      ChartAccountName: name,
      CreateDate: moment().format("YYYY-MM-DD"),
      Employee: "1",
      Company_id: "1",
      Description: description,
      parent_id: prentid,
    };
    axios
      .post("/CreateChartAccount", data)
      .then((data) => {
        Onloadaccounts();
        OnloadAccountName();
        handleClose(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [nameShow, setNameShow] = useState("");
  const getNameList = (name) => {
    axios.get(`/Allparents/${name}`).then((data) => {
      if (data?.data?.message.length > 0) {
        // console.log("name=",data?.data.message[0].Account_id);
        setPrentid(data?.data.message[0].Account_id);
        const names = data?.data?.message.map((item) => {
          return item.ChartAccountName;
        });
        names.reverse();
        setNameShow(names.join(":"));
      }
    });
  };
  return (
    <>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Balance</th>


        </tr>
        {
          data4 & data4.map((data, index) => {
            let balances=data?.amount+data?.amount
            return (
              <>
                <tr>
                  <th>{index + 1}</th>
                  <th>{data?.amount}</th>
                  <th></th>
                  <th>{balances}</th>

                </tr>

              </>
            )
          })
        }

      </table>
    </>
  );
}
