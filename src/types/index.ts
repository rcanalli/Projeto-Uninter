
export interface Product {
  id: string;
  title: string;
  description: string;
  price?: number;
  category: 'venda' | 'doacao' | 'troca';
  images: string[];
  owner: {
    name: string;
    apartment: string;
    contact: string;
  };
  createdAt: string;
  status: 'disponivel' | 'reservado' | 'finalizado';
  tags: string[];
}

export interface Resident {
  id: string;
  name: string;
  email: string;
  apartment: string;
  phone: string;
  createdAt: string;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
