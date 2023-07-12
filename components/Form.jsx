import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [data, setData] = useState(post.data ? new Date(post.data) : null);
  const [hora, setHora] = useState(post.hora ? new Date(post.hora) : null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "valor") {
      const numericValue = parseCurrency(value);
      const formattedValue = formatCurrency(numericValue);
      setPost({ ...post, [name]: formattedValue });
    } else {
      setPost({ ...post, [name]: value });
    }
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const handleDataChange = (date) => {
    // Verificar se a data selecionada é maior ou igual à data atual
    const currentDate = new Date();
    if (date >= currentDate) {
      setData(date);
      setPost({ ...post, data: date ? date.toISOString() : "" });
    }
  };

  const handleHoraChange = (time) => {
    setHora(time);
    setPost({ ...post, hora: time ? time.toISOString() : "" });
  };

  const parseCurrency = (value) => {
    const numericValue = value.replace(/[^\d]/g, "");
    return parseFloat(numericValue) / 100;
  };

  const formatCurrency = (value) => {
    const numberFormat = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
    return numberFormat.format(value);
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Evento</span>
      </h1>
      <p className="desc text-left max-w-md">
        Encontre jogadores disponíveis para seu evento
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <div className="flex flex-col">
          <label
            htmlFor="esporte"
            className="font-satoshi font-semibold text-base text-gray-700 mb-2"
          >
            Escolha o esporte
          </label>
          <select
            id="esporte"
            name="esporte"
            value={post.esporte}
            onChange={handleSelectChange}
            required
            className="form_select"
          >
            <option value="" disabled>
              Selecione o esporte
            </option>
            <option value="Futebol">Futebol</option>
            <option value="Vôlei">Vôlei</option>
            <option value="Basquete">Basquete</option>
            {/* Adicione outras opções de esporte aqui */}
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="data"
            className="font-satoshi font-semibold text-base text-gray-700 mb-2"
          >
            Data
          </label>
          <DatePicker
            id="data"
            name="data"
            selected={data}
            onChange={handleDataChange}
            placeholderText="Selecione a data"
            dateFormat="dd/MM/yyyy"
            className="form_input"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="endereco"
            className="font-satoshi font-semibold text-base text-gray-700 mb-2"
          >
            Endereço
          </label>
          <input
            id="endereco"
            name="endereco"
            type="text"
            value={post.endereco}
            onChange={handleInputChange}
            placeholder="Digite o endereço"
            required
            className="form_input"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="hora"
            className="font-satoshi font-semibold text-base text-gray-700 mb-2"
          >
            Hora
          </label>
          <DatePicker
            id="hora"
            name="hora"
            selected={hora}
            onChange={handleHoraChange}
            placeholderText="Selecione a hora"
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Hora"
            dateFormat="HH:mm"
            timeFormat="HH:mm"
            className="form_input"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="valor"
            className="font-satoshi font-semibold text-base text-gray-700 mb-2"
          >
            Valor
          </label>
          <input
            id="valor"
            name="valor"
            type="text"
            value={post.valor}
            onChange={handleInputChange}
            placeholder="Digite o valor"
            required
            className="form_input"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="chavePix"
            className="font-satoshi font-semibold text-base text-gray-700 mb-2"
          >
            Chave PIX
          </label>
          <input
            id="chavePix"
            name="chavePix"
            type="text"
            value={post.chavePix}
            onChange={handleInputChange}
            placeholder="Digite a chave PIX"
            required
            className="form_input"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="numPessoas"
            className="font-satoshi font-semibold text-base text-gray-700 mb-2"
          >
            Número de pessoas
          </label>
          <select
            id="numPessoas"
            name="numPessoas"
            value={post.numPessoas}
            onChange={handleSelectChange}
            required
            className="form_select"
          >
            <option value="" disabled>
              Selecione o número de pessoas
            </option>
            {Array.from({ length: 21 }, (_, index) => (
              <option key={index + 10} value={index + 10}>
                {index + 10}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
