import { SET_LOCALE } from "../constants";

export function setLocale(locale = "en") {
	return {
		type: SET_LOCALE,
		data: locale,
	};
}
