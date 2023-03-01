import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useParams } from "react-router-dom";
import axios from 'axios';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { getFormatNumber } from "../constants/functions"
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Unrealisedgain_or_loss() {
    const navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();
    const [list, setList] = useState([])
    const OnloadListData = () => {
        axios.get(`/accounting/api/report/CreateAutomaticDetail/${id}`).then((data) => {
            setList([...data?.data?.results])
        }).catch((err) => {
            console.log(err)
        })

    }
    const goback = () => {
        navigate("/ReportAllGL");
      }
    useEffect(() => {
        OnloadListData()
    }, [])


    return (
        <>
            <div>
                <Breadcrumbs aria-label="breadcrumb">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent:'space-between'
              
                        }}
                    >
                        <p
                            style={{
                                fontSize: 20,
                                color: "black",
                                fontFamily: "Phetsarath OT",
                                cursor:'pointer',
                                backgroundColor:"#3f51b5",
                                borderRadius:'50%'
                            }}
                           
                        >
                            <ArrowBackIcon style={{ color: "white" }}   />
                        </p>
                        <h4 style={{marginLeft:10,color:'black'}}> Detail Unrealised gain or loss </h4>
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

            </div>

            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Account Name</TableCell>
                            <TableCell align="right">Gain/Loss</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Balances</TableCell>
                            <TableCell align="right">Current Balances</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            list && list.map((data, index) => {
                                return (

                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {data?.name_eng}
                                        </TableCell>
                                        <TableCell align="right">{getFormatNumber(data?.bs_amount)} ₭</TableCell>
                                        <TableCell align="right">{data?.lg_desc}</TableCell>
                                        <TableCell align="right">{getFormatNumber(data?.balances1)} ₭</TableCell>
                                        <TableCell align="right">{getFormatNumber(data?.balances)} ₭</TableCell>
                                    </TableRow>


                                )
                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
