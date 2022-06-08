import {useEffect, useState} from 'react';
import {NftServices} from '../services/NftService';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import NftCard from "../components/NftCard";
import "./Home.css";

function Home() {
	const [nfts, setNfts] = useState([]);

	useEffect(() => {
		NftServices.getNfts(undefined, 0, 20).then(res => {
			setNfts(res.data.data);
			console.log(res.data.data);
		}).catch(err => {
			console.error(err);
		});
	}, [])
	return (
		<>
			<Grid className="home-container" container rowSpacing={1} columnSpacing={{xs: 2, sm: 2, md: 2}}>
				{
					nfts.map((nft, key)=>
						<Grid key={key} >
							<NftCard id={nft.id}
									 walletAddress={nft.ownerId.walletAddress}
									 image={nft.image}
									 title={nft.title}
									 description={nft.description}
									 price={nft.price}/>
						</Grid>
					)
				}

			</Grid>
		</>
	)
}

export default Home;
