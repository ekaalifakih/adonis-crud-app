import vine from '@vinejs/vine'

export const createPostProduct = vine.compile(
  vine.object({
    name: vine.string().trim().maxLength(255),
    description: vine.string().maxLength(1000).trim().escape().optional(),
    price: vine.number().min(0.01).max(999999.99),
    stock: vine.number().min(0).optional(),
  })
)
