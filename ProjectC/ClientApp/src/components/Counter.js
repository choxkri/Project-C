import React, { useState } from 'react';
import { NavMenu } from './NavMenu';

export function Counter() {
    const [currentCount, setCurrentCount] = useState(0);
    const [powerUpCount, setPowerUpCount] = useState(20);
    const [Inc, SetInc] = useState(1);
    const [powerUpMultiplier, setPowerUpMultiplier] = useState(1.5);

    const incrementCounter = () => {
        setCurrentCount(currentCount + Inc);
        checkPowerUp();
    };

    const activatePowerUp = () => {
        if (currentCount >= powerUpCount) {
            setCurrentCount(currentCount + 1);
            SetInc(Inc + 1);
            setPowerUpCount(powerUpCount * powerUpMultiplier);
        }
    };

    const checkPowerUp = () => {
        if (currentCount >= powerUpCount) {
            // Power up available
            console.log("Power up available!");
        }
    };

    return (
        <div>
            <NavMenu />
            <h1>Cookie Clicker</h1>
            <p>This is a simple cookie clicker example using React.</p>
            <p aria-live="polite">Cookies: <strong>{currentCount}</strong></p>
            {currentCount >= powerUpCount && (
                <p>
                    Power up available! Click the button to activate it.
                    Current Power Up Count: <strong>{powerUpCount}</strong>
                </p>
            )}
            <button className="btn btn-primary" onClick={incrementCounter}>
                Click Me
            </button>
            {currentCount >= powerUpCount && (
                <button className="btn btn-success" onClick={activatePowerUp}>
                    Activate Power Up
                </button>
            )}
        </div>
    );
}
