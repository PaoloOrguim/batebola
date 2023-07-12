"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { format } from "date-fns";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.chavePix);
    navigator.clipboard.writeText(post.chavePix);
    setTimeout(() => setCopied(false), 3000);
  };

  const getImageSrc = (esporte) => {
    const formattedEsporte = esporte.toLowerCase().replace(/\s/g, "");
    return `/assets/images/${formattedEsporte}.png`;
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.chavePix
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.chavePix ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      {post.esporte && (
        <Image
          src={getImageSrc(post.esporte)}
          alt={`${post.esporte}_image`}
          width={1000}
          height={100}
          className="my-4"
        />
      )}

      <p
        className="my-4 font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.esporte)}
      >
        {post.esporte}
      </p>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        Data: {format(new Date(post.data), "dd/MM/yyyy")}
      </p>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        Hora: {format(new Date(post.hora), "HH:mm")}
      </p>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        Endereço: {post.endereco}
      </p>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        Valor: {post.valor}
      </p>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        Numero de pessoas: {post.numPessoas}
      </p>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        chavePix: {post.chavePix}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Editar
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Deletar
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
