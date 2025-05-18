import Block from './block'

export default function renderApp(block: Block) {
  const root = document.querySelector('#app')

  root!.innerHTML = ''

  const content = block.getContent()
  if (content) {
    root!.appendChild(content)
  }
  block.dispatchComponentDidMount()
}
