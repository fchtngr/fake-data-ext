import { Faker, allLocales, en, base } from '@faker-js/faker'

export function getGenerators(locale, country) {
  const fakerLocale = allLocales[locale]
  const faker = new Faker({ locale: [fakerLocale, en, base] })

  return {
    address: {
      title: 'Address',
      menues: {
        city: {
          title: 'City',
          generator: faker.location.city,
        },
        street: {
          title: 'Street',
          generator: faker.location.street,
        },
        buildingNumber: {
          title: 'Building Number',
          generator: faker.location.buildingNumber,
        },
        streetAddress: {
          title: 'Street Address',
          generator: faker.location.streetAddress,
        },
        country: {
          title: 'Country',
          generator: faker.location.country,
        },
        countryCode: {
          title: 'Country code (ISO_3166-1)',
          generator: faker.location.countryCode,
        },
      },
    },
    company: {
      title: 'Company',
      menues: {
        fullName: {
          title: 'Full Name',
          generator: faker.company.name,
        },
      },
    },
    finance: {
      title: 'Finance',
      menues: {
        iban: {
          title: 'IBAN',
          generator: faker.finance.iban,
          config: { formatted: true, countryCode: country },
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
    number: {
      title: 'Numbers',
      menues: {
        shortNumber: {
          title: '1000 <= x <= 10000',
          generator: faker.number.int,
          config: { min: 1000, max: 10000 },
        },
      },
    },
    loremIpsum: {
      title: 'Lorem Ipsum',
      menues: {
        loremShort: {
          title: 'Random Text',
          generator: faker.lorem.text,
        },
        loremParagraph: {
          title: 'Paragraph',
          generator: faker.lorem.paragraph,
        },
        loremSlug: {
          title: 'Slug',
          generator: faker.lorem.slug,
        },
        loremWords: {
          title: 'Words',
          generator: faker.lorem.words,
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
        firstName: {
          title: 'First Name',
          generator: faker.person.firstName,
        },
        lastName: {
          title: 'Last Name',
          generator: faker.person.lastName,
        },
      },
    },
    phone: {
      title: 'Phone',
      menues: {
        phonenumber: {
          title: 'Phone number',
          generator: faker.phone.number,
          config: { style: 'international' },
        },
      },
    },
    string: {
      title: 'String',
      menues: {
        uuid: {
          title: 'UUID',
          generator: faker.string.uuid,
        },
      },
    },
  }
}
