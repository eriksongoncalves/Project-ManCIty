import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';


import Layout from "~/components/admin/Layout";
import { firebasePlayers } from "~/firebase";
import { firebaseLooper, reverseArray } from "~/components/ui/misc";

class AdminPlayers extends Component {

  state = {
    isLoading: true,
    players: []
  }

  componentDidMount() {
    firebasePlayers
      .once('value')
      .then(snapshot => {
        const players = firebaseLooper(snapshot);
        this.setState({
          isLoading: false,
          players: reverseArray(players)
        })
      })
  }

  render() {
    const { isLoading, players } = this.state;

    return (
      <Layout>
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Position</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  players &&
                  players.map(player => (
                    <TableRow key={player.id}>
                      <TableCell>
                        <Link to={`/admin_players/add_players/${player.id}`}>
                          {player.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/admin_players/add_players/${player.id}`}>
                          {player.lastname}
                        </Link>
                      </TableCell>
                      <TableCell>{player.number}</TableCell>
                      <TableCell>{player.position}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          <div className="admin_progress">
            {
              isLoading
              && <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
            }
          </div>
        </div>
      </Layout>
    );
  }
}

export default AdminPlayers;