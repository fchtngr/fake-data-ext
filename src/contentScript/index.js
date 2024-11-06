var clickedElement = null

document.addEventListener(
  'contextmenu',
  function (event) {
    clickedElement = event.target
  },
  true,
)

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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  replaceOrAppend(clickedElement, request.value)
  dispatchInputEvent(clickedElement)
})
