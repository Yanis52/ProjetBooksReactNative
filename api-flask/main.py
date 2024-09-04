from flask import Flask, jsonify, request 

from flask_cors import CORS

app = Flask(__name__) 

CORS(app)

# Exemple de base de données en mémoire 

books = [ 

    { 

        'id': 1, 

        'title': 'Le Petit Prince', 

        'author': 'Antoine de Saint-Exupéry', 

        'year': 1943, 

        'description': 'Un conte philosophique illustré...', 

        'cover_image': 'https://example.com/lepetitprince.jpg' 

    }, 

    { 

        'id': 2, 

        'title': '1984', 

        'author': 'George Orwell', 

        'year': 1949, 

        'description': 'Un roman dystopique...', 

        'cover_image': 'https://example.com/1984.jpg' 

    } 

] 

 

# Récupérer tous les livres 

@app.route('/books', methods=['GET']) 

def get_books(): 

    return jsonify(books) 

 

# Récupérer un livre par ID 

@app.route('/books/<int:book_id>', methods=['GET']) 

def get_book(book_id): 

    book = next((book for book in books if book['id'] == book_id), None) 

    if book is None: 

        return jsonify({'message': 'Livre non trouvé'}), 404 

    return jsonify(book) 

 

# Créer un nouveau livre 

@app.route('/books', methods=['POST']) 

def add_book(): 

    new_book = request.json 

    new_book['id'] = len(books) + 1 

    books.append(new_book) 

    return jsonify(new_book), 201 

 

# Mettre à jour un livre 

@app.route('/books/<int:book_id>', methods=['PUT']) 

def update_book(book_id): 

    book = next((book for book in books if book['id'] == book_id), None) 

    if book is None: 

        return jsonify({'message': 'Livre non trouvé'}), 404 

 

    updated_data = request.json 

    book.update(updated_data) 

    return jsonify(book) 

 

# Supprimer un livre 

@app.route('/books/<int:book_id>', methods=['DELETE']) 

def delete_book(book_id): 

    book = next((book for book in books if book['id'] == book_id), None) 

    if book is None: 

        return jsonify({'message': 'Livre non trouvé'}), 404 

 

    books.remove(book) 

    return jsonify({'message': 'Livre supprimé'}) 

 

if __name__ == '__main__': 

    app.run(host='0.0.0.0', port=5000) 