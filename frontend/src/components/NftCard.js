import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Button, CardActions} from "@mui/material";

const NftCard = ({
					 id,
					 walletAddress,
					 image,
					 title,
					 description,
					 price,
					 handleUpdate,
					 handleDelete
				 }) => {

	let hiddenAddress;
	if (walletAddress) {
		hiddenAddress = walletAddress.substring(0, 7) + "....." + walletAddress.substring(walletAddress.length - 5, walletAddress.length);
	}

	return (
		<Card sx={{maxWidth: 345}}>
			<CardHeader
				title={title}
				subheader={"Owner: " + hiddenAddress}
			/>
			<CardMedia
				component="img"
				height="194"
				image={image}
				alt="Paella dish"
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{description}
				</Typography>
				<Typography variant="body2" color="text.secondary" fontWeight={600}>
					Price: {price} ETH
				</Typography>
			</CardContent>
			{
				(handleUpdate && handleDelete) &&
				<CardActions disableSpacing>
					<Button variant="outlined" size="small" onClick={() => handleUpdate(id)}>
						Update
					</Button>
					<Button variant="outlined" size="small" color="error" onClick={() => handleDelete(id)}>
						Delete
					</Button>
				</CardActions>
			}

		</Card>
	)
}

export default NftCard;
