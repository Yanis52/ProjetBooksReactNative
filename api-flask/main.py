from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Exemple de base de données en mémoire (inventaire de produits)
products = [
    {
        'id': 1,
        'name': 'Produit A',
        'description': 'Description du produit A',
        'quantity': 100,
        'price': 29.99,
        'image_url': 'https://example.com/productA.jpg'
    },
    {
        'id': 2,
        'name': 'Produit B',
        'description': 'Description du produit B',
        'quantity': 50,
        'price': 59.99,
        'image_url': 'https://example.com/productB.jpg'
    },
    {
        'id': 3,
        'name': 'Produit C',
        'description': 'Description du produit C',
        'quantity': 200,
        'price': 19.99,
        'image_url': 'https://example.com/productC.jpg'
    },
    {
        'id': 4,
        'name': 'Produit D',
        'description': 'Description du produit D',
        'quantity': 75,
        'price': 89.99,
        'image_url': 'https://example.com/productD.jpg'
    },
    {
        'id': 5,
        'name': 'Produit E',
        'description': 'Description du produit E',
        'quantity': 20,
        'price': 120.00,
        'image_url': 'https://example.com/productE.jpg'
    },
    {
        'id': 6,
        'name': 'Produit F',
        'description': 'Description du produit F',
        'quantity': 150,
        'price': 45.00,
        'image_url': 'https://example.com/productF.jpg'
    },
    {
        'id': 7,
        'name': 'Produit G',
        'description': 'Description du produit G',
        'quantity': 300,
        'price': 10.00,
        'image_url': 'https://example.com/productG.jpg'
    },
    {
        'id': 8,
        'name': 'Produit H',
        'description': 'Description du produit H',
        'quantity': 90,
        'price': 99.99,
        'image_url': 'https://example.com/productH.jpg'
    },
    {
        'id': 9,
        'name': 'Produit I',
        'description': 'Description du produit I',
        'quantity': 45,
        'price': 35.00,
        'image_url': 'https://example.com/productI.jpg'
    },
    {
        'id': 10,
        'name': 'Produit J',
        'description': 'Description du produit J',
        'quantity': 60,
        'price': 55.50,
        'image_url': 'https://example.com/productJ.jpg'
    }
]


# Récupérer tous les produits
@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)

# Récupérer un produit par ID
@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = next((product for product in products if product['id'] == product_id), None)
    if product is None:
        return jsonify({'message': 'Produit non trouvé'}), 404
    return jsonify(product)

# Ajouter un nouveau produit
@app.route('/products', methods=['POST'])
def add_product():
    new_product = request.json
    new_product['id'] = len(products) + 1
    products.append(new_product)
    return jsonify(new_product), 201

# Mettre à jour un produit
@app.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product = next((product for product in products if product['id'] == product_id), None)
    if product is None:
        return jsonify({'message': 'Produit non trouvé'}), 404
    
    updated_data = request.json
    product.update(updated_data)
    return jsonify(product)

# Supprimer un produit
@app.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = next((product for product in products if product['id'] == product_id), None)
    if product is None:
        return jsonify({'message': 'Produit non trouvé'}), 404
    
    products.remove(product)
    return jsonify({'message': 'Produit supprimé'})

# Rechercher des produits par nom pour la searchbar
@app.route('/products/search', methods=['GET'])
def search_products():
    query = request.args.get('q', '')

    results = [product for product in products if query.lower() in product['name'].lower()]
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
