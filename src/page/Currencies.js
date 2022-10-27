import React, { useContext, useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { LoginContext } from "./contexts/LoginContext";

export default function Currencies() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimalMark, setDecimalMark] = useState("");
  const [code, setCode] = useState("");
  const [precision, setPrecisition] = useState("");
  const [symbolPosition, setSymbolPosition] = useState("");
  const [thousandsSeparator, setThousandsSeparator] = useState("");
  const [status, setStauts] = useState("");

  const {listcurrencies,OnloadCurrencies,listcurrencyCode}=useContext(LoginContext)


  const Create_Currencies = () => {
    let data = {
      name: name,
      cr_rate: rate,
      cr_symbol: symbol,
      decimal_mark: decimalMark,
      cr_code: code,
      cr_precision: precision,
      symbol_position: symbolPosition,
      cr_separator: thousandsSeparator,
      cr_enabled: status,
    };
    axios
      .post(
        "/accounting/api/currencies/add",
        data
      )
      .then((data) => {
        OnloadCurrencies();
        handleClose(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const CurrenDeleted = (id) => {
    console.log(id)
    axios
      .delete(`/accounting/api/currencies/delete/${id}`)
      .then((data) => {
        OnloadCurrencies();
      })
      .catch((err) => {
        console.log(err);
      });
  
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
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
          ສະກຸນເງີນ
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
          ເພີ່ມສະກຸນເງີນ
        </button>
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

      <Modal
        show={show}
        onHide={handleClose}
        style={{ paddingTop: 50 }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>ສ້າງສະກຸນເງີນ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div style={{ paddingLeft: 50 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                  paddingTop: 10,
                }}
              >
                <div>
                  <label>ຊື່*</label>
                  <input
                    type={"text"}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    style={{
                      width: 280,
                      outline: "none",
                      border: "1px solid #DBDBDB",
                      height: 35,
                      paddingLeft: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />
                  <label>ອັດຕາ​ແລກ​ປ່ຽນ*</label>
                  <input
                    type={"text"}
                    onChange={(e) => setRate(e.target.value)}
                    value={rate}
                    style={{
                      width: 280,
                      outline: "none",
                      border: "1px solid #DBDBDB",
                      height: 35,
                      paddingLeft: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />
                  <label>ສັນຍາລັກ*</label>
                  <input
                    type={"text"}
                    onChange={(e) => setSymbol(e.target.value)}
                    value={symbol}
                    style={{
                      width: 280,
                      outline: "none",
                      border: "1px solid #DBDBDB",
                      height: 35,
                      paddingLeft: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />
                  <label>ເຄຶ່ອງໝາຍທີດສະນີຍົມ*</label>
                  <input
                    type={"text"}
                    onChange={(e) => setDecimalMark(e.target.value)}
                    value={decimalMark}
                    style={{
                      width: 280,
                      outline: "none",
                      border: "1px solid #DBDBDB",
                      height: 35,
                      paddingLeft: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />
                  <label>ເປີດໃຊ້ງານ*</label>
                  <select
                    onChange={(e) => setStauts(e.target.value)}
                    value={status}
                    style={{
                      width: 280,
                      outline: "none",
                      border: "1px solid #DBDBDB",
                      height: 35,
                      paddingLeft: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <option>ໃຫ້ເລືອກ</option>
                    <option value="1">ເປີດໃຊ້ງານ</option>
                    <option value="0">ປິດໃຊ້ງານ</option>
                  </select>
                </div>
                <div>
                  <label>ລະຫັດ*</label>
                  <select
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                    style={{
                      width: 280,
                      outline: "none",
                      border: "1px solid #DBDBDB",
                      height: 35,
                      paddingLeft: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <option>-ເລືອກ ລະຫັດ-</option>
                    {listcurrencyCode &&
                      listcurrencyCode.map((data, index) => {
                        return (
                          <option value={data.uid} key={index}>
                            {data.name}
                          </option>
                        );
                      })}
                  </select>
                  <lable>ເສດທິດສະນີຍົມ</lable>
                  <br />
                  <input
                    type={"text"}
                    onChange={(e) => setPrecisition(e.target.value)}
                    value={precision}
                    style={{
                      width: 280,
                      outline: "none",
                      border: "1px solid #DBDBDB",
                      height: 35,
                      paddingLeft: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />
                  <lable>ຕຳແໜ່ງສັນຍາລັກ</lable>
                  <br />
                  <input
                    type={"text"}
                    onChange={(e) => setSymbolPosition(e.target.value)}
                    value={symbolPosition}
                    style={{
                      width: 280,
                      outline: "none",
                      border: "1px solid #DBDBDB",
                      height: 35,
                      paddingLeft: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />
                  <lable>ເຄື່ອງໝາຍຫຼັກພັນ</lable>
                  <br />
                  <input
                    type={"text"}
                    onChange={(e) => setThousandsSeparator(e.target.value)}
                    value={thousandsSeparator}
                    style={{
                      width: 280,
                      outline: "none",
                      border: "1px solid #DBDBDB",
                      height: 35,
                      paddingLeft: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              Create_Currencies();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ຊື່</th>
            <th>ລະຫັດ</th>
            <th>ອັດຕາ​ແລກ​ປ່ຽນ</th>
            <th>ຕົວຢ່າງ</th>
            <th>ສະຖານະ</th>
            <th
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: 50,
              }}
            >
              ໜ້າທີ່
            </th>
          </tr>
        </thead>
        <tbody>
          {listcurrencies &&
            listcurrencies.map((data, index) => {
              return (
                <tr key={index}>
                  <td style={{ width: 300 }}> {data?.name}</td>
                  <td style={{ width: 300 }}> {data?.code}</td>
                  <td>{data?.cr_rate}</td>
                  <td>{data?.cr_symbol}</td>
                  <td>{data?.cr_enabled}</td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      style={{
                        backgroundColor: "#FF4747",
                        borderRadius: 3,
                        border: "none",
                        paddingBottom: 5,
                        color: "white",
                      }}
                    >
                      <EditIcon style={{ color: "white" }} />
                    </button>
                    <button
                      style={{
                        backgroundColor: "#3f51b5",
                        borderRadius: 3,
                        marginLeft: 10,
                        border: "none",
                        paddingBottom: 5,
                        color: "white",
                      }}
                      onClick={() => CurrenDeleted(data?.uid)}
                    >
                      <DeleteIcon style={{ color: "white" }} />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}
