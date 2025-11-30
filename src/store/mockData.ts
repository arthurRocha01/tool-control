import type { Product, Settings } from '../types/'

// Mock data para produtos
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Furadeira de Impacto',
    brand: 'Bosch',
    model: 'GSB 13 RE',
    quantity: 5,
    minQuantity: 3,
    characteristics: {
      voltage: '110V',
      weight: '1.8kg',
    },
    addedDate: '2025-11-15',
  },
  {
    id: '2',
    name: 'Martelo de Aço',
    brand: 'Stanley',
    model: 'STHT51512',
    quantity: 2,
    minQuantity: 5,
    characteristics: {
      material: 'Aço Carbono',
      weight: '0.5kg',
    },
    addedDate: '2025-11-20',
  },
  {
    id: '3',
    name: 'Chave de Fenda',
    brand: 'Tramontina',
    model: 'CF-6',
    quantity: 15,
    minQuantity: 8,
    characteristics: {
      material: 'Aço Carbono',
      size: '15cm',
    },
    addedDate: '2025-11-25',
  },
  {
    id: '4',
    name: 'Serra Tico-Tico',
    brand: 'Makita',
    model: '4329',
    quantity: 1,
    minQuantity: 2,
    characteristics: {
      voltage: '220V',
      weight: '2.1kg',
    },
    addedDate: '2025-11-18',
  },
  {
    id: '5',
    name: 'Alicate Universal',
    brand: 'Gedore',
    model: '8" RED',
    quantity: 12,
    minQuantity: 6,
    characteristics: {
      material: 'Aço Cromo-Vanádio',
      size: '20cm',
    },
    addedDate: '2025-11-22',
  },
  {
    id: '6',
    name: 'Nível a Laser',
    brand: 'DeWalt',
    model: 'DW088K',
    quantity: 3,
    minQuantity: 2,
    characteristics: {
      voltage: 'Bateria 12V',
      weight: '0.8kg',
    },
    addedDate: '2025-11-28',
  },
]

// Mock settings
export const mockSettings: Settings = {
  alertsEnabled: true,
  defaultUnit: 'kg',
  theme: 'light',
  language: 'pt-BR',
}
