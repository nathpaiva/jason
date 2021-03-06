import { fillAddressState, getEmptyState, isUserTyping, isValidZipCodeInput } from '../../src/helpers/zipcode';

describe('isUserTyping', () => {
  it('returns true if zipcode length less than 9 characters', () => {
    const result = isUserTyping('04405-16'.length, 9);

    expect(result).toBe(true);
  });

  it('returns false if zipcode length greather than 9 characters', () => {
    const result = isUserTyping('04405-160'.length, 9);

    expect(result).toBe(false);
  });
});

describe('isValidZipCodeInput', () => {
  it('returns true when zipcode length is valid and fetched zipcode is false', () => {
    const result = isValidZipCodeInput('04405-160'.length, 9, false);

    expect(result).toBe(true);
  });

  it('returns false when zipcode length is valid and fetched zipcode is true', () => {
    const result = isValidZipCodeInput('04405-16'.length, 9, true);

    expect(result).toBe(false);
  });
});

describe('fillAddressState', () => {
  it('returns new state object with filled address', () => {
    const responseAddress = {
      street: 'xpto street',
      neighborhood: 'xpto neighborhood',
      city: 'xpto city',
      uf: 'xpto uf',
    };

    const fullAddress = `${responseAddress.street}, ${responseAddress.neighborhood} \n${responseAddress.city} - ${responseAddress.uf}`;
    const zipcode = '11111111';

    const newState = {
      value: '11111111',
      fetchCompleted: true,
      street: 'xpto street',
      neighborhood: 'xpto neighborhood',
      city: 'xpto city',
      uf: 'xpto uf',
      fullAddress,
    };

    const result = fillAddressState(responseAddress, zipcode);

    expect(result).toEqual(newState);
  });

  describe('full adddres without street', () => {
    it('does not display empty space with comma', () => {
      const zipcode = '13150000';
      const responseAddress = {
        street: '',
        neighborhood: 'xpto neighborhood',
        city: 'xpto city',
        uf: 'xpto uf',
      };

      const fullAddress = `${responseAddress.neighborhood} \n${responseAddress.city} - ${responseAddress.uf}`;

      const newState = {
        value: '13150000',
        fetchCompleted: true,
        street: '',
        neighborhood: 'xpto neighborhood',
        city: 'xpto city',
        uf: 'xpto uf',
        fullAddress,
      };

      const result = fillAddressState(responseAddress, zipcode);

      expect(result).toEqual(newState);
    });
  });

  describe('full adddres without street and neighborhood', () => {
    it('does not display empty space with comma', () => {
      const zipcode = '13150000';
      const responseAddress = {
        street: '',
        neighborhood: '',
        city: 'xpto city',
        uf: 'xpto uf',
      };

      const fullAddress = `${responseAddress.city} - ${responseAddress.uf}`;

      const newState = {
        value: '13150000',
        fetchCompleted: true,
        street: '',
        neighborhood: '',
        city: 'xpto city',
        uf: 'xpto uf',
        fullAddress,
      };

      const result = fillAddressState(responseAddress, zipcode);

      expect(result).toEqual(newState);
    });
  });
});


describe('.getEmptyState', () => {
  it('sets all key values to empty string', () => {
    const currentState = {
      value: '05402300',
      type_street: '',
      street: 'Aveninda Rebouças',
      city: 'São Paulo',
      neighborhood: 'Pinheiros',
      uf: 'SP',
      fullAddress: 'Avenida Rebouças, Pinheiros \nSão Paulo - SP',
      fetchCompleted: true,
    };

    const emptyState = {
      value: '',
      type_street: '',
      street: '',
      city: '',
      neighborhood: '',
      uf: '',
      fullAddress: '',
      fetchCompleted: false,
    };

    const result = getEmptyState(currentState);

    expect(result).toEqual(emptyState);
  });
});
