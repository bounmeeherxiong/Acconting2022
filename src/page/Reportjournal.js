import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { LoginContext } from "./contexts/LoginContext";

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

export default function Reportjournal() {
  const classes = useStyles();
  const {
    listReport
  } = useContext(LoginContext);

  <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>DATE</TableCell>
          <TableCell align="left">TRANSACTION TYPE</TableCell>
          <TableCell align="left">NO</TableCell>
          <TableCell align="left">DESCRIPTION</TableCell>
          <TableCell align="left">ACCOUNT</TableCell>
          <TableCell align="left">DEBIT</TableCell>
          <TableCell align="left">CREDIT</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {listReport && listReport.map((data, index) => {
          return (
            <>
            <p>asdfafasdfsd</p>
              <TableRow key={index}>
                <TableCell>sdfsdasf</TableCell>
               
              </TableRow>

            </>

          )
        })}
      </TableBody>
    </Table>
  </TableContainer>

}

function RowComponent({ data }) {
  return (
    <>

      <TableCell align="left">{data.created_at}</TableCell>
      <TableCell align="left">Journal Entry</TableCell>
      <TableCell align="left">{data.journal_no}</TableCell>
      <TableCell align="left">{data.lg_desc}</TableCell>
      <TableCell align="left">{data.name_eng}</TableCell>
      <TableCell align="left">{data.debit}</TableCell>
      <TableCell align="left">{data.credit}</TableCell>

    </>


  )

}