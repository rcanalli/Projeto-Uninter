
import { create } from 'zustand';
import { Product, Resident } from '../types';

interface Store {
  products: Product[];
  residents: Resident[];
  selectedCategory: string;
  searchTerm: string;
  setProducts: (products: Product[]) => void;
  setResidents: (residents: Resident[]) => void;
  setSelectedCategory: (category: string) => void;
  setSearchTerm: (term: string) => void;
  addProduct: (product: Product) => void;
  addResident: (resident: Resident) => void;
  removeProduct: (productId: string) => void;
}

export const useStore = create<Store>((set) => ({
  products: [
    {
      id: '1',
      title: 'Sofá 3 Lugares em Couro',
      description: 'Sofá em excelente estado, cor marrom, muito confortável. Usado por apenas 2 anos.',
      price: 800,
      category: 'venda',
      images: ['https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg'],
      owner: {
        name: 'Maria Silva',
        apartment: 'Apto 301',
        contact: '(11) 99999-9999'
      },
      createdAt: '2024-01-15T10:30:00Z',
      status: 'disponivel',
      tags: ['móveis', 'sala', 'couro']
    },
    {
      id: '2',
      title: 'Livros de Romance',
      description: 'Coleção de 15 livros de romance em ótimo estado. Perfeito para quem ama uma boa leitura.',
      category: 'doacao',
      images: ['https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg'],
      owner: {
        name: 'João Santos',
        apartment: 'Apto 205',
        contact: '(11) 88888-8888'
      },
      createdAt: '2024-01-14T15:45:00Z',
      status: 'disponivel',
      tags: ['livros', 'literatura', 'romance']
    },
    {
      id: '3',
      title: 'Bicicleta Infantil',
      description: 'Bicicleta aro 16 em bom estado. Troco por patins ou skate infantil.',
      category: 'troca',
      images: ['https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg'],
      owner: {
        name: 'Ana Costa',
        apartment: 'Apto 102',
        contact: '(11) 77777-7777'
      },
      createdAt: '2024-01-13T09:20:00Z',
      status: 'disponivel',
      tags: ['bicicleta', 'infantil', 'esportes']
    },
    {
      id: '4',
      title: 'Mesa de Jantar com 6 Cadeiras',
      description: 'Mesa de madeira maciça com 6 cadeiras estofadas. Ideal para família grande.',
      price: 1200,
      category: 'venda',
      images: ['https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg'],
      owner: {
        name: 'Carlos Oliveira',
        apartment: 'Apto 405',
        contact: '(11) 66666-6666'
      },
      createdAt: '2024-01-12T14:10:00Z',
      status: 'disponivel',
      tags: ['móveis', 'jantar', 'madeira']
    },
    {
      id: '5',
      title: 'Roupas de Bebê',
      description: 'Lote com 20 peças de roupas de bebê (0 a 6 meses) em excelente estado.',
      category: 'doacao',
      images: ['https://images.pexels.com/photos/1257110/pexels-photo-1257110.jpeg'],
      owner: {
        name: 'Paula Ferreira',
        apartment: 'Apto 503',
        contact: '(11) 55555-5555'
      },
      createdAt: '2024-01-11T11:30:00Z',
      status: 'disponivel',
      tags: ['roupas', 'bebê', 'infantil']
    },
    {
      id: '6',
      title: 'Notebook Dell',
      description: 'Notebook Dell Inspiron 15, 8GB RAM, 256GB SSD. Troco por tablet ou smartphone.',
      category: 'troca',
      images: ['https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg'],
      owner: {
        name: 'Roberto Lima',
        apartment: 'Apto 201',
        contact: '(11) 44444-4444'
      },
      createdAt: '2024-01-10T16:45:00Z',
      status: 'disponivel',
      tags: ['eletrônicos', 'notebook', 'informática']
    }
  ],
  residents: [
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria.silva@email.com',
      apartment: 'Apto 301',
      phone: '(11) 99999-9999',
      createdAt: '2024-01-01T00:00:00Z',
      isActive: true
    },
    {
      id: '2',
      name: 'João Santos',
      email: 'joao.santos@email.com',
      apartment: 'Apto 205',
      phone: '(11) 88888-8888',
      createdAt: '2024-01-02T00:00:00Z',
      isActive: true
    }
  ],
  selectedCategory: 'todos',
  searchTerm: '',
  setProducts: (products) => set({ products }),
  setResidents: (residents) => set({ residents }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
  addResident: (resident) => set((state) => ({ residents: [resident, ...state.residents] })),
  removeProduct: (productId) => set((state) => ({ 
    products: state.products.filter(product => product.id !== productId) 
  })),
}));
