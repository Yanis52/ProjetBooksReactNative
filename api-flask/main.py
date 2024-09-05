from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

# Connexion à la base de données PostgreSQL sur AlwaysData
def get_db_connection():
    conn = psycopg2.connect(
        host='postgresql-yanis52.alwaysdata.net',
        database='yanis52_db',
        user='yanis52',
        password='J@B$qwvH37zrWbY'
    )
    return conn

# je recup tous les produits
@app.route('/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM products;')
    products = cur.fetchall()
    cur.close()
    conn.close()

    # Je les produits en dictionnaires pour les retourner en JSON
    products_list = [
        {'id': p[0], 'name': p[1], 'description': p[2], 'quantity': p[3], 'price': p[4], 'image_url': p[5]} 
        for p in products
    ]

    return jsonify(products_list)

# Recup un produit par ID
@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM products WHERE id = %s;', (product_id,))
    product = cur.fetchone()
    cur.close()
    conn.close()

    if product is None:
        return jsonify({'message': 'Produit non trouvé'}), 404

    product_dict = {
        'id': product[0], 
        'name': product[1], 
        'description': product[2], 
        'quantity': product[3], 
        'price': product[4], 
        'image_url': product[5]
    }

    return jsonify(product_dict)

# Add un nouveau produit
@app.route('/products', methods=['POST'])
def add_product():
    new_product = request.json

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO products (name, description, quantity, price, image_url) VALUES (%s, %s, %s, %s, %s) RETURNING id;',
                (new_product['name'], new_product['description'], new_product['quantity'], new_product['price'], new_product['image_url']))
    new_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    new_product['id'] = new_id
    return jsonify(new_product), 201

# Mettre à jour un produit
@app.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    updated_data = request.json

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('UPDATE products SET name = %s, description = %s, quantity = %s, price = %s, image_url = %s WHERE id = %s;',
                (updated_data['name'], updated_data['description'], updated_data['quantity'], updated_data['price'], updated_data['image_url'], product_id))
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({'message': 'Produit mis à jour'})

# Supprimer un produit
@app.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM products WHERE id = %s;', (product_id,))
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({'message': 'Produit supprimé'})

# Rechercher des produits par nom
@app.route('/products/search', methods=['GET'])
def search_products():
    query = request.args.get('q', '')

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM products WHERE LOWER(name) LIKE LOWER(%s);", ('%' + query + '%',))
    products = cur.fetchall()
    cur.close()
    conn.close()

    # Transformer les résultats en dictionnaires pour JSON
    products_list = [
        {'id': p[0], 'name': p[1], 'description': p[2], 'quantity': p[3], 'price': p[4], 'image_url': p[5]} 
        for p in products
    ]

    return jsonify(products_list)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
