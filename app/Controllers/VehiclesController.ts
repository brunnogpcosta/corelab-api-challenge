import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Vehicle from 'App/Models/Vehicle'

export default class VehiclesController {
  public async index() {
    const vehicles = await Vehicle.all()

    return vehicles
  }


  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const vehicle = await Vehicle.create(body)

    response.status(201)

    return {
      message: 'Vehicle inserted',
      data: vehicle
    }
  }

  public async show({ params }: HttpContextContract) {
    const vehicle = await Vehicle.findOrFail(params.id)
    console.table(vehicle)
    return {
      data: vehicle
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const vehicle = await Vehicle.findOrFail(params.id)

    await vehicle.delete()

    return {
      message: 'Vehicle data erased!',
      data: vehicle
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    const vehicle = await Vehicle.findOrFail(params.id)

    vehicle.name = body.name
    vehicle.brand = body.brand
    vehicle.description = body.description
    vehicle.plate = body.plate
    vehicle.is_favorite = body.is_favorite
    vehicle.year = body.year
    vehicle.color = body.color
    vehicle.price = body.price


    await vehicle.save()

    return {
      message: 'Vehicle updated!',
      data: vehicle
    }
  }


}

