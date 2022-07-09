import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

Route.group(() => {
       Route.resource('/vehicles', 'VehiclesController').apiOnly()
}).prefix('/api')


Route.get('/api/vehicles/filter/:param', async ({ request, response }) => {
       const param = request.param('param')

       console.log("meu parametro", param)

       const query = `select * from vehicles where name like "%${param}%" or brand like "%${param}%" or description like "%${param}%" or plate like "%${param}%" or year like "%${param}%" or color like "%${param}%" or price like "%${param}%"`
       const vehicles = await Database.rawQuery(query)

       response.send(vehicles)
})
