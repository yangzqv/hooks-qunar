import React, { useState, useRef, useMemo, useEffect } from 'react'
import propTypes from 'prop-types'
import classnames from 'classnames'
import './CitySelector.css'

// 城市项
const CityItem = props => {
  const { name, onSelect } = props

  return (
    <li className="city-li" onClick={() => onSelect(name)}>
      {name}
    </li>
  )
}

// 城市集合
const CitySection = props => {
  const {
    title,
    onSelect,
    cities = []
  } = props

  return (
    <div className="city-ui">
      <div className="city-li">{title}</div>
      {cities.map(city => {
        return (
          <CityItem
            key={city.name}
            name={city.name}
            onSelect={onSelect}
          />
        )
      })}
    </div>
  )
}

// 城市列表
const CityList = props => {
  const { sections, onSelect } = props

  return (
    <div className="city-list">
      <div className="city-cate">
        {sections.map(section => {
          return (
            <CitySection
              key={section.title}
              title={section.title}
              onSelect={onSelect}
              cities={section.cities}
            />
          )
        })}
      </div>
    </div>
  )
}

// 城市选择层
const CitySelector = props => {
  const {
    show,
    cityData,
    isLoading,
    onBack,
    fetchCityData,
    onSelect
  } = props

  const [searchKey, setSearchKey] = useState('')
  const currentInput = useRef()
  const key = useMemo(() => searchKey.trim(), [searchKey])

  useEffect(() => {
    if (!show || cityData || isLoading) {
      return
    }

    fetchCityData()
  }, [show, cityData, isLoading])

  const onGetFocus = () => {
    setSearchKey('')
    currentInput.current.focus()
  }

  const outputCitySections = () => {
    if (isLoading) {
      return <div>loading</div>
    }

    if (cityData) {
      return (
        <CityList
          sections={cityData.cityList}
          onSelect={onSelect}
        />
      )
    }

    return <div>error</div>
  }

  return (
    <div className={classnames('city-selector', { hidden: !show })}>
      <div className="city-search">
        <div className="search-back" onClick={() => onBack()}>
          <svg width="42" height="42">
            <polyline
              points="25, 13 16, 21 25, 29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchKey}
            className="search-input"
            placeholder="城市、车展的中文或拼音"
            onChange={e => setSearchKey(e.target.value)}
            ref={currentInput}
          />
        </div>
        {/* {searchKey && (<i className="search-clean" onClick={onGetFocus}>&#xf063;</i>)} */}
        <i
          className={classnames('search-clean', { hidden: key.length === 0 })}
          onClick={onGetFocus}
        >
          &#xf063;
        </i>
      </div>
      {outputCitySections()}
    </div>
  )
}

CitySelector.propTypes = {
  show: propTypes.bool.isRequired,
  cityData: propTypes.object,
  isLoading: propTypes.bool.isRequired,
  onBack: propTypes.func.isRequired,
  fetchCityData: propTypes.func.isRequired
}

export default CitySelector