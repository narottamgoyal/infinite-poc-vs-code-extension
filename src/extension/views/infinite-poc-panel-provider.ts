import { CancellationToken, ExtensionContext, Uri, Webview, WebviewView, WebviewViewProvider, WebviewViewResolveContext, window } from "vscode";
import { openBrowser } from "../features/register-callback-request";
import { getNonce } from "../util";

export class InfinitePocViewProvider implements WebviewViewProvider {
    constructor(private readonly _extensionUri: Uri, public extensionContext: ExtensionContext) { }
    _view?: WebviewView;

    resolveWebviewView(webviewView: WebviewView,
        webViewContext: WebviewViewResolveContext,
        token: CancellationToken) {
        this._view = webviewView;

        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,

            localResourceRoots: [this._extensionUri],
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage((data) => {
            switch (data.type) {
                case "btn-first": {
                    openBrowser();
                    window.showInformationMessage(data.value);
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
              <script nonce="${nonce}" src="${scriptUri}"></script>
           </body>
        </html>`;
    }
}