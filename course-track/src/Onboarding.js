import React from "react";
import { FormattedMessage } from "react-intl";

const Onboarding = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-8 offset-md-2">
					<div className="card">
						<div className="card-body">
							<h2 className="card-title">
								<FormattedMessage id="welcome_coursetrack"></FormattedMessage>
							</h2>
							<p className="card-text">
								<FormattedMessage id="follow_instruc"></FormattedMessage>
							</p>
							<ol>
								<li>
									<FormattedMessage id="create_ass_instruc"></FormattedMessage>
								</li>
								<li>
									<FormattedMessage id="view_upcom_ass_instruc"></FormattedMessage>
								</li>
								<li>
									<FormattedMessage id="receive_notif_instruc"></FormattedMessage>
								</li>
							</ol>
							<p className="card-text">
								<FormattedMessage id="get_started"></FormattedMessage>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
