import { commands, ExtensionContext, Uri, window } from "vscode";

/**
 * Register callback URL via registerUriHandler.
 * Another way to start server on some port and wait for the callback request
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
    commands.executeCommand("vscode.open", Uri.parse(`https://www.google.com`));
}