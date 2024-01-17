async function run() {
  const res = await fetch('http://localhost:8000/api/')
  console.log({ res })
}

await run()
