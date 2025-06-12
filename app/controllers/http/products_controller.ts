// import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { HttpContext } from '@adonisjs/core/http'
import { createPostProduct } from '#validators/product'

export default class ProductsController {
  public async index({ view }: HttpContext) {
    const products = await Product.all()
    return view.render('products/index', { products })
  }
  public async create({ view }: HttpContext) {
    return view.render('products/create')
  }
  public async showView({ params, view, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      return view.render('products/show', { product })
    } catch (error) {
      return response.redirect().back()
    }
  }
  public async editView({ params, view, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      return view.render('products/edit', { product })
    } catch (error) {
      return response.redirect().back()
    }
  }
  public async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await createPostProduct.validate(data)
      const product = await Product.create(payload)
      return response
        .redirect()
        .withQs({ success: 'Product created successfully' })
        .toRoute('products.index')
    } catch (error) {
      return response.redirect().back()
    }
  }
  public async update({ params, request, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      const payload = await createPostProduct.validate(request.all())
      product.merge(payload)
      await product.save()
      return response
        .redirect()
        .withQs({ success: 'Product updated successfully' })
        .toRoute('products.index')
    } catch (error) {
      return response.redirect().back()
    }
  }
  public async destroy({ params, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      await product.delete()
      return response
        .redirect()
        .withQs({ success: 'Product deleted successfully' })
        .toRoute('products.index')
    } catch (error) {
      return response.redirect().back()
    }
  }
}
