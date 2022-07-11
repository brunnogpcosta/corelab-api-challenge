import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

Route.group(() => {
       Route.resource('/vehicles', 'VehiclesController').apiOnly()
}).prefix('/api')


Route.get('/api/vehicles/filter/:param', async ({ request, response }) => {
       const param = request.param('param')

       //console.log("meu parametro", param)

       const query = `select * from vehicles where name LIKE "%${param}%" or brand LIKE "%${param}%" or description LIKE "%${param}%" or plate LIKE "%${param}%" or year LIKE "%${param}%" or color LIKE "%${param}%" or price LIKE "%${param}%"`
       const vehicles = await Database.rawQuery(query)

       response.send(vehicles)
})


Route.get('/api/vehicles/filter/:brand/:color/:year/:minPrice/:maxPrice/*', async ({ params, response }) => {
       const brand = params.brand
       const color = params.color
       const year = params.year
       const minPrice = params.minPrice
       const maxPrice = params.maxPrice
     
       //console.log("meus parametros", params['*'])

       const query = `SELECT * FROM vehicles WHERE brand = "${brand}" AND color = "#${color}" AND year = ${year} AND price BETWEEN ${minPrice} AND ${maxPrice}`
       const vehicles = await Database.rawQuery(query)

       response.send(vehicles)
})
