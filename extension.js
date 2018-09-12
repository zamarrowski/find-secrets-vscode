// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const urlParams = new RegExp('(https|http|ftp):\/\/(.+):(.+)@(.+)')
const aws = new RegExp('AKIA[0-9A-Z]{16}')
const rkcsb = new RegExp('-----BEGIN PRIVATE KEY-----')
const rsa = new RegExp('-----BEGIN RSA PRIVATE KEY-----')
const ssh = new RegExp('-----BEGIN OPENSSH PRIVATE KEY-----')
const password = new RegExp('password=(.+)')
const regexps = [urlParams, aws, rkcsb, rsa, ssh, password]

const findSecrets = () => {
    let editor = vscode.window.activeTextEditor
    let text = editor.document.getText()
    const lines = text.split('\n')
    let index = 1
    vscode
    for (let line of lines) {
        for (let regexp of regexps) {
            const test = regexp.exec(line)
            if (test) {
                vscode.window.showErrorMessage(`Secret found in line ${index}`)
            }
        }
        index++
    }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "secrets-code" is now active!');
    vscode.workspace.onDidSaveTextDocument(() => {
        findSecrets()
    })  

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.findSecrets', function () {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        findSecrets()
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
