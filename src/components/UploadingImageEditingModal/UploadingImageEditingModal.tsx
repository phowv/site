import { useEffect, useState } from "react";
import FormModal from "../FormModal/FormModal";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { rotateFile90 } from "../../lib/utils/imageUtils";
import TagSelector from "../UI/TagSelector/TagSelector";
import { AccessModifier } from "../../lib/api/types/accessModifier";
import type { UploadingFile } from "../../lib/api/photoApi";
import cl from "./UploadingImageEditingModal.module.css";
import useBlobUrl from "../../lib/hooks/useBlobUrl";

interface UploadingImageEditingModalProps {
	visible: boolean;
	inputFile: UploadingFile;
	updateFile: (updater: (file: UploadingFile) => UploadingFile) => void;
	close: (remove?: boolean) => void;
	next?: () => void;
	prev?: () => void;
}

const UploadingImageEditingModal = ({
	visible,
	inputFile,
	updateFile,
	close,
	next,
	prev,
}: UploadingImageEditingModalProps) => {
	const editingFileSrc = useBlobUrl(inputFile.file);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				e.stopPropagation();
				close();
			} else if (e.key === "ArrowLeft") {
				prev?.();
			} else if (e.key === "ArrowRight") {
				next?.();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	const rotateEditingImage = async (isRight: boolean) => {
		if (!inputFile) return;
		const rotated = await rotateFile90(inputFile.file, isRight);
		updateFile((prev) => ({ ...prev, file: rotated }));
	};

	const doneEditing = (isRemove: boolean = false) => {
		if (isRemove) {
			const ok = confirm("Are you sure?");
			if (!ok) return;

			close(true);
			return;
		}

		close();
	};

	return (
		<FormModal visible={visible} close={doneEditing} next={next} prev={prev}>
			<div className={cl.container}>
				{editingFileSrc ? <img src={editingFileSrc} className={cl.image} /> : <p>Editing image</p>}

				<div>
					<p>File name: {inputFile.file.name}</p>
					<p>File size: {Math.round(inputFile.file.size / 1024)} KB</p>

					<div className={cl.options}>
						<label>
							Type image title:
							<Input
								placeholder="Image title (optional)..."
								value={inputFile.metadata.title ?? ""}
								onChange={(e) =>
									updateFile((prev) => ({
										...prev,
										metadata: { ...prev.metadata, title: e.target.value },
									}))
								}
							/>
						</label>

						<label>
							Type image description:
							<Input
								placeholder="Image description (optional)..."
								value={inputFile.metadata.description ?? ""}
								onChange={(e) =>
									updateFile((prev) => ({
										...prev,
										metadata: { ...prev.metadata, description: e.target.value },
									}))
								}
							/>
						</label>

						<label className={cl.options_text}>
							Access level:
							<select
								className={cl.options_text}
								value={inputFile.metadata.access_level}
								onChange={(e) =>
									updateFile((prev) => ({
										...prev,
										metadata: { ...prev.metadata, access_level: e.target.value as AccessModifier },
									}))
								}
							>
								<option value="private">private</option>
								<option value="protected">protected</option>
								<option value="public">public</option>
							</select>
						</label>
					</div>

					<TagSelector
						label="Tags"
						tags={inputFile.metadata.tag_uuids ?? []}
						setTags={(tagsModify) =>
							updateFile((prev) => ({
								...prev,
								metadata: {
									...prev.metadata,
									tag_uuids: tagsModify(prev.metadata.tag_uuids ?? []),
								},
							}))
						}
					/>

					<br />
					<Button onClick={() => rotateEditingImage(false)}>Rotate left</Button>
					<Button onClick={() => rotateEditingImage(true)}>Rotate right</Button>
					<br />
					<Button onClick={() => doneEditing(true)}>Remove</Button>
					<Button onClick={() => doneEditing()}>Done</Button>
				</div>
			</div>
		</FormModal>
	);
};

export default UploadingImageEditingModal;
