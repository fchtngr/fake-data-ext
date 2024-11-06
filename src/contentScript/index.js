var clickedElement = null

document.addEventListener(
  'contextmenu',
  function (event) {
    clickedElement = event.target
  },
  true,
)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  clickedElement.value = request.value
  let event = new Event('input', { bubbles: true })
  clickedElement.dispatchEvent(event)
})
