import { commands, ExtensionContext, window } from "vscode";

export function registerCommands(context: ExtensionContext) {
    context.subscriptions.push(commands.registerCommand('infinite-poc.info-message', () => {
        window.showInformationMessage('Hello from Infinite POC 👋!');
    }));

    context.subscriptions.push(commands.registerCommand('infinite-poc.error-message', () => {
        window.showErrorMessage('Error message example 🌵!');
    }));

    context.subscriptions.push(commands.registerCommand('infinite-poc.dialog-modal-message', () => {
        window.showInformationMessage('This is Dialog modal message example', {
            modal: true,
            detail: '👌'
        });
    }));
}