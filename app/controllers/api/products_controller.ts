// import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { HttpContext } from '@adonisjs/core/http'
import { createPostProduct } from '#validators/product'

export default class ProductsController {
  public async index({ response }: HttpContext) {
    const products = await Product.all()
    return response.ok(products)
  }

  public async stores({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await createPostProduct.validate(data)
      const product = await Product.create(payload)
      return response.created(product)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }
  public async show({ params, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      return response.ok(product)
    } catch (error) {
      return response.notFound({ message: 'Product not found' })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      const payload = await createPostProduct.validate(request.all())
      product.merge(payload)
      await product.save()
      return response.ok(product)
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Product not found' })
      }
      return response.badRequest(error.messages)
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      await product.delete()
      return response.ok({ message: 'Product Deleted' })
    } catch (error) {
      return response.notFound({ message: 'Product not found' })
    }
  }
}
