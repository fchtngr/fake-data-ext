var contextMenuElement = null

document.addEventListener(
  'contextmenu',
  function (event) {
    contextMenuElement = event.target
  },
  true,
)

document.addEventListener('click', (event) => {
  if (event.target.tagName === 'INPUT') {
    const clickedElementId = event.target.id
    chrome.runtime.sendMessage({ type: 'updateClickedElement', value: clickedElementId })
  }
})

function replaceOrAppend(inputElement, newValue) {
  const start = inputElement.selectionStart
  const end = inputElement.selectionEnd

  if (start !== end) {
    const before = inputElement.value.substring(0, start)
    const after = inputElement.value.substring(end)
    inputElement.value = before + newValue + after
  } else {
    inputElement.value += newValue
  }

  inputElement.selectionStart = inputElement.selectionEnd = start + newValue.length
}

function dispatchInputEvent(inputElement) {
  inputElement.dispatchEvent(new Event('input', { bubbles: true }))
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'fillLastInput') {
    const elem = document.getElementById(request.elementId)
    replaceOrAppend(elem, request.value)
    dispatchInputEvent(elem)
  } else if (request.type === 'fillFromContextMenu') {
    replaceOrAppend(contextMenuElement, request.value)
    dispatchInputEvent(contextMenuElement)
  }
})
