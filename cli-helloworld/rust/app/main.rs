use clap::Parser;

/// Prints Hello, world!
#[derive(Parser, Debug)]
#[command(name = "hello", version, about = "Prints Hello, world!")]
struct Cli {}

fn main() {
    // 引数は無いが、ヘルプ/バージョン対応のために一度パース
    let _ = Cli::parse();
    println!("Hello, world!");
}
