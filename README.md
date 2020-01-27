# Bytecode React CLI

A command-line tool to generate React components in Typescript following the conventions at Bytecode.

## Installation

Use `go build` to generate a binary, rename the binary to `bcr` (Bytecode React). Add this binary to your `$PATH`.

## Usage

You can use the CLI the following ways:

### Without Redux

```bash
$ bcr -dir {{destination_directory}} -name {{component_name}}
```

### With Redux

```bash
$ bcr -dir {{destination_directory}} -name {{component_name}} -redux
```

### Example

```bash
$ bcr -dir src/components -redux -name TestComponent
```

## Options

| Flag | Effect |
| ---- | ------ |
| `-dir` | Set the source directory. Do not start or end with `/`
| `-name` | Component name, do not include filename extension
| `-redux` | Include connection to Redux
| `-native` | Use React Native specific templates
