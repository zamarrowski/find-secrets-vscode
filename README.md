# secrets-code README

Find secrets (AWS keys, Passwords, RSA...) in vscode

## Features

Find secrets when save a file. Secrets examples thant find-secrets can find:

* http://username:password@url.com
* password="password"
* PRIVATE KEY
* RSA PRIVATE KEY
* OPENSSH PRIVATE KEY
* AWS KEY

## How to use

Save any file if the file contains secrets the extensions show a error message with the line of the secret. Also, you can execute pressing ctrl + shift + p and search Find Secrets command.
