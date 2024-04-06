import {
	IMenuEntry,
	IDrinkRecommendation,
	IFoodRecommendation
} from "../interfaces/Menu"

const FOODS: IMenuEntry[] = [
	{
		name: "Deditos de corvina",
		price: 3600
	},
	{
		name: "Deditos de pollo",
		price: 3100
	},
	{
		name: "Raviole en salsa de tomate",
		price: 3100
	},
	{
		name: "Spaghetti a la mantequilla",
		price: 3100
	},
	{
		name: "Pizza Focaccia",
		price: 2750
	},
	{
		name: "Mozzarella Sticks",
		price: 1100
	},
	{
		name: "Hamburguesa de la casa",
		price: 1350
	},
	{
		name: "Mozzarella en Carroza",
		price: 1750
	},
	{
		name: "Alitas en salsa Luisiana",
		price: 3200
	},
	{
		name: "Alitas en salsa Barbacoa",
		price: 4700
	},
	{
		name: "Mejillones en salsa marinara",
		price: 750
	},
	{
		name: "Antipasto caliente",
		price: 1100
	},
	{
		name: "Antipasto frío",
		price: 1350
	},
	{
		name: "Pan con ajo",
		price: 1900
	},
	{
		name: "Papas a la francesa",
		price: 2300
	},
	{
		name: "Orden de puré de papas",
		price: 2800
	},
	{
		name: "Orden de arroz blanco",
		price: 2750
	},
	{
		name: "Papa al horno",
		price: 3200
	},
	{
		name: "Orden de vegetales mixtos",
		price: 4700
	},
	{
		name: "Pico de gallo",
		price: 1100
	},
	{
		name: "Chicken finger",
		price: 1350
	},
	{
		name: "Fish and Chips",
		price: 1750
	},
	{
		name: "Chile jalapeño relleno",
		price: 3200
	}
]

const DRINKS: IMenuEntry[] = [
	{
		name: "Frappé Villa Italia",
		price: 2700
	},
	{
		name: "Frappé Villa Italia con Baylis",
		price: 3300
	},
	{
		name: "Frappé Mocca",
		price: 2700
	},
	{
		name: "Frappé Oreo",
		price: 2700
	},
	{
		name: "Café negro",
		price: 1000
	},
	{
		name: "Café con leche",
		price: 1300
	},
	{
		name: "Espresso",
		price: 1200
	},
	{
		name: "Americano",
		price: 1100
	},
	{
		name: "Chocolate",
		price: 1300
	},
	{
		name: "Té negro en leche",
		price: 1500
	},
	{
		name: "Capuchino",
		price: 1000
	},
	{
		name: "Té de manzanilla",
		price: 1300
	},
	{
		name: "Gaseosa 600mL",
		price: 1350
	},
	{
		name: "Gaseosa 2.5L",
		price: 1450
	},
	{
		name: "Gaseosa 3L",
		price: 1750
	},
	{
		name: "Imperial",
		price: 12500
	},
	{
		name: "Imperial Silver",
		price: 2250
	},
	{
		name: "Pilsen",
		price: 1750
	},
	{
		name: "Bavaria",
		price: 3100
	},
	{
		name: "Copa de Vino Tinto",
		price: 3300
	},
	{
		name: "Copa de Vino Blanco",
		price: 3300
	},
	{
		name: "Copa de Sangría",
		price: 2600
	}
];

