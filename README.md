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

## References

These are the links I visited while creating this project. They are not necessarily the best resources, but they are the ones I found useful. Below list is not in order.

ps manual: `man ps`

Node.js documentation:
os module: https://nodejs.org/api/os.html
child_process module: https://nodejs.org/api/child_process.html
process module: https://nodejs.org/api/process.html
readline module: https://nodejs.org/api/readline.html
console module: https://nodejs.org/api/console.html
events module: https://nodejs.org/api/events.html#emitteraddlistenereventname-listener

GeeksforGeeks articles:
https://www.geeksforgeeks.org/node-js/node-js-process-stdin-property/
https://www.geeksforgeeks.org/node-js/node-js-process-cpuusage-method/
https://www.geeksforgeeks.org/node-js/node-js-console-clear-method/

StackOverflow:
https://stackoverflow.com/questions/77938952/how-to-allow-full-use-of-all-available-swap-space-by-a-process-running-inside-a
https://apple.stackexchange.com/questions/4286/is-there-a-mac-os-x-terminal-version-of-the-free-command-in-linux-systems
https://stackoverflow.com/questions/13206724/how-to-get-the-list-of-process
https://stackoverflow.com/questions/20165605/detecting-ctrlc-in-node-js
https://stackoverflow.com/questions/36816181/get-view-memory-cpu-usage-via-nodejs

node-death: https://github.com/jprichardson/node-death/blob/master/lib/death.js
https://www.npmjs.com/package/death

Meminfo from psutil: https://github.com/giampaolo/psutil/blob/master/psutil/arch/osx/mem.c
https://raw.githubusercontent.com/giampaolo/psutil/master/scripts/meminfo.py

How to Accurately Calculate CPU Utilization in Linux Using /proc/stat: https://linuxvox.com/blog/accurately-calculating-cpu-utilization-in-linux-using-proc-stat/

https://convertlive.com/u/convert/gibibytes/to/bytes#1 (I guess i dont know math :P) 

Analyzing CPU Usage in Node.js: https://moldstud.com/articles/p-analyzing-cpu-usage-in-nodejs-essential-tips-for-high-performance-applications

Monitoring CPU Usage Using Node.js: 4 Easy Ways: https://codeforgeek.com/monitoring-cpu-usage-using-nodejs/
