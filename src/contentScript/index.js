console.info('contentScript is running')

var clickedEl = null

document.addEventListener(
  'contextmenu',
  function (event) {
    clickedEl = event.target
  },
  true,
)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(clickedEl, request)

  clickedEl.value = request.value
  let event = new Event('input', { bubbles: true })
  elem.dispatchEvent(event)
})
