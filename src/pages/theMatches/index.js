import React, { Component } from 'react';

import { firebaseMatches } from '~/firebase';
import { firebaseLooper, reverseArray } from '~/components/ui/misc';
import LeagueTable from './table';
import MatchesList from './matchesList';

class TheMatches extends Component {

  state = {
    loading: true,
    matches: [],
    filterMatches: [],
    playerFilter: 'All',
    resultFilter: 'All',
  }

  componentDidMount() {
    firebaseMatches
      .once('value')
      .then(snapshot => {
        const matches = firebaseLooper(snapshot);

        this.setState({
          matches: reverseArray(matches),
          filterMatches: reverseArray(matches),
          loading: false
        })
      })
      .catch(e => {
        this.setState({
          loading: false
        })
      })
  }

  showPlayed = played => {
    const { matches } = this.state;
    const list = matches.filter(match => match.final === played);

    this.setState({
      filterMatches: played === 'All' ? matches : list,
      playerFilter: played,
      resultFilter: 'All'
    })
  }

  showResult = result => {
    const { matches } = this.state;
    const list = matches.filter(match => match.result === result);

    this.setState({
      filterMatches: result === 'All' ? matches : list,
      playerFilter: 'All',
      resultFilter: result
    })
  }

  render() {
    const { filterMatches, playerFilter, resultFilter } = this.state;

    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters">
              <div className="match_filters_box">
                <div className="tag">Show Match</div>
                <div className="cont">
                  <div className={`option ${playerFilter === 'All' && 'active'}`} onClick={() => this.showPlayed('All')}>All</div>
                  <div className={`option ${playerFilter === 'Yes' && 'active'}`} onClick={() => this.showPlayed('Yes')}>Played</div>
                  <div className={`option ${playerFilter === 'No' && 'active'}`} onClick={() => this.showPlayed('No')}>Not played</div>
                </div>
              </div>
              <div className="match_filters_box">
                <div className="tag">Result game</div>
                <div className="cont">
                  <div className={`option ${resultFilter === 'All' && 'active'}`} onClick={() => this.showResult('All')}>All</div>
                  <div className={`option ${resultFilter === 'W' && 'active'}`} onClick={() => this.showResult('W')}>W</div>
                  <div className={`option ${resultFilter === 'L' && 'active'}`} onClick={() => this.showResult('L')}>L</div>
                  <div className={`option ${resultFilter === 'D' && 'active'}`} onClick={() => this.showResult('D')}>D</div>
                </div>
              </div>
            </div>
            <MatchesList matches={filterMatches} />
          </div>
          <div className="right">
            <LeagueTable />
          </div>
        </div>
      </div>
    );
  }
}

export default TheMatches;