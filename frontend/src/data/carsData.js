// // Master list of rental vehicles
// export const carsData = [
//   {
//     id: 1,
//     name: 'Mercedes-Benz C63',
//     brand: 'Mercedes',
//     category: 'Sport Cars',
//     price: 263,
//     image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=700&q=80',
//     tags: [
//       { label: 'Sport', type: 'tag-sport' },
//       { label: 'Automatic', type: 'tag-auto' }
//     ]
//   },
//   {
//     id: 2,
//     name: 'Lamborghini Huracán',
//     brand: 'Lamborghini',
//     category: 'Fast Cars',
//     price: 1126,
//     image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=700&q=80',
//     tags: [
//       { label: 'Supercar', type: 'tag-supercar' },
//       { label: 'Automatic', type: 'tag-auto' }
//     ]
//   },
//   {
//     id: 3,
//     name: 'Honda Civic',
//     brand: 'Honda',
//     category: 'Neutral Cars',
//     price: 58,
//     image: 'https://media.ed.edmunds-media.com/honda/civic/2026/oem/2026_honda_civic_sedan_si_fq_oem_1_1600.jpg',
//     tags: [
//       { label: 'Neutral', type: 'tag-neutral' },
//       { label: 'Manual', type: 'tag-manual' }
//     ]
//   },
//   {
//     id: 4,
//     name: 'BMW M4 Competition',
//     brand: 'BMW',
//     category: 'Sport Cars',
//     price: 450,
//     image: 'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=700&q=80',
//     tags: [
//       { label: 'Sport', type: 'tag-sport' },
//       { label: 'Automatic', type: 'tag-auto' }
//     ]
//   },
//   {
//     id: 5,
//     name: 'Audi R8 V10',
//     brand: 'Audi',
//     category: 'Fast Cars',
//     price: 901,
//     image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=700&q=80',
//     tags: [
//       { label: 'Supercar', type: 'tag-supercar' },
//       { label: 'Automatic', type: 'tag-auto' }
//     ]
//   },
//   {
//     id: 6,
//     name: 'Maserati Ghibli',
//     brand: 'Maserati',
//     category: 'Neutral Cars',
//     price: 369,
//     image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=700&q=80',
//     tags: [
//       { label: 'Luxury', type: 'tag-sport' },
//       { label: 'Automatic', type: 'tag-auto' }
//     ]
//   }
// ];


// Master list of rental vehicles
export const carsData = [
  // --- MERCEDES ---
  {
    id: 1,
    name: 'Mercedes-Benz C63',
    brand: 'Mercedes',
    category: 'Sport Cars',
    price: 263, // your custom price
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Sport', type: 'tag-sport' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },
  {
    id: 101,
    name: 'Mercedes-AMG GT Coupe',
    brand: 'Mercedes',
    category: 'Fast Cars',
    price: 520,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Supercar', type: 'tag-supercar' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },
  {
    id: 102,
    name: 'Mercedes-Benz E350',
    brand: 'Mercedes',
    category: 'Neutral Cars',
    price: 185,
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Executive', type: 'tag-neutral' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },
  {
    id: 103,
    name: 'Mercedes-AMG G63',
    brand: 'Mercedes',
    category: 'Sport Cars',
    price: 650,
    image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Luxury SUV', type: 'tag-sport' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },

  // --- LAMBORGHINI ---
  {
    id: 2,
    name: 'Lamborghini Huracán',
    brand: 'Lamborghini',
    category: 'Fast Cars',
    price: 1126, // your custom price
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Supercar', type: 'tag-supercar' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },
  {
    id: 201,
    name: 'Lamborghini Urus',
    brand: 'Lamborghini',
    category: 'Sport Cars',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Super SUV', type: 'tag-sport' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },
  {
    id: 202,
    name: 'Lamborghini Aventador SVJ',
    brand: 'Lamborghini',
    category: 'Fast Cars',
    price: 1850,
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Hypercar', type: 'tag-supercar' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },

  // --- HONDA ---
  {
    id: 3,
    name: 'Honda Civic',
    brand: 'Honda',
    category: 'Neutral Cars',
    price: 48, // your custom price
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Standard', type: 'tag-neutral' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },
  {
    id: 301,
    name: 'Honda Accord Touring',
    brand: 'Honda',
    category: 'Neutral Cars',
    price: 68,
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Sedan', type: 'tag-neutral' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },
  {
    id: 302,
    name: 'Honda Civic Type R',
    brand: 'Honda',
    category: 'Sport Cars',
    price: 135,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Sport', type: 'tag-sport' },
      { label: 'Manual', type: 'tag-manual' }
    ]
  },

  // --- BMW ---
  {
    id: 4,
    name: '2024 BMW M4 Competition',
    brand: 'BMW',
    category: 'Sport Cars',
    price: 450, // your custom price
    image: 'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Sport', type: 'tag-sport' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },
  {
    id: 401,
    name: 'BMW M8 Competition',
    brand: 'BMW',
    category: 'Fast Cars',
    price: 580,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Supercar', type: 'tag-supercar' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },
  {
    id: 402,
    name: 'BMW 330i M-Sport',
    brand: 'BMW',
    category: 'Neutral Cars',
    price: 140,
    image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Executive', type: 'tag-neutral' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },
  {
    id: 403,
    name: 'BMW X5 xDrive',
    brand: 'BMW',
    category: 'Neutral Cars',
    price: 210,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Luxury SUV', type: 'tag-neutral' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },

  // --- AUDI ---
  {
    id: 5,
    name: 'Audi R8 V10',
    brand: 'Audi',
    category: 'Fast Cars',
    price: 901, // your custom price
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Supercar', type: 'tag-supercar' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },
  {
    id: 501,
    name: 'Audi RS6 Avant',
    brand: 'Audi',
    category: 'Sport Cars',
    price: 360,
    image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Sport', type: 'tag-sport' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },
  {
    id: 502,
    name: 'Audi A4 S-Line',
    brand: 'Audi',
    category: 'Neutral Cars',
    price: 125,
    image: 'https://images.unsplash.com/photo-1541348263662-e0c866657c9b?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Comfort', type: 'tag-neutral' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },

  // --- MASERATI ---
  {
    id: 6,
    name: 'Maserati Ghibli Hybrid',
    brand: 'Maserati',
    category: 'Neutral Cars',
    price: 369, // your custom price
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Luxury', type: 'tag-sport' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },
  {
    id: 601,
    name: 'Maserati MC20 Supercar',
    brand: 'Maserati',
    category: 'Fast Cars',
    price: 1050,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Supercar', type: 'tag-supercar' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },
  {
    id: 602,
    name: 'Maserati Levante GTS',
    brand: 'Maserati',
    category: 'Sport Cars',
    price: 395,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Luxury SUV', type: 'tag-sport' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  },

  // --- LEXUS ---
  {
    id: 7,
    name: 'Lexus IS 350 F',
    brand: 'Lexus',
    category: 'Sport Cars',
    price: 188, // your custom price
    image: 'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Sport', type: 'tag-sport' },
      { label: 'Automatic', type: 'tag-auto' }
    ]
  }
];