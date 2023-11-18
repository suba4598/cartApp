import Realm from 'realm';

class Product extends Realm.Object {
  static schema = {
    name: 'Product',
    properties: {
      id: 'int',
      name: 'string',
      price: 'float',
    },
  };
}

const realm = new Realm({ schema: [Product] });

if (realm.isEmpty) {
  realm.write(() => {
    realm.create('Product', { id: 1, name: 'Mobile', price: 15000 });
    realm.create('Product', { id: 2, name: 'HeadPhone', price: 3000 });
    realm.create('Product', { id: 3, name: 'Charger', price: 2000 });
  });
}

export const products = realm.objects('Product');
