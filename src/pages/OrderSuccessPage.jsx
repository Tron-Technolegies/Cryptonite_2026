import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiCheckCircle, FiHome, FiPackage } from 'react-icons/fi';
import confetti from 'canvas-confetti'; // Optional: if installed, else remove or install it

const OrderSuccessPage = () => {
    const location = useLocation();
    const { paymentIntent } = location.state || {};

    useEffect(() => {
        // Simple confetti effect on load
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            window.confetti && window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            window.confetti && window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 text-center">
            <div className="max-w-md w-full bg-gray-900/50 border border-gray-800 p-8 rounded-3xl shadow-2xl animate-scaleIn">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCheckCircle className="text-5xl text-green-500" />
                </div>
                
                <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
                <p className="text-gray-400 mb-8">
                    Your transaction has been completed securely. 
                    {paymentIntent?.id && <span className="block mt-2 text-xs font-mono text-gray-500">ID: {paymentIntent.id}</span>}
                </p>

                <div className="space-y-3">
                    <Link 
                        to="/dashboard" 
                        className="block w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                    >
                        <FiPackage /> View Order Status
                    </Link>
                    
                    <Link 
                        to="/" 
                        className="block w-full bg-gray-800 text-gray-300 py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <FiHome /> Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
