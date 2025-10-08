EXPLORER = /mnt/c/Windows/explorer.exe
WSLPATH = /usr/bin/wslpath
DOC_PATH = target/doc/main/index.html
DOC_URI = file:$$($(WSLPATH) -a -m $(DOC_PATH))

clean:
	cargo clean

target/debug/main:
	cargo build

target/doc/main/index.html:
	cargo doc --no-deps

build: \
	target/debug/main \
	target/doc/main/index.html

doc-open: target/doc/main/index.html
	@echo Open: $(DOC_URI)
	@$(EXPLORER) $(DOC_URI) || true