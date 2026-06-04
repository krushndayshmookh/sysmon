import { cp } from 'node:fs'
import os from 'node:os'
import { spawnSync } from 'child_process'

const CHECK_INTERVAL = 1000
const GB = 1024 * 1024 * 1024
const SEG_LEN = 30
const PROCESSES_TO_SHOW = 30

const cpus = os.cpus()
const totalMem = os.totalmem()
const totalMemGiB = totalMem / GB

let interval = null

function startListening() {
  process.stdin.on('data', (data) => {
    const inputStr = data.toString().trim().toLowerCase()

    clearInterval(interval)

    switch (inputStr) {
      case 'q':
        console.log('Exiting...')
        process.exit()
        break

      default:
        console.log('Unknown command. Try Again.')
        setTimeout(startInterval, 1000)
        break
    }
  })
}

function printCPU() {
  console.log('CPU Usage')

  const currentCPUTimes = os.cpus()

  cpus.map((cpu, idx) => {
    let lastTime = cpu.times
    let currTime = currentCPUTimes[idx].times

    let d_user = currTime.user - lastTime.user
    let d_nice = currTime.nice - lastTime.nice
    let d_sys = currTime.sys - lastTime.sys
    let d_irq = currTime.irq - lastTime.irq
    let d_idle = currTime.idle - lastTime.idle

    let busyJiffies = d_user // + d_nice + d_sys + d_irq // htop only shows user in cpu usage.
    let totalJiffies = busyJiffies + d_idle

    const newCPU = {
      ...cpu,
      usage: (busyJiffies / totalJiffies) * 100,
      times: currentCPUTimes,
    }

    console.log(`${idx} : ${newCPU.usage.toFixed(3)} %`)
    return newCPU
  })
}

function printMemory() {
  console.log('Memory Usage')

  const freeMem = os.freemem()
  const usedMem = totalMem - freeMem

  const usedMemGiB = usedMem / GB
  const freeMemGiB = freeMem / GB

  const frac = usedMem / totalMem
  const segUsed = Math.floor(frac * SEG_LEN)
  const segFree = SEG_LEN - segUsed
  let bar = ''

  for (let i = 0; i < SEG_LEN; i++) {
    if (i < segUsed) bar += '='
    else bar += '-'
  }
  // console.log({frac, usedMemGiB, freeMemGiB, totalMemGiB, segUsed, segFree })

  console.log(`${bar} ${usedMemGiB.toFixed(3)}/${totalMemGiB} GiB`)
  // we should use the macos vm_stat command to get memory information as it does not have /proc/meminfo
}

function printProcesses() {
  console.log(`Top ${PROCESSES_TO_SHOW} Processes`)
  console.log(
    `${'PID'.padStart(7, ' ')} ${'%CPU'.padStart(4, ' ')} ${'%MEM'.padStart(4, ' ')} APP`,
  )

  try {
    const ps = spawnSync('ps', ['axr', '-o', 'pid,pcpu,pmem,comm'])

    let lines = ps.stdout.toString().split('\n').slice(1, PROCESSES_TO_SHOW + 1)

    lines.forEach((l) => {
      let [info, comm] = l.split(' /')

      let [pid, pcpu, pmem] = info.split(' ').filter((w) => !!w)

      let app = comm.includes('/') ? comm.split('/').pop() : comm

      console.log(
        `${pid.padStart(7, ' ')} ${pcpu.padStart(4, ' ')} ${pmem.padStart(4, ' ')} ${app}`,
      )
    })
  } catch (err) {
    console.error(err)
  }
}

function printStats() {
  console.clear()
  printCPU()
  console.log('-----')
  printMemory()
  console.log('-----')
  printProcesses()
  process.stdout.write('Enter Command: ')
}

function startInterval() {
  interval = setInterval(printStats, CHECK_INTERVAL)
}

function main() {
  const argv = process.argv
  const isKill = argv.includes('kill')
  if (isKill) {
    const killIdx = argv.indexOf('kill')
    const pidToKill = argv[killIdx + 1]

    try {
      spawnSync('kill', ['-9', `${pidToKill}`])
      console.log(`${pidToKill} killed mercilessly.`)
    } catch (e) {
      console.error(e)
    }

    process.exit(0)
  }

  // default mode
  startListening()
  startInterval()
}

main()