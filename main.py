import random
import re

# Product class to represent fashion items
class Product:
    def __init__(self, id, name, description, price, stock):
        self.id = id
        self.name = name
        self.description = description
        self.price = price
        self.stock = stock

# Shopping Cart class to manage user's selected items
class ShoppingCart:
    def __init__(self):
        self.items = {}

    def add_item(self, product, quantity):
        if product.id in self.items:
            self.items[product.id]['quantity'] += quantity
        else:
            self.items[product.id] = {'product': product, 'quantity': quantity}

    def remove_item(self, product_id):
        if product_id in self.items:
            del self.items[product_id]

    def get_total(self):
        return sum(item['product'].price * item['quantity'] for item in self.items.values())

# Initialize product catalog
products = [
    Product(1, "Elegant Evening Gown", "A stunning floor-length gown for special occasions", 299.99, 10),
    Product(2, "Classic Leather Jacket", "Timeless leather jacket for a cool, edgy look", 199.99, 15),
    Product(3, "Designer Sunglasses", "Stylish sunglasses to complement any outfit", 149.99, 20),
    Product(4, "High-End Watch", "Luxurious timepiece for the discerning customer", 499.99, 5),
    Product(5, "Fashion Sneakers", "Comfortable and trendy sneakers for everyday wear", 89.99, 30)
]

# Initialize shopping cart
cart = ShoppingCart()

# Function to display available products
def display_products():
    print("\nAvailable Products:")
    for product in products:
        print(f"{product.id}. {product.name} - ${product.price:.2f} ({product.stock} in stock)")
        print(f"   Description: {product.description}")
    print()

# Function to add product to cart
def add_to_cart():
    display_products()
    while True:
        try:
            product_id = int(input("Enter the product ID you want to add to cart (0 to finish): "))
            if product_id == 0:
                break
            quantity = int(input("Enter the quantity: "))
            
            product = next((p for p in products if p.id == product_id), None)
            if product is None:
                print("Invalid product ID. Please try again.")
                continue
            
            if quantity <= 0:
                print("Quantity must be positive. Please try again.")
                continue
            
            if quantity > product.stock:
                print(f"Sorry, only {product.stock} items are available. Please try again.")
                continue
            
            cart.add_item(product, quantity)
            product.stock -= quantity
            print(f"{quantity} {product.name}(s) added to cart.")
        except ValueError:
            print("Invalid input. Please enter a number.")

# Function to view cart contents
def view_cart():
    if not cart.items:
        print("Your cart is empty.")
        return

    print("\nYour Shopping Cart:")
    for item in cart.items.values():
        product = item['product']
        quantity = item['quantity']
        total = product.price * quantity
        print(f"{product.name} - Quantity: {quantity} - ${total:.2f}")
    print(f"Total: ${cart.get_total():.2f}")

# Function to handle checkout process
def checkout():
    if not cart.items:
        print("Your cart is empty. Nothing to checkout.")
        return

    view_cart()
    
    # Apply discount (simulated)
    discount = 0
    if cart.get_total() > 500:
        discount = 0.1  # 10% discount for orders over $500
        discounted_total = cart.get_total() * (1 - discount)
        print(f"You qualify for a 10% discount! New total: ${discounted_total:.2f}")
    else:
        discounted_total = cart.get_total()

    # Collect shipping information
    print("\nPlease enter your shipping information:")
    name = input("Full Name: ")
    while not name:
        print("Name cannot be empty.")
        name = input("Full Name: ")

    address = input("Address: ")
    while not address:
        print("Address cannot be empty.")
        address = input("Address: ")

    phone = input("Phone Number: ")
    while not re.match(r'^\d{10}$', phone):
        print("Please enter a valid 10-digit phone number.")
        phone = input("Phone Number: ")

    # Simulate payment process
    print(f"\nTotal amount due: ${discounted_total:.2f}")
    card_number = input("Enter your credit card number (16 digits): ")
    while not re.match(r'^\d{16}$', card_number):
        print("Invalid card number. Please enter a 16-digit number.")
        card_number = input("Enter your credit card number (16 digits): ")

    # Process payment (simulated)
    if random.random() < 0.9:  # 90% chance of successful payment
        print("Payment processed successfully!")
        
        # Generate order confirmation
        order_id = random.randint(10000, 99999)
        print(f"\nOrder Confirmation - Order ID: {order_id}")
        print(f"Shipping to: {name}")
        print(f"Address: {address}")
        print(f"Phone: {phone}")
        view_cart()
        print(f"Discount applied: ${cart.get_total() * discount:.2f}")
        print(f"Total paid: ${discounted_total:.2f}")

        # Clear the cart
        cart.items.clear()
        print("\nThank you for your purchase!")
    else:
        print("Payment failed. Please try again later.")

# Main function to run the shopping simulation
def main():
    print("Welcome to Swift Skybird Africa Fashion Store!")
    while True:
        print("\nWhat would you like to do?")
        print("1. Browse products")
        print("2. Add items to cart")
        print("3. View cart")
        print("4. Checkout")
        print("5. Exit")
        
        choice = input("Enter your choice (1-5): ")
        
        if choice == '1':
            display_products()
        elif choice == '2':
            add_to_cart()
        elif choice == '3':
            view_cart()
        elif choice == '4':
            checkout()
        elif choice == '5':
            print("Thank you for shopping with us. Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()