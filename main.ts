import { Plugin, Events, Setting, PluginSettingTab, SettingTab, Tasks, Editor, App, Workspace, MarkdownView, EditorPosition } from 'obsidian';
// Plugin Settings
// interface MoreCheckboxesSettings {
// 	taskStates: boolean;
// 	iconBullets: boolean;}
// const DEFAULT_SETTINGS: MoreCheckboxesSettings = {
// 	taskStates: true,
// 	iconBullets: true,}
export default class MoreCheckboxes extends Plugin {
	// settings: MoreCheckboxesSettings;
	taskStates: Array<string> = [' ', 'x', '/', '<', '>', '-'];
	async onload(): Promise <void> {
		// await this.loadData()
		// this.addSettingTab()
		this.registerDomEvent(document, 'click', (e: MouseEvent) => {
			const checkbox = Object(e.target);
			if (checkbox.className === 'task-list-item-checkbox') {
				const editor = Object(this.app.workspace.getActiveViewOfType(MarkdownView).editor);
				const checkboxPos = editor.posAtCoords(e.pageX, e.pageY);
				e.preventDefault();
				this.cycleTaskState(checkbox, checkboxPos, editor);
			} 
		});}
		
	
	changeDocumentTask = function (checkboxPos: EditorPosition, editor: Editor, state: string) {
		state = `[${state}]`;
		const endPos = {line: checkboxPos.line, ch: checkboxPos.ch + 3};
		editor.replaceRange(state, checkboxPos, endPos);
	}

	cycleTaskState = function (checkbox: HTMLElement, checkboxPos: EditorPosition, editor: Editor) {
		let state: string;
		state = this.taskStates[(this.taskStates.indexOf(checkbox.dataset.task) + 1) % this.taskStates.length];
		checkbox.dataset.task = state;
		Object(checkbox.closest(".HyperMD-list-line")).dataset.task = state;
		this.changeDocumentTask(checkboxPos, editor, state);
	}
	
	}


