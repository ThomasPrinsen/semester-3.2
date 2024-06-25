import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext(); // Maakt een nieuw context object aan

const CoinProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]); // State voor alle cryptocurrency gegevens
    const [currency, setCurrency] = useState({ // State voor de valuta instellingen
        name: "usd", // Valuta naam (standaard USD)
        symbol: "$"   // Symbool van de valuta (standaard $)
    });

    // Functie om alle cryptocurrency gegevens op te halen
    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-8tQjAn4BiHTQUWWSB2RzdiJs' }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    }

    // useEffect om fetchAllCoin te draaien wanneer currency verandert
    useEffect(() => {
        fetchAllCoin();
    }, [currency]);

    // Waarde voor de context, bevat allCoin, currency en setCurrency
    const contextValue = {
        allCoin,
        currency,
        setCurrency
    }

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children} {/* Render de kindercomponenten van CoinProvider */}
        </CoinContext.Provider>
    )
}

export default CoinProvider; // Exporteer de CoinProvider component
