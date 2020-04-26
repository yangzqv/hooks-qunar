import React, {
  memo,
  useState,
  useRef,
  useMemo,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './CitySelector.css'

// 城市项
const CityItem = memo(props => {
  const { name, onSelect } = props

  return (
    <li className="city-li" onClick={() => onSelect(name)}>
      {name}
    </li>
  )
})

CityItem.propTypes = {
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

// 城市集合
const CitySection = memo(props => {
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
})

CitySection.propTypes = {
  title: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  cities: PropTypes.array
}

// 城市列表
const CityList = memo(props => {
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
})

CityList.propTypes = {
  sections: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
}

// 城市选择层
const CitySelector = memo(props => {
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
})

CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  fetchCityData: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default CitySelector