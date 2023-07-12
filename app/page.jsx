import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Crie e participe de
            <br className="max-md:hidden"/>
            <span className="orange_gradient text-center">
                eventos esportivos
            </span>
        </h1>
        <p className="desc text-center">
            BateBola é uma plataforma livre para usuários que praticantes de esportes coletivos
        </p>
        {<Feed />}
    </section>
  )
}

export default Home