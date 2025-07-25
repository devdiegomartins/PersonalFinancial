import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

export const HomePage = () => {
	const [fileName, setFileName] = useState("");
	const [dados, setDados] = useState("");

	async function saveFile() {
		try {
			const result = await invoke("save_file", {
				fileName,
				content: dados,
			});
			console.log("Arquivo salvo:", result);
			alert(result);
		} catch (error) {
			console.error("Erro ao salvar arquivo:", error);
		}
	}

	return (
		<div>
			HomePage
			<hr />
			<div style={{ display: "flex", gap: "10px" }}>
				<input
					type="text"
					id="fileName"
					placeholder="File Name"
					value={fileName}
					onChange={(e) => setFileName(e.target.value)}
				/>
				<input
					type="text"
					id="dados"
					placeholder="Dados"
					value={dados}
					onChange={(e) => setDados(e.target.value)}
				/>
				<button type="button" onClick={saveFile}>
					Save File
				</button>
			</div>
		</div>
	);
};
