// App.js
import React, { useState } from "react";
import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	NavLink,
} from "react-router-dom";
import Onboarding from "./Onboarding";
import AssignmentDashboard from "./AssignmentDashboard";
import CalendarView from "./CalendarView";
import NotificationCenter from "./NotificationCenter";
import { IntlProvider } from "react-intl";
import translations from "./translations/translations";
import {
	useLocaleContext
} from "./Context";
function ConnectedApp() {
	//const [locale, setLocale] = useState("en");
	const { locale, setLocale } = useLocaleContext();
	const messages = translations[locale];

	const LanguageDropdown = () => {
		const handleOnSelect = (selectedLocale) => {
			setLocale(selectedLocale);
		};
		return (
			<select
				value={locale}
				onChange={(event) => handleOnSelect(event.target.value)}
				className="language-dropdown"
			>
				<option value="en" className="language-dropdown-option">
					EN
				</option>
				<option value="fr" className="language-dropdown-option">
					FR
				</option>
			</select>
		);
	};
	return (
		<IntlProvider locale={locale} messages={messages}>
			<Router>
				<div className="app">
					<header className="app-header">
						<h1>CourseTrack</h1>
						<nav className="tab-bar">
							<NavLink to="/" className="tab-button">
								Onboarding
							</NavLink>
							<NavLink to="/dashboard" className="tab-button">
								Assignment Dashboard
							</NavLink>
							<NavLink to="/calendar" className="tab-button">
								Calendar View
							</NavLink>
							<NavLink to="/notifications" className="tab-button">
								Notification Center
							</NavLink>
							<LanguageDropdown></LanguageDropdown>
						</nav>
					</header>

					<div style={{ margin: "15px 20px" }}>
						<Routes>
							<Route path="/" element={<Onboarding />} />
							<Route
								path="/dashboard"
								element={<AssignmentDashboard />}
							/>
							<Route
								path="/calendar"
								element={<CalendarView />}
							/>
							<Route
								path="/notifications"
								element={<NotificationCenter />}
							/>
						</Routes>
					</div>
				</div>
			</Router>
		</IntlProvider>
	);
}

export default ConnectedApp;
