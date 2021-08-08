const http = require('http')
const  path = require('path')
const {spawn} = require('child_process')

let runningProcs = []
const maxParallelProcs = 2

async function runBigProcessInQueue () {
    if(runningProcs.length >= maxParallelProcs) {
        console.log('Queue is full, waiting some process finish')
        await runningProcs[0]
        return runBigProcessInQueue()
    }
    console.log('Running PROC.....')
    const promise = runBigProcess()

    runningProcs.push(promise)

    function removePromise () {
        console.log('removing process')
        runningProcs = runningProcs.filter((p) => p !== promise )
    }
    let result
    try {
        result = await promise
        removePromise()
    }catch(err) {
        removePromise()
        throw err
    }
    
    return result
}


function runBigProcess () {
    return new Promise((resolve, reject) => {
        const proc = spawn('node', [
            path.resolve(__dirname, 'sub-process.js')
        ])
    
        const stderr = []
        proc.stdout.on('data', (chunck) => {
            // console.log(chunck.toString())
        })
        proc.stderr.on('data', (chunck) => stderr.push(chunck))
        proc.on('error',reject)
        proc.on('close', () => {
            if(stderr.length) {
                return reject(stderr.join(''))
            }
            resolve()
        })
    })
}

//fila de processos.



http.createServer(async (req,res) => {
    if(req.url === '/nuke') {
        const started = new Date()
        await runBigProcessInQueue()
        console.log(`This process took: ${new Date() - started}ms`)
        res.end("nuked")
    }

    res.end('ok')
}).listen(3000)