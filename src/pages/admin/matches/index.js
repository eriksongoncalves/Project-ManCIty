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
import { firebaseMatches } from "~/firebase";
import { firebaseLooper, reverseArray } from "~/components/ui/misc";

class AdminMatches extends Component {

  state = {
    isLoading: true,
    matches: []
  }

  componentDidMount() {
    firebaseMatches
      .once('value')
      .then(snapshot => {
        const matches = firebaseLooper(snapshot);

        this.setState({
          isLoading: false,
          matches: reverseArray(matches)
        })
      })
  }

  render() {
    const { isLoading, matches } = this.state;

    return (
      <Layout>
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Data</TableCell>
                  <TableCell>Match</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Final</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  matches &&
                  matches.map(match => (
                    <TableRow key={match.id}>
                      <TableCell>{match.date}</TableCell>
                      <TableCell>
                        <Link to={`/admin_matches/edit_match/${match.id}`}>
                          {match.away} <strong>-</strong> {match.local}
                        </Link>
                      </TableCell>
                      <TableCell>{match.resultAway}  <strong>-</strong> {match.resultLocal}</TableCell>
                      <TableCell>
                        {
                          match.final === 'Yes'
                            ? <span className="matches_tag_red">Final</span>
                            : <span className="matches_tag_green">No played yet</span>
                        }
                      </TableCell>
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
    )
  }
}

export default AdminMatches