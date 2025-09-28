import { Command } from "commander";

const program = new Command();

program
  .name("hello-cli")
  .description("Print Hello, word! with peak memory usage in bytes")
  .version("1.0.0")
  .action(() => {
    console.log('Hello, word!');
  });

program.parse(process.argv);

