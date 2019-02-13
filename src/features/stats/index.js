import React, { Component } from 'react';
import { connect }          from 'react-redux';
import ReactTimeout         from 'react-timeout';

import { ANIMATION_SPEED } from '../../config/constants';

import './styles.scss';

class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statsBgColor: 'var(--dark-gray)'
    };

    this.stopAnimation = this.stopAnimation.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // detemine when the stats have been updated and are not disabled
    if(JSON.stringify(prevProps.stats) !== JSON.stringify(this.props.stats)
      && !this.props.disabled) {
      // animate the container
      this.setState({ statsBgColor: 'var(--gray)' });
      // pause the infinite animation after 1 iteration
      this.props.setTimeout(this.stopAnimation, ANIMATION_SPEED);
    }
  }

  stopAnimation() {
    this.setState({ statsBgColor: 'var(--dark-gray)' });
  }

  render() {
    const { disabled, stats, sideMenu, largeView } = this.props;
    const { level, exp, expToLevel, damage, defence, hp, maxHp, gold } = stats;
    const { statsBgColor } = this.state;

    let height = disabled ? 66 : 64;
    if(sideMenu) height = disabled ? 202 : 200;

    let hpPercent = (hp / maxHp) * 100;
    if(hpPercent > 100) hpPercent = 100;

    return (
      <div
        style={{
          alignItems: sideMenu ? 'flex-start' : 'center',
          padding: sideMenu ? '12px 0 12px 32px' : largeView ? '12px 24px' : 12,
          backgroundColor: statsBgColor,
          height,
          width: sideMenu ? 150 : largeView ? 350 : 324,
          lineHeight: sideMenu ? 1.5 : 'unset'
        }}
        className={
          `stats__container
          ${disabled ? '' : 'white-border'}
          ${sideMenu ? 'flex-column-reverse' : 'flex-row'}`
        }>
        {
          !disabled &&
            <>
              <div className='flex-column'>

                <div className={`flex-row ${sideMenu ? '' : 'stats__row--spacing'}`}>
                  <span className='stats__text--spacing'>
                    {'LEVEL: '}
                  </span>
                  <span className='stats__text--level'>
                    { level }
                  </span>
                </div>

                <div className='flex-row flex-1'
                  style={{paddingTop: sideMenu ? 12 : 0}}>

                  <span className='exp-bar__container'>
                    <span className='flex-row stats-bar__text'>
                      {'EXP'}
                    </span>
                    <span className='exp-bar__value'
                      style={{ width: `${(exp / expToLevel) * 100}%` }}>
                    </span>
                  </span>
                </div>

              </div>

              <div className={`flex-column ${sideMenu ? '' : largeView ? 'stats-column__spacing--large' : 'stats-column__spacing'}`}>

                <div className={`flex-row ${sideMenu ? '' : 'stats__row--spacing'}`}>
                  <span className='stats__text--spacing'>
                    {'ATK: '}
                  </span>
                  <span className='stats__text--damage'>
                    { damage }
                  </span>
                </div>

                <div className='flex-row'>
                  <span className='stats__text--spacing'>
                    {'DEF: '}
                  </span>
                  <span className='stats__text--defence'>
                    { defence }
                  </span>
                </div>

              </div>

              <div className={`flex-column ${sideMenu ? '' : largeView ? 'stats-column__spacing--large' : 'stats-column__spacing'}`}>

                <div className={`flex-row ${sideMenu ? '' : 'stats__row--spacing'}`}>
                  <div className='flex-row'
                    style={{paddingBottom: sideMenu ? 12 : 0}}>

                    <span className='stats-hp-bar__container'>
                      <span className='flex-row stats-bar__text'>
                        {'HP'}
                      </span>
                      <span className='stats-hp-bar__value'
                        style={{
                          width: `${hpPercent}%`,
                          borderRadius: (
                            (hpPercent >= 97) ?
                              (hpPercent >= 99) ?
                                '5px'
                                :
                                '5px 3px 3px 5px'
                              :
                              '5px 0 0 5px'
                          )}}>
                      </span>
                    </span>
                  </div>
                </div>

                <div className='flex-row'>
                  <span className='stats__text--spacing'>
                    {'GOLD: '}
                  </span>
                  <span className='stats__text--gold'>
                    { gold }
                  </span>
                </div>

              </div>
            </>
        }

      </div>
    );
  }
}

const mapStateToProps = ({ stats }) => ({ stats });

export default connect(mapStateToProps)(ReactTimeout(Stats));
