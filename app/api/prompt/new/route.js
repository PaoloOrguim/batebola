import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, endereco, esporte, valor, numPessoas, chavePix,data,hora } = await request.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, endereco, esporte, valor, numPessoas, chavePix,hora,data });
        
        await newPrompt.save();
        
        return new Response(JSON.stringify(newPrompt), { status: 201 });
        
    } catch (error) {
        console.log(error);
        return new Response("Failed to create a new prompt", { status: 500 });
    }
};
