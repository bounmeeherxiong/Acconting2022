import React, { useContext, useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Form, Spinner } from "react-bootstrap";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import ClipLoader from "react-spinners/ClipLoader";
import SearchIcon from "@material-ui/icons/Search";
import { LoginContext } from "./contexts/LoginContext";
import { Button } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Toast } from "react-bootstrap";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import axios from "axios";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function AccountCategory() {

  const [show, setShow] = useState(false);
  const [shows, setShows] = useState(false)
  let [loading, setLoading] = useState(false);
  const [successffuly, setsuccessffuly] = useState(false);

  useEffect(() => {
    onloadaccountType();

  }, [])
  const handleClose = () => {
    setShow(false);
    setMain_type_name('');
    setUid('');
  };
  const handleClosedel = () => {
    setShows(false);
    setMain_type_name('');
    setUid('');
  }
  const handleShow = () => setShow(true);
  const handleshow1 = () => setShows(true)
  const [main_type, setMain_type] = useState("");
  const [name_eng, setName_eng] = useState("");
  const [uid, setUid] = useState("");
  const [main_type_name, setMain_type_name] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const classes = useStyles();
  const { listaccount, listaccountType, onloadaccountType } =
    useContext(LoginContext);
  const createaccountType = () => {
    setLoading(true)
    if (!main_type) {
      alert("PLEASE SELECT TYPE")
      return;
    } else if (!name_eng) {
      alert("PLEASE INTER CATEGORY NAME")
      return;
    }
    let data = {
      main_type: main_type,
      name_eng: name_eng,
    };
    axios
      .post("/accounting/api/accounts-type/create", data)
      .then((data) => {
        onloadaccountType();
      })
      .catch((err) => {
        alert("ຊື່ນີມີໃນລະບົບແລ້ວ")
      })
      .finally(() => {
        setLoading(false)
        setsuccessffuly(true)
      })

  };
  const deletedccountType = (id) => {
    axios
      .delete(`/accounting/api/accounts-type/delete/${id}`)
      .then((data) => {
        onloadaccountType();
        handleClosedel(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const UpdateAccount = (uid) => {
    let data = {
      main_type: main_type,
      name_eng: name_eng,
    };
    axios.put(`/accounting/api/accounts-type/update/${uid}`, data).then((data) => {
      onloadaccountType();
      setUid('');
      setMain_type('')
      handleClose(false)
    }).catch((err) => {
      alert("ຊື່ນີມີໃນລະບົບແລ້ວ")
      console.log(err)
    })
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ paddingTop: 50 }}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Account</Modal.Title>
          <div style={{ paddingTop: 10, position: "absolute", display: 'flex', paddingLeft: 100 }}>
            <Toast onClose={() => setsuccessffuly(false)} show={successffuly} delay={2000} autohide style={{ height: 70, width: 200 }}>
              <div style={{ paddingTop: 20, paddingLeft: 25, width: 100 }}>
                <CheckCircleIcon style={{ color: "green" }} /> Successfully
              </div>
            </Toast>
          </div>
        </Modal.Header>
        < Spinner color="primary" />
        <Modal.Body>
          <div style={{ paddingTop: 10, paddingLeft: 200, position: "absolute", display: 'flex' }}>
            <ClipLoader color={"#36D7B7"} loading={loading} size={50} />
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontSize: 20 }}>Select Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setMain_type(e.target.value)}
                value={main_type}
              >
                {showUpdate ? (
                  <option value={main_type}>{main_type_name}</option>
                ) : (
                  <option>Select Type</option>
                )}
                {listaccount &&
                  listaccount.map((data, index) => {
                    return (
                      <option key={index} value={data.uid}>
                        {data?.name_eng}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontSize: 20 }}>Category</Form.Label>
              <Form.Control
                onChange={(e) => setName_eng(e.target.value)}
                value={name_eng}
                type="text"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            Close
          </Button>
          {showUpdate ? (
            <Button onClick={() => {
              UpdateAccount(uid)
            }} >
              update Changes
            </Button>
          ) : (
            <Button onClick={createaccountType} color="primary" variant="contained">
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <Modal show={shows} onHide={handleClosedel} style={{ paddingTop: 50 }} size="sm">
        <Modal.Header>
          < WarningIcon style={{color:"red"}} />
          <span style={{fontSize:14,paddingTop:10}}>
            Are you sure you want to delete this? </span>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={handleClosedel}>
            No
          </Button>
          <Button onClick={() => { deletedccountType(uid) }}>
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
            Category
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
              setMain_type_name('');
              setMain_type('');
              setName_eng('');
              setShowUpdate(false);
              setUid('')
            }}
          >
            <AddIcon />
            Add new
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
            width: 250,
            outline: "none",
            border: "1px solid #DBDBDB",
            height: 35,
            marginLeft: 5,
            paddingLeft: 20,
            display: "flex",
            justifyContent: "center",
          }}
          placeholder="Search..."
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

      </div>
      <div style={{ paddingTop: 20 }}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">CreateDate</TableCell>
                {/* <TableCell align="right">Action</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {listaccountType &&
                listaccountType.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell align="left" style={{ width: 400 }}>
                      {data?.type_name_eng}
                    </TableCell>
                    <TableCell align="left">{data?.account_name}</TableCell>
                    <TableCell align="left" style={{ width: 250 }}>
                      {data?.created_at}
                    </TableCell>
                    {/* <TableCell align="right">
                      <DeleteIcon style={{ cursor: "pointer" }} onClick={() => { handleshow1(); setUid(data.type_uid); }} />
                      <EditIcon style={{ cursor: "pointer" }} onClick={() => {
                        handleShow();
                        setName_eng(data?.type_name_eng);
                        setMain_type(data?.main_type)
                        setUid(data.type_uid);
                        setShowUpdate(true);
                        setMain_type_name(data.account_name)
                      }} />
                    </TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
