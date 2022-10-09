import { commands, ExtensionContext, Uri, window, workspace } from "vscode";

/**
 * Register callback URL via registerUriHandler.
 * Another way to start server on some port and wait for the callback request on that URL
 * and then stop the server.
 */
export function registerCallbackRequest(context: ExtensionContext) {
    // Redirect URL : vscode://ng.infinite-poc?token=some-jwt-token
    // Redirect URL format : vscode://<publisher>.<extension-name>?<key>=<value>
    const handleUri = (uri: any) => {
        console.log(uri);
        const queryParams = new URLSearchParams(uri.query);
        console.log(queryParams);
        if (queryParams.has('token')) {
            window.showInformationMessage(`Token: ${queryParams.get('token') as string}`);
        }
    };

    context.subscriptions.push(
        window.registerUriHandler({
            handleUri
        })
    );
}

export function openBrowser() {
    const site = workspace.getConfiguration().get<string[]>('ipoc.open.browser.sites')
    commands.executeCommand("vscode.open", Uri.parse(site ? site[0] : `https://www.google.com`));
}