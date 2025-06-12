import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { DateTime } from 'luxon'
import factory from '@adonisjs/lucid/factories'

export default class extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        name: 'Laptop ASUS ROG',
        description: 'Laptop gaming dengan processor Intel i7 dan GPU RTX 3060',
        price: 15000000,
        stock: 10,
      },
      {
        name: 'Smartphone Samsung S22',
        description: 'Smartphone flagship dengan kamera 108MP',
        price: 12000000,
        stock: 15,
      },
      {
        name: 'Headphone Sony WH-1000XM4',
        description: 'Headphone noise cancelling premium',
        price: 4500000,
        stock: 20,
      },
    ])
  }
}
