import { ExtensionContext, window } from 'vscode';
import { registerCacheCommand } from './extension/features/cache-operation';
import { registerCallbackRequest } from './extension/features/register-callback-request';
import { registerCommands } from './extension/features/register-commands';
import { registerDevToolCommand } from './extension/features/register-dev-tool';
import { registerWelcomeMessage } from './extension/features/register-welcome-message';
import { registerCenterPanel } from './extension/views/register-center-panel';
import { registerWebViewProvider } from "./extension/views/register-webview-provider";

export function activate(context: ExtensionContext) {
	registerCommands(context, window.createOutputChannel('InfinitePOC'));
	registerCacheCommand(context);
	registerWelcomeMessage(context);
	registerWebViewProvider(context);
	registerDevToolCommand(context);
	registerCallbackRequest(context);
	registerCenterPanel(context);
}

export function deactivate() { }
