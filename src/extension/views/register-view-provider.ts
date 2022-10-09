import { ExtensionContext, window } from "vscode";
import { InfinitePocViewProvider } from "./infinite-poc-panel-provider";

export function registerViewProvider(context: ExtensionContext) {
    const provider = new InfinitePocViewProvider(context.extensionUri, context);
    context.subscriptions.push(window.registerWebviewViewProvider('infinite-poc-panel', provider));
}
