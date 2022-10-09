import { commands, ExtensionContext, Uri, ViewColumn, Webview, WebviewPanel, window } from "vscode";
import { openBrowser } from "../features/register-callback-request";
import { getNonce } from "../util";

export function registerCenterPanel(context: ExtensionContext) {
    context.subscriptions.push(
        commands.registerCommand('ipoc.show.center.panel', () => {
            CenterPanel.getInstance(context.extensionUri, context);
        })
    );

    context.subscriptions.push(
        commands.registerCommand('ipoc.send.data', (data) => {
            window.showInformationMessage('ipoc.send.data: ' + data.data);
        })
    );
}

export class CenterPanel {
    public static centerPanel: CenterPanel | undefined;
    private static readonly viewType = "CenterPanel";
    private constructor(public readonly webviewPanel: WebviewPanel, private readonly _extensionUri: Uri, public extensionContext: ExtensionContext) {
        this.updateView();
    }

    public static getInstance(extensionUri: Uri, extensionContext: ExtensionContext) {
        const column = window.activeTextEditor
            ? window.activeTextEditor.viewColumn
            : undefined;

        if (CenterPanel.centerPanel) {
            CenterPanel.centerPanel.webviewPanel.reveal(column);
            CenterPanel.centerPanel.updateView();
            return;
        }

        const panel = window.createWebviewPanel(
            CenterPanel.viewType,
            "Extension HTML Feature",
            column || ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [
                    Uri.joinPath(extensionUri, "media")
                ],
            }
        );

        CenterPanel.centerPanel = new CenterPanel(panel, extensionUri, extensionContext);
    }

    private async updateView() {
        const webview = this.webviewPanel.webview;
        this.webviewPanel.webview.html = this._getHtmlForWebview(webview);

        this.webviewPanel.webview.onDidReceiveMessage((data) => {
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