# sysmon

a simple nodejs based system monitor for unix like OS. It uses the `os` module to get the system information and the `child_process` module to execute the `ps` command to get the process information.

## Usage

```bash
node index.js
```

This will print the system information and the process information to the console.

```bash
node index.js kill <pid>
```

This will kill the process with the given pid.

This project was created as a learning exercise to get familiar with the `os` and `child_process` modules in nodejs. It is not intended to be used in production. No AI was used anywhere.

Created by [@krushndayshmookh](https://github.com/krushndayshmookh) with <3.
