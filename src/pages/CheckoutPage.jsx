 import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/api'; 
import { getCheckoutSummary, createPaymentIntent } from '../api/payment.api';
import { createHostingRequest } from '../api/hosting.api';
import { updateCartItem, removeFromCart } from '../api/cart.api';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

// Components
import StripeWrapper from '../components/checkout/StripeWrapper';
import PaymentForm from '../components/checkout/PaymentForm';
import CartSummary from '../components/checkout/CartSummary';
import PurchaseTypeSelector from '../components/checkout/PurchaseTypeSelector';
import BuyForm from '../components/checkout/BuyForm';
import RentForm from '../components/checkout/RentForm';
import HostingForm from '../components/checkout/HostingForm';
import Loading from '../components/ui/Loading'; 

const CheckoutPage = () => {
    const location = useLocation();
    
    // State
    const [step, setStep] = useState(1); // 1: Details, 2: Payment
    const [purchaseType, setPurchaseType] = useState(location.state?.purchaseType || 'buy');
    const [checkoutData, setCheckoutData] = useState(null); // { cart_items, price_breakup, ... }
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);

    // Form Data
    const [formData, setFormData] = useState({
        // Buy
        fullName: '', addressLine1: '', city: '', state: '', postalCode: '', country: '',
        // Rent
        duration_days: 30,
        // Hosting
        phone: '', hosting_location: '', message: ''
    });

    const fetchCheckout = async () => {
        try {
            const data = await getCheckoutSummary();
            setCheckoutData(data);
            // Pre-fill address if available
            if (data.user_default_address) {
                const addr = data.user_default_address;
                setFormData(prev => ({
                    ...prev,
                    fullName: addr.name || '',
                    addressLine1: addr.line1 || '',
                    city: addr.city || '',
                    state: addr.state || '',
                    postalCode: addr.postal_code || '',
                    country: addr.country || ''
                }));
            }
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch checkout summary", err);
            setError("Could not load checkout details. Please try again.");
            setLoading(false);
            
            // FALLBACK FOR DEMO ONLY (If backend is offline)
            if (!import.meta.env.PROD) {
                console.warn("Using Mock Data due to API error (Dev Mode)");
                setCheckoutData({
                    cart_items: [
                        { id: 'mock1', product: { name: 'Antminer S19 Pro', price: 2500, image: null }, quantity: 1 }
                    ],
                    price_breakup: {
                        subtotal: 2500,
                        tax: 150,
                        final_total: 2650
                    },
                    can_buy: true,
                    can_rent: true
                });
            }
        }
    };

    // Fetch Checkout Summary on Mount
    useEffect(() => {
        fetchCheckout();
    }, []);

    const handleUpdateQuantity = async (itemId, newQty) => {
        try {
            await updateCartItem(itemId, newQty);
            await fetchCheckout(); // Refresh data
        } catch (err) {
            console.error(err);
            toast.error("Failed to update quantity");
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await removeFromCart(itemId);
            await fetchCheckout(); // Refresh data
        } catch (err) {
            console.error(err);
            toast.error("Failed to remove item");
        }
    };

    // Reset step when purchase type changes
    const handleTypeSelect = (type) => {
        setPurchaseType(type);
        setStep(1);
        setError(null);
    };

    const handleFormChange = (newData) => {
        setFormData(newData);
    };

    const validateForm = () => {
        if (purchaseType === 'buy') {
            const required = ['fullName', 'addressLine1', 'city', 'state', 'postalCode', 'country'];
            for (let field of required) {
                if (!formData[field]) return "Please fill in all shipping details.";
            }
        }
        if (purchaseType === 'hosting') {
            if (!formData.phone || !formData.hosting_location) return "Please provide phone and location.";
        }
        return null;
    };

    const handleProceedToPayment = async () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setProcessing(true);
        setError(null);

        try {
            let hostingRequestId = null;
            
            // 1. Create Hosting Request if needed
            if (purchaseType === 'hosting') {
                const data = await createHostingRequest({
                    phone: formData.phone,
                    hosting_location: formData.hosting_location,
                    message: formData.message
                });
                hostingRequestId = data.hosting_request_id;
            }

            // 2. Create Payment Intent
            const payload = {
                purchase_type: purchaseType,
                save_address: true, 
                ...(purchaseType === 'buy' && { 
                    address: {
                        line1: formData.addressLine1,
                        city: formData.city,
                        state: formData.state,
                        postal_code: formData.postalCode,
                        country: formData.country,
                        name: formData.fullName
                    }
                }),
                ...(purchaseType === 'rent' && { duration_days: formData.duration_days }),
                ...(purchaseType === 'hosting' && { hosting_request_id: hostingRequestId })
            };

            const data = await createPaymentIntent(payload);
            setClientSecret(data.client_secret);
            setStep(2);

        } catch (err) {
            console.error(err);
            const errMsg = err.response?.data?.error || err.response?.data?.message || err.message || "Failed to initialize payment.";
            setError(errMsg);
            
            // Dev Fallback for UI testing if API fails
            if (!import.meta.env.PROD && (errMsg.includes("Network Error") || err.code === "ERR_NETWORK")) {
                 console.warn("Using Mock Secret due to Network Error (Dev Mode)");
                 setClientSecret("pi_mock_" + Date.now()); 
                 setStep(2);
            }
        } finally {
            setProcessing(false);
        }
    };

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
        } else {
            navigate(-1);
        }
    };

    const handlePaymentSuccess = (paymentIntent) => {
        navigate('/order-success', { state: { paymentIntent } });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
                <Loading />
            </div>
        );
    }

    if (!checkoutData) return <div className="text-white text-center pt-20">Failed to load checkout.</div>;

    const renderForm = () => {
        switch (purchaseType) {
            case 'buy': return <BuyForm formData={formData} onChange={handleFormChange} />;
            case 'rent': return <RentForm formData={formData} onChange={handleFormChange} />;
            case 'hosting': return <HostingForm formData={formData} onChange={handleFormChange} />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white pt-24 pb-12 px-4 transition-colors duration-500">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
                
                {/* Left Column: Summary (Always Visible) */}
                <div className="space-y-8 animate-slideInLeft">
                    <button onClick={handleBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
                        {step === 2 ? 'Back to Details' : 'Back'}
                    </button>
                    
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Checkout</h1>
                        <p className="text-gray-400">
                            {step === 1 ? 'Select options and fill details.' : 'Secure Payment.'}
                        </p>
                    </div>

                    <CartSummary 
                        cartItems={checkoutData.cart_items} 
                        priceBreakup={checkoutData.price_breakup} 
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemoveItem={handleRemoveItem}
                    />
                </div>

                {/* Right Column: Actions */}
                <div className="lg:mt-12 animate-slideInRight">
                    {/* Error Banner */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl mb-6">
                            {error}
                        </div>
                    )}

                    {step === 1 ? (
                        <div className="space-y-8">
                            {checkoutData.can_rent || checkoutData.can_buy ? (
                                <PurchaseTypeSelector 
                                    selectedType={purchaseType} 
                                    onSelect={handleTypeSelect} 
                                />
                            ) : null}

                            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 shadow-xl">
                                {renderForm()}
                            </div>

                            <button
                                onClick={handleProceedToPayment}
                                disabled={processing}
                                className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-400 transition-all shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Processing...' : 'Proceed to Payment'}
                            </button>
                        </div>
                    ) : (
                        // Step 2: Payment
                        <div className="space-y-6">
                             {/* Hint for Dev */}
                             <div className="text-xs text-gray-500 text-center">
                                Secure logic initialized. Enter card details below.
                            </div>

                            <StripeWrapper clientSecret={clientSecret}>
                                <PaymentForm 
                                    amount={checkoutData.price_breakup.final_total} 
                                    onSuccess={handlePaymentSuccess} 
                                />
                            </StripeWrapper>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
