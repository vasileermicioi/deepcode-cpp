import { cpp } from "@codemirror/lang-cpp";
import { Prec } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { keymap } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";

type CodeEditorProps = {
	value: string;
	onChange: (value: string) => void;
	onRun: () => void;
};

export function CodeEditor({ value, onChange, onRun }: CodeEditorProps) {
	return (
		<CodeMirror
			value={value}
			height="100%"
			theme={oneDark}
			extensions={[
				cpp(),
				Prec.highest(
					keymap.of([
						{
							key: "Mod-Enter",
							run: () => {
								onRun();
								return true;
							},
						},
					]),
				),
			]}
			onChange={onChange}
			basicSetup={{
				lineNumbers: true,
				foldGutter: true,
				highlightActiveLine: true,
				autocompletion: true,
				bracketMatching: true,
				closeBrackets: true,
				indentOnInput: true,
			}}
			className="h-full overflow-hidden"
		/>
	);
}
