import {useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {MenuItem} from "@mui/material";
import Menu from '@mui/material/Menu';
import Web3 from "web3";
import {UserServices} from "../services/UserService";
import "./Header.css"

const web3 = new Web3(window.web3.currentProvider);
const ProfileBox = ({web3Data, handleConnect, handleLogout}) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const history = useHistory();
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleCreateNFT = () => {
		history.push("/create");
	};

	const handleViewMyNfts = () => {
		history.push("/my-nfts");
	};

	let hiddenAddress;
	if (web3Data.isLoggedIn) {
		hiddenAddress = web3Data.address.substring(0, 7) + "......" + web3Data.address.substring(web3Data.address.length - 5, web3Data.address.length);
	}

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
					<Link to={"/"} className="logo-container">Ternoa - nft</Link>
				</Typography>
				<Typography variant="h6" component="div" sx={{flexGrow: 1}}/>
				{web3Data.isLoggedIn ? (
					<div className="header-right-side">
						<Typography
							className="address-box"
							variant="h6" component="div" style={{}}>
							{hiddenAddress}
						</Typography>
						<Typography
							className="address-box"
							variant="h6" component="div" style={{}}>
							-
						</Typography>
						<Typography
							className="address-box"
							variant="h6" component="div" style={{}}>
							{web3Data.balance} ETH
						</Typography>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle/>
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleCreateNFT}>Create NFT</MenuItem>
							<MenuItem onClick={handleViewMyNfts}>View My NFTs</MenuItem>
							<MenuItem onClick={handleLogout}>Logout</MenuItem>
						</Menu>
					</div>
				) : <Button color="inherit" onClick={handleConnect}>Login</Button>}
			</Toolbar>
		</AppBar>
	)
}

const Header = ({
					loggedIn
				}) => {

	const [web3Data, setWeb3Data] = useState({isLoggedIn: false, address: null, balance: 0});
	const history = useHistory();

	useEffect(() => {
		UserServices.getUserInfo().then(async resp => {
			if (resp.data.status === false) {
				await handleLogout();
			} else {
				const accounts = await web3.eth.getAccounts();
				if (accounts[0].toLowerCase() !== resp.data.data.walletAddress.toLowerCase()) {
					await handleLogout();
				} else {
					web3.eth.getBalance(resp.data.data.walletAddress).then(resp2 => {
						const accountBalance = Number(web3.utils.fromWei(resp2))
							.toLocaleString(undefined, 2);
						setWeb3Data({isLoggedIn: true, address: resp.data.data.walletAddress, balance: accountBalance});
					})
				}
			}
		}).catch(err => {
			localStorage.clear();
		});
	}, [])

	const handleConnect = async () => {
		const chainId = await web3.eth.net.getId();
		const envChainId = parseInt(process.env.REACT_APP_CHAIN_ID);  // rinkeby
		const envChainIdHex = "0x" + envChainId.toString(16);

		if (chainId !== envChainId) {
			await window.ethereum.request({  // change request to the correct network
				method: "wallet_switchEthereumChain",
				params: [{chainId: envChainIdHex}], // chainId must be in hexadecimal numbers
			});
		}
		await window.ethereum.on("accountsChanged", (accounts) => {
			if (
				accounts.length > 0 &&
				web3Data.isLoggedIn
			) {
				handleLogout();
			}
		});
		await window.ethereum.send('eth_requestAccounts');

		const account = await web3.eth.getAccounts();
		const signature = await web3.eth.personal.sign(
			'2', // gelen kullanici bununla gelecek al
			account[0]
		);

		const accountBalance = Number(web3.utils.fromWei(await web3.eth.getBalance(account[0])))
			.toLocaleString(undefined, 2);
		UserServices.login('2', signature).then(resp => {
			const data = resp.data.data;
			localStorage.setItem("x-auth-token", data.token);
			localStorage.setItem("id", data.id);
			localStorage.setItem("walletAddress", data.walletAddress);
			setWeb3Data({isLoggedIn: true, address: account[0], balance: accountBalance});
			// window.location.reload();
		}).catch(err => {
			console.log("err: ", err)
		});
	}

	const handleLogout = async () => {
		setWeb3Data({isLoggedIn: false, address: null, balance: 0});
		localStorage.clear();
		history.push("/");
	}
	return (
		<Box>
			<ProfileBox web3Data={web3Data} handleConnect={handleConnect} handleLogout={handleLogout}/>
		</Box>
	)
}

export default Header;
