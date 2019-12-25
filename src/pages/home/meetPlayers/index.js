import React, { Component } from 'react';
import Stripes from '~/assets/images/stripes.png';
import { Tag } from '~/components/ui/misc';
import Reveal from 'react-reveal/Reveal';
import HomeCards from './Cards';

class meetPlayers extends Component {
  state = {
    show: false
  }

  render() {
    return (
      <Reveal
        fraction={0.7}
        onReveal={() => {
          this.setState({ show: true })
        }}
      >
        <div className="home_meetplayers" style={{
          background: `url(${Stripes}) #fff`
        }}>
          <div className="container">
            <div className="home_meetplayers_wrapper">
              <div className="home_card_wrapper">
                <HomeCards show={this.state.show} />
              </div>
              <div className="home_text_wrapper">
                <div>
                  <Tag bck="#0e1731" size="100px" color="#fff" add={{
                    display: "inline-block",
                    marginBottom: "20px"
                  }}
                  >Meet</Tag>
                </div>
                <div>
                  <Tag bck="#0e1731" size="100px" color="#fff" add={{
                    display: "inline-block",
                    marginBottom: "20px"
                  }}
                  >The</Tag>
                </div>
                <div>
                  <Tag bck="#0e1731" size="100px" color="#fff" add={{
                    display: "inline-block",
                    marginBottom: "20px"
                  }}
                  >Players</Tag>
                </div>
                <div>
                  <Tag
                    bck="#fff"
                    size="27px"
                    color="#0e1731"
                    link={true}
                    linkTo="/the_team"
                    add={{
                      display: "inline-block",
                      marginBottom: "20px",
                      border: "1px solid #0e1731"
                    }}
                  >meet them here</Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    )
  }
}

export default meetPlayers;