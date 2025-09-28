#!/usr/bin/env php
<?php
require __DIR__ . '/vendor/autoload.php';

use Symfony\Component\Console\Application;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class HelloCommand extends Command
{
    protected function configure(): void
    {
        $this
            ->setName('app:hello')
            ->setDescription('Outputs Hello, world!');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $output->writeln("Hello, world!");
        return Command::SUCCESS;
    }
}

$application = new Application();
$application->add(new HelloCommand());
$application->run();
