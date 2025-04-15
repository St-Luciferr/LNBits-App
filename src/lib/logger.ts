// import fs from 'fs'
// import path from 'path'

// // Define the path where logs will be saved
// const logsDir = path.join(process.cwd(), 'logs')
// const logFile = path.join(logsDir, 'webhook.log')

// // Ensure log directory exists
// if (!fs.existsSync(logsDir)) {
//   fs.mkdirSync(logsDir)
// }

// function formatMessage(type: 'INFO' | 'ERROR', message: string) {
//   const timestamp = new Date().toISOString()
//   return `[${timestamp}] [${type}] ${message}\n`
// }

// export function logInfo(message: string) {
//   const formatted = formatMessage('INFO', message)
//   fs.appendFileSync(logFile, formatted)
// }

// export function logError(message: string) {
//   const formatted = formatMessage('ERROR', message)
//   fs.appendFileSync(logFile, formatted)
// }
export function logInfo(message: string) {
    const timestamp = new Date().toISOString()
    console.log(`[INFO] [${timestamp}] ${message}`)
  }
  
  export function logError(message: string) {
    const timestamp = new Date().toISOString()
    console.error(`[ERROR] [${timestamp}] ${message}`)
  }
  