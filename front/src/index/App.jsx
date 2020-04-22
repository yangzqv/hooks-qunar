import React, { useCallback } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './App.css'

import Header from '../common/Header.jsx'
import DepartDate from './DepartDate.jsx'
import HighSpeed from './HighSpeed.jsx'
import Journey from './Journey.jsx'
import Submit from './Submit.jsx'

import { showCitySelector, exchangeFromTo } from './actions.js'

function App(props) {
  const {
    from,
    to,
    dispatch
  } = props

  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  const cbs = bindActionCreators({
    exchangeFromTo,
    showCitySelector
  }, dispatch)

  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <Journey
        from={from}
        to={to}
        {...cbs}
      />
      <DepartDate />
      <HighSpeed />
      <Submit />
    </div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return state
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch }
  }
)(App)
