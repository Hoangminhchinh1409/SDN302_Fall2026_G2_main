const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Category = require('./models/Category');

dotenv.config();

const categories = [
  { name: 'Cat Food', count: 24 },
  { name: 'Bowls', count: 33 },
  { name: 'Clothes', count: 52 },
  { name: 'Food', count: 34 },
  { name: 'Toys', count: 21 },
  { name: 'Beds', count: 37 }
];

const brands = ['Natural pet', 'Pet spa', 'Dogs food', 'Whiskas', 'Meow pet', 'Snack mix'];
const tagsList = ['Dog food', 'Cat food', 'Natural', 'Sweet', 'Small dog', 'Cat'];
const pets = ['Cat', 'Hamster', 'Dog', 'Parrot', 'Rabbit', 'Turtle'];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected for seeding...');

    await Product.deleteMany();
    await Category.deleteMany();
    
    const createdCategories = {};
    for (const cat of categories) {
      const newCat = await Category.create({ name: cat.name, description: `Description for ${cat.name}` });
      createdCategories[cat.name] = newCat._id;
    }

    const productsToInsert = [];
    
    // Generate exactly the number of products per category
    for (const cat of categories) {
      for (let i = 0; i < cat.count; i++) {
        const randomBrand = brands[Math.floor(Math.random() * brands.length)];
        const randomPet = pets[Math.floor(Math.random() * pets.length)];
        
        // Pick 1-3 random tags
        const numTags = Math.floor(Math.random() * 3) + 1;
        const shuffledTags = [...tagsList].sort(() => 0.5 - Math.random());
        const randomTags = shuffledTags.slice(0, numTags);
        
        productsToInsert.push({
          name: `${cat.name} Item ${i + 1}`,
          description: `High quality ${cat.name} for your beloved pet.`,
          price: Math.floor(Math.random() * 90) + 10,
          image: '/images/sample.jpg',
          category: createdCategories[cat.name],
          stock: Math.floor(Math.random() * 100) + 10,
          rating: Math.floor(Math.random() * 5) + 1,
          numReviews: Math.floor(Math.random() * 50),
          brand: randomBrand,
          tags: randomTags,
          petType: randomPet
        });
      }
    }

    await Product.insertMany(productsToInsert);
    console.log(`Data Imported! Total products: ${productsToInsert.length}`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await Product.deleteMany();
    await Category.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
