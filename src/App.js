import React, { useState } from "react";

import logo from "./logo.svg";
import "./App.css";

function App() {
	//give an initial state so that the data won't be undefined at start
	const [bids, setBids] = useState([0]);

	const ws = new WebSocket("wss://ws.bitstamp.net");
	console.log(ws);
	ws.onerror = (err) => {
		console.log(err);
	};

	const apiCall = {
		event: "bts:subscribe",
		data: { channel: "order_book_bcheur" },
	};

	ws.onopen = (event) => {
		// console.log("here 1");
		ws.send(JSON.stringify(apiCall));
	};

	ws.onmessage = function (event) {
		// console.log(event);
		// console.log("here 2");
		const json = JSON.parse(event.data);
		try {
			if ((json.event = "data")) {
				setBids(json.data.bids.slice(0, 5));
			}
		} catch (err) {
			console.log(err);
		}
	};

	//map the first 5 bids
	const firstBids = bids.map((item) => {
		return (
			<div>
				<p> {item}</p>
			</div>
		);
	});

	return <div>{firstBids}</div>;
}

export default App;
