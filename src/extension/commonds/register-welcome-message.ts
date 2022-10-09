import { ExtensionContext, window, workspace } from "vscode";

export function registerWelcomeMessage(context: ExtensionContext) {
    const enableMessage = workspace.getConfiguration().get<boolean>('ipoc.welcom.message.enabled');
    if (enableMessage) {
        let message = workspace.getConfiguration().get<string>('ipoc.welcom.message.string');
        let emoji = workspace.getConfiguration().get<string>('ipoc.welcom.message.emoji');
        message = message ?? "Welcome";
        emoji = emoji ?? "🎉";

        window.showInformationMessage(`${message} ${emoji}`);
    }
}