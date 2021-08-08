function bigProcess () {
    for(let i = 0; i < 1000000; i++) {
        // process.stdout.write(`${i}`)
        console.log(i)
    }
}

bigProcess()