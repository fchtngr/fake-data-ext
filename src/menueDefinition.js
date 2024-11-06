import { faker } from '@faker-js/faker'

export const menues = {
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
        title: 'Text',
        generator: faker.lorem.text,
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
}
