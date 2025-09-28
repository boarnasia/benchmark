#!/usr/bin/env python
import click
import resource  # Unix 系OSで利用可能

@click.command()
def hello():
    click.echo("Hello, world!")

if __name__ == "__main__":
    hello()
