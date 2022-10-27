import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(id, name, calories,) {
    return { id, name, calories };
}

const rows = [
    createData(1, 'Assets', 159,),


];

function createDatelist(id, name, price) {
    return { id, name, price }
}

const rows1 = [
    createDatelist(1, 'Current Assets', 3000),
    createDatelist(1, 'Long- term assets', 3000),

]


function createdate2(id, name, calories) {
    return { id, name, calories }
}

const data_row = [
    createdate2(1, 'Liabilities and shareholders equity', 200),
]
function createdatelist2(id, name, price) {
    return { id, name, price }
}
const rows2 = [
    createdatelist2(1, 'Shareholders equity:', 3000),


]


function createdatalist(id, name, calories, current_id) {
    return { id, name, calories, current_id }
}

const createrowlist = [
    createdatalist(1, "Current assets-USD", 20000, 1, 0),
    createdatalist(2, "Currents assets-LAK", 20000, 1, 0),
]

export default function BalanceSheet() {
    const classes = useStyles();
    return (
        <>
            <div>
                <h2>Balance Sheet</h2>
                <ChevronLeftIcon style={{ color: "#3f51b5", cursor: "pointer" }} />
                <span style={{ color: "#3f51b5", cursor: "pointer" }}
                >Back to report list</span><br />
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="right">TOTAL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows && rows.map((data, index) => {

                                return (
                                    <>
                                        <GLRowComponent
                                            key={index}
                                            id={data?.id}
                                            name={data?.name}
                                            calories={data?.calories}
                                        />
                                    </>
                                )
                            })
                        }

                    </TableBody>
                </Table>
                <div style={{ border: '1px solid black' }}></div>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableBody>
                        {
                            data_row && data_row.map((data, index) => {

                                return (
                                    <>
                                        <GLRowComponent2
                                            key={index}
                                            id={data?.id}
                                            name={data?.name}
                                            calories={data?.calories}
                                        />
                                    </>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
function GLRowComponent({ name, calories, id }) {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ cursor: 'pointer' }}>{open ? <ExpandLess /> : <ExpandMore />}
                    {name}
                </TableCell>
                <TableCell align="right">{calories}</TableCell>
            </TableRow>
            {open ? (
                <>
                    < Componentchild
                        id={id}
                        size={40}
                    />
                    <TableRow>
                        <TableCell component="th" scope="row"  >
                            Total {name}
                        </TableCell>
                        <TableCell align="right">{calories}</TableCell>

                    </TableRow>
                </>
            ) : (
                <></>
            )}
        </>
    )
}
function GLRowComponent2({ name, calories, id }) {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ cursor: 'pointer' }}>{open ? <ExpandLess /> : <ExpandMore />}
                    {name}
                </TableCell>
                <TableCell align="right">{calories}</TableCell>
            </TableRow>
            {open ? (
                <>
                    < Componentchild2
                        id={id}
                        size={40}
                    />
                    <TableRow>
                        <TableCell component="th" scope="row"  >
                            Total {name}
                        </TableCell>
                        <TableCell align="right">{calories}</TableCell>
                    </TableRow>
                </>
            ) : (
                <></>
            )}
        </>
    )
}
function Componentchild({ id, size }) {
    const filter = rows1.filter((el) => el.id == id);
    if (filter.length === 0) return <></>;
    return (
        <>
            {
                filter.map((item, index) => {
                    return (
                        <>
                            < Component
                                item={item}
                                size={size}
                                index={index}
                                id={item?.id}
                            />
                        </>
                    )
                })
            }
        </>
    )
}
function Componentchild2({ id, size }) {
    const filter = rows2.filter((el) => el.id == id);
    if (filter.length === 0) return <></>;
    return (
        <>
            {
                filter.map((item, index) => {
                    return (
                        <>

                            < Component2
                                item={item}
                                size={size}
                                index={index}
                            />
                        </>
                    )
                })
            }
        </>
    )
}
function Component({ item, size, index,id }) {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <TableRow key={index}>
                <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ paddingLeft: size, cursor: "pointer" }} >{open ? <ExpandLess /> : <ExpandMore />}
                    {item?.name}
                </TableCell>
                <TableCell align="right">{item?.price}</TableCell>
            </TableRow>

            {open ? (
                <>
                    <Componentsub />
                    <TableRow key={index}>
                        <TableCell component="th" scope="row" style={{ paddingLeft: size, fontWeight: "bold" }} >
                            Total {item?.name}
                        </TableCell>
                        <TableCell align="right">{item?.price}</TableCell>
                    </TableRow>
                </>

            ) : (
                <>
                </>
            )}
        </>
    )
}

function Componentsub() {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };


    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ paddingLeft: 69, cursor: "pointer" }} >{open ? <ExpandLess /> : <ExpandMore />}
                    bounmeeher
                </TableCell>
                <TableCell align="right">sssss</TableCell>
            </TableRow>




        </>
    )

}



function Component2({ item, size, index }) {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <TableRow key={index}>
                <TableCell component="th" scope="row" onClick={() => { handleClick() }} style={{ paddingLeft: size, cursor: "pointer" }} >{open ? <ExpandLess /> : <ExpandMore />}
                    {item?.name}
                </TableCell>
                <TableCell align="right">{item?.price}</TableCell>
            </TableRow>


            {open ? (
                <>
                    <TableRow>
                        <TableCell component="th" style={{ paddingLeft: 65 }} >
                            Net Income
                        </TableCell>
                        <TableCell align="right">6000000</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" style={{ paddingLeft: 65 }} >
                            Retained Earnings
                        </TableCell>
                        <TableCell align="right">6000000</TableCell>
                    </TableRow>
                    <TableRow key={index}>
                        <TableCell component="th" scope="row" style={{ paddingLeft: size, fontWeight: "bold" }} >
                            Total {item?.name}
                        </TableCell>
                        <TableCell align="right">{item?.price}</TableCell>
                    </TableRow>
                </>

            ) : (
                <>
                </>

            )}


        </>
    )


}




