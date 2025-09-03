const mongoose = require("mongoose");
const Category = require("./models/Category.js");
const Product = require("./models/Product.js");
const Invoice = require("./models/Invoice.js");
const Table = require("./models/Table.js");
require("dotenv").config();

const sampleData = {
  categories: [
    { title: "Coffee & Beverages" },
    { title: "Fast Food" },
    { title: "Desserts" },
    { title: "Salads & Healthy" },
    { title: "Snacks" }
  ],
  products: [
    // Coffee & Beverages
    {
      title: "Espresso",
      img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop",
      price: 4.50,
      category: "Coffee & Beverages"
    },
    {
      title: "Cappuccino",
      img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop",
      price: 5.25,
      category: "Coffee & Beverages"
    },
    {
      title: "Latte",
      img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
      price: 5.75,
      category: "Coffee & Beverages"
    },
    {
      title: "Iced Coffee",
      img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&h=300&fit=crop",
      price: 4.75,
      category: "Coffee & Beverages"
    },

    // Fast Food
    {
      title: "Classic Burger",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      price: 12.99,
      category: "Fast Food"
    },
    {
      title: "Chicken Wings",
      img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop",
      price: 9.99,
      category: "Fast Food"
    },
    {
      title: "French Fries",
      img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
      price: 4.99,
      category: "Fast Food"
    },
    {
      title: "Hot Dog",
      img: "https://images.unsplash.com/photo-1612392062798-2ad99543f282?w=400&h=300&fit=crop",
      price: 7.50,
      category: "Fast Food"
    },

    // Desserts
    {
      title: "Chocolate Cake",
      img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
      price: 6.99,
      category: "Desserts"
    },
    {
      title: "Ice Cream Sundae",
      img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
      price: 5.50,
      category: "Desserts"
    },
    {
      title: "Cheesecake",
      img: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&h=300&fit=crop",
      price: 7.25,
      category: "Desserts"
    },
    {
      title: "Tiramisu",
      img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
      price: 8.50,
      category: "Desserts"
    },

    // Salads & Healthy
    {
      title: "Caesar Salad",
      img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
      price: 8.99,
      category: "Salads & Healthy"
    },
    {
      title: "Greek Salad",
      img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
      price: 9.50,
      category: "Salads & Healthy"
    },
    {
      title: "Quinoa Bowl",
      img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      price: 11.25,
      category: "Salads & Healthy"
    },
    {
      title: "Avocado Toast",
      img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop",
      price: 7.75,
      category: "Salads & Healthy"
    },

    // Snacks
    {
      title: "Nachos",
      img: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop",
      price: 6.50,
      category: "Snacks"
    },
    {
      title: "Pretzel",
      img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
      price: 3.99,
      category: "Snacks"
    },
    {
      title: "Popcorn",
      img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      price: 4.25,
      category: "Snacks"
    },
    {
      title: "Mixed Nuts",
      img: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=300&fit=crop",
      price: 5.99,
      category: "Snacks"
    }
  ],
  
  tables: [
    {
      title: "Table 1",
      number: "01",
      people: 2,
      status: "available"
    },
    {
      title: "Table 2", 
      number: "02",
      people: 4,
      status: "occupied"
    },
    {
      title: "Table 3",
      number: "03", 
      people: 6,
      status: "available"
    },
    {
      title: "Table 4",
      number: "04",
      people: 2,
      status: "reserved"
    },
    {
      title: "Table 5",
      number: "05",
      people: 8,
      status: "available"
    },
    {
      title: "VIP Table",
      number: "VIP01",
      people: 4,
      status: "occupied"
    },
    {
      title: "Outdoor Table 1",
      number: "OUT01",
      people: 4,
      status: "available"
    },
    {
      title: "Bar Counter",
      number: "BAR01",
      people: 6,
      status: "available"
    }
  ],

  invoices: [
    {
      customerName: "John Smith",
      customerTel: "+1-555-0123",
      cartItems: [
        { title: "Cappuccino", price: 5.25, quantity: 2, img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop" },
        { title: "Chocolate Cake", price: 6.99, quantity: 1, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop" }
      ],
      paymentMethod: "Card",
      subTotal: 17.49,
      tax: 1.75,
      totalAmount: 19.24
    },
    {
      customerName: "Sarah Johnson",
      customerTel: "+1-555-0456",
      cartItems: [
        { title: "Classic Burger", price: 12.99, quantity: 1, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
        { title: "French Fries", price: 4.99, quantity: 1, img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop" },
        { title: "Iced Coffee", price: 4.75, quantity: 1, img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&h=300&fit=crop" }
      ],
      paymentMethod: "Cash",
      subTotal: 22.73,
      tax: 2.27,
      totalAmount: 25.00
    },
    {
      customerName: "Mike Wilson",
      customerTel: "+1-555-0789",
      cartItems: [
        { title: "Caesar Salad", price: 8.99, quantity: 1, img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop" },
        { title: "Quinoa Bowl", price: 11.25, quantity: 1, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
        { title: "Latte", price: 5.75, quantity: 2, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop" }
      ],
      paymentMethod: "Card",
      subTotal: 31.74,
      tax: 3.17,
      totalAmount: 34.91
    },
    {
      customerName: "Emma Davis",
      customerTel: "+1-555-0321",
      cartItems: [
        { title: "Espresso", price: 4.50, quantity: 1, img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop" },
        { title: "Tiramisu", price: 8.50, quantity: 1, img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop" }
      ],
      paymentMethod: "Card",
      subTotal: 13.00,
      tax: 1.30,
      totalAmount: 14.30
    },
    {
      customerName: "David Brown",
      customerTel: "+1-555-0654",
      cartItems: [
        { title: "Chicken Wings", price: 9.99, quantity: 2, img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop" },
        { title: "Nachos", price: 6.50, quantity: 1, img: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop" },
        { title: "Ice Cream Sundae", price: 5.50, quantity: 1, img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" }
      ],
      paymentMethod: "Cash",
      subTotal: 31.98,
      tax: 3.20,
      totalAmount: 35.18
    }
  ]
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Table.deleteMany({});
    await Invoice.deleteMany({});
    console.log("Cleared existing data");

    // Insert categories
    const createdCategories = await Category.insertMany(sampleData.categories);
    console.log(`Created ${createdCategories.length} categories`);

    // Insert products
    const createdProducts = await Product.insertMany(sampleData.products);
    console.log(`Created ${createdProducts.length} products`);

    // Insert tables
    const createdTables = await Table.insertMany(sampleData.tables);
    console.log(`Created ${createdTables.length} tables`);

    // Insert invoices
    const createdInvoices = await Invoice.insertMany(sampleData.invoices);
    console.log(`Created ${createdInvoices.length} invoices`);

    console.log("\n🎉 Database seeded successfully!");
    console.log("\n📊 Summary:");
    console.log(`✅ Categories: ${createdCategories.length}`);
    console.log(`✅ Products: ${createdProducts.length}`);
    console.log(`✅ Tables: ${createdTables.length}`);
    console.log(`✅ Invoices: ${createdInvoices.length}`);
    
    console.log("\n📋 Categories created:");
    createdCategories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.title}`);
    });

    console.log("\n🍽️ Tables created:");
    createdTables.forEach((table, index) => {
      console.log(`${index + 1}. ${table.title} (${table.number}) - ${table.people} people - ${table.status}`);
    });

    console.log("\n🧾 Sample invoices:");
    createdInvoices.forEach((invoice, index) => {
      console.log(`${index + 1}. ${invoice.customerName} - $${invoice.totalAmount} (${invoice.paymentMethod})`);
    });

    console.log("\n🍕 Sample products per category:");
    sampleData.categories.forEach(category => {
      const categoryProducts = sampleData.products.filter(p => p.category === category.title);
      console.log(`\n${category.title} (${categoryProducts.length} items):`);
      categoryProducts.forEach(product => {
        console.log(`  - ${product.title} - $${product.price}`);
      });
    });

  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
