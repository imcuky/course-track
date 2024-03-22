import { SET_LOCALE } from "../constants";

const initialState = {
	locale: "en",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (
	state = initialState,
	action = { type: "", data: "" }
) {
	const { type, data } = action;

	switch (type) {
		case SET_LOCALE:
			return {
				...state,
				locale: data,
			};
		default:
			return { ...state };
	}
}
