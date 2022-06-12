import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import MyNfts from "./pages/MyNfts";
import UpdateNft from "./pages/UpdateNft";
import CreateNft from "./pages/CreateNft";

function App() {
	return (
		<BrowserRouter>
			<Header/>
			<Switch>
				<Route exact path="/">
					<Home/>
				</Route>
				<Route exact path="/my-nfts">
					<MyNfts/>
				</Route>
				<Route exact path="/update/:id">
					<UpdateNft/>
				</Route>
				<Route exact path="/create">
					<CreateNft/>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
