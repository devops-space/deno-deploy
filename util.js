export async function readText(path) {
  const data = await Deno.readFile(path)
  const decoder = new TextDecoder('utf-8')
  return decoder.decode(data)
}
