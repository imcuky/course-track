import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import { setLocale } from "./redux/actions";

const LanguageDropdown = ({ locale = "en", dispatchSetLocale }) => {
	const handleOnSelect = (locale) => {
		dispatchSetLocale(locale);
	};
	return (
		<Dropdown title="Langage">
			<Dropdown.Item href="#/action-1" onSelect={handleOnSelect("en")}>
				EN
			</Dropdown.Item>
			<Dropdown.Item href="#/action-2" onSelect={handleOnSelect("fr")}>
				FR
			</Dropdown.Item>
		</Dropdown>
	);
};

const mapStateToProps = ({ locale = "en" }) => {
	return {
		locale,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchSetLocale: (locale) => dispatch(setLocale(locale)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageDropdown);
