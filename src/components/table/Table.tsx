import React, { useState, useEffect, Suspense } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto'
    },
    table: {
      minWidth: 650
    }
  })
);

function createData(
  exchange: string,
  base: string,
  quote: string,
  direction: string,
  price: number,
  volume: number,
  timestamp: number,
  priceUsd: number
) {
  return {
    exchange,
    base,
    quote,
    direction,
    price,
    volume,
    timestamp,
    priceUsd
  };
}

const rows = [
  createData(
    'binance',
    'syscoin',
    'bitcoin',
    'sell',
    0.00000281,
    507,
    1572636211564,
    0.0258797984115503
  )
];
const tradeWs = new WebSocket('wss://ws.coincap.io/trades/binance');
const allCoins: any = [];

export default function AcccessibleTable() {
  const classes = useStyles();

  const [coins, updateCoins]: [any, any] = useState(rows);
  //   let coins: any = null;
  useEffect(() => {
    // Your code here
    tradeWs.onerror = () => {
      throw 'SOCKET FAILURE';
    };
    tradeWs.onmessage = function(msg) {
      if (msg && msg.data) {
        // setImmediate(() => {
        const coinUpdates = JSON.parse(msg.data);
        const c = coinUpdates.base;
        debugger;
        const idx = rows.findIndex(row => row.base === c);
        if (idx === -1 && allCoins.length < 100) {
          allCoins.push(coinUpdates);
          const x = 0.00000281 * coinUpdates.price;
          rows.push(
            createData(
              'binance',
              'syscoin',
              'bitcoin',
              'sell',
              0.00000281,
              x,
              1572636211564,
              0.0258797984115503
            )
          );
          updateCoins(allCoins.concat(coinUpdates));
        }

        // });
      }
    };
  });

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <caption>A barbone structure table example with a caption</caption>
        <TableHead>
          <TableRow>
            <TableCell>Exchange</TableCell>
            <TableCell align="right">Base</TableCell>
            <TableCell align="right">Quote</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">USD&nbsp;($)</TableCell>
          </TableRow>
        </TableHead>
        <Suspense fallback={<h1>Loading posts...</h1>}>
          <TableBody>
            {allCoins.map((row: any) => (
              <TableRow key={row.price}>
                <TableCell component="th" scope="row">
                  {row.price}
                </TableCell>
                <TableCell align="right">{row.priceUsd}</TableCell>
                <TableCell align="right">{row.quote}</TableCell>
                <TableCell align="right">{row.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Suspense>
      </Table>
    </Paper>
  );
}
