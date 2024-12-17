import Button from "./components/Button";
import Input from "./components/Input";
import Typography from "./components/Typography";
import Heading from "./components/Heading";
import Tooltip from "./components/Tooltip";
import Accordion from "./components/Accordion";
import { useEffect, useState } from "react";
import './App.css';



function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentAccordionID, setCurrentAccordionID] = useState(null);

  const fetchAllData = () => {
    fetch('https://api.coinlore.net/api/tickers/')
      .then((response) => response.json())
      .then((data) => {
        setCryptoData(data.data);
      })
      .catch((error) => console.error(`Ошибка при загрузке данных: ${error}`));
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleUpdate = () => {
    fetchAllData();
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredCryptoData = cryptoData.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    crypto.symbol.includes(searchValue.toUpperCase().trim())
  );

  return (
    <div className="App">
      <div className="main-final-exam-container">

        <div className="main-final-exam-block">
          <Heading level="1">Cryptocurrency Prices</Heading>
          <Button onClick={handleUpdate}>Update</Button>
          <Input placeholder="Search" onChange={handleSearchChange} />
        </div>

        <div className="crypto-list">
          {filteredCryptoData.length > 0 ? (
            filteredCryptoData.map((crypto) => {
              const threeParamsForEachCryptocurrency = [
                { id: 1, title: 'Symbol: ', value: crypto.symbol },
                { id: 2, title: 'Price USD: ', value: crypto.price_usd },
                { id: 3, title: 'Price BTC: ', value: crypto.price_btc },
              ];

              return <div key={crypto.id || crypto.symbol} className="crypto-item">
                  <Accordion
                    isOpen={crypto.id === currentAccordionID}
                    title={crypto.name}
                    onClick={() => {
                      setCurrentAccordionID(
                        currentAccordionID === crypto.id ? null : crypto.id
                      );
                    }}>
                    <div className="crypto-item-info">
                      {threeParamsForEachCryptocurrency.map((param) => (
                        <Typography key={param.id}>
                          <span className="crypto-item-text">
                            <Heading level={5}>{param.title}</Heading>
                            {param.value}
                          </span>
                        </Typography>
                      ))}

                      <Typography>
                        <span className="crypto-item-text">
                          <Tooltip
                            position="top"
                            tooltipText="The market capitalization of a cryptocurrency is calculated by multiplying the number of coins in circulation by the current price.">
                            <Heading level={5}>Market Cap USD: </Heading>
                          </Tooltip>
                          {crypto.market_cap_usd}
                        </span>
                      </Typography>

                      <Typography>
                        <span className="crypto-item-text">
                          <Heading level={5}>Percent Change 24H: </Heading>
                          <span
                            className={
                              parseFloat(crypto.percent_change_24h) === 0 ? 'zero' : (parseFloat(crypto.percent_change_24h) > 0 ? 'positive' : 'negative')
                            }>
                            {crypto.percent_change_24h}%
                          </span>
                        </span>
                      </Typography>
                    </div>
                  </Accordion>
                </div>
            })) : (
            <Typography>Loading data...</Typography>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
