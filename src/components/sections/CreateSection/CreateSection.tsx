import React, { useRef, useState } from "react";
import Dropzone from "../../UI/Dropzone/Dropzone";
import UploadImageList from "../../UploadImageList/UploadImageList";
import Button from "../../UI/Button/Button";
import {
	uploadPhoto,
	type UploadingFile,
	type UploadingFileUniversalMetadata,
} from "../../../lib/api/photoApi";
import useCreateFiles from "../../../lib/hooks/useCreateFiles";
import cl from "./CreateSection.module.css";
import TagSelector from "../../UI/TagSelector/TagSelector";
import UnsavedGuard from "../../UnsavedGuard/UnsavedGuard";
import UploadingImageEditingModal from "../../UploadingImageEditingModal/UploadingImageEditingModal";
import type { AccessModifier } from "../../../lib/api/types/accessModifier";

const CreateSection = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { files, setFiles, addFiles } = useCreateFiles();

	const [metadata, setMetadata] = useState<UploadingFileUniversalMetadata>({
		access_level: "public",
		tag_uuids: [],
	});
	const [editingFileIndex, setEditingFileIndex] = useState<number | null>(null);

	const hasUnsavedWork = files.some((f) => f.status !== "uploaded");

	const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
		const droppedFiles = Array.from(e.dataTransfer.files ?? []);
		addFiles(droppedFiles, metadata);
	};

	const openFilePicker = () => {
		fileInputRef.current?.click();
	};
	const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = Array.from(e.target.files ?? []);
		if (selectedFiles.length > 0) {
			addFiles(selectedFiles, metadata);
		}
		e.target.value = "";
	};

	const updateFileStatus = (fileName: string, status: UploadingFile["status"]) => {
		setFiles((prev) => prev.map((f) => (f.file.name === fileName ? { ...f, status } : f)));
	};

	const uploadHandler = async () => {
		const toUpload = [...files.filter((f) => f.status != "uploading" && f.status != "uploaded")];

		toUpload.forEach((f) => updateFileStatus(f.file.name, "uploading"));

		const results = await Promise.allSettled(
			toUpload.map(async (f) => {
				try {
					await uploadPhoto(f.metadata, f.file);
					updateFileStatus(f.file.name, "uploaded");

					return f.file.name;
				} catch (e) {
					updateFileStatus(f.file.name, "error");

					throw e;
				}
			}),
		);

		return results;
	};

	const nextFile = () => {
		if (editingFileIndex === null) return;

		setEditingFileIndex((prev) => (prev === null ? null : (prev + 1) % files.length));
	};
	const prevFile = () => {
		if (editingFileIndex === null) return;

		setEditingFileIndex((prev) =>
			prev === null ? null : (prev - 1 + files.length) % files.length,
		);
	};

	const accessLevelHandler = (e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
		const newAccessLevel = e.target.value as AccessModifier;
		setMetadata((prev) => ({ ...prev, access_level: newAccessLevel }));
		setFiles((prev) =>
			prev.map((file) => ({
				...file,
				metadata: {
					...file.metadata,
					access_level: newAccessLevel,
				},
			})),
		);
	};

	const tagSelectHandle = (f: (prev: string[]) => string[]) => {
		const newTags = f(metadata.tag_uuids ?? []);
		setMetadata((prev) => ({
			...prev,
			tag_uuids: f(prev.tag_uuids ?? []),
		}));
		setFiles((prev) =>
			prev.map((file) => ({
				...file,
				metadata: {
					...file.metadata,
					tag_uuids: newTags,
				},
			})),
		);
	};

	const updateFileAt = (index: number, updater: (file: UploadingFile) => UploadingFile) => {
		setFiles((prev) => prev.map((file, i) => (i === index ? updater(file) : file)));
	};

	const closeEditingModal = (remove?: boolean) => {
		if (remove === true) {
			setFiles((prev) => prev.filter((_, i) => i !== editingFileIndex));
		}

		setEditingFileIndex(null);
	};

	return (
		<>
			<UnsavedGuard
				when={hasUnsavedWork}
				message="Some photos are not uploaded yet. Leave anyway?"
			/>

			{editingFileIndex !== null ? (
				<UploadingImageEditingModal
					key={editingFileIndex}
					visible={true}
					inputFile={files[editingFileIndex]}
					updateFile={(updater) => updateFileAt(editingFileIndex, updater)}
					close={closeEditingModal}
					next={nextFile}
					prev={prevFile}
				/>
			) : null}
			<section className={cl.section}>
				<h3>General options</h3>
				<p className={cl.text_muted}>Change all of files and set up default for future files</p>
				<div className={cl.options}>
					<label className={cl.options_text}>
						Access level:
						<select
							className={cl.options_text}
							value={metadata.access_level}
							onChange={accessLevelHandler}
						>
							<option value="private">private</option>
							<option value="protected">protected</option>
							<option value="public">public</option>
						</select>
					</label>

					<TagSelector tags={metadata.tag_uuids ?? []} setTags={tagSelectHandle} />
				</div>

				<input
					ref={fileInputRef}
					type="file"
					multiple
					accept="image/*"
					onChange={onFilesSelected}
					style={{ display: "none" }}
				/>
				<Dropzone onDrop={onDrop} onClick={files.length === 0 ? openFilePicker : undefined}>
					{files.length == 0 ? <p>drag and drop .jpg images or click for select</p> : null}
					<UploadImageList files={files} setEditing={setEditingFileIndex} />
				</Dropzone>

				<div className={cl.controls}>
					<Button disabled={files.length === 0} onClick={uploadHandler}>
						Upload
					</Button>

					<Button
						disabled={files.length === 0}
						onClick={() => {
							if (confirm("Are you sure?")) setFiles([]);
						}}
					>
						Clear
					</Button>

					{files.length !== 0 && <Button onClick={openFilePicker}>Add more</Button>}
				</div>
			</section>
		</>
	);
};

export default CreateSection;
