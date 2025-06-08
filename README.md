### Generate build from WSL, Linux or MacOs to Windows
Install follow packages:
```bash
# WSL or Ubuntu
sudo apt-get install mingw-w64 nsis
```

```bash
# MacOS
brew install mingw-w64 nsis
```

Next, install the rust target to windows
```bash
rustup target add x86_64-pc-windows-gnu
```

And now compile to windows
```bash
bunx tauri build --target x86_64-pc-windows-gnu
```

File was builded in `src-tauri/target/x86_64-pc-windows-gnu/release/bundle/windows/AppName.exe`.