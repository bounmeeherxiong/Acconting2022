import React, { useState, useEffect, useContext } from "react";
import { Table, Form } from "react-bootstrap";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import laotime from "@lailao10x/laotime";

import { Button } from "@material-ui/core";
import { Modal } from "react-bootstrap";

import axios from "axios";
import { LoginContext } from "./contexts/LoginContext";

export default function Journal_books() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setShowUpdate(false);
    setListBook("");
  };
  const {listjournal,OnloadJournal}=useContext(LoginContext)

  const handleShow = () => setShow(true);
  const [nameeng, setNameeng] = useState("");
  const [listBook, setListBook] = useState("");
  const [description, setDescription] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);

  const [id, setId] = useState("");

  useEffect(() => {

  }, []);



  const CreateJournalBook = () => {
    let data = {
      name: listBook,
    };
    axios
      .post("/accounting/api/books/add", data)
      .then((data) => {
        handleClose();
        OnloadJournal();
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const UpdateJournalBook = (id) => {
    let data = {
      name: listBook,
    };
    axios
      .put(
        `/accounting/api/books/update/${id}`,
        data
      )
      .then((data) => {
        handleClose();
      
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const DeletedJournalBook = (id) => {
    console.log(id);
    axios
      .delete(
        `/accounting/api/books/delete/${id}`
      )
      .then((data) => {
        OnloadJournal();
   
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
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
            ປື້ມບັນຊີ
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
            onClick={handleShow}
          >
            <AddIcon />
            ເພີ່ມປະເພດບັນຊີ
          </button>
        </div>
      </Breadcrumbs>
      <div>
        <Modal show={show} onHide={handleClose} style={{ paddingTop: 50 }}>
          <Modal.Header closeButton>
            <Modal.Title>ສ້າງປື້ມບັນຊີ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontSize: 20 }}>ຊື່ປື້ມ</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ຊື່ປື້ມບັນຊີ"
                  autoFocus
                  onChange={(e) => setListBook(e.target.value)}
                  value={listBook}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>ລາຍລະອຽດປື້ມ</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {showUpdate ? (
              <Button
                variant="primary"
                onClick={() => {
                  UpdateJournalBook(id);
                }}
              >
                Upate Changes
              </Button>
            ) : (
              <Button variant="primary" onClick={CreateJournalBook}>
                Save Changes1
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>

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
        <select
          style={{
            width: 198,
            outline: "none",
            border: "1px solid #DBDBDB",
            height: 35,
            paddingLeft: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <option>ຊະນິດທັງໝົດ</option>
          <option>ຊັບສີນ</option>
          <option>ໜີ່ສີນ</option>
          <option>ທືນ</option>
          <option>ລາຍຈ່າຍ</option>
          <option>ລາຍຮັບ</option>
        </select>

        <input
          type={"text"}
          onChange={(e) => setNameeng(e.target.value)}
          value={nameeng}
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
          placeholder="ຊື່ບັນຊີ"
        />
        <button
          style={{
            backgroundColor: "#3f51b5",
            border: "none",
            height: 35,
            borderRadius: 2,
            flexDirection: "row",
            color: "white",
          }}
        >
          <CloseIcon />
        </button>

        <input
          type={"text"}
          onChange={(e) => setNameeng(e.target.value)}
          value={nameeng}
          style={{
            width: 300,
            outline: "none",
            border: "1px solid #DBDBDB",
            marginLeft: 10,
            height: 35,
            display: "flex",
            justifyContent: "center",
          }}
          placeholder="ລະຫັດບັນຊີ"
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: 105 }}>ລະຫັດ</th>
              <th style={{ width: 450 }}>ປື້ມ</th>
              <th style={{ width: 150 }}>ວັນທີ</th>
              <th style={{ width: 150 }}>ສະຖານະ</th>
              <th style={{ width: 150 }}>ໜ້າທີ່</th>
            </tr>
          </thead>
          <tbody>
            {listjournal &&
              listjournal.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{laotime(data.creared_at)}</td>
                    <td>1</td>
                    <td>
                      <button
                        style={{
                          backgroundColor: "#FF4747",
                          border: "none",
                          height: 25,
                          borderRadius: 2,
                          flexDirection: "row",
                          paddingLeft: 5,
                          paddingRight: 5,
                          color: "white",
                        }}
                        onClick={() => {
                          handleShow();
                          setListBook(data?.name);
                          setDescription(data?.description);
                          setShowUpdate(true);
                          setId(data?.uid);
                        }}
                      >
                        <EditIcon />
                      </button>
                      <button
                        style={{
                          backgroundColor: "#3f51b5",
                          border: "none",
                          height: 25,
                          marginLeft: 10,
                          borderRadius: 2,
                          flexDirection: "row",
                          paddingLeft: 5,
                          paddingRight: 5,
                          color: "white",
                        }}
                        onClick={() => {
                          DeletedJournalBook(data?.uid);
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </>
  );
}
