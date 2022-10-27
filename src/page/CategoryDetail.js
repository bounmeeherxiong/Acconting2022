import React, { useContext, useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Form } from "react-bootstrap";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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
export default function CategoryDetail() {
  const [show, setShow] = useState(false);
  const [shows, setShows] = useState(false);
  const [successffuly, setsuccessffuly] = useState(false);
  let [loading, setLoading] = useState(false);
  const handleClose = () => {
    setShow(false);
    setShowUpdate(false)
  };
  const handleClosedel = () => {
    setShows(false);
  }
  const handleShow = () => setShow(true);
  const handleshow1 = () => setShows(true)
  const [ac_type, setAc_type] = useState("");
  const [name_eng, setName_eng] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [uid, setUid] = useState("");
  const [ac_type_name, setAc_type_name] = useState("")
  const { listaccountType, listaccountdetailType, onloadaccountdetailType } =
    useContext(LoginContext);
  const classes = useStyles();
  useEffect(() => {
    onloadaccountdetailType();
  }, [])
  const createaccountdetail = () => {
    setLoading(true)
    if (!ac_type) {
      alert("PLEASE SELECT CATEGORY")
      return;
    } else if (!name_eng) {
      alert("PLEASE INTER NAME")
      return;
    }
    let data = {
      ac_type,
      name_eng
    };
    axios
      .post("/accounting/api/detail-type/create", data)
      .then((data) => {
        onloadaccountdetailType();
      })
      .catch((err) => {
        alert("ມີໃນລະບົບແລ້ວ")
        console.log(err);
      })
      .finally(() => {
        setLoading(false)
        setsuccessffuly(true)
      })
  };
  const updateaccountdetail = (uid) => {
    let data = {
      ac_type: ac_type,
      name_eng: name_eng,
    };
    axios.put(`/accounting/api/detail-type/update/${uid}`, data).then((data) => {
      onloadaccountdetailType();
      setUid('');
      setAc_type('')
      handleClose(false)
    }).catch((err) => {
      console.log(err)
    })
  }
  const deleteaccountdetail = (id) => {
    axios
      .delete(`/accounting/api/detail-type/delete/${id}`)
      .then((data) => {
        onloadaccountdetailType();
        handleClosedel(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ paddingTop: 50 }}>
        <Modal.Header closeButton>
          <Modal.Title>DETAIL OF CATEGORY</Modal.Title>
          <div style={{ paddingTop: 10, position: "absolute", display: 'flex', paddingLeft: 100 }}>
            <Toast onClose={() => setsuccessffuly(false)} show={successffuly} delay={2000} autohide style={{ height: 70, width: 200 }}>
              <div style={{ paddingTop: 20, paddingLeft: 25, width: 100 }}>
                <CheckCircleIcon style={{ color: "green" }} /> Successfully
              </div>
            </Toast>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontSize: 20 }}>SELECT CATEGORY</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setAc_type(e.target.value)}
                value={ac_type}
              >
                {showUpdate ? (
                  <option value={ac_type}>{ac_type_name}</option>
                ) : (
                  <option>SELECT CATEGORY</option>
                )}
                {listaccountType &&
                  listaccountType.map((data, index) => {
                    return (
                      <option key={index} value={data.type_uid}>
                        {data?.type_name_eng}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontSize: 20 }}>DETAIL CATEGORY</Form.Label>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {showUpdate ? (
            <Button variant="contained" onClick={() => {
              updateaccountdetail(uid)
            }} color="primary" >
              Upate Changes
            </Button>
          ) : (
            <Button variant="contained" onClick={createaccountdetail} color="primary" >
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
          <Button onClick={() => { deleteaccountdetail(uid) }}>
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
            Detail of Category
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
              setName_eng('');
              setAc_type('');
              setAc_type_name('')
              setShowUpdate(false);
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
        }}
      >
        <input
          type={"text"}
          style={{
            width: 300,
            outline: "none",
            border: "1px solid #DBDBDB",
            marginLeft: 10,
            height: 35,
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
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listaccountdetailType &&
                listaccountdetailType.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell align="left" style={{ width: 400 }}>
                      {data?.accounts_name}
                    </TableCell>
                    <TableCell align="left">{data?.name_eng}</TableCell>
                    <TableCell align="right">
                      <DeleteIcon style={{ cursor: "pointer" }} onClick={() => { handleshow1(); setUid(data?.uid) }} />
                      <EditIcon style={{ cursor: "pointer" }} onClick={() => {
                        handleShow();
                        setName_eng(data?.name_eng);
                        setAc_type(data?.ac_type);
                        setAc_type_name(data?.accounts_name)
                        setShowUpdate(true);
                        setUid(data?.uid);
                      }} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
