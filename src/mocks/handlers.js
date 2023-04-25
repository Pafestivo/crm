import { rest } from 'msw'

export const handlers = [

  rest.get('http://localhost:3001/customers/', (req, res, ctx) => {
    console.log('handlers called!')
    return res(
      ctx.json({
        customers: [
          {
            id: 1,
            name: 'John Doe',
            email: '',
            phone: '',
            status: 'Select a status',
            lastChange: '04/24/23, 06:31'
          },
          {
            id: 2,
            name: 'Jane Doe',
            email: '',
            phone: '',
            status: 'Select a status',
            lastChange: '04/24/23, 06:31'
          }
        ]
      })
    )
  }),

]