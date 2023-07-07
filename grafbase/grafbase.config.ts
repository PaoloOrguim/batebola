import { g, auth, config } from '@grafbase/sdk'

const User = g.model('User', {
  name: g.string().length({ min: 3, max: 40 }),
  email: g.string().unique(),
  descricao: g.string().optional()
})

const UsuarioGeral = g.actor('UsuarioGeral', {
  criarConta: g.mutation().args({
    nome: g.string(),
    email: g.string()
  }),
  pesquisarUsuario: g.query().arg({
    termoPesquisa: g.string()
  }),
  bloquearUsuario: g.mutation().args({
    usuario: g.relation(() => User)
  }),
  enviarMensagem: g.mutation().args({
    mensagem: g.string(),
    destinatario: g.relation(() => User)
  }),
  cadastrarChavePix: g.mutation().args({
    chavePix: g.string()
  }),
  reportarUsuario: g.mutation().args({
    usuario: g.relation(() => User),
    motivo: g.string()
  }),
  realizarLogin: g.mutation().args({
    email: g.string()
  })
})

const UsuarioArena = UsuarioGeral.specialize('UsuarioArena', {
  organizarEvento: g.mutation().args({
    evento: g.relation(() => Event)
  }),
  cadastrarLocal: g.mutation().args({
    local: g.relation(() => Local)
  }),
  cancelarEvento: g.mutation().args({
    evento: g.relation(() => Event)
  })
})

const UsuarioOrganizador = UsuarioGeral.specialize('UsuarioOrganizador', {
  cancelarEvento: g.mutation().args({
    evento: g.relation(() => Event)
  }),
  organizarEvento: g.mutation().args({
    evento: g.relation(() => Event)
  })
})

const UsuarioJogador = UsuarioGeral.specialize('UsuarioJogador', {
  adicionarAmigo: g.mutation().args({
    amigo: g.relation(() => User)
  }),
  criarGrupo: g.mutation().args({
    grupo: g.relation(() => Grupo)
  })
})

const UsuarioParticipante = UsuarioJogador.specialize('UsuarioParticipante', {
  participarEvento: g.mutation().args({
    evento: g.relation(() => Event)
  }),
  avaliarLocal: g.mutation().args({
    local: g.relation(() => Local),
    avaliacao: g.int().valid({ min: 1, max: 5 })
  }),
  pesquisarEventos: g.query().arg({
    termoPesquisa: g.string()
  }),
  cancelarParticipacao: g.mutation().args({
    evento: g.relation(() => Event)
  })
})

const AdministradorSistema = g.actor('AdministradorSistema', {
  validarUsuario: g.mutation().args({
    usuario: g.relation(() => User)
  }),
  validarLocal: g.mutation().args({
    local: g.relation(() => Local)
  })
})

const Sistema = g.model('Sistema', {
  reembolsarUsuario: g.mutation().args({
    usuario: g.relation(() => User),
    valor: g.float().positive()
  })
})

const Sports = g.model('Esportes', {
  nome: g.string().length({ min: 3, max: 40 }),
})

const Event = g.model('Event', {
  numPessoas: g.int(),
  esporte: g.relation(() => Sports),
  createdBy: g.relation(() => User)
})

const Local = g.model('Local', {
  nome: g.string().length({ min: 3, max: 40 })
})

const Grupo = g.model('Grupo', {
  nome: g.string().length({ min: 3, max: 40 })
})

export default config({
  schema: g
})
