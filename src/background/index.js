import { faker, generateMersenne32Randomizer } from '@faker-js/faker'

const contextMenu = {
  title: 'Fake data...',
  menues: {
    company: {
      title: 'Company',
      menues: {
        fullName: {
          title: 'Full Name',
          generator: faker.company.name,
        },
      },
    },
    person: {
      title: 'Person',
      menues: {
        fullName: {
          title: 'Full Name',
          generator: faker.person.fullName,
        },
      },
    },
    finance: {
      title: 'Finance',
      menues: {
        iban: {
          title: 'IBAN (AT)',
          generator: faker.finance.iban,
          config: { formatted: true, countryCode: 'AT' },
        },
      },
    },
    internet: {
      title: 'Internet',
      menues: {
        email: {
          title: 'Email',
          generator: faker.internet.email,
        },
        url: {
          title: 'URL',
          generator: faker.internet.url,
        },
      },
    },
  },
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'root',
    title: contextMenu.title,
    contexts: ['editable'],
  })

  Object.keys(contextMenu.menues).forEach((parentKey) => {
    const parent = contextMenu.menues[parentKey]
    chrome.contextMenus.create({
      id: parentKey,
      parentId: 'root',
      title: parent.title,
      contexts: ['editable'],
    })

    Object.keys(parent.menues).forEach((childKey) => {
      const child = parent.menues[childKey]
      chrome.contextMenus.create({
        id: `${parentKey}-${childKey}`,
        parentId: parentKey,
        title: child.title,
        contexts: ['editable'],
      })
    })
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const [parentKey, childKey] = info.menuItemId.split('-')
  const menues = contextMenu.menues
  const generator = menues[parentKey].menues[childKey].generator
  const config = menues[parentKey].menues[childKey].config

  if (config) {
    runScript(info, tab, generator(config))
  } else {
    runScript(info, tab, generator())
  }
})

function runScript(info, tab, value) {
  chrome.tabs.sendMessage(tab.id, { value: value }, { frameId: info.frameId })
}
