import { commands, ExtensionContext, OutputChannel, window } from "vscode";

export function registerCommands(context: ExtensionContext, op: OutputChannel) {
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

    context.subscriptions.push(commands.registerCommand('ipoc.print.explorer.menu', () => {
        readSelectedOrAllText(op);
    }));

    context.subscriptions.push(commands.registerCommand('ipoc.print.editor.menu', () => {
        readSelectedOrAllText(op);
    }));
}

function readSelectedOrAllText(op: OutputChannel) {
    op.clear();
    const { activeTextEditor } = window;
    if (!activeTextEditor || activeTextEditor.document.languageId !== 'javascript') {
        op.appendLine('no active found');
    } else {

        let txt = activeTextEditor.document.getText(activeTextEditor.selection);
        if (!txt) txt = activeTextEditor.document.getText();
        op.appendLine(txt);
    }
    op.show();
}