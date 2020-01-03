import React, { Component } from 'react';
import Layout from '~/components/admin/Layout';

class Dashboard extends Component {
  render() {
    return (
      <Layout>
        <div className="user_dashboard">
          <div>
            This is your dashboard
          </div>
        </div>
      </Layout>
    )
  }
}

export default Dashboard