import {useState} from 'react';
import {NftServices} from '../services/NftService';
import NftCard from "../components/NftCard";
import {useHistory, useParams} from "react-router-dom";
import {Box, Button, TextField, Input} from "@mui/material";
import "./Home.css";

function Home() {
	const [image, setImage] = useState("https://www.btchaber.com/wp-content/uploads/2022/05/haftanin-one-cikan-nft-haberleri-7-14-mayis.jpg");
	const [title, setTitle] = useState("Title");
	const [description, setDescription] = useState("Description");
	const [price, setPrice] = useState(0.0);
	const history = useHistory();

	const {id} = useParams();

	const handleChange = (prop) => (event) => {
		if (prop === "title") {
			setTitle(event.target.value);
		} else if (prop === "description") {
			setDescription(event.target.value);
		} else if (prop === "price") {
			setPrice(event.target.value);
		}
	};

	const handleCreate = async () => {
		NftServices.createNft({
			id: id,
			image: image,
			title: title,
			description: description,
			price: price
		}).then(resp => {
			history.push("/");
		}).catch(err => {
			console.log(err);
		})
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
				<NftCard image={image}
						 walletAddress={localStorage.getItem("walletAddress")}
						 title={title}
						 description={description}
						 price={price}/>
			}
			{
				<Box className="update-form-container" component="form"
					 sx={{
						 '& .MuiTextField-root': {m: 1, width: '25ch'},
					 }}
					 noValidate
					 autoComplete="off">
					<label htmlFor="contained-button-file">
						<Input accept="image/*" id="contained-button-file" multiple type="file"
							   onChange={handleUploadClick}/>
						<Button variant="contained" component="span">
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
						<Button variant="contained" size="small" onClick={handleCreate}>
							Create
						</Button>
					</div>
				</Box>
			}
		</div>
	)
}

export default Home;
