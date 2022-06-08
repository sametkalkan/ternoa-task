import {useEffect, useState} from 'react';
import {NftServices} from '../services/NftService';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import NftCard from "../components/NftCard";
import {useHistory} from "react-router-dom";
import "./Home.css";

function MyNfts() {
	const [nfts, setNfts] = useState([]);
	const history = useHistory();

	const userId = localStorage.getItem("id");

	useEffect(() => {
		NftServices.getNfts(userId, 0, 20).then(res => {
			setNfts(res.data.data);
		}).catch(err => {
			console.error(err);
		});
	}, [])

	const handleUpdate = async (id) => {
		history.push("/update/" + id);
	}

	const handleDelete = async (id) => {
		await NftServices.deleteNft(id);
		window.location.reload();
	}
	return (
		<>
			{
				localStorage.getItem("x-auth-token") === null
					? <div className="please-login-container">Please login</div>
					: <Grid className="home-container" container rowSpacing={1} columnSpacing={{xs: 2, sm: 2, md: 2}}>
					{
						nfts.map((nft, key) =>
							<Grid key={key}>
								<NftCard id={nft.id}
										 walletAddress={nft.ownerId.walletAddress}
										 image={nft.image}
										 title={nft.title}
										 description={nft.description}
										 price={nft.price}
										 handleUpdate={nft.ownerId.id === userId ? handleUpdate : null}
										 handleDelete={nft.ownerId.id === userId ? handleDelete : null}
								/>
							</Grid>
						)
					}

				</Grid>
			}

		</>
	)
}

export default MyNfts;
