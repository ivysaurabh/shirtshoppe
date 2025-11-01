"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";

// Types
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

// Mock data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "Noise-cancelling headphones with 30-hour battery life and premium sound quality.",
    price: 199.99,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Track your heart rate, sleep, and daily activity with this sleek smartwatch.",
    price: 149.99,
    category: "Wearables",
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and eco-friendly t-shirt made from 100% organic cotton.",
    price: 29.99,
    category: "Clothing",
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    description: "Keep your drinks hot or cold for hours with this durable, leak-proof bottle.",
    price: 24.99,
    category: "Home",
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 39.99,
    category: "Electronics",
  },
  {
    id: 6,
    name: "Yoga Mat",
    description: "Non-slip, eco-friendly yoga mat with carrying strap included.",
    price: 34.99,
    category: "Fitness",
  },
];

export default function EcommerceSkeleton() {
  // State management
  const [products] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart functions
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">ShopEasy</h1>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {selectedProduct ? (
          // Product Detail View
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setSelectedProduct(null)}
              className="mb-6"
            >
              ← Back to Products
            </Button>
            
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-100">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80 flex items-center justify-center">
                    <span className="text-gray-500">Product Image</span>
                  </div>
                </div>
                
                <div className="md:w-1/2 p-6">
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">{selectedProduct.category}</span>
                    <h2 className="text-3xl font-bold text-gray-900 mt-1">{selectedProduct.name}</h2>
                    <p className="text-2xl font-semibold text-gray-900 mt-4">${selectedProduct.price.toFixed(2)}</p>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{selectedProduct.description}</p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      onClick={() => addToCart(selectedProduct)}
                      className="flex-1"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          // Product Listing View
          <>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h2>
              <p className="text-gray-600">Discover our collection of quality products</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card 
                  key={product.id} 
                  className="flex flex-col hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Square image container for larger screens */}
                  <div className="relative pt-[100%] bg-gray-100 md:pt-0 md:h-64">
                    <div className="absolute inset-0 flex items-center justify-center p-4 md:p-0">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                        <span className="text-gray-500">Image</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col flex-1 p-4">
                    <CardHeader className="p-0 pb-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </CardHeader>
                    
                    <CardContent className="p-0 pb-4 flex-grow">
                      <p className="text-gray-700 text-sm line-clamp-2">{product.description}</p>
                    </CardContent>
                    
                    <CardFooter className="p-0 flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e: { stopPropagation: () => void; }) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                      >
                        Add
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsCartOpen(false)}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  
                  <div className="mt-8">
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                        <p className="mt-1 text-sm text-gray-500">Add some items to your cart</p>
                      </div>
                    ) : (
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">
                          {cart.map((item) => (
                            <li key={item.product.id} className="py-6 flex">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100 flex items-center justify-center">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                              </div>
                              
                              <div className="ml-4 flex-1 flex flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3 className="line-clamp-1">{item.product.name}</h3>
                                    <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                                </div>
                                
                                <div className="flex-1 flex items-end justify-between text-sm">
                                  <div className="flex items-center border rounded-md">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                      disabled={item.quantity <= 1}
                                      className="h-8 w-8"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="px-2">{item.quantity}</span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                      className="h-8 w-8"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="font-medium text-red-600 hover:text-red-500"
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                {cart.length > 0 && (
                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${cartTotal.toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <Button className="w-full">
                        Checkout
                      </Button>
                    </div>
                    <div className="mt-4 flex justify-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          className="font-medium text-primary hover:text-primary/80"
                          onClick={() => setIsCartOpen(false)}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}