import { ExtensionContext, window } from 'vscode';
import { registerCallbackRequest } from './extension/features/register-callback-request';
import { registerCommands } from './extension/features/register-commands';
import { registerWelcomeMessage  } from './extension/features/register-welcome-message';
import { registerDevToolCommand } from './extension/features/register-dev-tool';
import { registerViewProvider } from "./extension/views/register-view-provider";
import { registerCacheCommand } from './extension/features/cache-operation';

export function activate(context: ExtensionContext) {
	registerCommands(context, window.createOutputChannel('InfinitePOC'));
	registerCacheCommand(context);
	registerWelcomeMessage(context);
	registerViewProvider(context);
	registerDevToolCommand(context);
	registerCallbackRequest(context);
}

export function deactivate() { }
