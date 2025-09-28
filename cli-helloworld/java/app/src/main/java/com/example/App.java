package com.example;

import picocli.CommandLine;
import picocli.CommandLine.Command;
import picocli.CommandLine.Option;
import java.util.concurrent.Callable;

@Command(
    name = "java-cli",
    mixinStandardHelpOptions = true,
    version = "java-cli 0.1.0",
    description = "Picocli minimal example. Prints a greeting."
)
public class App implements Callable<Integer> {

    public static void main(String[] args) {
        int exit = new CommandLine(new App()).execute(args);
        System.exit(exit);
    }

    @Override
    public Integer call() throws Exception {
        System.out.println("Hello, world!");
        return 0;
    }
}
