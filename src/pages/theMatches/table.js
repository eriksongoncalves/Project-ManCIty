import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from "@material-ui/core/CircularProgress";

import { firebaseDB } from '~/firebase';
import { firebaseLooper } from '~/components/ui/misc';

const style = {
  cell: {
    padding: '4px 16px 4px 16px',
    borderBottom: '1px solid #fff',
    color: '#fff',
    textAlign: 'center'
  }
}

class LeagueTable extends Component {

  state = {
    positions: []
  }

  componentDidMount() {
    firebaseDB
      .ref('positions')
      .once('value')
      .then(snapshot => {
        const positions = firebaseLooper(snapshot);

        this.setState({
          positions
        })
      })
  }

  showTimePositions = pos => (
    pos &&
    pos.map((pos, i) => (
      <TableRow key={i}>
        <TableCell style={style.cell}>{i + 1}</TableCell>
        <TableCell style={style.cell}>{pos.team}</TableCell>
        <TableCell numeric="true" style={style.cell}>{pos.w}</TableCell>
        <TableCell numeric="true" style={style.cell}>{pos.d}</TableCell>
        <TableCell numeric="true" style={style.cell}>{pos.l}</TableCell>
        <TableCell numeric="true" style={style.cell}>{pos.pts}</TableCell>
      </TableRow>
    ))
  )

  render() {
    return (
      <div className="league_table_wrapper">
        <div className="title">League Table</div>
        <TableContainer component={Paper} style={{ background: '#98c6e9' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={style.cell}>Pos</TableCell>
                <TableCell style={style.cell}>Team</TableCell>
                <TableCell style={style.cell}>W</TableCell>
                <TableCell style={style.cell}>L</TableCell>
                <TableCell style={style.cell}>D</TableCell>
                <TableCell style={style.cell}>Pts</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.showTimePositions(this.state.positions)}
            </TableBody>
          </Table>
          {this.state.positions.length <= 0
            && <CircularProgress thickness={7} style={{ color: '#fff', margin: '20px' }} />
          }
        </TableContainer>
      </div >
    )
  }
}

export default LeagueTable