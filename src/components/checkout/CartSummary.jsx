import React from 'react';
import { FiShoppingCart, FiServer, FiCpu, FiPackage } from 'react-icons/fi';

const CartSummary = ({ cartItems = [], priceBreakup, onUpdateQuantity, onRemoveItem }) => {
    // Default values if data is missing
    const { subtotal = 0, tax = 0, final_total = 0 } = priceBreakup || {};

    return (
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 shadow-xl h-fit sticky top-24">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FiShoppingCart className="text-green-500" /> Order Summary
            </h2>
            
            <div className="space-y-6">
                {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">Your cart is empty.</p>
                        <a href="/shop" className="text-green-500 hover:text-green-400 text-sm font-medium underline">Return to Shop</a>
                    </div>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={item.id || index} className="flex gap-4 group items-start">
                            <div className="h-16 w-16 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gray-800/80 transition-colors">
                                {item.product?.image ? (
                                    <img src={item.product.image} alt={item.product.name} className="h-12 w-12 object-contain" />
                                ) : item.bundle?.name ? (
                                     <FiPackage className="text-2xl text-blue-500" />
                                ) : (
                                    <FiCpu className="text-2xl text-green-500" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start gap-2">
                                    <h3 className="text-md font-medium truncate py-0.5" title={item.product?.name || item.bundle?.name}>
                                        {item.product?.name || item.bundle?.name}
                                    </h3>
                                    <button 
                                        onClick={() => onRemoveItem(item.id)}
                                        className="text-gray-600 hover:text-red-500 transition-colors p-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className="flex justify-between items-center mt-3">
                                    <div className="flex items-center gap-2 bg-gray-950 rounded-lg p-1 border border-gray-800">
                                        <button 
                                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            className="w-6 h-6 flex items-center justify-center hover:text-green-400 transition-colors disabled:opacity-30"
                                            disabled={item.quantity <= 1}
                                        >
                                            −
                                        </button>
                                        <span className="w-6 text-center text-xs font-mono">{item.quantity}</span>
                                        <button 
                                            onClick={() => onUpdateQuantity(item.id, Math.min(10, item.quantity + 1))}
                                            className="w-6 h-6 flex items-center justify-center hover:text-green-400 transition-colors disabled:opacity-30"
                                            disabled={item.quantity >= 10}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="font-mono text-sm text-white">
                                        ${((item.product?.price || item.bundle?.price || 0) * (item.quantity || 1)).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                
                <div className="border-t border-gray-800 my-4"></div>
                
                <div className="space-y-3">
                    <div className="flex justify-between text-gray-400">
                        <span>Subtotal</span>
                        <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                        <span>Taxes (Included)</span>
                        <span>${tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-xl pt-4 border-t border-gray-800 items-center">
                        <span>Total</span>
                        <span className="text-green-400">${final_total.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
