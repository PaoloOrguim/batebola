import mongoose, { Schema, model } from "mongoose";

const { Date } = mongoose.Schema.Types;


const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  endereco: {
    type: String,
    required: [true, 'Endereco is required'],
  },
  esporte: {
    type: String,
    required: [true, 'Esporte is required'],
  },
  valor: {
    type: String,
    required: [true, 'Valor is required'],
  },
  numPessoas: {
    type: Number,
    required: [true, 'numPessoas is required'],
  },
  chavePix: {
    type: String,
    required: [true, 'ChavePix is required'],
  },
  data: {
    type: Date, // Campo para a data
    required: [true, 'Data is required'],
  },
  hora: {
    type: String, // Campo para a hora
    required: [true, 'Hora is required'],
  },
});


const Prompt = mongoose.models.Prompt || mongoose.model('Prompt', PromptSchema);
export default Prompt;
