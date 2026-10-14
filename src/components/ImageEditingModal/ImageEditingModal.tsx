import { useEffect, useState } from "react";
import {
	deletePhoto,
	deletePhotoAccessSecret,
	generatePhotoAccessSecret,
	patchPhoto,
	PhotoSize,
	type PatchPhotoProps,
} from "../../lib/api/photoApi";
import FormModal from "../FormModal/FormModal";
import cl from "./ImageEditingModal.module.css";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import TagSelector from "../UI/TagSelector/TagSelector";
import SecureImg from "../UI/SecureImg/SecureImg";
import { AccessModifier } from "../../lib/api/types/accessModifier";
import type { ImageViewingModalProps } from "../ImageViewingModal/ImageViewingModal";

interface ImageEditingModalProps extends ImageViewingModalProps {
	onChangePhoto: () => void;
}

const ImageEditingModal = (props: ImageEditingModalProps) => {
	const [title, setTitle] = useState(props.photoDesc.title);
	const [description, setDescription] = useState(props.photoDesc.description);
	const [tags, setTags] = useState<string[]>(props.photoDesc.tags.map((t) => t.tag_uuid));
	const [accessLevel, setAccessLevel] = useState<AccessModifier>(props.photoDesc.access_level);
	const [copied, setCopied] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);

	const [accessLink, setAccessLink] = useState<string>("");
	const [expiresDuration, setExpiresDuration] = useState(60); // default 1 hour

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				e.stopPropagation();
				close();
			} else if (e.key === "ArrowLeft") {
				props.prev();
			} else if (e.key === "ArrowRight") {
				props.next();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

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
				const message = err instanceof Error ? err.message : String(err);

				console.log("Error generate photo access link: ", message);
				setError(message);
			});
	};

	const deleteAccessLinkHandler = () => {
		deletePhotoAccessSecret(props.photoDesc.photo_uuid)
			.then(() => {
				setAccessLink("");
			})
			.catch((err) => {
				console.log("Error delete photo access link: ", err);
			})
			.finally(() => setError(undefined));
	};

	const copyAccessLink = () => {
		navigator.clipboard.writeText(accessLink);
		setCopied(true);
	};

	return (
		<FormModal visible={true} close={cancelPhotoCallback} next={props.next} prev={props.prev}>
			<div className={cl.viewingContainer}>
				<SecureImg
					className={cl.viewingImage}
					alt="image"
					photoUuid={props.photoDesc.photo_uuid}
					accessKey={props.photoDesc.access_key}
					photoSize={PhotoSize.medium}
				/>

				<div className={cl.options}>
					<label>
						<p>Title:</p>
						<Input value={title} onChange={(e) => setTitle(e.target.value)} />
					</label>

					<label>
						<p>Description:</p>
						<Input value={description} onChange={(e) => setDescription(e.target.value)} />
					</label>

					<label className={cl.options_text}>
						Access level:
						<select
							className={cl.options_text}
							value={accessLevel}
							onChange={(e) => setAccessLevel(e.target.value as AccessModifier)}
						>
							<option value={AccessModifier.private}>private</option>
							<option value={AccessModifier.protected}>protected</option>
							<option value={AccessModifier.public}>public</option>
						</select>
					</label>

					<TagSelector tags={tags} setTags={setTags} />

					<div>
						<Button onClick={cancelPhotoCallback}>Cancel</Button>
						<Button onClick={deletePhotoCallback}>Delete</Button>
						<Button onClick={doneEditingCallback}>Done</Button>
					</div>

					<label>
						<p>Link access duration (minutes):</p>
						<Input
							value={expiresDuration}
							onChange={(e) => setExpiresDuration(Number(e.target.value))}
							type="number"
							min={1}
						/>
					</label>
					<div className={cl.line}>
						<Button onClick={generateAccessLinkHandler}>Generate access link</Button>
						<Button onClick={deleteAccessLinkHandler}>Delete access link</Button>
					</div>

					{accessLink !== "" && (
						<Button onClick={copyAccessLink}>{copied ? "Copied" : "Copy access link"}</Button>
					)}
					{error && <p className={cl.error}>{error}</p>}
				</div>
			</div>
		</FormModal>
	);
};

export default ImageEditingModal;
