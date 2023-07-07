import { g, auth, config } from '@grafbase/sdk'

const User = g.model('User',{
  name: g.string().length({min:3,max:40}),
  email: g.string().unique(),
  descricao: g.string().optional()
})

const Sports = g.model('Esportes',{
  nome: g.string().length({min:3,max:40}),
})

const Event = g.model('Event',{
  numPessoas: g.int(), 
  esporte: g.relation(()=>Sports),
  createdBy: g.relation(()=> User)
})

export default config({
  schema: g

})
