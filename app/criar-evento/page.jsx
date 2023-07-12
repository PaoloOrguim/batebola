'use client';

import {useState} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

const CriarEvento = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    esporte: "",
    endereco: "",
    valor: "",
    chavePix: "",
    numPessoas: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
        try {
          const res = await fetch('/api/prompt/new', {
            method: 'POST',
            body: JSON.stringify({
              esporte: post.esporte,
              endereco: post.endereco,
              valor: post.valor,
              chavePix: post.chavePix,
              numPessoas: post.numPessoas,
              userId: session?.user.id
            }),
          });
          if (res.ok){
            router.push('/');
          }
        } catch (err) {
          console.log(err);
        } finally{
          setSubmitting(false);
        }
  }

  return (
    <Form 
      type="Criar"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CriarEvento