const FOOD_RECOMMENDATIONS: IFoodRecommendation[] = [
	{
		food: "Deditos de corvina",
		drinks: ["Frappé Villa Italia", "Gaseosa 2.5L"]
	},
	{
		food: "Deditos de pollo",
		drinks: ["Gaseosa 3L", "Copa de Vino Tinto"]
	},
	{
		food: "Raviole en salsa de tomate",
		drinks: ["Copa de Vino Blanco", "Té de manzanilla"]
	},
	{
		food: "Spaghetti a la mantequilla",
		drinks: ["Vino Tinto", "Té negro en leche"]
	},
	{
		food: "Pizza Focaccia",
		drinks: ["Copa de Sangría", "Vino Blanco"]
	},
	{
		food: "Mozzarella Sticks",
		drinks: ["Gaseosa 600mL", "Copa de Sangría"]
	},
	{
		food: "Hamburguesa de la casa",
		drinks: ["Gaseosa 3L", "Imperial Silver"]
	},
	{
		food: "Mozzarella en Carroza",
		drinks: ["Frappé Oreo", "Copa de Vino Blanco"]
	},
	{
		food: "Alitas en salsa Luisiana",
		drinks: ["Imperial", "Frappé Villa Italia"]
	},
	{
		food: "Alitas en salsa Barbacoa",
		drinks: ["Gaseosa 3L", "Copa de Vino Tinto"]
	},
	{
		food: "Mejillones en salsa marinara",
		drinks: ["Copa de Vino Blanco", "Té de manzanilla"]
	},
	{
		food: "Antipasto caliente",
		drinks: ["Gaseosa 600mL", "Imperial Silver"]
	},
	{
		food: "Antipasto frío",
		drinks: ["Copa de Sangría", "Frappé Villa Italia"]
	},
	{
		food: "Pan con ajo",
		drinks: ["Té de manzanilla", "Espresso"]
	},
	{
		food: "Papas a la francesa",
		drinks: ["Gaseosa 3L", "Imperial Silver"]
	},
	{
		food: "Orden de puré de papas",
		drinks: ["Gaseosa 2.5L", "Café con leche"]
	},
	{
		food: "Orden de arroz blanco",
		drinks: ["Vino Tinto", "Té negro en leche"]
	},
	{
		food: "Papa al horno",
		drinks: ["Copa de Vino Blanco", "Gaseosa 2.5L"]
	},
	{
		food: "Orden de vegetales mixtos",
		drinks: ["Copa de Vino Blanco", "Frappé Villa Italia"]
	},
	{
		food: "Pico de gallo",
		drinks: ["Té de manzanilla", "Frappé Oreo"]
	},
	{
		food: "Chicken finger",
		drinks: ["Gaseosa 3L", "Imperial Silver"]
	},
	{
		food: "Fish and Chips",
		drinks: ["Copa de Sangría", "Imperial"]
	},
	{
		food: "Chile jalapeño relleno",
		drinks: ["Imperial Silver", "Vino Blanco"]
	},
];

const DRINK_RECOMMENDATIONS: IDrinkRecommendation[] = [
	{
		drink: 'Frappé Villa Italia',
		foods: [
			'Deditos de corvina',
			'Alitas en salsa Luisiana',
			'Antipasto frío',
			'Orden de vegetales mixtos'
		]
	},
	{
		drink: 'Gaseosa 2.5L',
		foods: ['Deditos de corvina', 'Orden de puré de papas', 'Papa al horno']
	},
	{
		drink: 'Gaseosa 3L',
		foods: [
			'Deditos de pollo',
			'Hamburguesa de la casa',
			'Alitas en salsa Barbacoa',
			'Papas a la francesa',
			'Chicken finger'
		]
	},
	{
		drink: 'Copa de Vino Tinto',
		foods: ['Deditos de pollo', 'Alitas en salsa Barbacoa']
	},
	{
		drink: 'Copa de Vino Blanco',
		foods: [
			'Raviole en salsa de tomate',
			'Mozzarella en Carroza',
			'Mejillones en salsa marinara',
			'Papa al horno',
			'Orden de vegetales mixtos'
		]
	},
	{
		drink: 'Té de manzanilla',
		foods: [
			'Raviole en salsa de tomate',
			'Mejillones en salsa marinara',
			'Pan con ajo',
			'Pico de gallo'
		]
	},
	{
		drink: 'Vino Tinto',
		foods: ['Spaghetti a la mantequilla', 'Orden de arroz blanco']
	},
	{
		drink: 'Té negro en leche',
		foods: ['Spaghetti a la mantequilla', 'Orden de arroz blanco']
	},
	{
		drink: 'Copa de Sangría',
		foods: [
			'Pizza Focaccia',
			'Mozzarella Sticks',
			'Antipasto frío',
			'Fish and Chips'
		]
	},
	{
		drink: 'Vino Blanco',
		foods: ['Pizza Focaccia', 'Chile jalapeño relleno']
	},
	{
		drink: 'Gaseosa 600mL',
		foods: ['Mozzarella Sticks', 'Antipasto caliente']
	},
	{
		drink: 'Imperial Silver',
		foods: [
			'Hamburguesa de la casa',
			'Antipasto caliente',
			'Papas a la francesa',
			'Chicken finger',
			'Chile jalapeño relleno'
		]
	},
	{
		drink: 'Frappé Oreo',
		foods: ['Mozzarella en Carroza', 'Pico de gallo']
	},
	{
		drink: 'Imperial',
		foods: ['Alitas en salsa Luisiana', 'Fish and Chips']
	},
	{ drink: 'Espresso', foods: ['Pan con ajo'] },
	{ drink: 'Café con leche', foods: ['Orden de puré de papas'] }
];

export {
	FOODS,
	DRINKS,
	FOOD_RECOMMENDATIONS,
	DRINK_RECOMMENDATIONS
};