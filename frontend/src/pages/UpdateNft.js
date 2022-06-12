import {useEffect, useState} from 'react';
import {NftServices} from '../services/NftService';
import NftCard from "../components/NftCard";
import {useParams} from "react-router-dom";
import {Box, Button, TextField, Input} from "@mui/material";
import "./Home.css";
function Home() {
	const [image, setImage] = useState(null);
	const [title, setTitle] = useState(null);
	const [description, setDescription] = useState(null);
	const [price, setPrice] = useState(null);
	const [nft, setNft] = useState(null);

	const {id} = useParams();

	useEffect(() => {
		NftServices.getNft(id).then(res => {
			setNft(res.data.data);
			setImage(res.data.data.image);
			setTitle(res.data.data.title);
			setDescription(res.data.data.description);
			setPrice(res.data.data.price);
		}).catch(err => {
			console.error(err);
		});
	}, [])

	const handleChange = (prop) => (event) => {
		if (prop === "title") {
			setTitle(event.target.value);
		} else if (prop === "description") {
			setDescription(event.target.value);
		} else if (prop === "price") {
			setPrice(event.target.value);
		}
	};

	const handleUpdate = async () => {
		NftServices.updateNft({
			id: id,
			image: image,
			title: title,
			description: description,
			price: price
		}).then(resp => {
			window.location.reload();
		})
	}

	const handleClear = async () => {
		setTitle(nft.title);
		setDescription(nft.description);
		setPrice(nft.price);
	}

	const handleUploadClick = async (event) => {
		let file = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = function (e) {
			setImage(reader.result);
		};
	};

	return (
		<div className="update-nft-container">
			{
				nft && <NftCard image={image === null ? nft.image : image}
								walletAddress={nft.ownerId.walletAddress}
								title={title === null ? nft.title : title}
								description={description === null ? nft.description : description}
								price={price === null ? nft.price : price}/>
			}
			{
				nft && <Box className="update-form-container" component="form"
							sx={{
								'& .MuiTextField-root': {m: 1, width: '25ch'},
							}}
							noValidate
							autoComplete="off">
					<label htmlFor="contained-button-file">
						<Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleUploadClick}/>
						<Button variant="contained" component="span" >
							Upload
						</Button>
					</label>

					<TextField
						required
						id="outlined-required"
						label="Title"
						value={title}
						onChange={handleChange("title")}
					/>
					<TextField
						required
						id="outlined-required"
						label="Description"
						value={description}
						onChange={handleChange("description")}
					/>

					<TextField
						id="outlined-adornment-weight"
						label="Price"
						value={price}
						onChange={handleChange("price")}
					/>
					<div className="update-button-container">
						<Button  variant="contained" size="small" onClick={handleUpdate}>
							Update
						</Button>
						<Button variant="outlined" size="small" onClick={handleClear}>
							Clear
						</Button>
					</div>
				</Box>
			}
		</div>
	)
}

export default Home;
