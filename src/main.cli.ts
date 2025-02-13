#!/usr/bin/env npx tsx

import {HelpCommand, VersionCommand, ImportCommand, CLIApplication } from './cli';

function bootstrap(){
  const cliApplication = new CLIApplication();
  cliApplication.registerCommand([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand()
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
