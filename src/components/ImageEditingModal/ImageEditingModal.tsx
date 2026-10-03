import { useState } from "react";
import {
	deletePhoto,
	deletePhotoAccessSecret,
	generatePhotoAccessSecret,
	patchPhoto,
	PhotoSize,
	type PatchPhotoProps,
	type Photo,
} from "../../lib/api/photoApi";
import FormModal from "../FormModal/FormModal";
import cl from "./ImageEditingModal.module.css";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import TagSelector from "../UI/TagSelector/TagSelector";
import SecureImg from "../UI/SecureImg/SecureImg";
import { AccessModifier } from "../../lib/api/types/accessModifier";

interface ImageEditingModalProps {
	photoDesc: Photo;
	close: () => void;
	onChangePhoto: () => void;
}

const ImageEditingModal = (props: ImageEditingModalProps) => {
	const [title, setTitle] = useState(props.photoDesc.title);
	const [description, setDescription] = useState(props.photoDesc.description);
	const [tags, setTags] = useState<string[]>(props.photoDesc.tags.map((t) => t.tag_uuid));
	const [accessLevel, setAccessLevel] = useState<AccessModifier>(props.photoDesc.access_level);

	const [accessLink, setAccessLink] = useState<string>("");
	const [expiresDuration, setExpiresDuration] = useState(60); // default 1 hour

	const doneEditingCallback = async () => {
		let patchData: PatchPhotoProps = {
			access_level: props.photoDesc.access_level,
		};

		if (title !== props.photoDesc.title) {
			patchData.title = title;
		}

		if (description !== props.photoDesc.description) {
			patchData.description = description;
		}

		if (accessLevel !== props.photoDesc.access_level) {
			patchData.access_level = accessLevel;
		}

		// const photoTags = props.photoDesc.tags.filter(s => s.tag_name !== "")
		// if (tags.size !== photoTags.length || !photoTags.every(v => tags.has(v))) {
		// 	patchData.tags = [...tags].join(";");
		// }

		if (Object.keys(patchData).length !== 0) {
			try {
				await patchPhoto(props.photoDesc.photo_uuid, patchData);
				props.onChangePhoto();
			} catch {
				alert("Error update photo");
			}
		}

		props.close();
	};

	const cancelPhotoCallback = async () => {
		const photoTags = props.photoDesc.tags.filter((s) => s.tag_name !== "");

		if (
			title != props.photoDesc.title ||
			description != props.photoDesc.description ||
			tags.length !== photoTags.length ||
			!photoTags.every((v) => tags.includes(v.tag_uuid))
		) {
			const ok = confirm("Are you sure?");
			if (!ok) return;
		}

		props.close();
	};

	const deletePhotoCallback = async () => {
		const ok = confirm("Are you sure?");
		if (!ok) return;

		try {
			await deletePhoto(props.photoDesc.photo_uuid);
			props.onChangePhoto();
		} catch {
			alert("Error delete photo");
		}

		props.close();
	};

	const generateAccessLinkHandler = () => {
		generatePhotoAccessSecret(props.photoDesc.photo_uuid, {
			expires_duration: expiresDuration * 60,
		})
			.then((accessSecret) => {
				setAccessLink(
					`${window.location.origin}/photo/${accessSecret.photo_uuid}?access_secret=${accessSecret.access_secret}`,
				);
			})
			.catch((err) => {
				console.log("Error generate photo access link: ", err);
			});
	};

	const deleteAccessLinkHandler = () => {
		deletePhotoAccessSecret(props.photoDesc.photo_uuid)
			.then(() => {
				setAccessLink("");
			})
			.catch((err) => {
				console.log("Error delete photo access link: ", err);
			});
	};

	return (
		<FormModal visible={true} close={cancelPhotoCallback}>
			<SecureImg
				className={cl.viewingImage}
				alt="image"
				photoUuid={props.photoDesc.photo_uuid}
				accessKey={props.photoDesc.access_key}
				photoSize={PhotoSize.medium}
			/>

			<p>Title:</p>
			<Input value={title} onChange={(e) => setTitle(e.target.value)} />

			<p>Description:</p>
			<Input value={description} onChange={(e) => setDescription(e.target.value)} />

			<p>Access level:</p>
			<select
				value={accessLevel}
				onChange={(e) => setAccessLevel(e.target.value as AccessModifier)}
			>
				<option value={AccessModifier.private}>Private</option>
				<option value={AccessModifier.protected}>Protected</option>
				<option value={AccessModifier.public}>Public</option>
			</select>

			<TagSelector tags={tags} setTags={setTags} />

			<br />
			<Button onClick={cancelPhotoCallback}>Cancel</Button>
			<Button onClick={deletePhotoCallback}>Delete</Button>
			<Button onClick={doneEditingCallback}>Done</Button>

			<Input
				value={expiresDuration}
				onChange={(e) => setExpiresDuration(Number(e.target.value))}
				type="number"
				min={1}
			/>
			<Button onClick={generateAccessLinkHandler}>Generate access link</Button>
			<Button onClick={deleteAccessLinkHandler}>Delete access link</Button>

			{accessLink !== "" && <a href={accessLink}>Access link</a>}
		</FormModal>
	);
};

export default ImageEditingModal;
