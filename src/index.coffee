process.on 'uncaughtException', (err) ->
  console.error err.trace
  process.exit -1
