import { commands, ExtensionContext, window } from 'vscode';
import { registerIntelligence } from './extension/features/codeCompletion/register-intelligence';
import { registerCacheCommand } from './extension/features/cache-operation';
import { registerCallbackRequest } from './extension/features/register-callback-request';
import { registerCommands } from './extension/features/register-commands';
import { registerDevToolCommand } from './extension/features/register-dev-tool';
import { registerWelcomeMessage } from './extension/features/register-welcome-message';
import { CustomEvent } from './extension/views/custom-event';
import { registerCenterPanel } from './extension/views/register-center-panel';
import { registerWebViewProvider } from "./extension/views/register-webview-provider";

export function activate(context: ExtensionContext) {
	const op = window.createOutputChannel('InfinitePOC');
	registerCommands(context, op);
	registerCacheCommand(context);
	registerWelcomeMessage(context);
	registerWebViewProvider(context, op);
	registerDevToolCommand(context);
	registerCallbackRequest(context);
	registerCenterPanel(context);
	registerIntelligence(context);
	commands.executeCommand('setContext', 'isPrintContextMenu', true);

	CustomEvent.customEvent.subscribe(data => window.showInformationMessage('Message from event: ' + data));
}

export function deactivate() { }
