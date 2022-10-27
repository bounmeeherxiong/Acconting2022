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
    if(!type || !typedetail || !name ){
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
      <Modal
        show={show}
        onHide={handleClose}
        style={{ paddingTop: 50 }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                  >
                    <option>ໃຫ້ເລືອກປະເພດ</option>
                    {listCategory &&
                      listCategory.map((data, index) => {
                        return (
                          <option key={index} value={data?.Category_id}>
                            {data?.Category_name}
                          </option>
                        );
                      })}
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label style={{ fontSize: 20 }}>Detail Type</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setTypedetail(e.target.value)}
                    value={typedetail}
                  >
                    <option>ໃຫ້ເລືອກປະເພດ</option>
                    {detailCategoryFilter &&
                      detailCategoryFilter.map((data, index) => {
                        return (
                          <option key={index} value={data.Detail_id}>
                            {data.DetailType}
                          </option>
                        );
                      })}
                  </Form.Select>
                </Form.Group>

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
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
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
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Is sub-account" />
                </Form.Group>
                <Form.Group>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={nameList}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Name List"
                        onBlur={(e) => getNameList(e.target.value)}
                        value={nameShow}
                      />
                    )}
                  />
                  {nameShow}
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {showUpdate ? (
            <Button variant="primary">Upate Changes1</Button>
          ) : (
            <Button variant="primary" onClick={CreateChartAccount}>
              Save Changes1
            </Button>
          )}
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
            ຕາຕະລາງບັນຊີ
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
              setPrentid('')
            }}
          >
            <AddIcon />
            ເພີ່ມເລກລະຫັດບັນຊີ
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
        }}
      >
        <input
          type={"text"}
          style={{
            width: 100,
            outline: "none",
            border: "1px solid #DBDBDB",
            height: 35,
            paddingLeft: 20,
            display: "flex",
            justifyContent: "center",
          }}
        />
        <button
          style={{
            backgroundColor: "#3f51b5",
            border: "none",
            height: 35,
            borderRadius: 2,
            flexDirection: "row",
            paddingLeft: 10,
            paddingRight: 10,
            color: "white",
          }}
        >
          <CloseIcon />
        </button>

        <input
          type={"text"}
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
        />
        <button
          style={{
            backgroundColor: "#3f51b5",
            border: "none",
            height: 35,
            borderRadius: 2,
            flexDirection: "row",
            paddingLeft: 10,
            paddingRight: 10,
            color: "white",
          }}
        >
          <CloseIcon />
        </button>
        <select
          style={{
            width: 200,
            outline: "none",
            border: "1px solid #DBDBDB",
            height: 35,
            marginLeft: 20,
            paddingLeft: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <option>ຊະນິດທັງໝົດ</option>
          {/* {listType &&
            listType.map((data, index) => {
              return (
                <option value={data.uid} key={index}>
                  {data?.name}
                </option>
              );
            })} */}
        </select>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
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
            ຊອກຫາ
          </button>
        </div>
      </div>
      <div style={{ paddingTop: 20 }}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>NAME</th>
              <th>TYPE</th>
              <th>DETAIL TYPE</th>
              <th>BALANCE</th>
              <th align="right">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {listAccount &&
              listAccount.message &&
              listAccount.message.map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td style={{ width: 350 }}>{item.ChartAccountName}</td>
                      <td>{item.Category_name}</td>
                      <td>{item.DetailType}</td>
                      <td>{item.Balance}</td>
                      <td>
                        <DeleteIcon />
                      </td>
                    </tr>
                    {/* Level 1 */}
                    <RowComponent
                      children={listAccount && listAccount.children}
                      id={item.Account_id}
                      level={20}
                    />
                  </>
                );
              })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

// Level 1
function RowComponent({ children, id, level }) {
  const filter = children.filter((el) => el.parent_id == id);
  if (filter.length === 0) return <></>;
  return (
    <>
      {filter.map((data, index) => {
        return (
          <>
            <tr key={index}>
              <td
                style={{
                  paddingLeft: level,
                }}
              >
                {data.ChartAccountName}
              </td>
              <td>{data.Category_name}</td>
              <td>{data.DetailType}</td>
              <td>{data.Balance}</td>
              <td>
                <DeleteIcon />
              </td>
            </tr>
            <RowComponent
              children={children}
              id={data.Account_id}
              level={level * 2}
            />
          </>
        );
      })}
    </>
  );
}
