import {
	IMenuEntry,
	IRecommendation
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
];

const DESSERTS: IMenuEntry[] = [
	{
		name: "Tarta de manzana",
		price: 2500
	},
	{
		name: "Brownie de chocolate",
		price: 2800
	},
	{
		name: "Helado de vainilla",
		price: 1800
	},
	{
		name: "Cupcake de fresa",
		price: 1500
	},
	{
		name: "Cheesecake de frutos rojos",
		price: 3200
	},
	{
		name: "Mousse de chocolate",
		price: 2200
	},
	{
		name: "Flan casero",
		price: 2000
	},
	{
		name: "Crema catalana",
		price: 2800
	},
	{
		name: "Pastel de zanahoria",
		price: 2600
	},
	{
		name: "Gelatina de limón",
		price: 1200
	}
];

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

const RECOMMENDATIONS: IRecommendation[] = [
	{
		food: "Deditos de corvina",
		dessert: "Tarta de manzana",
		drink: "Frappé Villa Italia"
	},
	{
		food: "Deditos de pollo",
		dessert: "Helado de vainilla",
		drink: "Gaseosa 3L"
	},
	{
		food: "Raviole en salsa de tomate",
		dessert: "Cheesecake de frutos rojos",
		drink: "Copa de Vino Blanco"
	},
	{
		food: "Spaghetti a la mantequilla",
		dessert: "Flan casero",
		drink: "Vino Tinto"
	},
	{
		food: "Pizza Focaccia",
		dessert: "Pastel de zanahoria",
		drink: "Copa de Sangría"
	},
	{
		food: "Mozzarella Sticks",
		dessert: "Tarta de manzana",
		drink: "Gaseosa 600mL"
	},
	{
		food: "Hamburguesa de la casa",
		dessert: "Helado de vainilla",
		drink: "Gaseosa 3L"
	},
	{
		food: "Mozzarella en Carroza",
		dessert: "Cheesecake de frutos rojos",
		drink: "Frappé Oreo"
	},
	{
		food: "Alitas en salsa Luisiana",
		dessert: "Flan casero",
		drink: "Imperial"
	},
	{
		food: "Alitas en salsa Barbacoa",
		dessert: "Tarta de manzana",
		drink: "Gaseosa 3L"
	},
	{
		food: "Mejillones en salsa marinara",
		dessert: "Helado de vainilla",
		drink: "Copa de Vino Blanco"
	},
	{
		food: "Antipasto caliente",
		dessert: "Cheesecake de frutos rojos",
		drink: "Gaseosa 600mL"
	},
	{
		food: "Antipasto frío",
		dessert: "Tarta de manzana",
		drink: "Copa de Sangría"
	},
	{
		food: "Pan con ajo",
		dessert: "Flan casero",
		drink: "Té de manzanilla"
	},
	{
		food: "Papas a la francesa",
		dessert: "Helado de vainilla",
		drink: "Gaseosa 3L"
	},
	{
		food: "Orden de puré de papas",
		dessert: "Cheesecake de frutos rojos",
		drink: "Gaseosa 2.5L"
	},
	{
		food: "Orden de arroz blanco",
		dessert: "Tarta de manzana",
		drink: "Vino Tinto"
	},
	{
		food: "Papa al horno",
		dessert: "Helado de vainilla",
		drink: "Copa de Vino Blanco"
	},
	{
		food: "Orden de vegetales mixtos",
		dessert: "Cheesecake de frutos rojos",
		drink: "Copa de Vino Blanco"
	},
	{
		food: "Pico de gallo",
		dessert: "Tarta de manzana",
		drink: "Té de manzanilla"
	},
	{
		food: "Chicken finger",
		dessert: "Helado de vainilla",
		drink: "Gaseosa 3L"
	},
	{
		food: "Fish and Chips",
		dessert: "Cheesecake de frutos rojos",
		drink: "Copa de Sangría"
	},
	{
		food: "Chile jalapeño relleno",
		dessert: "Tarta de manzana",
		drink: "Imperial Silver"
	},
	{
		food: "Hamburguesa",
		dessert: "Helado",
		drink: "Refresco"
	},
	{
		food: "Pizza",
		dessert: "Brownie",
		drink: "Jugo"
	},
	{
		food: "Ensalada",
		dessert: "Fruta",
		drink: "Agua"
	},
	{
		food: "Tacos",
		dessert: "Flan",
		drink: "Té"
	},
	{
		food: "Sushi",
		dessert: "Pastel",
		drink: "Café"
	}
];


export {
	FOODS,
	DESSERTS,
	DRINKS,
	RECOMMENDATIONS
};