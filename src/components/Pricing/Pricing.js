import React from 'react';
import './Pricing.css';  // Ensure the CSS file is linked for styling

function Pricing() {
    const plans = [
        {
            id: 1,
            name: "First Two Sessions",
            price: "FREE",
            description: "Experience our tutoring services with no commitment.",
            translation: "Experimenta nuestros servicios de tutoría sin compromiso."
        },
        {
            id: 2,
            name: "Per Session Rate",
            price: "$35 per session",
            description: "Flexible pay-as-you-go option without long-term commitment.",
            translation: "Opción flexible de pago por sesión sin compromiso a largo plazo."
        },
        {
            id: 3,
            name: "10 Session Package",
            price: "$300 total",
            description: "Pre-pay and save with $30 per session.",
            translation: "Paga por adelantado y ahorra con $30 por sesión."
        },
        {
            id: 4,
            name: "20 Session Package",
            price: "$500 total",
            description: "Our best value at $25 per session.",
            translation: "Nuestro mejor precio a $25 por sesión."
        }
    ];

    return (
        <div className="universal-section">  {/* Updated class name for consistent styling */}
            <div className="pricing-header">pricing</div>
            <div className="pricing-container">
                {plans.map(plan => (
                    <div key={plan.id} className="pricing-item">
                        <h3>{plan.name}</h3>
                        {plan.price && <h2>{plan.price}</h2>}
                        <p>{plan.description} <span className="translation">({plan.translation})</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Pricing;
