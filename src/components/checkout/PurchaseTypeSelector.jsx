import React from 'react';
import { FiMonitor, FiClock, FiCloud } from 'react-icons/fi';

const PurchaseTypeSelector = ({ selectedType, onSelect }) => {
    const types = [
        { 
            id: 'buy', 
            label: 'Buy Now', 
            icon: FiMonitor, 
            desc: 'Own the hardware',
            color: 'text-blue-400',
            bg: 'bg-blue-500/10 border-blue-500/50'
        },
        { 
            id: 'rent', 
            label: 'Rent', 
            icon: FiClock, 
            desc: 'Pay for time',
            color: 'text-orange-400',
            bg: 'bg-orange-500/10 border-orange-500/50'
        },
        { 
            id: 'hosting', 
            label: 'Hosting', 
            icon: FiCloud, 
            desc: 'We host for you',
            color: 'text-green-400',
            bg: 'bg-green-500/10 border-green-500/50'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {types.map((type) => {
                const isSelected = selectedType === type.id;
                const Icon = type.icon;
                
                return (
                    <button
                        key={type.id}
                        type="button"
                        onClick={() => onSelect(type.id)}
                        className={`
                            relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300
                            ${isSelected 
                                ? `${type.bg} ${type.color} shadow-lg shadow-${type.color}/20` 
                                : 'bg-gray-900/30 border-gray-800 text-gray-400 hover:border-gray-700 hover:bg-gray-900/50'
                            }
                        `}
                    >
                        <div className={`
                            mb-3 p-3 rounded-full 
                            ${isSelected ? 'bg-gray-900/50' : 'bg-gray-800'}
                        `}>
                            <Icon className={`text-2xl ${isSelected ? type.color : 'text-gray-500'}`} />
                        </div>
                        <span className="font-bold text-lg">{type.label}</span>
                        <span className="text-xs opacity-70 mt-1">{type.desc}</span>
                        
                        {isSelected && (
                            <div className="absolute top-2 right-2 w-3 h-3 bg-current rounded-full animate-pulse" />
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default PurchaseTypeSelector;
