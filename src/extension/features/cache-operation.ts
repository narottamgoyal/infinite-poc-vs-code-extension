import { commands, ExtensionContext, window } from "vscode";

export function registerCacheCommand(context: ExtensionContext) {
    registerShowCache(context);
    registerClearCache(context);
    registeripocShowSecretStorage(context);
}

function registeripocShowSecretStorage(context: ExtensionContext) {
    context.subscriptions.push(
        commands.registerCommand('ipoc.show.secret.storage', async () => {
            const value = await context.secrets.get('ipocCacheKey');
            window.showInformationMessage('Value from SecretStorage: ' + value ?? '', '');
        })
    );
}

function registerShowCache(context: ExtensionContext) {
    context.subscriptions.push(
        commands.registerCommand('ipoc.show.cache', async () => {
            const key = await window.showQuickPick(context.globalState.keys());
            window.showInformationMessage('Value from cache: ' + context.globalState.get<string>(key ?? '', ''));
        })
    );
}

function registerClearCache(context: ExtensionContext) {
    context.subscriptions.push(
        commands.registerCommand('ipoc.clear.cache', async () => {
            const key = await window.showQuickPick(context.globalState.keys());
            context.globalState.update(key ?? '', undefined);
        })
    );
}
