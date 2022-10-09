import { ExtensionContext, window } from 'vscode';
import { registerCallbackRequest } from './extension/commonds/register-callback-request';
import { registerCommands } from './extension/commonds/register-commands';
import { registerWelcomeMessage  } from './extension/commonds/register-welcome-message';
import { registerDevToolCommand } from './extension/commonds/register-dev-tool';
import { registerViewProvider } from "./extension/views/register-view-provider";

export function activate(context: ExtensionContext) {
	registerCommands(context, window.createOutputChannel('InfinitePOC'));
	registerWelcomeMessage(context);
	registerViewProvider(context);
	registerDevToolCommand(context);
	registerCallbackRequest(context);
}

export function deactivate() { }
