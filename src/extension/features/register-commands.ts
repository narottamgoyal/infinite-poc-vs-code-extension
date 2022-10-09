import { commands, ExtensionContext, OutputChannel, window } from "vscode";

export function registerCommands(context: ExtensionContext, op: OutputChannel) {
    context.subscriptions.push(commands.registerCommand('infinite-poc.dialog-modal-message', () => {
        window.showInformationMessage('This is Dialog modal message example', {
            modal: true,
            detail: 'How many cats, do you see 🐈🐈🐈 in the message?'
        }, '1', '2', '3', '4').then(result => processUserSelection(result));
    }));

    context.subscriptions.push(commands.registerCommand('infinite-poc.ask-user', () => {
        window.showInformationMessage('How many cats, do you see 🐈🐈🐈 in the message?', '1', '2', '3', '4')
            .then(result => processUserSelection(result));
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

function processUserSelection(result: string | undefined): any {
    if (!result) window.showInputBox({ title: 'please enter your answer here...👇' })
        .then(result => processUserSelection(result));
    else if (result === '3') window.showInformationMessage('Perfect 😸😸😸!');
    else window.showErrorMessage('Wrong 😿😿😿!');
}
