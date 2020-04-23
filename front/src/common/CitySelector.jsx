import React, { useState, useRef } from 'react'
import classnames from 'classnames'
import './CitySelector.css'
import { setSelectedCity } from '../index/actions'

export default function CitySelector(props) {
	const {
		show,
		cityData,
		isLoading,
		onBack
	} = props

	const [searchKey, setSearchKey] = useState('')
	const currentInput = useRef()

	const onGetFocus = () => {
		setSearchKey('')
		currentInput.current.focus()
	}

	return (
		<div className={classnames('city-selector', {hidden: !show})}>
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
						// ref={currentInput}
					/>
				</div>
				{/* {searchKey && (<i className="search-clean" onClick={onGetFocus}>&#xf063;</i>)} */}
				<i
					className={classnames('search-clean', {hidden: searchKey.length === 0})}
					onClick={() => setSearchKey('')}
				>&#xf063;</i>
			</div>
		</div>
	)
}