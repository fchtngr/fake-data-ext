import { faker } from '@faker-js/faker'

console.log('background is running')

const menues = [
  {
    title: 'Company',
    children: [
      {
        title: 'Name',
        generator: faker.company.name,
      },
    ],
  },
]

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'root',
    title: 'Fill with Random Data',
    contexts: ['editable'],
  })

  /* company -------------------- */
  chrome.contextMenus.create({
    id: 'company',
    parentId: 'root',
    title: 'Company',
    contexts: ['editable'],
  })

  /* person ---------------------*/
  chrome.contextMenus.create({
    id: 'person',
    parentId: 'root',
    title: 'Person',
    contexts: ['editable'],
  })

  chrome.contextMenus.create({
    id: 'person_name',
    parentId: 'person',
    title: 'Name',
    contexts: ['editable'],
  })

  /* finance ------------------ */

  chrome.contextMenus.create({
    id: 'finance',
    parentId: 'root',
    title: 'Finance',
    contexts: ['editable'],
  })

  chrome.contextMenus.create({
    id: 'finance_iban',
    parentId: 'finance',
    title: 'IBAN',
    contexts: ['editable'],
  })

  chrome.contextMenus.create({
    id: 'company_name',
    parentId: 'company',
    title: 'Random Name',
    contexts: ['editable'],
  })

  chrome.contextMenus.create({
    id: 'email',
    parentId: 'root',
    title: 'Email',
    contexts: ['editable'],
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log(info, tab);
  console.log(info.targetElementId);
  switch (info.menuItemId) {
    case 'company_name':
      runScript(info, tab, faker.company.name())
      break
    case 'person_name':
      runScript(info, tab, faker.person.fullName())
      break
    case 'email':
      runScript(info, tab, faker.internet.email())
      break
    case 'finance_iban':
      runScript(info, tab, faker.finance.iban({ formatted: true, countryCode: 'AT' }))
      break
  }
})

function runScript(info, tab, value) {
  chrome.tabs.sendMessage(tab.id, {value: value}, {frameId: info.frameId});
}
