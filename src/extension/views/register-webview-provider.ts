import { CancellationToken, commands, ExtensionContext, OutputChannel, ProgressLocation, Uri, Webview, WebviewView, WebviewViewProvider, WebviewViewResolveContext, window, workspace } from "vscode";
import { openBrowser } from "../features/register-callback-request";
import { readSelectedOrAllText } from "../features/register-commands";
import { getNonce } from "../util";
import { CustomEvent } from "./custom-event";
import { CenterPanel } from "./register-center-panel";

export function registerWebViewProvider(context: ExtensionContext, op: OutputChannel) {
    const provider = new SidebarWebViewProvider(context.extensionUri, context);
    context.subscriptions.push(window.registerWebviewViewProvider('infinite-poc-sidebar-panel', provider));

    context.subscriptions.push(commands.registerCommand('ipoc.print.editor.menu', () => {
        const txt = readSelectedOrAllText(op);
        provider.view?.webview.postMessage({ type: 'transferDataFromTsToUi', data: txt });
    }));
}

export class SidebarWebViewProvider implements WebviewViewProvider {
    constructor(private readonly _extensionUri: Uri, public extensionContext: ExtensionContext) { }
    view?: WebviewView;

    resolveWebviewView(webviewView: WebviewView,
        webViewContext: WebviewViewResolveContext,
        token: CancellationToken) {
        this.view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,

            localResourceRoots: [this._extensionUri],
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case "btn-first": {
                    openBrowser();
                    break;
                }
                case 'btn-second': {
                    this.extensionContext.globalState.update('ipocCacheKey', data.value);
                    window.showInformationMessage('Value saved in cache: ' + data.value);
                    break;
                }
                case 'btn-third': {
                    this.extensionContext.secrets.store('ipocCacheKey', data.value);
                    window.showInformationMessage('Value saved in SecretStorage: ' + data.value);
                    break;
                }
                case "btn-fourth": {
                    CenterPanel.getInstance(this.extensionContext.extensionUri, this.extensionContext);
                    break;
                }
                case "btn-fifth": {
                    commands.executeCommand('ipoc.send.data', { type: 'ipoc.send.data.key', data: data.value });
                    break;
                }

                case "btn-sixth": {
                    await workspace.openTextDocument({ language: 'javascript', content: '// start writting your script from here...' })
                        .then(e => window.showTextDocument(e));
                    break;
                }
                case "btn-seventh": {
                    await window.showTextDocument(Uri.file(data.value));
                    break;
                }
                case "btn-eightth": {
                    await commands.executeCommand('vscode.openFolder', Uri.file(data.value));
                    break;
                }
                case "btn-nineth": {
                    const files = data.value.split(',');
                    await commands.executeCommand('vscode.diff', Uri.file(files[0]), Uri.file(files[1]), 'Left <-> Right');
                    break;
                }
                case "btn-tenth": {
                    let isCancelled = false;
                    window.withProgress({
                        title: 'Progress example',
                        location: ProgressLocation.Notification,
                        cancellable: true
                    }, async (progress, cancellationToken) => {
                        cancellationToken.onCancellationRequested(() => {
                            isCancelled = true;
                        });
                        const p = new Promise<void>(resolve => {
                            progress.report({ increment: 0, message: 'started' });

                            if (!isCancelled)
                                setTimeout(() => {
                                    progress.report({ increment: 50, message: 'completed 50%' });
                                }, 1000);

                            if (!isCancelled)
                                setTimeout(() => {
                                    progress.report({ increment: 75, message: 'completed 75%' });
                                }, 3000);

                            if (!isCancelled)
                                setTimeout(() => {
                                    progress.report({ increment: 100, message: 'completed 100%' });
                                    resolve();
                                }, 4000);
                        });
                        return p;
                    });
                    break;
                }
                case "btn-eleventh": {
                    CustomEvent.customEvent.publish(data.value);
                    break;
                }
            }
        });
    }

    private _getHtmlForWebview(webview: Webview) {
        const styleResetUri = webview.asWebviewUri(Uri.joinPath(this._extensionUri, "media", "css", "reset.css"));
        const scriptUri = webview.asWebviewUri(Uri.joinPath(this._extensionUri, "media", "js", "infinite-poc-panel.js"));
        const styleVSCodeUri = webview.asWebviewUri(Uri.joinPath(this._extensionUri, "media", "css", "vscode.css"));

        const nonce = getNonce();

        return `<!DOCTYPE html>
        <html lang="en">
            <head>
              <meta charset="UTF-8">
              <!--
                 Use a content security policy to only allow loading images from https or from our extension directory,
                 and only allow scripts that have a specific nonce.
                 -->
              <meta http-equiv="Content-Security-Policy"
               content="
                 img-src ${webview.cspSource}
                 style-src ${webview.cspSource}
                 script-src 'nonce-${nonce}';">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link href="${styleResetUri}" rel="stylesheet">
              <link href="${styleVSCodeUri}" rel="stylesheet">
              <script nonce="${nonce}"></script>
           </head>
           <body>
              <div>Action buttons:</div>
              <button type="button" class="btn-first">Open Browser</button><br>
              <input type="text" class="txt-box" id="ipocvalueid" name="ipocvaluename"><br>
              <button type="button" class="btn-second">save in cache</button><br>
              <button type="button" class="btn-third">save in secret storage</button><br>
              <button type="button" class="btn-fourth">Open Center Panel</button><br>
              <button type="button" class="btn-fifth">Send data via command</button><br>
              <button type="button" class="btn-eightth">Open folder</button><br>
              <button type="button" class="btn-sixth">Create temp document</button><br>
              <button type="button" class="btn-seventh">Open physical document</button><br>
              <button type="button" class="btn-nineth">show diff</button><br>
              <button type="button" class="btn-tenth">show progress bar</button><br>
              <button type="button" class="btn-eleventh">publish data via event</button><br>
              <script nonce="${nonce}" src="${scriptUri}"></script>
           </body>
        </html>`;
    }
}