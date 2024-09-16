import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Markets {
  data:      Coin[];
  timestamp: number;
}


export interface Coin {
  exchangeId:            string;
  rank:                  string;
  baseSymbol:            string;
  baseId:                string;
  quoteSymbol:           string;
  quoteId:               string;
  priceQuote:            string;
  priceUsd:              string;
  volumeUsd24Hr:         string;
  percentExchangeVolume: string;
  tradesCount24Hr:       string;
  updated:               number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  coins: Coin[] = [];
  filteredCoins: Coin[] = [];
  titles: string[] = [
    '#',
    'Coin',
    'Price',
    'Price Change',
    '24h Volume',
  ];
  searchText = '';

  constructor(
    private http: HttpClient,
  ) {}


  ngOnInit() {
    this.http.get<Markets>('https://api.coincap.io/v2/markets')
      .subscribe({
        next: (res) => {
          this.coins = res.data;
          this.filteredCoins = res.data;
        },
        error: (err) => console.error(err)
      })
  }

  Number(text: string) {
    return Number(text);
  }

  searchCoin() {
    this.coins = this.filteredCoins.filter(coin => 
      coin.baseId.toLowerCase().trim().includes(this.searchText) ||
      coin.baseSymbol.toLowerCase().trim().includes(this.searchText) 
    );
  }
  
}
